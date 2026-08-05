"use client";

import { useState } from "react";
import Image from "next/image";
import { about, siteConfig } from "@/lib/data";

const COLLAPSED_COUNT = 2;

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const visibleParagraphs = expanded
    ? about.paragraphs
    : about.paragraphs.slice(0, COLLAPSED_COUNT);
  const hasMore = about.paragraphs.length > COLLAPSED_COUNT;

  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:sticky lg:top-28">
          <div className="absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-to-br from-violet-200 to-fuchsia-200" />
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-lg shadow-violet-950/10">
            <Image
              src={about.image}
              alt={`${siteConfig.name} at graduation`}
              fill
              sizes="(min-width: 1024px) 20rem, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {about.heading}
          </h2>
          <div className="mt-8 space-y-5 text-justify text-[15px] leading-relaxed text-ink/70 sm:text-base">
            {visibleParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {hasMore && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-5 text-sm font-semibold text-violet-700 hover:text-violet-900"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
