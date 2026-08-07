import type { Metadata } from "next";
import AccordionSection from "@/components/AccordionSection";
import HighlightName from "@/components/HighlightName";
import { getPublications } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Ayomikun Bello: Portfolio",
  description: "Journal publications, conference proceedings, and research projects.",
};

export default async function PortfolioPage() {
  const [journalPublications, conferenceProceedings, researchProjects] = await Promise.all([
    getPublications("journal"),
    getPublications("conference"),
    getPublications("project"),
  ]);

  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Portfolio</h1>

        <div className="mt-8">
          <AccordionSection title="Journal Publications" count={journalPublications.length}>
            <ul className="space-y-5">
              {journalPublications.map((pub) => (
                <li key={pub.id} className="text-[15px] leading-relaxed text-ink/70">
                  <HighlightName text={pub.text} />
                  {pub.href && (
                    <>
                      {" "}
                      <a
                        href={pub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-violet-700 hover:text-violet-900"
                      >
                        View →
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </AccordionSection>

          <AccordionSection title="Conference Proceedings" count={conferenceProceedings.length}>
            <ul className="space-y-5">
              {conferenceProceedings.map((pub) => (
                <li key={pub.id} className="text-[15px] leading-relaxed text-ink/70">
                  <HighlightName text={pub.text} />
                  {pub.href && (
                    <>
                      {" "}
                      <a
                        href={pub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-violet-700 hover:text-violet-900"
                      >
                        View →
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </AccordionSection>

          <AccordionSection title="Research Projects" count={researchProjects.length}>
            <ul className="space-y-3">
              {researchProjects.map((project) => (
                <li key={project.id} className="flex gap-3 text-[15px] leading-relaxed text-ink/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {project.text}
                </li>
              ))}
            </ul>
          </AccordionSection>
        </div>
      </div>
    </div>
  );
}
