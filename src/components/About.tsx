"use client";

import { useState } from "react";
import Image from "next/image";
import AboutParagraph from "@/components/AboutParagraph";
import { about, siteConfig } from "@/lib/data";

export default function About({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const [firstParagraph, ...restParagraphs] = paragraphs;

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
          <div className="mt-8 text-justify text-[15px] leading-relaxed text-ink/70 sm:text-base">
            <AboutParagraph text={firstParagraph} />

            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="space-y-5 overflow-hidden">
                <div className="pt-5">
                  {restParagraphs.map((paragraph, i) => (
                    <AboutParagraph key={i} text={paragraph} className="mb-5 last:mb-0" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 transition-colors hover:border-violet-300 hover:bg-violet-100"
          >
            {expanded ? "Read less" : "Read more"}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
