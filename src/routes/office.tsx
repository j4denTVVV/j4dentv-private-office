import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, Eye as EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { EASE } from "@/components/site/motion";
import { LOGO } from "@/lib/site";
import { lux } from "@/components/ui/lux-button";
import { enterOffice } from "@/lib/office/auth.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/office")({
  validateSearch: (s: Record<string, unknown>): { expired?: boolean | undefined } => ({ expired: s["expired"] ? true : undefined }),
  head: () => ({
    meta: [
      { title: "The Private Office — J4denTV" },
      { name: "description", content: "Private access to J4denTV's workspace." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "The Private Office — J4denTV" },
      { property: "og:description", content: "Private access." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const { expired } = Route.useSearch();
  const navigate = useNavigate();
  const enter = useServerFn(enterOffice);
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(expired ? "Your session expired. Please enter again." : null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!pw || busy) return;
    setBusy(true);
    setErr(null);
    try {
      const r = await enter({ data: { password: pw } });
      if (!r.ok) { setErr(r.error); return; }
      const { error } = await supabase.auth.setSession({ access_token: r.access_token, refresh_token: r.refresh_token });
      if (error) { setErr(error.message); return; }
      setPw("");
      navigate({ to: "/hq", replace: true });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Couldn't reach the office. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="w-full max-w-sm">
        <motion.img src={LOGO} alt="4TV" className="mx-auto h-10 w-auto" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.15, ease: EASE }} />
        <div className="mt-10 text-center">
          <p className="eyebrow">J4denTV</p>
          <h1 className="display mt-3 text-5xl">The Private Office</h1>
          <p className="mt-4 font-serif text-xl italic text-muted-foreground">Private access. Your workspace awaits.</p>
        </div>
        <form onSubmit={submit} className="mt-10 space-y-4">
          <label className="block">
            <span className="eyebrow">Password</span>
            <div className="relative mt-2">
              <input
                type={show ? "text" : "password"} autoComplete="current-password" autoFocus value={pw}
                onChange={(e) => setPw(e.target.value)} className="oi h-12 pr-12" aria-invalid={!!err}
              />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-1 top-1 grid h-10 w-10 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
          </label>
          {err && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert" className="text-sm text-destructive">{err}</motion.p>}
          <button type="submit" disabled={busy || !pw} className={lux({ className: "w-full" })}>
            {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Entering</> : "Enter Office"}
          </button>
        </form>
        <div className="mt-10 text-center">
          <Link to="/" className="link-draw inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Return to website
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
