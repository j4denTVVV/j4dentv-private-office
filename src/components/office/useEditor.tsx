import { useCallback, useState } from "react";
import { useTable, type TName } from "@/lib/office/data";
import { RecordDialog, type Field } from "./ui";

/** Shared create/edit drawer for one table. */
export function useEditor<T extends TName>(table: T, fields: Field[], noun: string, defaults: Record<string, unknown> = {}) {
  const { insert, update, remove } = useTable(table);
  const [state, setState] = useState<{ open: boolean; row?: Record<string, unknown> }>({ open: false });
  const create = useCallback((extra: Record<string, unknown> = {}) => setState({ open: true, row: { ...defaults, ...extra } }), [defaults]);
  const edit = useCallback((row: Record<string, unknown>) => setState({ open: true, row }), []);
  const close = useCallback(() => setState({ open: false }), []);
  const id = state.row?.["id"] as string | undefined;
  const dialog = (
    <RecordDialog
      open={state.open}
      onClose={close}
      title={id ? `Edit ${noun}` : `New ${noun}`}
      fields={fields}
      initial={state.row}
      busy={insert.isPending || update.isPending}
      onDelete={id ? async () => { if (confirm(`Delete this ${noun}?`)) { await remove.mutateAsync(id); close(); } } : undefined}
      onSubmit={async (v) => {
        if (id) await update.mutateAsync({ id, ...v } as never);
        else await insert.mutateAsync({ ...defaults, ...v } as never);
        close();
      }}
    />
  );
  return { create, edit, dialog, update, insert, remove };
}
