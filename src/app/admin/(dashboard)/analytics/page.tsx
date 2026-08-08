import Link from "next/link";
import { getAnalytics } from "@/lib/analyticsQueries";
import ViewsChart from "@/components/admin/ViewsChart";
import RankedBarList from "@/components/admin/RankedBarList";

const RANGES = [
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "90 days", days: 90 },
];

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range } = await searchParams;
  const days = RANGES.some((r) => String(r.days) === range) ? Number(range) : 30;

  const data = await getAnalytics(days);
  const avgPerDay = Math.round((data.totalViews / days) * 10) / 10;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Analytics</h1>
          <p className="mt-1 text-sm text-ink/50">Who&rsquo;s visiting your site, and from where.</p>
        </div>
        <div className="flex gap-1 rounded-full border border-ink/10 bg-white p-1">
          {RANGES.map((r) => (
            <Link
              key={r.days}
              href={`/admin/analytics?range=${r.days}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                days === r.days ? "bg-ink text-white" : "text-ink/60 hover:bg-ink/5"
              }`}
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <p className="text-sm text-ink/50">Total page views</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{data.totalViews}</p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <p className="text-sm text-ink/50">Unique visitors</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{data.uniqueVisitors}</p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <p className="text-sm text-ink/50">Avg. views / day</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{avgPerDay}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-5">
        <h3 className="text-sm font-semibold text-ink">Views over time</h3>
        <div className="mt-4">
          <ViewsChart data={data.byDay} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <RankedBarList title="Top pages" items={data.topPages} />
        <RankedBarList title="Traffic sources" items={data.topReferrers} />
        <RankedBarList title="Countries" items={data.topCountries} />
        <RankedBarList title="Devices" items={data.deviceBreakdown} />
      </div>

      {data.totalViews === 0 && (
        <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-6 text-sm text-violet-800">
          No visits recorded yet for this range. Tracking only counts real visits to the
          live site (not local development), and only public pages — not the admin
          dashboard.
        </div>
      )}
    </div>
  );
}
