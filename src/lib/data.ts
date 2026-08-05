// Static site content for now. Once Supabase is wired up, the content-editable
// pieces here (about, researchInterests, highlights, services text) will move
// into the database and be fetched instead of imported.
//
// Copy in this file is kept verbatim from the original ayo-bello.com (Tilda)
// site wherever possible, only layout/presentation changed, not the words.

export const siteConfig = {
  name: "Ayomikun Bello",
  shortName: "Ayo Bello",
  monogram: "AB",
  logo: "/images/logo.png",
  role: "Humboldt Postdoctoral Research Fellow",
  institution: "OVGU",
  institutionUrl: "https://www.ovgu.de",
  location: "Magdeburg, Germany",
  emails: ["contactme@ayo-bello.com", "ayomikun.bello@ovgu.de"],
  social: {
    email: "mailto:contactme@ayo-bello.com",
    x: "https://twitter.com/ayomikunbello1",
    linkedin: "https://www.linkedin.com/in/ayomikun-bello/",
    scholar: "https://scholar.google.com/citations?user=mYEMQtQAAAAJ&hl=en",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/#research" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "PhD Defense", href: "/phd-defense" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  subheading:
    "An optimistic, fast-learning and enthusiastic researcher, seeking to leverage 5+ years of proven experience in experimental research to collaborate, lead or work within project teams.",
  image: "/images/hero.png",
  primaryCta: { label: "Get in touch", href: "/#contact" },
};

export const about = {
  heading: "About me",
  image: "/images/about.jpg",
  paragraphs: [
    `I am a research scientist with over 5 years of research experience in the field of petroleum engineering. My research has been focused on developing and exploring "green novel" methods to improve oil recovery. Recently, my interest expanded to CO2 sequestration, where I investigate the application of these methods and formulate chemicals for the dual purpose of CO2 storage and enhanced oil recovery. During these years, I also got interested in entrepreneurship, and in 2022, I co-founded a startup, Eco Energy LLC, registered as a legal entity in Moscow, and we specialize in the production of smart biogas containers for the recycling of organic wastes.`,
    `Since mid-high school, I have not paid a dime for tuition, thus I have received academic funding worth over $425,000 through fellowships, scholarships, and awards, resulting in the publication of 9 journal publications and 7 conference proceedings. I was a recipient of the Nigeria-Russia Bilateral Education Agreement scholarship in 2015, pursuing my bachelor's degree in Petroleum Engineering at Kazan National Research Technological University. During this time, I was the president of the SPE student chapter in my university. In 2020, I received the special state award of the Tatarstan Republic for outstanding abilities in educational and scientific activities in the republic; after which I began my Masters at Skoltech.`,
    `In late 2022, I continued in the same path for my PhD at Skoltech. Since then, I have published papers in top Q1/Q2 journals and my research works have been presented at top-level conferences in the UK, the US, South America, the Middle East, and Europe. In 2023, I won the scholarship award of the President of the Russian Federation in priority areas, which is awarded for exceptional achievements related to the national strategic areas of development. Having completed all course requirements, passed the qualifying exams (Feb. 2024), and my doctoral research proposal (Dec. 2023), I successfully defended my PhD the 9th of December, 2024.`,
    `In addition to my academic pursuits, I joined Japaguys in early 2023, leveraging my extensive experience in college/grad school applications and securing scholarships to help students access information about admissions and scholarships abroad.`,
    `Beyond school, study, work, and career, I enjoy cinematography, playing chess, experimenting with new cooking recipes, and reading non-fictional books. Recently, I started getting interested in no-code web development.`,
    `Welcome to my website!`,
  ],
};

export const researchInterests = {
  heading: "Research interests",
  image: "/images/research.jpg",
  paragraphs: [
    `My research interests include microfluidics, interfacial science, and fluid mechanics, with a particular focus on multiphase flow in porous media. I am especially interested in how these areas apply to evaporation phenomena and enhanced oil recovery.`,
    `Previously, I worked on the design and optimization of binary surfactant systems capable of generating stable foams in depleted oil reservoirs. This work aimed to improve oil recovery while simultaneously enabling CO2 sequestration.`,
    `Currently, I am investigating the evaporation dynamics of surfactant solutions within porous media using microfluidic platforms. My focus is on understanding how interfacial tension and wettability influence evaporation rates and trigger front instabilities at the pore scale. I am also exploring the evaporation behavior of surfactant-laden droplets suspended in air, specifically, how contact angle hysteresis and Marangoni flows affect droplet lifetime and final deposition patterns.`,
    `If you're interested in this research or would like to explore collaboration opportunities, feel free to contact me via email.`,
  ],
  cta: { label: "Get in touch", href: "/#contact" },
};

export const portfolioStats = [
  { value: "19", label: "Journal Publications", href: "/portfolio" },
  { value: "15", label: "Conference Proceedings", href: "/portfolio" },
  { value: "400+", label: "Google Scholar Citations", href: siteConfig.social.scholar },
];

export const services = [
  {
    title: "Research consultancy (STEM)",
    image: "/images/help-research.png",
    lede: `I have contributed to more than 15 publications in top-tier journals in the past 3 years, with over 300 citations. If you are looking for expert guidance on how to publish a research paper, I can offer the following services:`,
    bullets: [
      "Proofreading and editing your draft manuscript to ensure clarity, coherence, and correctness.",
      "Advising you on the essential elements of a research paper, such as the abstract, introduction, literature review, methodology, results, discussion, and conclusion.",
      "Helping you select the most suitable journal for your paper and prepare your submission according to its guidelines.",
    ],
  },
  {
    title: "Admissions & scholarship consultancy",
    image: "/images/help-admissions.png",
    lede: `I have paid $0 in tuition since mid-high school. I have also assisted more than 20 people in securing admissions and/or scholarships in the last 2 years. I can help you find the best way to pursue your education abroad, depending on your academic performance and documentation. I will provide you with customized consultations with:`,
    bullets: [
      "Professional guidance and tips to boost your chances of success.",
      "Evaluation of your CV, SOP, essays and all other aspects of your grad school application.",
      "Selection of the most suitable universities and programs for your goals and qualifications.",
    ],
  },
];

// "Featured news" from the original site. Will move to a dashboard-managed
// table once Supabase is connected.
export const highlights = [
  {
    date: "22 November, 2023",
    text: "I am so glad to share the names of Winners of SPE Regional Student Paper Contest. These folks will represent the region at the international SPC at ATCE next year!",
    href: "https://student.skoltech.ru/ayomikunbello",
    image: "/images/news-spe-winners.jpeg",
  },
  {
    date: "18 October, 2022",
    text: "Meet Ayomikun Bello, 2022 MSc graduate and PhD-1 in Petroleum Engineering | CTO at Startup Eco-Energy and Research intern at Skoltech",
    href: "https://www.linkedin.com/posts/slavik-orlova_spe-spc-atce-activity-6988101435624148992-49Jb",
    image: "/images/news-truestory.png",
  },
  {
    date: "12 October, 2022",
    text: "Numerical Sensitivity Analysis of CO Mineralization Trapping Mechanisms in a Deep Saline Aquifer by Ayomikun Bello, Desmond Dorhjie, Anastasia Ivanova, Alexey Cheremisin",
    href: "https://www.linkedin.com/posts/chemical-engineering-science-5649a4243_numerical-sensitivity-analysis-of-co2-mineralization-activity-7116374224033726464-FgC9",
    image: "/images/news-ces-linkedin.png",
  },
];

export const newsletter = {
  heading: "Sign up for my newsletter",
  body: "If you are in science and/or academia, or simply have an interest, I invite you to subscribe to my newsletter. Once a month, I'll drop you an email with what I am up to and share a few of the things I've learnt.",
};

export const contact = {
  heading: "Have some comments?",
  body: "Drop them here or feel free to write. I will respond as soon as I can.",
};
