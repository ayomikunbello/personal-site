"use client";

import { useState, useTransition } from "react";
import { submitContact } from "@/app/actions/public";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await submitContact(formData);
      if (res.error) setError(res.error);
      else setStatus("submitted");
    });
  }

  if (status === "submitted") {
    return (
      <p className="rounded-2xl border border-violet-200 bg-violet-50 px-5 py-4 text-sm text-violet-800">
        Thanks, your message is noted. I&rsquo;ll respond as soon as I can.
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
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
        disabled={pending}
        className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-900 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send"}
      </button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  );
}
