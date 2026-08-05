import Image from "next/image";
import { highlights } from "@/lib/data";

export default function Highlights() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Featured news
        </h2>

        <ul className="mt-10 space-y-6">
          {highlights.map((item) => (
            <li
              key={item.text}
              className="flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white p-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl sm:aspect-square sm:w-32">
                <Image
                  src={item.image}
                  alt={item.text}
                  fill
                  sizes="(min-width: 640px) 8rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="pb-1 sm:pb-0">
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                  {item.date}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{item.text}</p>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-violet-700 hover:text-violet-900"
                  >
                    Read more →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
