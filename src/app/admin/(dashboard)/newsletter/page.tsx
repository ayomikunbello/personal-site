import { createClient } from "@/lib/supabase/server";
import NewsletterComposer from "@/components/admin/NewsletterComposer";

export default async function AdminNewsletterPage() {
  const supabase = await createClient();
  const [{ count }, { data: sends }] = await Promise.all([
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
    supabase.from("newsletter_sends").select("*").order("sent_at", { ascending: false }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Newsletter</h1>
      <p className="mt-1 text-sm text-ink/50">
        Compose and send an email to everyone on your subscriber list.
      </p>

      <div className="mt-8">
        <NewsletterComposer subscriberCount={count ?? 0} />
      </div>

      {sends && sends.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-ink">Send history</h2>
          <div className="mt-4 space-y-3">
            {sends.map((s) => (
              <div key={s.id} className="rounded-2xl border border-ink/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-ink">{s.subject}</p>
                  <p className="text-xs text-ink/40">{new Date(s.sent_at).toLocaleString()}</p>
                </div>
                <p className="mt-1 text-xs text-ink/50">Sent to {s.recipient_count} subscriber(s)</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
