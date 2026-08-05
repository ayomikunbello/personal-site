const NAME_PATTERNS = ["Ayomikun Bello", "Bello A.S.", "A. S. Bello", "A. Bello"];

/** Bolds the site owner's name wherever it appears in a citation string. */
export default function HighlightName({ text }: { text: string }) {
  const pattern = new RegExp(`(${NAME_PATTERNS.map((n) => n.replace(/\./g, "\\.")).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        NAME_PATTERNS.includes(part) ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
