import Link from "next/link";
import Image from "next/image";
import { hero, siteConfig } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center">
        <div className="h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-violet-300/40 via-fuchsia-300/30 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Hello, I&rsquo;m Ayo, a {siteConfig.role} at{" "}
            <a
              href={siteConfig.institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-700 underline decoration-violet-300 underline-offset-4 hover:text-violet-800"
            >
              {siteConfig.institution} in {siteConfig.location}
            </a>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
            {hero.subheading}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={hero.primaryCta.href}
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-900"
            >
              {hero.primaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
          <div className="absolute -inset-2 -z-10 rounded-[2.5rem] bg-gradient-to-br from-violet-400 via-fuchsia-400 to-violet-600 opacity-60 blur-xl" />
          <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-xl shadow-violet-950/20">
            <Image
              src={hero.image}
              alt={siteConfig.name}
              fill
              sizes="(min-width: 1024px) 24rem, 90vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl border border-white/40 bg-white/70 backdrop-blur sm:h-28 sm:w-28" />
        </div>
      </div>
    </section>
  );
}
