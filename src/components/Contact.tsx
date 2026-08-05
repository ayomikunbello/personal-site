import ContactForm from "@/components/ContactForm";
import { contact, siteConfig } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          {contact.heading}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink/60">
          {contact.body}
        </p>

        <div className="mt-8">
          <ContactForm />
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-6 text-sm text-ink/50">
          {siteConfig.emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className="hover:text-violet-700">
              {email}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
