import { about } from "@/lib/data";

export default function About() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          {about.heading}
        </h2>
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink/70 sm:text-base">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
