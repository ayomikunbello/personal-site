import { createClient } from "@/lib/supabase/server";

type RawView = {
  path: string;
  referrer_domain: string | null;
  country: string | null;
  city: string | null;
  device: string | null;
  visitor_hash: string;
  created_at: string;
};

export type AnalyticsSummary = {
  totalViews: number;
  uniqueVisitors: number;
  byDay: { date: string; views: number }[];
  topPages: { label: string; count: number }[];
  topReferrers: { label: string; count: number }[];
  topCountries: { label: string; count: number }[];
  deviceBreakdown: { label: string; count: number }[];
};

function topN(rows: RawView[], key: keyof RawView, limit: number, fallbackLabel: string) {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const raw = row[key] as string | null;
    const label = raw || fallbackLabel;
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function getAnalytics(days: number): Promise<AnalyticsSummary> {
  const supabase = await createClient();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data } = await supabase
    .from("page_views")
    .select("path, referrer_domain, country, city, device, visitor_hash, created_at")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: true });

  const rows = (data ?? []) as RawView[];

  const byDayMap = new Map<string, number>();
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    byDayMap.set(d.toISOString().slice(0, 10), 0);
  }
  for (const row of rows) {
    const day = row.created_at.slice(0, 10);
    if (byDayMap.has(day)) byDayMap.set(day, (byDayMap.get(day) ?? 0) + 1);
  }

  return {
    totalViews: rows.length,
    uniqueVisitors: new Set(rows.map((r) => r.visitor_hash)).size,
    byDay: [...byDayMap.entries()].map(([date, views]) => ({ date, views })),
    topPages: topN(rows, "path", 8, "/"),
    topReferrers: topN(rows, "referrer_domain", 8, "Direct"),
    topCountries: topN(rows, "country", 8, "Unknown"),
    deviceBreakdown: topN(rows, "device", 4, "Unknown"),
  };
}
