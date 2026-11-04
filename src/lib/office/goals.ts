export function goalProgress(current: number | null | undefined, target: number) {
  if (current == null || !Number.isFinite(current) || target <= 0) return null;
  const pct = Math.min(100, Math.max(0, (current / target) * 100));
  return { current, target, remaining: Math.max(0, target - current), pct: Math.round(pct * 10) / 10 };
}

export function rundownTotal(segments: { duration_min: number | null }[]) {
  return segments.reduce((s, x) => s + (x.duration_min ?? 0), 0);
}

export function fmtMinutes(m: number) {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h ? `${h}h ${r ? `${r}m` : ""}`.trim() : `${r}m`;
}
