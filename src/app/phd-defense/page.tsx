import type { Metadata } from "next";
import Image from "next/image";
import DefenseCarousel from "@/components/DefenseCarousel";
import { phdDefense } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ayomikun Bello: PhD Defense",
  description: phdDefense.topic,
};

function DetailRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
        {icon}
      </span>
      <span className="text-sm text-white/90 sm:text-base">{children}</span>
    </div>
  );
}

export default function PhdDefensePage() {
  return (
    <div className="bg-paper">
      {/* Full-bleed hero with overlaid defense details */}
      <div className="relative h-[560px] w-full sm:h-[620px]">
        <Image
          src={phdDefense.heroImage}
          alt={phdDefense.heading}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end gap-8 px-6 py-10 sm:px-12 sm:py-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {phdDefense.heading}
            </h1>
            <p className="mt-4 text-white/85">{phdDefense.topic}</p>
          </div>

          <div className="flex flex-col gap-4">
            <DetailRow
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
                </svg>
              }
            >
              {phdDefense.day} &middot; {phdDefense.date}
            </DetailRow>
            <DetailRow
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            >
              {phdDefense.time}
            </DetailRow>
            <DetailRow
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              }
            >
              <span className="max-w-xs">{phdDefense.venue}</span>
            </DetailRow>
          </div>
        </div>
      </div>

      {/* Defense materials */}
      <div className="bg-violet-50/60 px-6 py-16 text-center sm:py-20">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">Defense materials</h2>
        <p className="mx-auto mt-4 max-w-md text-ink/70">{phdDefense.materialsNote}</p>
        <a
          href={phdDefense.defenseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-900"
        >
          Defense web page
        </a>
      </div>

      {/* Gallery carousel */}
      <div className="py-16 sm:py-20">
        <DefenseCarousel images={phdDefense.gallery} alt="PhD defense" />
      </div>
    </div>
  );
}
