CREATE OR REPLACE FUNCTION public.office_session_ok() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, auth AS $$
  SELECT EXISTS (SELECT 1 FROM auth.sessions s
    WHERE s.id = nullif(auth.jwt()->>'session_id','')::uuid
      AND s.user_id = auth.uid()
      AND s.created_at > now() - interval '12 hours');
$$;
GRANT EXECUTE ON FUNCTION public.office_session_ok() TO authenticated;

CREATE TABLE public.login_attempts (id bigserial primary key, ip text not null, success boolean not null default false, created_at timestamptz not null default now());
GRANT ALL ON public.login_attempts TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.login_attempts_id_seq TO service_role;
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.tasks (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), title text not null, description text, due_date date, priority text not null default 'medium', status text not null default 'todo', category text, related_type text, related_id uuid, notes text, created_at timestamptz not null default now(), completed_at timestamptz);
CREATE TABLE public.ideas (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), title text not null, description text, category text not null default 'Other', priority text not null default 'medium', tags text[] not null default '{}', notes text, status text not null default 'new', favourite boolean not null default false, created_at timestamptz not null default now());
CREATE TABLE public.streams (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), title text not null, stream_date date, start_time time, duration_min int, platform text default 'Twitch', category text, stream_type text, description text, goals text, guests text, notes text, status text not null default 'planned', checklist jsonb not null default '[]', review jsonb, game text, is_template boolean not null default false, created_at timestamptz not null default now());
CREATE TABLE public.stream_segments (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), stream_id uuid not null references public.streams(id) on delete cascade, position int not null default 0, name text not null, description text, duration_min int not null default 10, notes text, checklist jsonb not null default '[]');
CREATE TABLE public.content_projects (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), title text not null, description text, platform text default 'TikTok', format text, thumbnail_url text, captions jsonb not null default '{}', hashtags text, recording_date date, due_date date, publish_date date, status text not null default 'idea', link text, published_url text, notes text, created_at timestamptz not null default now());
CREATE TABLE public.collabs (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), name text not null, platform text, username text, profile_url text, content_type text, audience text, contact text, notes text, stage text not null default 'potential', outreach_date date, follow_up_date date, idea text, created_at timestamptz not null default now());
CREATE TABLE public.events (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), title text not null, kind text not null default 'personal', starts_at timestamptz not null, ends_at timestamptz, notes text, link_type text, link_id uuid, created_at timestamptz not null default now());
CREATE TABLE public.focus_sessions (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), task_id uuid references public.tasks(id) on delete set null, label text, started_at timestamptz not null, duration_sec int not null, notes text, created_at timestamptz not null default now());
CREATE TABLE public.goals (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), title text not null, kind text not null default 'Other', platform text, target numeric not null default 0, current numeric, unit text, deadline date, notes text, status text not null default 'active', created_at timestamptz not null default now());
CREATE TABLE public.goal_progress (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), goal_id uuid not null references public.goals(id) on delete cascade, value numeric not null, recorded_at date not null default current_date, notes text, created_at timestamptz not null default now());
CREATE TABLE public.milestones (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), subs int not null, reward text not null, status text not null default 'planned', created_at timestamptz not null default now());
CREATE TABLE public.activity (id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid(), kind text not null, label text not null, created_at timestamptz not null default now());

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['tasks','ideas','streams','stream_segments','content_projects','collabs','events','focus_sessions','goals','goal_progress','milestones','activity'] LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "owner only" ON public.%I FOR ALL TO authenticated USING (owner_id = auth.uid() AND public.office_session_ok()) WITH CHECK (owner_id = auth.uid() AND public.office_session_ok())', t);
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION public.log_activity() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE lbl text;
BEGIN
  IF TG_OP = 'INSERT' THEN
    lbl := CASE TG_TABLE_NAME
      WHEN 'tasks' THEN 'Task added: ' || NEW.title
      WHEN 'ideas' THEN 'Idea saved: ' || NEW.title
      WHEN 'streams' THEN 'Stream planned: ' || NEW.title
      WHEN 'content_projects' THEN 'Content project created: ' || NEW.title
      WHEN 'collabs' THEN 'Creator saved: ' || NEW.name
      WHEN 'events' THEN 'Event added: ' || NEW.title
      WHEN 'focus_sessions' THEN 'Focus session completed (' || (NEW.duration_sec/60) || ' min)'
      WHEN 'goal_progress' THEN 'Goal progress recorded: ' || NEW.value
      ELSE NULL END;
  ELSIF TG_OP = 'UPDATE' AND TG_TABLE_NAME = 'tasks' AND NEW.status = 'done' AND OLD.status <> 'done' THEN
    lbl := 'Task completed: ' || NEW.title;
  ELSIF TG_OP = 'UPDATE' AND TG_TABLE_NAME = 'content_projects' AND NEW.status <> OLD.status THEN
    lbl := NEW.title || ' moved to ' || NEW.status;
  END IF;
  IF lbl IS NOT NULL THEN
    INSERT INTO public.activity(owner_id, kind, label) VALUES (NEW.owner_id, TG_TABLE_NAME, left(lbl, 200));
  END IF;
  RETURN NEW;
END $$;

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['tasks','ideas','streams','content_projects','collabs','events','focus_sessions','goal_progress'] LOOP
    EXECUTE format('CREATE TRIGGER %I AFTER INSERT OR UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.log_activity()', t || '_activity', t);
  END LOOP;
END $$;