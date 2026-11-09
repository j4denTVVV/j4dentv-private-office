import { queryOptions, type QueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { TName, Row } from './data';
export const STAGES = ['idea','planned','recording','editing','review','ready','scheduled','published'] as const;
export const ROAD_TO_1K = { title: 'Road to 1K', target: 1000, deadline: '2026-12-31', platform: 'Twitch' };
export const INTRO_PENDING = 'office-intro-pending';
export function shouldPlayIntro(pending: boolean, enabled: boolean, reduced: boolean) { return pending && enabled && !reduced; }
export function rowsQuery<T extends TName>(table: T) {
 return queryOptions({ queryKey: [table], queryFn: async (): Promise<Row<T>[]> => {
  const { data,error } = await supabase.from(table).select('*');
  if(error) throw error; return (data ?? []) as unknown as Row<T>[];
 }});
}
export const overviewTables = ['tasks','streams','content_projects','ideas','collabs','events','goals','activity'] as const;
export async function loadOverview(qc: QueryClient) { await Promise.all(overviewTables.map(t=>qc.ensureQueryData(rowsQuery(t)))); }
export function officeHead(title: string) { const full = `${title} — J4denTV Private Office`; const desc = `J4denTV's private ${title.toLowerCase()} workspace.`; return {meta:[{title:full},{name:'description',content:desc},{name:'robots',content:'noindex, nofollow'},{property:'og:title',content:full},{property:'og:description',content:desc},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}; }
