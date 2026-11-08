import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { X, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { EASE } from "@/components/site/motion";
import { lux } from "@/components/ui/lux-button";
import { todayLondon, fmtDate } from "@/lib/office/time";
import { fromLondonInput, toLondonInput } from "@/lib/office/time";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function PageHead({ label, title, children, aside }: { label: string; title: string; children?: ReactNode; aside?: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <header className="flex flex-col gap-4 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <motion.p className="olabel" initial={reduce ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: EASE }}>{label}</motion.p>
        <span className="block overflow-hidden pb-2">
          <motion.h1 className="office-page-title mt-2" initial={reduce ? false : { y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, ease: EASE }}>{title}</motion.h1>
        </span>
        {children && <motion.div className="mt-3 max-w-xl text-muted-foreground" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.4 }}>{children}</motion.div>}
      </div>
      {aside && <div className="flex flex-wrap gap-2">{aside}</div>}
    </header>
  );
}

export function Stagger({ children, className, i = 0 }: { children: ReactNode; className?: string; i?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.06 }}>
      {children}
    </motion.div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-5 flex items-baseline justify-between gap-4">
      <h2 className="office-h text-3xl">{children}</h2>
      {action}
    </div>
  );
}

export function Empty({ text, to, cta, onClick }: { text: string; to?: string; cta?: string; onClick?: () => void }) {
  return (
    <div className="border-t border-line py-8">
      <p className="font-serif text-2xl italic text-muted-foreground">{text}</p>
      {cta && to && <Link to={to} className="link-draw mt-3 inline-block text-[12px] uppercase tracking-[0.16em] text-foreground">{cta}</Link>}
      {cta && onClick && <button onClick={onClick} className="link-draw mt-3 inline-block text-[12px] uppercase tracking-[0.16em] text-foreground">{cta}</button>}
    </div>
  );
}

export function Loading() {
  return <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading</div>;
}

export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "gold" | "quiet" }) {
  const c = tone === "gold" ? "border-champagne/50 text-champagne" : tone === "quiet" ? "border-line text-subtle" : "border-line-strong text-muted-foreground";
  return <span className={`inline-flex h-6 items-center rounded-full border px-2.5 text-[11px] ${c}`}>{children}</span>;
}

export const btn = lux;
export const dateLabel = (d: string | null | undefined) => (d ? fmtDate(d, { day: "numeric", month: "short" }) : "");
export const isOverdue = (d: string | null | undefined) => !!d && d < todayLondon();

/* ---------- Generic record form ---------- */
export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "date" | "datetime-local" | "number" | "select" | "url" | "checkbox";
  options?: readonly string[];
  required?: boolean;
  wide?: boolean;
};

export function RecordDialog({ open, onClose, title, fields, initial, onSubmit, busy, onDelete }: {
  open: boolean; onClose: () => void; title: string; fields: Field[];
  initial?: Record<string, unknown> | undefined; onSubmit: (v: Record<string, unknown>) => void | Promise<void>; busy?: boolean | undefined; onDelete?: (() => void) | undefined;
}) {
  const [v, setV] = useState<Record<string, unknown>>({});
  useEffect(() => { if (open) { const next = { ...initial }; for (const f of fields) { if (f.type === "datetime-local" && typeof next[f.name] === "string") next[f.name] = toLondonInput(next[f.name] as string); if (Array.isArray(next[f.name])) next[f.name] = (next[f.name] as string[]).join(", "); } setV(next); } }, [open, initial]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const out: Record<string, unknown> = {};
    for (const f of fields) {
      const x = v[f.name];
      if (f.type === "number") out[f.name] = x === "" || x == null ? null : Number(x);
      else if (f.type === "checkbox") out[f.name] = !!x;
      else if (f.name === "tags") out[f.name] = String(x ?? "").split(",").map(s => s.trim()).filter(Boolean);
      else if (f.type === "datetime-local") out[f.name] = x ? fromLondonInput(String(x)) : null;
      else out[f.name] = x === "" || x == null ? null : x;
    }
    try { await onSubmit(out); } catch { /* Mutations keep the form open and report the error. */ }
  }
  return (
    <Dialog open={open} onOpenChange={o => !o && onClose()}>
      <DialogContent className="office max-h-[90dvh] max-w-2xl overflow-y-auto bg-surface">
          <form onSubmit={submit} className="flex flex-col">
            <div className="flex items-start justify-between">
              <DialogTitle className="office-h text-3xl">{title}</DialogTitle>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-5">
              {fields.map((f) => (
                <label key={f.name} className={f.wide || f.type === "textarea" || !f.type || f.type === "text" ? "col-span-2" : "col-span-2 sm:col-span-1"}>
                  <span className="text-sm text-muted-foreground">{f.label}{f.required && " *"}</span>
                  {f.type === "textarea" ? (
                    <textarea className="oi mt-2 min-h-28 py-3" value={(v[f.name] as string) ?? ""} onChange={(e) => setV({ ...v, [f.name]: e.target.value })} />
                  ) : f.type === "select" ? (
                    <select className="oi mt-2 h-11" value={(v[f.name] as string) ?? ""} required={f.required} onChange={(e) => setV({ ...v, [f.name]: e.target.value })}>
                      <option value="">—</option>
                      {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <input type="checkbox" className="ml-3 h-4 w-4 accent-[var(--champagne)]" checked={!!v[f.name]} onChange={(e) => setV({ ...v, [f.name]: e.target.checked })} />
                  ) : (
                    <input type={f.type ?? "text"} required={f.required} step={f.type === "number" ? "any" : undefined} className="oi mt-2 h-11" value={(v[f.name] as string | number) ?? ""} onChange={(e) => setV({ ...v, [f.name]: e.target.value })} />
                  )}
                </label>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-3 pt-10">
              {onDelete ? <Button type="button" variant="ghost" onClick={onDelete} className="text-destructive">Delete</Button> : <span />}
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={busy}>{busy ? "Saving" : "Save"}</Button>
              </div>
            </div>
          </form>
      </DialogContent>
    </Dialog>
  );
}

/** Opens a form when the page was reached via Quick Add (?new=...). */
export function useNewParam(value: string | undefined, open: (type: string) => void, clear: () => void) {
  useEffect(() => {
    if (value) { open(value); clear(); }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
}
