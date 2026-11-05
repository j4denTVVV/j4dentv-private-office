import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Plus, X, ArrowUpRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { LOGO } from "@/lib/site";
import { EASE } from "@/components/site/motion";
import { NAV_GROUPS, QUICK_ADD, titleFor, OPENING_KEY } from "@/lib/office/nav";
import { useRows } from "@/lib/office/data";
import { supabase } from "@/integrations/supabase/client";

export function OfficeShell() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [quick, setQuick] = useState(false);
  const [opening, setOpening] = useState(false);
  const loc = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!sessionStorage.getItem(OPENING_KEY)) setOpening(true);
    const replay = () => setOpening(true);
    window.addEventListener("office:replay-opening", replay);
    return () => window.removeEventListener("office:replay-opening", replay);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch((s) => !s); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  useEffect(() => { setMenu(false); setQuick(false); setSearch(false); }, [loc.pathname]);

  const focus = loc.pathname.startsWith("/focus");

  return (
    <div className="office min-h-screen">
      <header className={`sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-md transition-opacity duration-300 ${focus ? "opacity-40 hover:opacity-100" : ""}`}>
        <div className="mx-auto grid h-16 max-w-[1480px] grid-cols-[1fr_auto] items-center gap-4 px-5 md:grid-cols-[1fr_auto_1fr] md:px-10">
          <div className="flex items-center gap-5">
            <Link to="/hq" className="flex items-center gap-3" aria-label="Overview">
              <img src={LOGO} alt="4TV" className="h-6 w-auto" />
              <span className="hidden font-serif text-lg italic text-muted-foreground xl:inline">The Private Office</span>
            </Link>
            <button onClick={() => setMenu(true)} aria-expanded={menu} className="group flex h-9 items-center gap-2.5 rounded-md border border-line px-3 text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-line-strong hover:bg-elevated active:scale-[0.97]">
              <span className="flex flex-col gap-[3px]"><span className="block h-px w-3.5 bg-foreground transition-all group-hover:w-2.5" /><span className="block h-px w-3.5 bg-foreground" /></span>
              Menu
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={loc.pathname} className="hidden text-sm text-muted-foreground md:block" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <span className="text-subtle">Office /</span> <span className="text-foreground">{titleFor(loc.pathname)}</span>
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => setSearch(true)} className="flex h-9 items-center gap-2 rounded-md border border-line px-3 text-sm text-muted-foreground transition-colors hover:border-line-strong hover:text-foreground" aria-label="Search">
              <Search className="h-4 w-4" /><span className="hidden lg:inline">Search</span><kbd className="hidden rounded border border-line px-1.5 text-[10px] lg:inline">⌘K</kbd>
            </button>
            <button onClick={() => setQuick(true)} className="flex h-9 items-center gap-2 rounded-md bg-foreground px-3 text-sm text-background transition-colors hover:bg-champagne active:scale-[0.97]" aria-label="Quick Add">
              <Plus className="h-4 w-4" /><span className="hidden sm:inline">New</span>
            </button>
            <Link to="/settings" aria-label="Profile and settings" className="grid h-9 w-9 place-items-center rounded-full border border-line-strong font-serif text-base italic transition-colors hover:border-champagne">J</Link>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main key={loc.pathname} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }}
          className={focus ? "" : "mx-auto max-w-[1480px] px-5 pb-28 pt-12 md:px-10 md:pt-16"}>
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <MenuPanel open={menu} onClose={() => setMenu(false)} path={loc.pathname} />
      <QuickAdd open={quick} onClose={() => setQuick(false)} />
      <SearchPalette open={search} onClose={() => setSearch(false)} />
      <AnimatePresence>{opening && <Opening onDone={() => { sessionStorage.setItem(OPENING_KEY, "1"); setOpening(false); }} />}</AnimatePresence>
    </div>
  );
}

/* ---------------- Menu ---------------- */
function useEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    const o = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = o; };
  }, [open, onClose]);
}

function MenuPanel({ open, onClose, path }: { open: boolean; onClose: () => void; path: string }) {
  useEscape(open, onClose);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const first = useRef<HTMLAnchorElement>(null);
  useEffect(() => { if (open) setTimeout(() => first.current?.focus(), 150); }, [open]);
  async function lock() {
    await qc.cancelQueries(); qc.clear();
    sessionStorage.removeItem(OPENING_KEY);
    await supabase.auth.signOut();
    navigate({ to: "/office", replace: true });
  }
  const groups = [...NAV_GROUPS];
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="office fixed inset-0 z-[60] !bg-background/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.nav aria-label="Office menu" className="absolute inset-y-0 left-0 flex w-full flex-col overflow-y-auto border-r border-line bg-background px-6 pb-10 pt-5 md:w-[min(1100px,92vw)] md:px-14"
            initial={{ x: "-6%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-4%", opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}>
            <div className="flex h-11 items-center justify-between">
              <span className="font-serif text-lg italic text-muted-foreground">The Private Office</span>
              <button onClick={onClose} className="flex h-9 items-center gap-2 rounded-md border border-line px-3 text-[11px] uppercase tracking-[0.2em] hover:bg-elevated"><X className="h-3.5 w-3.5" /> Close</button>
            </div>
            <div className="mt-12 grid flex-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((g, gi) => (
                <motion.div key={g.group} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + gi * 0.05, duration: 0.4, ease: EASE }}>
                  <p className="olabel border-b border-line pb-3">{g.group}</p>
                  <ul className="mt-3">
                    {g.items.map((it, ii) => {
                      const active = path.startsWith(it.to);
                      return (
                        <li key={it.to}>
                          <Link ref={gi === 0 && ii === 0 ? first : undefined} to={it.to} onClick={onClose}
                            className={`group relative flex items-baseline justify-between py-1.5 font-serif text-3xl transition-colors md:text-4xl ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground focus-visible:text-foreground"}`}>
                            <span className="relative">
                              {it.label}
                              <span className={`absolute -bottom-0.5 left-0 h-px bg-champagne transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full group-focus-visible:w-full"}`} />
                            </span>
                            {active && <span className="olabel !text-champagne">Here</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.4, ease: EASE }}>
                <p className="olabel border-b border-line pb-3">Account</p>
                <ul className="mt-3 space-y-1 font-serif text-3xl md:text-4xl">
                  <li><Link to="/settings" onClick={onClose} className="text-muted-foreground transition-colors hover:text-foreground">Settings</Link></li>
                  <li><Link to="/" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">View Public Website <ArrowUpRight className="h-5 w-5" /></Link></li>
                  <li><button onClick={lock} className="text-muted-foreground transition-colors hover:text-champagne">Lock Office</button></li>
                </ul>
              </motion.div>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Quick Add ---------------- */
function QuickAdd({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEscape(open, onClose);
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-background/70 p-5 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div role="dialog" aria-label="Quick Add" className="w-full max-w-2xl rounded-xl border border-line bg-surface p-8" initial={{ y: 16, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 8, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
            <div className="flex items-center justify-between"><h2 className="office-h text-4xl">Start something</h2><button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-md border border-line hover:bg-hover"><X className="h-4 w-4" /></button></div>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
              {QUICK_ADD.map((q, i) => (
                <motion.button key={q.label} autoFocus={i === 0} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 + i * 0.03 }}
                  onClick={() => { onClose(); navigate({ to: q.to, search: { new: q.type } }); }}
                  className="group flex items-center justify-between bg-surface px-5 py-5 text-left font-serif text-2xl transition-colors hover:bg-elevated focus-visible:bg-elevated">
                  {q.label}<Plus className="h-4 w-4 text-subtle transition-all group-hover:rotate-90 group-hover:text-champagne" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Search ---------------- */
type Hit = { group: string; label: string; sub?: string; to: string };
function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEscape(open, onClose);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const navigate = useNavigate();
  const tasks = useRows("tasks"); const streams = useRows("streams"); const content = useRows("content_projects");
  const ideas = useRows("ideas"); const collabs = useRows("collabs"); const goals = useRows("goals"); const archive = useRows("archive_items");
  useEffect(() => { if (open) { setQ(""); setSel(0); } }, [open]);
  const hits = useMemo<Hit[]>(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const m = (x?: string | null) => !!x && x.toLowerCase().includes(s);
    const out: Hit[] = [];
    for (const r of tasks.data ?? []) if (m(r.title)) out.push({ group: "Tasks", label: r.title, sub: r.status, to: "/tasks" });
    for (const r of streams.data ?? []) if (m(r.title)) out.push({ group: "Streams", label: r.title, sub: r.stream_date ?? "", to: "/live" });
    for (const r of content.data ?? []) if (m(r.title)) out.push({ group: "Content", label: r.title, sub: r.status, to: "/studio" });
    for (const r of ideas.data ?? []) if (m(r.title) || r.tags?.some(m)) out.push({ group: "Ideas", label: r.title, sub: r.category, to: "/ideas" });
    for (const r of collabs.data ?? []) if (m(r.name) || m(r.username)) out.push({ group: "Collaborations", label: r.name, sub: r.stage, to: "/collabs" });
    for (const r of archive.data ?? []) if (m(r.title) || m(r.description)) out.push({ group: "Archive", label: r.title ?? "Photograph", sub: r.visibility, to: "/archive" });
    for (const r of goals.data ?? []) if (m(r.title)) out.push({ group: "Goals", label: r.title, sub: r.status, to: "/goals" });
    for (const g of NAV_GROUPS) for (const i of g.items) if (m(i.label)) out.push({ group: "Pages", label: i.label, to: i.to });
    return out.slice(0, 40);
  }, [q, tasks.data, streams.data, content.data, ideas.data, collabs.data, goals.data, archive.data]);
  const go = (h: Hit) => { onClose(); navigate({ to: h.to }); };
  const groups = [...new Set(hits.map((h) => h.group))];
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[65] flex items-start justify-center bg-background/70 p-4 pt-[12vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div role="dialog" aria-label="Search the office" className="w-full max-w-2xl overflow-hidden rounded-xl border border-line bg-surface" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -6, opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}>
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="h-4 w-4 text-subtle" />
              <input autoFocus value={q} placeholder="Search tasks, streams, content, ideas…" className="h-14 flex-1 bg-transparent text-lg outline-none placeholder:text-subtle"
                onChange={(e) => { setQ(e.target.value); setSel(0); }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(hits.length - 1, s + 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
                  if (e.key === "Enter" && hits[sel]) go(hits[sel]);
                }} />
              <kbd className="rounded border border-line px-1.5 text-[10px] text-subtle">ESC</kbd>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {!q && <p className="px-3 py-6 text-sm text-muted-foreground">Type to search across the office.</p>}
              {q && !hits.length && <p className="px-3 py-6 text-sm text-muted-foreground">Nothing matches “{q}”.</p>}
              {groups.map((g) => (
                <div key={g} className="py-1">
                  <p className="olabel px-3 py-2">{g}</p>
                  {hits.map((h, i) => h.group === g && (
                    <button key={i} onMouseEnter={() => setSel(i)} onClick={() => go(h)} className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left ${sel === i ? "bg-hover" : ""}`}>
                      <span>{h.label}</span><span className="text-xs text-subtle">{h.sub}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Opening ---------------- */
const WORDS = [
  { w: "Plan", from: { x: "-40vw", y: "-6vh" } },
  { w: "Create", from: { x: "38vw", y: "4vh" } },
  { w: "Refine", from: { x: "0vw", y: "30vh" } },
];
function Opening({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 600 : 2300);
    const k = (e: KeyboardEvent) => e.key === "Escape" && onDone();
    window.addEventListener("keydown", k);
    return () => { clearTimeout(t); window.removeEventListener("keydown", k); };
  }, [onDone, reduce]);
  return (
    <motion.div className="office fixed inset-0 z-[100] grid place-items-center overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(8px)" }} transition={{ duration: 0.45, ease: EASE }}>
      <motion.img src={LOGO} alt="" className="absolute left-1/2 top-[14vh] h-8 w-auto -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.15, duration: 0.6 }} />
      <div className="flex flex-col items-center gap-1 md:flex-row md:gap-8">
        {WORDS.map((x, i) => (
          <motion.span key={x.w} className={`office-h text-[18vw] md:text-[9vw] ${i === 1 ? "italic text-champagne" : ""}`}
            initial={reduce ? { opacity: 0 } : { ...x.from, opacity: 0, scale: 1.25, filter: "blur(14px)" }}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.3 + i * 0.22, duration: 0.85, ease: EASE }}>
            {x.w}
          </motion.span>
        ))}
      </div>
      <button onClick={onDone} className="absolute bottom-8 right-8 text-[11px] uppercase tracking-[0.2em] text-subtle transition-colors hover:text-foreground">Skip</button>
    </motion.div>
  );
}
