import { createClient } from "@/lib/supabase/server";

export async function recordPageView(path: string, referrer: string | null): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("page_views").insert({ path, referrer });
  if (error) throw error;
}

export type TopPage = { path: string; count: number };

export async function getTopPages(limit = 10): Promise<TopPage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("page_views").select("path");
  if (error) throw error;

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    counts.set(row.path, (counts.get(row.path) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function getPageViewCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}
