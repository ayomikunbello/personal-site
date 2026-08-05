// Static site content for now. Once Supabase is wired up, the content-editable
// pieces here (about, researchInterests, highlights, services text) will move
// into the database and be fetched instead of imported.

export const siteConfig = {
  name: "Ayomikun Bello",
  shortName: "Ayo Bello",
  monogram: "AB",
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
  eyebrow: "Petroleum & Reservoir Engineering · Interfacial Science",
  heading: "Hi, I’m Ayo — researcher, founder, and eternal scholarship applicant.",
  subheading:
    "An optimistic, fast-learning and enthusiastic researcher, seeking to leverage 5+ years of proven experience in experimental research to collaborate, lead, and work within project teams.",
  primaryCta: { label: "Get in touch", href: "/#contact" },
  secondaryCta: { label: "View portfolio", href: "/portfolio" },
};

export const about = {
  heading: "About me",
  paragraphs: [
    `I am a research scientist with over 5 years of research experience in the field of petroleum engineering. My research has been focused on developing and exploring "green novel" methods to improve oil recovery. Recently, my interest expanded to CO₂ sequestration, where I investigate the application of these methods and formulate chemicals for the dual purpose of CO₂ storage and enhanced oil recovery. During these years, I also got interested in entrepreneurship, and in 2022, I co-founded a startup, Eco Energy LLC, registered as a legal entity in Moscow, specializing in the production of smart biogas containers for the recycling of organic wastes.`,
    `Since mid-high school, I have not paid a dime for tuition, thus I have received academic funding worth over $425,000 through fellowships, scholarships, and awards, resulting in the publication of 19 journal publications and 15+ conference proceedings. I was a recipient of the Nigeria-Russia Bilateral Education Agreement scholarship in 2015, pursuing my bachelor's degree in Petroleum Engineering at Kazan National Research Technological University, where I also served as president of the SPE student chapter. In 2020, I received the special state award of the Tatarstan Republic for outstanding abilities in educational and scientific activities in the republic, after which I began my Master's at Skoltech.`,
    `In late 2022, I continued the same path for my PhD at Skoltech. Since then, I have published papers in top Q1/Q2 journals and presented my research at top-level conferences in the UK, the US, South America, the Middle East, and Europe. In 2023, I won the scholarship award of the President of the Russian Federation in priority areas, awarded for exceptional achievements related to national strategic development. Having completed all course requirements, passed my qualifying exams (Feb. 2024), and defended my doctoral research proposal (Dec. 2023), I successfully defended my PhD on December 9, 2024.`,
    `In addition to my academic pursuits, I joined Japaguys in early 2023, leveraging my extensive experience in college/grad school applications and securing scholarships to help students access information about admissions and scholarships abroad.`,
    `Beyond school, study, work, and career, I enjoy cinematography, playing chess, experimenting with new cooking recipes, and reading non-fiction. Recently, I've gotten interested in no-code (and now, evidently, code) web development. Welcome to my website!`,
  ],
};

export const researchInterests = {
  heading: "Research interests",
  paragraphs: [
    `My research interests include microfluidics, interfacial science, and fluid mechanics, with a particular focus on multiphase flow in porous media — especially how these areas apply to evaporation phenomena and enhanced oil recovery.`,
    `Previously, I worked on the design and optimization of binary surfactant systems capable of generating stable foams in depleted oil reservoirs, aiming to improve oil recovery while simultaneously enabling CO₂ sequestration.`,
    `Currently, I am investigating the evaporation dynamics of surfactant solutions within porous media using microfluidic platforms — understanding how interfacial tension and wettability influence evaporation rates and trigger front instabilities at the pore scale. I'm also exploring the evaporation behavior of surfactant-laden droplets suspended in air, specifically how contact angle hysteresis and Marangoni flows affect droplet lifetime and final deposition patterns.`,
  ],
  cta: { label: "Discuss a collaboration", href: "/#contact" },
};

export const portfolioStats = [
  { value: "19", label: "Journal Publications", href: "/portfolio" },
  { value: "15+", label: "Conference Proceedings", href: "/portfolio" },
  { value: "400+", label: "Google Scholar Citations", href: siteConfig.social.scholar },
];

export const services = [
  {
    title: "Research consultancy (STEM)",
    lede: `I've contributed to 15+ publications in top-tier journals over the past 3 years, with 300+ citations. If you're looking for expert guidance on publishing a research paper, I can help with:`,
    bullets: [
      "Proofreading and editing your draft manuscript for clarity, coherence, and correctness.",
      "Advising on the essential elements of a research paper — abstract, introduction, literature review, methodology, results, discussion, and conclusion.",
      "Helping you select the most suitable journal and prepare your submission to its guidelines.",
    ],
  },
  {
    title: "Admissions & scholarship consultancy",
    lede: `I've paid $0 in tuition since mid-high school, and have helped 20+ people secure admissions and/or scholarships in the last 2 years. I can help you find the best way to pursue your education abroad with customized consultations on:`,
    bullets: [
      "Professional guidance and tips to boost your chances of success.",
      "Evaluation of your CV, SOP, essays, and every other part of your grad school application.",
      "Selection of the most suitable universities and programs for your goals and qualifications.",
    ],
  },
];

// "Highlights" (formerly Tilda's "Featured news"). Will move to a
// dashboard-managed table once Supabase is connected.
export const highlights = [
  {
    date: "22 November, 2023",
    text: "Winners of the SPE Regional Student Paper Contest — this group will represent the region at the international SPC at ATCE next year!",
    href: "https://student.skoltech.ru/ayomikunbello",
  },
  {
    date: "18 October, 2022",
    text: "Meet Ayomikun Bello, 2022 MSc graduate and PhD-1 in Petroleum Engineering, CTO at startup Eco-Energy, and research intern at Skoltech.",
    href: "https://www.linkedin.com/posts/slavik-orlova_spe-spc-atce-activity-6988101435624148992-49Jb",
  },
  {
    date: "12 October, 2022",
    text: "Numerical Sensitivity Analysis of CO₂ Mineralization Trapping Mechanisms in a Deep Saline Aquifer, with Desmond Dorhjie, Anastasia Ivanova, and Alexey Cheremisin.",
    href: "https://www.linkedin.com/posts/chemical-engineering-science-5649a4243_numerical-sensitivity-analysis-of-co2-mineralization-activity-7116374224033726464-FgC9",
  },
];
