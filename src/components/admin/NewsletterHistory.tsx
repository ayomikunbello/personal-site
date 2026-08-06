"use client";

import { useTransition } from "react";
import Link from "next/link";
import { deleteDraft } from "@/app/admin/(dashboard)/newsletter/actions";

type Send = {
  id: string;
  subject: string;
  status: "draft" | "scheduled" | "sent";
  recipient_count: number;
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string;
};

type CampaignStat = { total: number; delivered: number; opened: number; clicked: number };

const statusStyles: Record<Send["status"], string> = {
  draft: "bg-ink/10 text-ink/60",
  scheduled: "bg-amber-100 text-amber-800",
  sent: "bg-green-100 text-green-800",
};

function pct(n: number, total: number) {
  if (total === 0) return "0%";
  return `${Math.round((n / total) * 100)}%`;
}

export default function NewsletterHistory({
  items,
  statsByCampaign,
}: {
  items: Send[];
  statsByCampaign: Record<string, CampaignStat>;
}) {
  const [pending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Delete this draft?")) return;
    startTransition(async () => {
      await deleteDraft(id);
    });
  }

  return (
    <div className="space-y-3">
      {items.map((s) => {
        const stat = statsByCampaign[s.id];
        return (
          <div key={s.id} className="rounded-2xl border border-ink/10 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusStyles[s.status]}`}>
                    {s.status}
                  </span>
                  <p className="truncate font-semibold text-ink">{s.subject || "(no subject)"}</p>
                </div>
                <p className="mt-1 text-xs text-ink/40">
                  {s.status === "sent" && s.sent_at && `Sent ${new Date(s.sent_at).toLocaleString()} to ${s.recipient_count} subscriber(s)`}
                  {s.status === "scheduled" && s.scheduled_at && `Scheduled for ${new Date(s.scheduled_at).toLocaleString()} — ${s.recipient_count} recipient(s)`}
                  {s.status === "draft" && `Last saved ${new Date(s.created_at).toLocaleString()}`}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                {s.status === "draft" && (
                  <>
                    <Link
                      href={`/admin/newsletter?draft=${s.id}`}
                      className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/5"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => handleDelete(s.id)}
                      className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            {s.status === "sent" && stat && (
              <div className="mt-3 flex gap-6 border-t border-ink/5 pt-3 text-xs">
                <div>
                  <span className="font-semibold text-ink">{stat.delivered}</span>{" "}
                  <span className="text-ink/40">delivered</span>
                </div>
                <div>
                  <span className="font-semibold text-green-700">{pct(stat.opened, stat.delivered || stat.total)}</span>{" "}
                  <span className="text-ink/40">opened</span>
                </div>
                <div>
                  <span className="font-semibold text-violet-700">{pct(stat.clicked, stat.delivered || stat.total)}</span>{" "}
                  <span className="text-ink/40">clicked</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
