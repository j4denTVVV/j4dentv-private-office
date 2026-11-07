import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { OfficeShell } from "@/components/office/OfficeShell";

let lastCheck = 0;

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/office" });
    // Server-side check: the database rejects sessions older than 12 hours.
    if (Date.now() - lastCheck > 60_000) {
      const { data: ok, error } = await supabase.rpc("office_session_ok");
      if (error || !ok) {
        await supabase.auth.signOut();
        throw redirect({ to: "/office", search: { expired: true } });
      }
      lastCheck = Date.now();
    }
  },
  component: () => <OfficeShell><Outlet /></OfficeShell>,
});
