import Link from "next/link";
import Image from "next/image";
import { nav, siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#181121] text-white/70">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center">
              <span className="flex h-10 items-center rounded-xl bg-white px-2.5 py-1.5">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  width={140}
                  height={48}
                  className="h-7 w-auto object-contain"
                />
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {siteConfig.role} at {siteConfig.institution}, {siteConfig.location}.
              Researching microfluidics, interfacial science, and enhanced oil
              recovery.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Site
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.25h4.5V23H.24V8.25ZM8.25 8.25h4.31v2.01h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.36c0-1.52-.03-3.47-2.11-3.47-2.12 0-2.44 1.66-2.44 3.36V23h-4.5V8.25Z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M18.9 2H22l-7.6 8.7L23.4 22h-7.3l-5.7-6.9L3.8 22H.7l8.1-9.3L.9 2h7.5l5.2 6.3L18.9 2Zm-1.3 18h1.8L7.5 4H5.6l12 16Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Built with Next.js, deployed on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
