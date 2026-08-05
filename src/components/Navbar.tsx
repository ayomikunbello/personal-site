"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, siteConfig } from "@/lib/data";

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#181121]/95 px-4 py-2.5 shadow-lg shadow-violet-950/20 backdrop-blur">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-bold text-white">
            {siteConfig.monogram}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-white sm:block">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <IconLink href={siteConfig.social.email} label="Email">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconLink>
          <IconLink href={siteConfig.social.linkedin} label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.25h4.5V23H.24V8.25ZM8.25 8.25h4.31v2.01h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.36c0-1.52-.03-3.47-2.11-3.47-2.12 0-2.44 1.66-2.44 3.36V23h-4.5V8.25Z" />
            </svg>
          </IconLink>
          <IconLink href={siteConfig.social.x} label="X (Twitter)">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M18.9 2H22l-7.6 8.7L23.4 22h-7.3l-5.7-6.9L3.8 22H.7l8.1-9.3L.9 2h7.5l5.2 6.3L18.9 2Zm-1.3 18h1.8L7.5 4H5.6l12 16Z" />
            </svg>
          </IconLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 hover:bg-white/10 md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-3xl border border-white/10 bg-[#181121]/95 p-3 shadow-lg backdrop-blur md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 flex items-center gap-2 border-t border-white/10 px-4 pt-3">
            <IconLink href={siteConfig.social.email} label="Email">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconLink>
            <IconLink href={siteConfig.social.linkedin} label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.25h4.5V23H.24V8.25ZM8.25 8.25h4.31v2.01h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.36c0-1.52-.03-3.47-2.11-3.47-2.12 0-2.44 1.66-2.44 3.36V23h-4.5V8.25Z" />
              </svg>
            </IconLink>
            <IconLink href={siteConfig.social.x} label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M18.9 2H22l-7.6 8.7L23.4 22h-7.3l-5.7-6.9L3.8 22H.7l8.1-9.3L.9 2h7.5l5.2 6.3L18.9 2Zm-1.3 18h1.8L7.5 4H5.6l12 16Z" />
              </svg>
            </IconLink>
          </div>
        </div>
      )}
    </header>
  );
}
