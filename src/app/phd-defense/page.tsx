import type { Metadata } from "next";
import Image from "next/image";
import Gallery from "@/components/Gallery";
import { phdDefense } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ayomikun Bello: PhD Defense",
  description: phdDefense.topic,
};

export default function PhdDefensePage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-lg shadow-violet-950/10">
          <Image
            src={phdDefense.heroImage}
            alt={phdDefense.heading}
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mx-auto max-w-2xl">
          <h1 className="mt-10 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {phdDefense.heading}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-ink/80">{phdDefense.topic}</p>

          <div className="mt-10 space-y-6 rounded-3xl border border-ink/10 bg-white p-8">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-ink/50">{phdDefense.day}</p>
                <p className="font-semibold text-ink">
                  {phdDefense.date} &middot; {phdDefense.time}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <p className="text-ink/70">{phdDefense.venue}</p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-ink">Defense materials</h2>
            <p className="mt-3 text-ink/70">{phdDefense.materialsNote}</p>
            <a
              href={phdDefense.defenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-900"
            >
              Defense web page
            </a>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-semibold text-ink">Gallery</h2>
          <div className="mt-6">
            <Gallery images={phdDefense.gallery} alt="PhD defense" />
          </div>
        </div>
      </div>
    </div>
  );
}
