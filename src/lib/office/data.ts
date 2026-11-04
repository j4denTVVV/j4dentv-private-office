import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
export type TName = keyof Tables;
export type Row<T extends TName> = Tables[T]["Row"];
export type Ins<T extends TName> = Tables[T]["Insert"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = supabase as any;

export function useRows<T extends TName>(table: T, order = "created_at", asc = false) {
  return useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await db.from(table).select("*").order(order, { ascending: asc });
      if (error) throw error;
      return (data ?? []) as Row<T>[];
    },
  });
}

const fail = (e: unknown) => toast.error((e as { message?: string })?.message ?? "Something went wrong");

export function useTable<T extends TName>(table: T, extraKeys: string[] = []) {
  const qc = useQueryClient();
  const done = () => {
    for (const k of [table, "activity", ...extraKeys]) qc.invalidateQueries({ queryKey: [k] });
  };
  const insert = useMutation({
    mutationFn: async (v: Ins<T> | Ins<T>[]) => {
      const { data, error } = await db.from(table).insert(v).select();
      if (error) throw error;
      return data as Row<T>[];
    },
    onSuccess: done,
    onError: fail,
  });
  const update = useMutation({
    mutationFn: async ({ id, ...v }: Partial<Row<T>> & { id: string }) => {
      const { error } = await db.from(table).update(v).eq("id", id);
      if (error) throw error;
    },
    onSuccess: done,
    onError: fail,
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: done,
    onError: fail,
  });
  return { insert, update, remove };
}

export const openSearch = (s: Record<string, unknown>): { open?: string } => ({
  open: typeof s.open === "string" ? s.open : undefined,
});
