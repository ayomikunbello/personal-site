import { createClient } from "@/lib/supabase/server";
import NewsletterComposer from "@/components/admin/NewsletterComposer";
import NewsletterHistory from "@/components/admin/NewsletterHistory";

export default async function AdminNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ draft?: string }>;
}) {
  const { draft: draftId } = await searchParams;
  const supabase = await createClient();

  const [{ count }, { data: groups }, { data: sends }, { data: recipients }, draftResult] = await Promise.all([
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
    supabase.from("subscriber_groups").select("*").order("name"),
    supabase.from("newsletter_sends").select("*").order("created_at", { ascending: false }),
    supabase.from("newsletter_recipients").select("campaign_id, delivered_at, opened_at, clicked_at"),
    draftId
      ? supabase.from("newsletter_sends").select("*").eq("id", draftId).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const statsByCampaign = new Map<string, { total: number; delivered: number; opened: number; clicked: number }>();
  for (const r of recipients ?? []) {
    const stat = statsByCampaign.get(r.campaign_id) ?? { total: 0, delivered: 0, opened: 0, clicked: 0 };
    stat.total += 1;
    if (r.delivered_at) stat.delivered += 1;
    if (r.opened_at) stat.opened += 1;
    if (r.clicked_at) stat.clicked += 1;
    statsByCampaign.set(r.campaign_id, stat);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Newsletter</h1>
      <p className="mt-1 text-sm text-ink/50">
        Build, preview, test, and send (or schedule) a campaign to your subscribers or a specific group.
      </p>

      <div className="mt-8">
        <NewsletterComposer
          subscriberCount={count ?? 0}
          groups={groups ?? []}
          initialDraft={draftResult.data ?? undefined}
        />
      </div>

      {sends && sends.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-ink">History</h2>
          <div className="mt-4">
            <NewsletterHistory items={sends} statsByCampaign={Object.fromEntries(statsByCampaign)} />
          </div>
        </div>
      )}
    </div>
  );
}
