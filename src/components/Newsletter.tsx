import NewsletterForm from "@/components/NewsletterForm";
import { newsletter } from "@/lib/data";

export default function Newsletter() {
  return (
    <section className="bg-violet-50/60">
      <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {newsletter.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink/60">
          {newsletter.body}
        </p>
        <div className="mt-8">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
