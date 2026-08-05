import Link from "next/link";
import { portfolioStats } from "@/lib/data";

export default function PortfolioStats() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
            Portfolio
          </h2>
          <Link
            href="/portfolio"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-ink/5"
          >
            See more
          </Link>
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {portfolioStats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              target={stat.href.startsWith("http") ? "_blank" : undefined}
              rel={stat.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group rounded-3xl border border-ink/10 bg-white p-7 transition-colors hover:border-violet-300 hover:bg-violet-50/50"
            >
              <dt className="text-sm text-ink/50">{stat.label}</dt>
              <dd className="mt-2 font-serif text-4xl text-ink transition-colors group-hover:text-violet-800">
                {stat.value}
              </dd>
            </Link>
          ))}
        </dl>
      </div>
    </section>
  );
}
