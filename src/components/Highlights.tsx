import { highlights } from "@/lib/data";

export default function Highlights() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
          Highlights
        </p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          Recent updates
        </h2>

        <ul className="mt-10 space-y-8">
          {highlights.map((item) => (
            <li key={item.text} className="border-l-2 border-violet-200 pl-6">
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
