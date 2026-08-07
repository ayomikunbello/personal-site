// Matches the inline links the original site had in the About Me section.
const LINKS: { term: string; href: string }[] = [
  { term: "Eco Energy LLC", href: "http://ecoenergy-global.tilda.ws/en" },
  {
    term: "Nigeria-Russia Bilateral Education Agreement scholarship",
    href: "https://education.gov.ng/fsb/",
  },
  {
    term: "Kazan National Research Technological University",
    href: "https://www.kstu.ru/knrtu/index_en.jsp",
  },
  { term: "Skoltech", href: "https://www.skoltech.ru" },
  { term: "Japaguys", href: "http://japaguys.com" },
];

// Longest term first, so "Kazan National Research Technological University"
// matches before any shorter substring inside it would.
const pattern = new RegExp(
  `(${LINKS.map((l) => l.term).sort((a, b) => b.length - a.length).join("|")})`,
  "g"
);
const hrefByTerm = new Map(LINKS.map((l) => [l.term, l.href]));

export default function AboutParagraph({ text, className }: { text: string; className?: string }) {
  const parts = text.split(pattern);

  return (
    <p className={className}>
      {parts.map((part, i) => {
        const href = hrefByTerm.get(part);
        return href ? (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-violet-700 underline decoration-violet-300 underline-offset-2 hover:text-violet-900"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </p>
  );
}
