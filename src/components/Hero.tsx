import Link from "next/link";
import { hero, siteConfig } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center">
        <div className="h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-violet-300/40 via-fuchsia-300/30 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {hero.heading}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            {hero.subheading}
          </p>

          <p className="mt-4 max-w-xl text-sm text-ink/50">
            Currently a{" "}
            <span className="font-medium text-ink/80">{siteConfig.role}</span>{" "}
            at{" "}
            <a
              href={siteConfig.institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-violet-700 underline decoration-violet-300 underline-offset-4 hover:text-violet-800"
            >
              {siteConfig.institution}
            </a>
            , {siteConfig.location}.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={hero.primaryCta.href}
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-900"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-ink/5"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-violet-600 via-violet-700 to-fuchsia-800 shadow-xl shadow-violet-950/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-8xl font-medium text-white/95">
              {siteConfig.monogram}
            </span>
          </div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl border border-white/40 bg-white/70 backdrop-blur sm:h-28 sm:w-28" />
        </div>
      </div>
    </section>
  );
}
