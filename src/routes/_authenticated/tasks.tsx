import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { tasksQuery } from "@/lib/office/queries";
import { Tasks } from "@/components/office/Tasks";
import { newSearch } from "@/lib/office/nav";

export const Route = createFileRoute("/_authenticated/tasks")({
  validateSearch: newSearch,
  loader: ({ context }) => context.queryClient.ensureQueryData(tasksQuery),
  head: () => ({ meta: [
    { title: "Tasks — J4denTV Private Office" },
    { name: "description", content: "J4denTV's private task workspace." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: "Tasks — J4denTV Private Office" },
    { property: "og:description", content: "Private planning and tasks." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: TasksPage,
});
function TasksPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  return <Tasks create={!!search.new} clearCreate={() => navigate({ to: "/tasks", search: {}, replace: true })} />;
}