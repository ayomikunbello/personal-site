"use client";

import { useState } from "react";
import Image from "next/image";

const SLIDE_WIDTH = 68; // percent of container width

export default function DefenseCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  const go = (next: number) => {
    setIndex((next + images.length) % images.length);
  };

  const offset = (100 - SLIDE_WIDTH) / 2;
  const translate = `calc(-${index} * (${SLIDE_WIDTH}% + 1rem) + ${offset}%)`;

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <div
          className="flex items-center gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${translate})` }}
        >
          {images.map((src, i) => {
            const active = i === index;
            return (
              <button
                key={src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show photo ${i + 1}`}
                style={{ width: `${SLIDE_WIDTH}%` }}
                className={`relative aspect-[16/9] shrink-0 overflow-hidden rounded-3xl transition-all duration-500 ${
                  active ? "opacity-100" : "opacity-40 scale-95"
                }`}
              >
                <Image
                  src={src}
                  alt={`${alt} ${i + 1}`}
                  fill
                  sizes="70vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition-colors hover:bg-white sm:left-6"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition-colors hover:bg-white sm:right-6"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-violet-600" : "w-2 bg-ink/20 hover:bg-ink/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
