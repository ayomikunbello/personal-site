import Link from "next/link";
import { portfolioStats } from "@/lib/data";

export default function PortfolioStats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-violet-200 via-fuchsia-100 to-paper">
      <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/40 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-40 -z-10 h-56 w-56 rounded-full bg-fuchsia-500/30 blur-3xl" />

      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Portfolio
          </h2>
          <Link
            href="/portfolio"
            className="rounded-full border border-ink/15 bg-white/40 px-5 py-2.5 text-sm font-semibold text-ink backdrop-blur-sm transition-colors hover:border-ink/30 hover:bg-white/70"
          >
            See more
          </Link>
        </div>

        <dl className="mt-10 grid gap-5 sm:grid-cols-3">
          {portfolioStats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              target={stat.href.startsWith("http") ? "_blank" : undefined}
              rel={stat.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-white/70 bg-white/20 p-8 text-center shadow-xl shadow-violet-950/10 backdrop-blur-2xl transition-colors hover:border-white hover:bg-white/35"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent" />
              <span className="pointer-events-none absolute -inset-y-full -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[250%]" />
              <dt className="relative text-sm text-ink/60">{stat.label}</dt>
              <dd className="relative mt-2 text-4xl font-semibold text-ink transition-colors group-hover:text-violet-900">
                {stat.value}
              </dd>
            </Link>
          ))}
        </dl>
      </div>
    </section>
  );
}
