import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { lux } from "@/components/ui/lux-button";
import { tasksQuery } from "@/lib/office/queries";
import { PageHead, SectionTitle, Stagger } from "@/components/office/ui";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/hq")({
  loader: ({ context }) => context.queryClient.ensureQueryData(tasksQuery),
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
  const { data: tasks } = useSuspenseQuery(tasksQuery);
  const open = tasks.filter(t => t.status !== "done");
  return (
    <>
      <PageHead label="J4denTV / Overview" title="Room to create." aside={<Link to="/tasks" search={{ new: "Task" }} className={lux({ size: "sm" })}>New task <ArrowUpRight className="h-4 w-4" /></Link>} />
      <div className="grid gap-12 py-12 lg:grid-cols-[1fr_2fr]">
        <Stagger><p className="olabel">On your desk</p><p className="mt-6 font-serif text-8xl text-champagne">{open.length}</p><p className="mt-3 text-sm text-muted-foreground">Open tasks</p><p className="mt-8 border-t border-line pt-5 text-sm text-subtle">{tasks.filter(t => t.status === "done").length} completed</p></Stagger>
        <Stagger i={1}><SectionTitle action={<Link to="/tasks" search={{}} className="link-draw text-xs">View all</Link>}>The next few things.</SectionTitle>
          {open.length ? open.slice(0, 5).map(t => <Link key={t.id} to="/tasks" search={{}} className="flex items-center justify-between gap-4 border-t border-line py-5"><span className="break-words text-lg">{t.title}</span><ArrowUpRight className="h-4 w-4 shrink-0 text-subtle" /></Link>) : <p className="border-t border-line py-8 font-serif text-2xl italic text-muted-foreground">Nothing waiting. Start with one idea.</p>}
        </Stagger>
      </div>
    </>
  );
}
