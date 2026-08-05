"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: once Supabase + Resend are wired up, POST to /api/newsletter/subscribe
    // (insert into `subscribers` table, then send a welcome email via Resend).
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <p className="rounded-2xl border border-violet-200 bg-violet-50 px-5 py-4 text-sm text-violet-800">
        Thanks for signing up! (Form isn't wired to a live list yet — that's next.)
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        name="name"
        required
        placeholder="Your name"
        className="w-full rounded-full border border-ink/15 bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        className="w-full rounded-full border border-ink/15 bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-900"
      >
        Sign up
      </button>
    </form>
  );
}
