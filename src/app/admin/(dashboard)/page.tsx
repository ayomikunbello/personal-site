import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = await createClient();
  const [subs, msgs, unread, pubs] = await Promise.all([
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false),
    supabase.from("publications").select("id", { count: "exact", head: true }),
  ]);
  return {
    subscribers: subs.count ?? 0,
    messages: msgs.count ?? 0,
    unread: unread.count ?? 0,
    publications: pubs.count ?? 0,
  };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const cards = [
    { label: "Subscribers", value: counts.subscribers, href: "/admin/subscribers" },
    { label: "Unread messages", value: counts.unread, href: "/admin/messages" },
    { label: "Total messages", value: counts.messages, href: "/admin/messages" },
    { label: "Publications in DB", value: counts.publications, href: "/admin/publications" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Overview</h1>
      <p className="mt-1 text-sm text-ink/50">Quick snapshot of your site.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-3xl border border-ink/10 bg-white p-6 transition-colors hover:border-violet-300"
          >
            <p className="text-sm text-ink/50">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{card.value}</p>
          </Link>
        ))}
      </div>

      {counts.publications === 0 && (
        <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 text-sm text-violet-800">
          Your publications table is empty, so the public Portfolio page is currently showing
          the built-in fallback list. Add entries under <strong>Publications</strong> to take
          over.
        </div>
      )}
    </div>
  );
}
