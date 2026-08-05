"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: once Supabase is wired up, POST to /api/contact
    // (insert into `contact_messages` table, visible later in the admin dashboard).
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <p className="rounded-2xl border border-violet-200 bg-violet-50 px-5 py-4 text-sm text-violet-800">
        Thanks — your message is noted. (Form isn't wired to the database yet — that's next.)
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="w-full rounded-2xl border border-ink/15 bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="w-full rounded-2xl border border-ink/15 bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
        />
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Your comments"
        className="w-full rounded-2xl border border-ink/15 bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
      />
      <button
        type="submit"
        className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-900"
      >
        Send
      </button>
    </form>
  );
}
