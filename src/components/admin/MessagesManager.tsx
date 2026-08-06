"use client";

import { useTransition } from "react";
import { markMessageRead, deleteMessage } from "@/app/admin/(dashboard)/messages/actions";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};

export default function MessagesManager({ messages }: { messages: Message[] }) {
  const [pending, startTransition] = useTransition();

  function toggleRead(id: string, read: boolean) {
    startTransition(async () => {
      await markMessageRead(id, !read);
    });
  }

  function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    startTransition(async () => {
      await deleteMessage(id);
    });
  }

  if (messages.length === 0) {
    return <p className="rounded-3xl border border-ink/10 bg-white p-8 text-center text-ink/40">No messages yet.</p>;
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`rounded-3xl border p-5 ${m.read ? "border-ink/10 bg-white" : "border-violet-200 bg-violet-50/40"}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-ink">
                {m.name} {!m.read && <span className="ml-2 rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">New</span>}
              </p>
              <a href={`mailto:${m.email}`} className="text-sm text-violet-700 hover:text-violet-900">
                {m.email}
              </a>
            </div>
            <p className="text-xs text-ink/40">{new Date(m.created_at).toLocaleString()}</p>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink/80">{m.message}</p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={() => toggleRead(m.id, m.read)}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/5"
            >
              Mark as {m.read ? "unread" : "read"}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => remove(m.id)}
              className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
