"use client";

import { useState, useTransition } from "react";
import { sendNewsletter } from "@/app/admin/(dashboard)/newsletter/actions";

export default function NewsletterComposer({ subscriberCount }: { subscriberCount: number }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    const subject = String(formData.get("subject") ?? "");
    if (!confirm(`Send "${subject}" to ${subscriberCount} subscriber(s)?`)) return;

    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const res = await sendNewsletter(formData);
      if (res.error) setError(res.error);
      else {
        setSuccess(`Sent to ${res.count} subscriber(s).`);
        (document.getElementById("newsletter-form") as HTMLFormElement)?.reset();
      }
    });
  }

  return (
    <form id="newsletter-form" action={handleSubmit} className="rounded-3xl border border-ink/10 bg-white p-6">
      <div>
        <label className="text-sm font-medium text-ink/70" htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-violet-400"
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-ink/70" htmlFor="body">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={12}
          className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm leading-relaxed text-ink outline-none focus:border-violet-400"
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      {success && <p className="mt-4 text-sm text-green-700">{success}</p>}

      <button
        type="submit"
        disabled={pending || subscriberCount === 0}
        className="mt-5 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-900 disabled:opacity-60"
      >
        {pending ? "Sending…" : `Send to ${subscriberCount} subscriber(s)`}
      </button>
    </form>
  );
}
