import Link from "next/link";
import Image from "next/image";
import { researchInterests, siteConfig } from "@/lib/data";

export default function ResearchInterests() {
  return (
    <section id="research" className="scroll-mt-24 bg-[#181121]">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
        <div>
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

        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:sticky lg:top-28">
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <Image
              src={researchInterests.image}
              alt={`${siteConfig.name} in the lab`}
              fill
              sizes="(min-width: 1024px) 20rem, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
