CREATE TABLE public.office_records (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), owner_id uuid NOT NULL DEFAULT auth.uid(),
 kind text NOT NULL CHECK (kind IN ('inbox','project','workshop','person','library','playbook','review','note','milestone')),
 title text NOT NULL CHECK (length(trim(title)) BETWEEN 1 AND 200), body text NOT NULL DEFAULT '' CHECK (length(body)<=100000),
 status text NOT NULL DEFAULT 'active', category text NOT NULL DEFAULT '', tags text[] NOT NULL DEFAULT '{}',
 project_id uuid REFERENCES public.office_records(id), due_date date, data jsonb NOT NULL DEFAULT '{}',
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT,INSERT,UPDATE,DELETE ON public.office_records TO authenticated;
GRANT ALL ON public.office_records TO service_role;
ALTER TABLE public.office_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "private owner records" ON public.office_records FOR ALL TO authenticated USING(owner_id=auth.uid() AND public.office_session_ok()) WITH CHECK(owner_id=auth.uid() AND public.office_session_ok());
CREATE INDEX office_records_owner_kind ON public.office_records(owner_id,kind);
CREATE TABLE public.office_links (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), owner_id uuid NOT NULL DEFAULT auth.uid(),
 record_id uuid NOT NULL REFERENCES public.office_records(id) ON DELETE CASCADE,
 target_id uuid NOT NULL REFERENCES public.office_records(id) ON DELETE CASCADE,
 created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(record_id,target_id)
);
GRANT SELECT,INSERT,UPDATE,DELETE ON public.office_links TO authenticated;
GRANT ALL ON public.office_links TO service_role;
ALTER TABLE public.office_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "private owner links" ON public.office_links FOR ALL TO authenticated USING(owner_id=auth.uid() AND public.office_session_ok()) WITH CHECK(owner_id=auth.uid() AND public.office_session_ok() AND EXISTS(SELECT 1 FROM public.office_records WHERE id=record_id AND owner_id=auth.uid()) AND EXISTS(SELECT 1 FROM public.office_records WHERE id=target_id AND owner_id=auth.uid()));
CREATE TABLE public.office_recent (
 owner_id uuid NOT NULL DEFAULT auth.uid(), record_id uuid NOT NULL REFERENCES public.office_records(id) ON DELETE CASCADE,
 opened_at timestamptz NOT NULL DEFAULT now(), view text NOT NULL DEFAULT 'overview', PRIMARY KEY(owner_id,record_id)
);
GRANT SELECT,INSERT,UPDATE,DELETE ON public.office_recent TO authenticated;
GRANT ALL ON public.office_recent TO service_role;
ALTER TABLE public.office_recent ENABLE ROW LEVEL SECURITY;
CREATE POLICY "private recently opened" ON public.office_recent FOR ALL TO authenticated USING(owner_id=auth.uid() AND public.office_session_ok()) WITH CHECK(owner_id=auth.uid() AND public.office_session_ok() AND EXISTS(SELECT 1 FROM public.office_records WHERE id=record_id AND owner_id=auth.uid()));
ALTER TABLE public.tasks ADD COLUMN project_id uuid REFERENCES public.office_records(id);
ALTER TABLE public.focus_sessions ADD COLUMN project_id uuid REFERENCES public.office_records(id);
ALTER TABLE public.events ADD COLUMN project_id uuid REFERENCES public.office_records(id);
CREATE OR REPLACE FUNCTION public.validate_office_record() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
 IF TG_OP='UPDATE' AND NEW.owner_id<>OLD.owner_id THEN RAISE EXCEPTION 'Owner cannot change'; END IF;
 IF NEW.project_id IS NOT NULL AND NOT EXISTS(SELECT 1 FROM public.office_records WHERE id=NEW.project_id AND owner_id=NEW.owner_id AND kind='project') THEN RAISE EXCEPTION 'Project unavailable'; END IF;
 IF TG_TABLE_NAME='office_records' THEN NEW.updated_at=now(); END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER validate_record BEFORE INSERT OR UPDATE ON public.office_records FOR EACH ROW EXECUTE FUNCTION public.validate_office_record();
CREATE TRIGGER validate_task_project BEFORE INSERT OR UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.validate_office_record();
CREATE TRIGGER validate_event_project BEFORE INSERT OR UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.validate_office_record();
CREATE TRIGGER validate_focus_project BEFORE INSERT OR UPDATE ON public.focus_sessions FOR EACH ROW EXECUTE FUNCTION public.validate_office_record();
CREATE TRIGGER record_activity AFTER INSERT OR UPDATE ON public.office_records FOR EACH ROW EXECUTE FUNCTION public.record_office_activity();
CREATE OR REPLACE FUNCTION public.organise_inbox(item_id uuid,destination text,selected_project uuid DEFAULT NULL) RETURNS uuid LANGUAGE plpgsql SECURITY INVOKER SET search_path=public AS $$
DECLARE item public.office_records; result uuid;
BEGIN
 SELECT * INTO item FROM public.office_records WHERE id=item_id AND kind='inbox' AND status<>'archived' FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Inbox item unavailable'; END IF;
 IF destination NOT IN ('project','workshop','library','task','milestone','archive') THEN RAISE EXCEPTION 'Invalid destination'; END IF;
 IF selected_project IS NOT NULL AND NOT EXISTS(SELECT 1 FROM public.office_records WHERE id=selected_project AND kind='project') THEN RAISE EXCEPTION 'Project unavailable'; END IF;
 IF destination='task' THEN
 INSERT INTO public.tasks(title,description,notes,due_date,project_id,category) VALUES(item.title,item.body,item.data::text,item.due_date,selected_project,item.category) RETURNING id INTO result;
 UPDATE public.office_records SET status='archived', data=data||jsonb_build_object('converted_task',result) WHERE id=item_id;
 ELSIF destination='archive' THEN UPDATE public.office_records SET status='archived' WHERE id=item_id; result=item_id;
 ELSE UPDATE public.office_records SET kind=destination,project_id=selected_project,status='active' WHERE id=item_id RETURNING id INTO result;
 END IF;
 RETURN result;
END $$;
REVOKE ALL ON FUNCTION public.organise_inbox(uuid,text,uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.organise_inbox(uuid,text,uuid) TO authenticated;
CREATE POLICY "office private files" ON storage.objects FOR ALL TO authenticated USING(bucket_id='office-files' AND (storage.foldername(name))[1]=auth.uid()::text AND public.office_session_ok()) WITH CHECK(bucket_id='office-files' AND (storage.foldername(name))[1]=auth.uid()::text AND public.office_session_ok());