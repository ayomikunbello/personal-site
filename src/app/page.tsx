import Hero from "@/components/Hero";
import About from "@/components/About";
import ResearchInterests from "@/components/ResearchInterests";
import PortfolioStats from "@/components/PortfolioStats";
import Services from "@/components/Services";
import Highlights from "@/components/Highlights";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import { getHeroSubheading, getAboutParagraphs, getResearchParagraphs, getHighlights } from "@/lib/queries";

export default async function Home() {
  const [subheading, aboutParagraphs, researchParagraphs, highlights] = await Promise.all([
    getHeroSubheading(),
    getAboutParagraphs(),
    getResearchParagraphs(),
    getHighlights(),
  ]);

  return (
    <>
      <Hero subheading={subheading} />
      <About paragraphs={aboutParagraphs} />
      <ResearchInterests paragraphs={researchParagraphs} />
      <PortfolioStats />
      <Services />
      <Highlights items={highlights} />
      <Newsletter />
      <Contact />
    </>
  );
}
