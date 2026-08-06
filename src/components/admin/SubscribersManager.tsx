"use client";

import { useState, useTransition } from "react";
import { addSubscriber, removeSubscriber } from "@/app/admin/(dashboard)/subscribers/actions";

type Subscriber = { id: string; name: string | null; email: string; subscribed_at: string };

function exportCsv(subscribers: Subscriber[]) {
  const rows = [["Name", "Email", "Subscribed at"], ...subscribers.map((s) => [s.name ?? "", s.email, s.subscribed_at])];
  const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "subscribers.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function SubscribersManager({ subscribers }: { subscribers: Subscriber[] }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  function handleAdd(formData: FormData) {
    startTransition(async () => {
      const res = await addSubscriber(formData);
      setError(res.error);
      if (!res.error) (document.getElementById("add-subscriber-form") as HTMLFormElement)?.reset();
    });
  }

  function handleRemove(id: string) {
    if (!confirm("Remove this subscriber?")) return;
    startTransition(async () => {
      await removeSubscriber(id);
    });
  }

  const filtered = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(query.toLowerCase()) ||
      (s.name ?? "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <form id="add-subscriber-form" action={handleAdd} className="flex flex-wrap gap-3 rounded-3xl border border-ink/10 bg-white p-4">
        <input name="name" placeholder="Name (optional)" className="min-w-40 flex-1 rounded-xl border border-ink/15 px-3 py-2 text-sm outline-none focus:border-violet-400" />
        <input name="email" type="email" required placeholder="Email" className="min-w-52 flex-1 rounded-xl border border-ink/15 px-3 py-2 text-sm outline-none focus:border-violet-400" />
        <button type="submit" disabled={pending} className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white hover:bg-violet-900 disabled:opacity-60">
          Add
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}

      <div className="mt-6 flex items-center justify-between gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search subscribers…"
          className="w-full max-w-xs rounded-xl border border-ink/15 px-3 py-2 text-sm outline-none focus:border-violet-400"
        />
        <button
          type="button"
          onClick={() => exportCsv(subscribers)}
          className="shrink-0 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink hover:bg-ink/5"
        >
          Export CSV
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-3xl border border-ink/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/40">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subscribed</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 text-ink/80">{s.name || "—"}</td>
                <td className="px-4 py-3 text-ink/80">{s.email}</td>
                <td className="px-4 py-3 text-ink/50">{new Date(s.subscribed_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" onClick={() => handleRemove(s.id)} className="text-xs font-semibold text-red-700 hover:text-red-900">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink/40">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
