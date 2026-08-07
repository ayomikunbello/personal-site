"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { subscribeNewsletter } from "@/app/actions/public";
import { newsletter, siteConfig } from "@/lib/data";

const DISMISS_KEY = "newsletter-popup-dismissed";
const SHOW_DELAY_MS = 6000;

export default function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isAdminRoute]);

  function close() {
    setOpen(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  }

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await subscribeNewsletter(formData);
      if (res.error) setError(res.error);
      else {
        setStatus("submitted");
        sessionStorage.setItem(DISMISS_KEY, "1");
      }
    });
  }

  if (!open || isAdminRoute) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
      onClick={close}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="relative bg-[#b19cea] px-8 py-8">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-ink/70 hover:bg-black/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
          <Image src={siteConfig.logo} alt={siteConfig.name} width={180} height={62} className="h-14 w-auto" />
        </div>

        <div className="px-8 py-8">
          {status === "submitted" ? (
            <>
              <h2 className="text-2xl font-semibold text-ink">You&rsquo;re subscribed 🎉</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Thanks for signing up! Check your inbox for a welcome email.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-ink">{newsletter.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">{newsletter.body}</p>

              <form action={handleSubmit} className="mt-6 space-y-3">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-transparent bg-ink/5 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-violet-400 focus:bg-white focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full rounded-xl border border-transparent bg-ink/5 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-violet-400 focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {pending ? "Signing up…" : "Sign up"}
                </button>
                {error && <p className="text-sm text-red-700">{error}</p>}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
