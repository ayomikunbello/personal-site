import Image from "next/image";
import { highlights } from "@/lib/data";

export default function Highlights() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Featured news
        </h2>

        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {highlights.map((item) => (
            <li
              key={item.text}
              className="flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white"
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.text}
                  fill
                  sizes="(min-width: 640px) 20rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
                  {item.date}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{item.text}</p>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-violet-700 hover:text-violet-900"
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
