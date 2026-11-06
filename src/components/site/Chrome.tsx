import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";
import { LOGO, SOCIALS } from "@/lib/site";
import { EASE } from "./motion";
import { SocialIcon } from "./SocialIcon";

const NAV = [
  { label: "Home", to: "/" as const, hash: undefined },
  { label: "My Story", to: "/story" as const, hash: undefined },
  { label: "Photographs", to: "/" as const, hash: "photographs" },
  { label: "Content", to: "/" as const, hash: "content" },
  { label: "Elsewhere", to: "/" as const, hash: "elsewhere" },
  { label: "Find Me", to: "/" as const, hash: "find-me" },
];

export function Eye({ blink = true, className = "h-3 w-6" }: { blink?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 48 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <g className={blink ? "eye-lid" : ""}>
        <path d="M2 12 C 12 1, 36 1, 46 12 C 36 23, 12 23, 2 12 Z" />
        <circle cx="24" cy="12" r="5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background,height,border-color] duration-300 ${scrolled ? "border-line bg-surface/80 backdrop-blur-md" : "border-transparent bg-transparent"}`}
    >
      <div className={`mx-auto flex max-w-[1440px] items-center justify-between px-6 transition-[height] duration-300 md:px-10 ${scrolled ? "h-16" : "h-[76px]"}`}>
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="J4DENTV home">
          <img src={LOGO} alt="4TV" className="h-7 w-auto" />
          <span className="display text-xl tracking-wide">J4DENTV</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} {...(n.hash ? { hash: n.hash } : {})} activeOptions={{ exact: true, includeHash: true }} className="link-draw text-[12px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground data-[status=active]:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/office" aria-label="Private HQ" className="group grid h-10 w-10 place-items-center rounded-lg border border-line text-muted-foreground transition-colors duration-200 hover:border-line-strong hover:bg-elevated hover:text-champagne">
            <KeyRound className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12" />
          </Link>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-lg border border-line lg:hidden">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex flex-col bg-background px-6 pt-5 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}>
            <div className="flex items-center justify-between">
              <img src={LOGO} alt="4TV" className="h-7 w-auto" />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-lg border border-line"><X className="h-4 w-4" /></button>
            </div>
            <nav className="mt-14 flex flex-col gap-2">
              {NAV.map((n, i) => (
                <motion.div key={n.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: EASE }}>
                  <Link to={n.to} {...(n.hash ? { hash: n.hash } : {})} onClick={() => setOpen(false)} className="display block py-2 text-5xl">{n.label}</Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-14 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="4TV" className="h-8 w-auto" />
            <span className="display text-2xl">J4DENTV</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">Streamer and content creator from Nottingham, England.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 md:col-span-5">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <SocialIcon name={s.name} className="h-3.5 w-3.5" />{s.name}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          ))}
        </div>
        <div className="flex items-start justify-between text-subtle md:col-span-2 md:justify-end">
          <Eye className="h-3 w-6" />
        </div>
        <p className="text-xs text-subtle md:col-span-12">© {new Date().getFullYear()} J4denTV · 4TV</p>
      </div>
    </footer>
  );
}
