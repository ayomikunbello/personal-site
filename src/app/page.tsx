import Hero from "@/components/Hero";
import About from "@/components/About";
import ResearchInterests from "@/components/ResearchInterests";
import PortfolioStats from "@/components/PortfolioStats";
import Services from "@/components/Services";
import Highlights from "@/components/Highlights";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ResearchInterests />
      <PortfolioStats />
      <Services />
      <Highlights />
      <Newsletter />
      <Contact />
    </>
  );
}
