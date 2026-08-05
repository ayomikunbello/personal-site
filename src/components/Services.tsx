import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section className="bg-violet-50/60">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          How can I help you?
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white sm:flex-row"
            >
              <div className="relative aspect-[16/9] w-full shrink-0 sm:aspect-auto sm:w-2/5 lg:w-1/3">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 18rem, (min-width: 640px) 24rem, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{service.lede}</p>
                <ul className="mt-5 space-y-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#contact"
                  className="mt-7 inline-flex w-fit rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-900"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
