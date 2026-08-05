import Link from "next/link";
import { researchInterests } from "@/lib/data";

export default function ResearchInterests() {
  return (
    <section id="research" className="scroll-mt-24 bg-[#181121]">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
          Research
        </p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-white sm:text-4xl">
          {researchInterests.heading}
        </h2>
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-white/70 sm:text-base">
          {researchInterests.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <Link
          href={researchInterests.cta.href}
          className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-violet-100"
        >
          {researchInterests.cta.label}
        </Link>
      </div>
    </section>
  );
}
