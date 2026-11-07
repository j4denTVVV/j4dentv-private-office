import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Check, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { tasksQuery } from "@/lib/office/queries";
import { useTable, type Row } from "@/lib/office/data";
import { PageHead, Stagger } from "./ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { fmtDate } from "@/lib/office/time";

export function Tasks({ create = false, clearCreate }: { create?: boolean; clearCreate: () => void }) {
  const { data: tasks } = useSuspenseQuery(tasksQuery);
  const table = useTable("tasks");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row<"tasks"> | null>(null);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("open");
  const [search, setSearch] = useState("");
  function edit(task: Row<"tasks"> | null) {
    setEditing(task); setTitle(task?.title ?? ""); setDue(task?.due_date ?? ""); setPriority(task?.priority ?? "medium"); setOpen(true);
  }
  useEffect(() => { if (create) { edit(null); clearCreate(); } }, [create]);
  const rows = tasks.filter(t => (filter === "all" || (filter === "done" ? t.status === "done" : t.status !== "done")) && t.title.toLowerCase().includes(search.toLowerCase()));
  async function save(e: React.FormEvent) {
    e.preventDefault(); if (!title.trim()) return;
    const values = { title: title.trim(), due_date: due || null, priority };
    try {
      if (editing) await table.update.mutateAsync({ id: editing.id, ...values });
      else await table.insert.mutateAsync(values);
      setOpen(false);
    } catch { /* Mutation shows the error and keeps the form open. */ }
  }
  return <>
    <PageHead label="Office / Tasks" title="A little more focused." aside={<Button onClick={() => edit(null)}><Plus /> New task</Button>} />
    <div className="my-8 flex flex-col justify-between gap-4 sm:flex-row">
      <div className="flex gap-1" role="group" aria-label="Task filter">{["open", "done", "all"].map(f => <Button key={f} variant={filter === f ? "secondary" : "ghost"} aria-pressed={filter === f} onClick={() => setFilter(f)} className="capitalize">{f === "done" ? "Completed" : f}</Button>)}</div>
      <label className="relative sm:w-72"><Search className="absolute left-3 top-3 h-4 w-4 text-subtle" /><input aria-label="Search tasks" placeholder="Search tasks" className="oi h-10 pl-10" value={search} onChange={e => setSearch(e.target.value)} /></label>
    </div>
    {rows.length === 0 ? <p className="border-t border-line py-12 font-serif text-3xl italic text-muted-foreground">{tasks.length === 0 ? "A clear desk. A fresh start." : "No tasks here."}</p> : rows.map((task, i) => <Stagger key={task.id} i={Math.min(i, 5)} className="flex items-center gap-3 border-t border-line py-5 sm:gap-5">
      <Button variant="outline" size="icon" aria-label={task.status === "done" ? `Reopen ${task.title}` : `Complete ${task.title}`} title={task.status === "done" ? "Reopen task" : "Complete task"} disabled={table.update.isPending} onClick={() => table.update.mutate({ id: task.id, status: task.status === "done" ? "todo" : "done", completed_at: task.status === "done" ? null : new Date().toISOString() })}>{task.status === "done" && <Check />}</Button>
      <div className="min-w-0 flex-1"><p className={`break-words text-lg ${task.status === "done" ? "text-subtle line-through" : "text-foreground"}`}>{task.title}</p><p className="mt-1 text-xs capitalize text-muted-foreground">{task.priority}{task.due_date ? ` · ${fmtDate(task.due_date, { day: "numeric", month: "short" })}` : ""}</p></div>
      <Button variant="ghost" size="icon" title="Edit task" aria-label={`Edit ${task.title}`} onClick={() => edit(task)}><Pencil /></Button>
    </Stagger>)}
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="office"><DialogHeader><DialogTitle className="font-serif text-3xl">{editing ? "Edit task" : "New task"}</DialogTitle></DialogHeader>
      <form onSubmit={save} className="space-y-5">
        <label className="block text-sm">Title<input className="oi mt-2 h-11" required autoFocus value={title} onChange={e => setTitle(e.target.value)} /></label>
        <div className="grid grid-cols-2 gap-4"><label className="block text-sm">Due date<input type="date" className="oi mt-2 h-11" value={due} onChange={e => setDue(e.target.value)} /></label><label className="block text-sm">Priority<select className="oi mt-2 h-11" value={priority} onChange={e => setPriority(e.target.value)}>{["low", "medium", "high"].map(p => <option key={p} value={p}>{p}</option>)}</select></label></div>
        <DialogFooter className="gap-2">
          {editing && <Button type="button" variant="ghost" className="mr-auto text-destructive" disabled={table.remove.isPending} onClick={async () => { if (window.confirm("Delete this task?")) { try { await table.remove.mutateAsync(editing.id); setOpen(false); } catch {} } }}><Trash2 /> Delete</Button>}
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit" disabled={!title.trim() || table.insert.isPending || table.update.isPending}>Save task</Button>
        </DialogFooter>
      </form>
    </DialogContent></Dialog>
  </>;
}