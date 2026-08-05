import NewsletterForm from "@/components/NewsletterForm";

export default function Newsletter() {
  return (
    <section className="bg-violet-50/60">
      <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-20">
        <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          Sign up for my newsletter
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink/60">
          If you're in science and/or academia, or simply have an interest, I
          invite you to subscribe. Once a month, I'll share what I'm up to and
          a few things I've learnt.
        </p>
        <div className="mt-8">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
