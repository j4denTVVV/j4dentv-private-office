import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, Plus, LockKeyhole, ArrowUpRight, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LOGO } from "@/lib/site";
import { EASE } from "@/components/site/motion";
import { Button } from "@/components/ui/button";
import { OPENING_KEY } from "@/lib/office/nav";

export function OfficeShell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [intro, setIntro] = useState(false);
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const path = useLocation({ select: l => l.pathname });
  const qc = useQueryClient();
  useEffect(() => {
    if (!reduce && !sessionStorage.getItem(OPENING_KEY)) {
      sessionStorage.setItem(OPENING_KEY, "1"); setIntro(true);
    }
  }, [reduce]);
  useEffect(() => {
    if (!intro) return;
    const timer = setTimeout(() => setIntro(false), 2200);
    return () => clearTimeout(timer);
  }, [intro]);
  useEffect(() => { setMenu(false); }, [path]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); setIntro(false); } };
    window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close);
  }, []);
  async function lock() {
    await qc.cancelQueries(); qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/office", replace: true });
  }
  return <div className="office min-h-screen">
    <header className="border-b border-line">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-3 px-6 md:px-10">
        <Link to="/hq" aria-label="Office overview"><img src={LOGO} alt="4TV" className="h-8 w-auto" /></Link>
        <span className="hidden font-serif text-xl italic text-muted-foreground sm:block">The Private Office</span>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" title="Add task"><Link to="/tasks" search={{ new: "Task" }} aria-label="Add task"><Plus /></Link></Button>
          <Button variant="ghost" size="icon" title="Replay opening" aria-label="Replay opening" onClick={() => setIntro(true)}><RotateCcw /></Button>
          <Button variant="ghost" size="icon" title="Lock Office" aria-label="Lock Office" onClick={lock}><LockKeyhole /></Button>
          <Button variant="outline" size="icon" title="Office menu" aria-label="Office menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button>
        </div>
      </div>
    </header>
    <AnimatePresence>
      {menu && <motion.nav aria-label="Office navigation" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-b border-line bg-surface">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-6 py-10 md:grid-cols-3 md:px-10">
          <Link to="/hq" className="group flex items-center justify-between border-b border-line pb-5 font-serif text-4xl">Overview <ArrowUpRight className="h-5 w-5 text-champagne" /></Link>
          <Link to="/tasks" search={{}} className="group flex items-center justify-between border-b border-line pb-5 font-serif text-4xl">Tasks <ArrowUpRight className="h-5 w-5 text-champagne" /></Link>
          <Link to="/" className="flex items-center justify-between border-b border-line pb-5 font-serif text-3xl text-muted-foreground">Public website <ArrowUpRight className="h-5 w-5" /></Link>
        </div>
      </motion.nav>}
    </AnimatePresence>
    <main className="mx-auto max-w-[1440px] px-6 py-12 md:px-10 md:py-16">{children}</main>
    <AnimatePresence>
      {intro && <motion.div role="dialog" aria-label="Office opening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-background">
        <div className="flex flex-col gap-4 overflow-hidden text-center sm:flex-row sm:gap-10">
          {["Plan.", "Create.", "Refine."].map((word, i) => <motion.span key={word} initial={reduce ? false : { y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.65, delay: i * 0.25, ease: EASE }} className="font-serif text-6xl md:text-8xl">{word}</motion.span>)}
        </div>
        <Button variant="ghost" className="absolute bottom-12 text-muted-foreground" onClick={() => setIntro(false)}>Skip</Button>
      </motion.div>}
    </AnimatePresence>
  </div>;
}