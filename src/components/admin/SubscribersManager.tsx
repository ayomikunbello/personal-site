"use client";

import { useState, useTransition } from "react";
import {
  addSubscriber,
  removeSubscriber,
  createGroup,
  deleteGroup,
  setSubscriberGroup,
} from "@/app/admin/(dashboard)/subscribers/actions";

type Group = { id: string; name: string };
type Subscriber = {
  id: string;
  name: string | null;
  email: string;
  subscribed_at: string;
  groupIds: string[];
};

function exportCsv(subscribers: Subscriber[], groups: Group[]) {
  const groupName = (id: string) => groups.find((g) => g.id === id)?.name ?? "";
  const rows = [
    ["Name", "Email", "Subscribed at", "Groups"],
    ...subscribers.map((s) => [s.name ?? "", s.email, s.subscribed_at, s.groupIds.map(groupName).join("; ")]),
  ];
  const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "subscribers.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function GroupsBar({ groups, pending }: { groups: Group[]; pending: boolean }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function handleAdd(formData: FormData) {
    startTransition(async () => {
      const res = await createGroup(formData);
      if (res.error) setError(res.error);
      else {
        setError(null);
        setOpen(false);
        (document.getElementById("add-group-form") as HTMLFormElement)?.reset();
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this group? Subscribers stay, they just lose this tag.")) return;
    startTransition(async () => {
      await deleteGroup(id);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-3xl border border-ink/10 bg-white p-4">
      <span className="text-sm font-medium text-ink/50">Groups:</span>
      {groups.map((g) => (
        <span key={g.id} className="flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-800">
          {g.name}
          <button type="button" disabled={pending} onClick={() => handleDelete(g.id)} className="text-violet-500 hover:text-red-600">
            ×
          </button>
        </span>
      ))}
      {open ? (
        <form id="add-group-form" action={handleAdd} className="flex items-center gap-2">
          <input name="name" autoFocus required placeholder="Group name" className="rounded-full border border-ink/15 px-3 py-1 text-xs outline-none focus:border-violet-400" />
          <button type="submit" className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white hover:bg-violet-900">
            Add
          </button>
          <button type="button" onClick={() => setOpen(false)} className="text-xs text-ink/40 hover:text-ink">
            Cancel
          </button>
        </form>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="rounded-full border border-dashed border-ink/25 px-3 py-1 text-xs font-medium text-ink/50 hover:border-violet-400 hover:text-violet-700">
          + New group
        </button>
      )}
      {error && <span className="text-xs text-red-700">{error}</span>}
    </div>
  );
}

function GroupPicker({ subscriber, groups, pending }: { subscriber: Subscriber; groups: Group[]; pending: boolean }) {
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  function toggle(groupId: string, inGroup: boolean) {
    startTransition(async () => {
      await setSubscriberGroup(subscriber.id, groupId, !inGroup);
    });
  }

  if (groups.length === 0) return <span className="text-xs text-ink/30">—</span>;

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex flex-wrap gap-1">
        {subscriber.groupIds.length === 0 ? (
          <span className="rounded-full border border-dashed border-ink/20 px-2 py-0.5 text-[11px] text-ink/40">+ tag</span>
        ) : (
          subscriber.groupIds.map((id) => (
            <span key={id} className="rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-medium text-violet-800">
              {groups.find((g) => g.id === id)?.name}
            </span>
          ))
        )}
      </button>
      {open && (
        <div className="absolute left-0 top-full z-10 mt-1 w-40 rounded-xl border border-ink/10 bg-white p-2 shadow-lg">
          {groups.map((g) => {
            const inGroup = subscriber.groupIds.includes(g.id);
            return (
              <label key={g.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs hover:bg-ink/5">
                <input type="checkbox" checked={inGroup} disabled={pending} onChange={() => toggle(g.id, inGroup)} className="h-3.5 w-3.5" />
                {g.name}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SubscribersManager({ subscribers, groups }: { subscribers: Subscriber[]; groups: Group[] }) {
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
    <div className="space-y-4">
      <GroupsBar groups={groups} pending={pending} />

      <form id="add-subscriber-form" action={handleAdd} className="flex flex-wrap gap-3 rounded-3xl border border-ink/10 bg-white p-4">
        <input name="name" placeholder="Name (optional)" className="min-w-40 flex-1 rounded-xl border border-ink/15 px-3 py-2 text-sm outline-none focus:border-violet-400" />
        <input name="email" type="email" required placeholder="Email" className="min-w-52 flex-1 rounded-xl border border-ink/15 px-3 py-2 text-sm outline-none focus:border-violet-400" />
        <button type="submit" disabled={pending} className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white hover:bg-violet-900 disabled:opacity-60">
          Add
        </button>
      </form>
      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="flex items-center justify-between gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search subscribers…"
          className="w-full max-w-xs rounded-xl border border-ink/15 px-3 py-2 text-sm outline-none focus:border-violet-400"
        />
        <button
          type="button"
          onClick={() => exportCsv(subscribers, groups)}
          className="shrink-0 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink hover:bg-ink/5"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/40">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Groups</th>
              <th className="px-4 py-3">Subscribed</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 text-ink/80">{s.name || "—"}</td>
                <td className="px-4 py-3 text-ink/80">{s.email}</td>
                <td className="px-4 py-3">
                  <GroupPicker subscriber={s} groups={groups} pending={pending} />
                </td>
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
                <td colSpan={5} className="px-4 py-8 text-center text-ink/40">
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
