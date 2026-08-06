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

  const [{ count }, { data: sends }, draftResult] = await Promise.all([
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
    supabase.from("newsletter_sends").select("*").order("created_at", { ascending: false }),
    draftId
      ? supabase.from("newsletter_sends").select("*").eq("id", draftId).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Newsletter</h1>
      <p className="mt-1 text-sm text-ink/50">
        Compose, preview, test, and send (or schedule) an email to your subscriber list.
      </p>

      <div className="mt-8">
        <NewsletterComposer subscriberCount={count ?? 0} initialDraft={draftResult.data ?? undefined} />
      </div>

      {sends && sends.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-ink">History</h2>
          <div className="mt-4">
            <NewsletterHistory items={sends} />
          </div>
        </div>
      )}
    </div>
  );
}
