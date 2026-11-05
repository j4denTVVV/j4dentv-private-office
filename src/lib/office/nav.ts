export const NAV_GROUPS = [
  { group: "Office", items: [
    { label: "Overview", to: "/hq" },
    { label: "Tasks", to: "/tasks" },
    { label: "Focus Mode", to: "/focus" },
    { label: "Calendar", to: "/calendar" },
  ] },
  { group: "Create", items: [
    { label: "Live Planner", to: "/live" },
    { label: "Live Companion", to: "/companion" },
    { label: "Content Studio", to: "/studio" },
    { label: "Ideas", to: "/ideas" },
    { label: "Collabs", to: "/collabs" },
  ] },
  { group: "Insights", items: [
    { label: "Analytics", to: "/analytics" },
    { label: "Goals", to: "/goals" },
    { label: "Weekly Reviews", to: "/reviews" },
  ] },
  { group: "Library", items: [
    { label: "Archive", to: "/archive" },
    { label: "Website Manager", to: "/website" },
  ] },
  { group: "Resources", items: [
    { label: "Creator Tools", to: "/tools" },
    { label: "Equipment", to: "/equipment" },
  ] },
] as const;

export type OfficePath = (typeof NAV_GROUPS)[number]["items"][number]["to"] | "/settings";

export function titleFor(path: string): string {
  if (path.startsWith("/settings")) return "Settings";
  for (const g of NAV_GROUPS) for (const i of g.items) if (path.startsWith(i.to)) return i.label;
  return "The Private Office";
}

export const QUICK_ADD = [
  { label: "Stream", to: "/live", type: "Stream" },
  { label: "Challenge", to: "/live", type: "Challenge" },
  { label: "Marathon", to: "/live", type: "Marathon" },
  { label: "Subathon", to: "/live", type: "Subathon" },
  { label: "Video", to: "/studio", type: "Video" },
  { label: "Idea", to: "/ideas", type: "Idea" },
  { label: "Goal", to: "/goals", type: "Goal" },
  { label: "Collab", to: "/collabs", type: "Collab" },
  { label: "Task", to: "/tasks", type: "Task" },
] as const;

export const newSearch = (s: Record<string, unknown>): { new?: string | undefined } => ({
  new: typeof s["new"] === "string" ? (s["new"] as string) : undefined,
});

export const OPENING_KEY = "office-opening-played";
