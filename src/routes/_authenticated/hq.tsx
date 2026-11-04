import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { lux } from "@/components/ui/lux-button";

export const Route = createFileRoute("/_authenticated/hq")({
  head: () => ({
    meta: [
      { title: "Overview — The Private Office" },
      { name: "description", content: "J4denTV's private workspace." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "The Private Office" },
      { property: "og:description", content: "Private workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Hq,
});

function Hq() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  async function lock() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/office", replace: true });
  }
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="eyebrow">The Private Office</p>
      <h1 className="display mt-4 text-6xl">Welcome back.</h1>
      <p className="mt-6 text-muted-foreground">You're signed in. The office pages are still being built.</p>
      <div className="mt-10 flex gap-3">
        <Link to="/" className={lux({ variant: "ghost", size: "sm" })}>View public website</Link>
        <button onClick={lock} className={lux({ size: "sm" })}>Lock office</button>
      </div>
    </main>
  );
}
