// All office dates/times are shown and entered in Europe/London, stored as UTC.
export const TZ = "Europe/London";

export function londonOffsetMin(d: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(d);
  const g = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute"), g("second"));
  return Math.round((asUtc - d.getTime()) / 60000);
}

/** "2026-07-01T19:00" (London wall time) -> ISO UTC string */
export function fromLondonInput(v: string): string {
  const naive = new Date(v + (v.length === 16 ? ":00Z" : "Z"));
  let off = londonOffsetMin(naive);
  const guess = new Date(naive.getTime() - off * 60000);
  off = londonOffsetMin(guess);
  return new Date(naive.getTime() - off * 60000).toISOString();
}

/** ISO UTC -> "YYYY-MM-DDTHH:mm" London wall time */
export function toLondonInput(iso: string): string {
  const d = new Date(iso);
  return new Date(d.getTime() + londonOffsetMin(d) * 60000).toISOString().slice(0, 16);
}

export function todayLondon(now = new Date()): string {
  return toLondonInput(now.toISOString()).slice(0, 10);
}

export function londonDay(iso: string): string {
  return toLondonInput(iso).slice(0, 10);
}

export function fmt(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: TZ, ...opts }).format(new Date(iso));
}

/** Format a plain date (YYYY-MM-DD) without timezone drift. */
export function fmtDate(d: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts }).format(new Date(d + "T00:00:00Z"));
}

export function addDays(d: string, n: number): string {
  const x = new Date(d + "T00:00:00Z");
  x.setUTCDate(x.getUTCDate() + n);
  return x.toISOString().slice(0, 10);
}

export function londonHour(now = new Date()): number {
  return Number(toLondonInput(now.toISOString()).slice(11, 13));
}
