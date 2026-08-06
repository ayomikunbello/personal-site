"use client";

import { useState, useTransition } from "react";
import { subscribeNewsletter } from "@/app/actions/public";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await subscribeNewsletter(formData);
      if (res.error) setError(res.error);
      else setStatus("submitted");
    });
  }

  if (status === "submitted") {
    return (
      <p className="rounded-2xl border border-violet-200 bg-violet-50 px-5 py-4 text-sm text-violet-800">
        Thanks for signing up! Check your inbox for a welcome email.
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
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
        disabled={pending}
        className="shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-900 disabled:opacity-60"
      >
        {pending ? "Signing up…" : "Sign up"}
      </button>
      {error && <p className="text-sm text-red-700 sm:basis-full">{error}</p>}
    </form>
  );
}
