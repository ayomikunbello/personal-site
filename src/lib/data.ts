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

// Full publication list, scraped verbatim from ayo-bello.com/portfolio.
export const journalPublications = [
  {
    text: "Anastasia Ivanova, Ayomikun Bello, Alexander Rodionov, Yuanhao Chang, Hui Gao, Alexey Cheremisin (2026). Molecular Origins of Surfactant Synergy: Integrated Experiments and Simulations Reveal Interfacial Mechanisms for Enhanced CO2 Foam Performance. Journal of Molecular Liquids",
    href: "https://doi.org/10.1016/j.molliq.2026.129712",
  },
  {
    text: "Aysylu Askarova, Hamza Imran, Fernancelys Rodriguez, Hadi Belhaj, Desmond Dorhjie, Ayomikun Bello, Chengdong Yuan, Celia Bejarano, Raifel Morales, Alexey Cheremisin (2026). Multiscale Experimental-Numerical Study of Alkali-free SP Flooding with Sensitivity Analysis in a Venezuelan Extra-heavy Oil Reservoir. Fuel",
    href: "https://doi.org/10.1016/j.fuel.2026.139258",
  },
  {
    text: "Ayomikun Bello, Abdolreza Kharaghani, Evangelos Tsotsas (2026). Pore-Scale Influence of Surfactants on Evaporation in a Porous Medium. Scientific Reports",
    href: "https://doi.org/10.1038/s41598-025-29925-z",
  },
  {
    text: "Ayomikun Bello, Abdolreza Kharaghani, Evangelos Tsotsas (2025). Comparative Pore and Continuum-scale Modelling of Evaporation in Mixed Wettability Porous Media. Advances in Water Resources",
    href: "https://doi.org/10.1016/j.advwatres.2025.105123",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Denis Bakulin, Kirill Maerle, Denis Davydov, Artem Penigin, Alexey Cheremisin (2025). Enhanced Carbon Utilization and Storage: An Application of Nonionic-based Binary Surfactant CO2 Foam. Heliyon",
    href: "https://doi.org/10.1016/j.heliyon.2025.e42561",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Alexander Rodionov, Tagir Karamov, Andrey Morkovkin, Alexey Cheremisin (2025). An Experimental Study of the Physical Mechanisms of Fluid Flow in Tight Carbonate Core Samples by Binary Surfactants. Heliyon",
    href: "https://doi.org/10.1016/j.heliyon.2025.e42221",
  },
  {
    text: "Sukhwant Pal, Ayomikun Bello, Elvira Muratova, Alexander Chekanov (2024). A Review of the Materials Utilized in the Design and Fabrication of Biogas Digesters. Renewable and Sustainable Energy Reviews",
    href: "https://doi.org/10.1016/j.rser.2024.115167",
  },
  {
    text: "Ayomikun Bello, Desmond Batsa Dorhjie, Anastasia Ivanova, Alexey Cheremisin (2024). A Numerical Feasibility Study of CO2 Foam for Carbon Utilization and Storage in a Depleted, High Salinity, Carbonate Oil Reservoir. Scientific Reports",
    href: "https://doi.org/10.1038/s41598-024-70122-1",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Denis Bakulin, Timur Yunusov, Alexey Cheremisin (2024). A Static and Dynamic Analysis of Nonionic-based Binary Surfactant Systems for Adsorption Mitigation in a Carbonate Reservoir with High Salinity. Journal of Molecular Liquids",
    href: "https://doi.org/10.1016/j.molliq.2024.125141",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Denis Bakulin, Timur Yunusov, Alexander Rodionov, Alexander Burukhin, Alexey Cheremisin (2024). An Experimental Study of Foam-Oil Interactions for Nonionic-based Binary Surfactant Systems under High Salinity Conditions. Scientific Reports",
    href: "https://doi.org/10.1038/s41598-024-62610-1",
  },
  {
    text: "Ayomikun Bello, Desmond Batsa Dorhjie, Anastasia Ivanova, Alexander Cheremisin, Alexey Cheremisin, Ilnur Ilyasov (2024). Numerical Study of the Mechanisms of Nano-assisted Foam Flooding in Porous Media as an Alternative to Gas Flooding. Heliyon",
    href: "https://doi.org/10.1016/j.heliyon.2024.e26689",
  },
  {
    text: "Ivanova A. A., Kozyreva Z.V., Chekalov A.Y., Proshin P.I., Abdurashitov A.S., Bello A.S., Markovic S., Sukhorukov G.B., Cheremisin A.N. (2024). Development and characterization of nanostructured surfactant compositions with prolonged action and stimuli-responsible physicochemical properties. Colloids and Surfaces A: Physicochemical and Engineering Aspects",
    href: "https://doi.org/10.1016/j.colsurfa.2024.133396",
  },
  {
    text: "Ayomikun Bello, Desmond Batsa Dorhjie, Anastasia Ivanova, Alexey Cheremisin (2023). Numerical Sensitivity Analysis of CO2 Mineralization Trapping Mechanisms in a Deep Saline Aquifer. Journal of Chemical Engineering Science",
    href: "https://doi.org/10.1016/j.ces.2023.119335",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Alexander Rodionov, Timur Aminev, Alexander Mishin, Denis Bakulin, Pavel Grishin, Pavel Belovus, Artem Penigin, Konstantin Kyzyma, Alexey Cheremisin (2023). An Experimental Study of High Pressure Microscopy and Enhanced Oil Recovery with Nanoparticle-Stabilized Foams in Carbonate Oil Reservoir. Energies",
    href: "https://doi.org/10.3390/en16135120",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Alexey Cheremisin (2023). A Comprehensive Review of the Role of CO2 Foam EOR in the Reduction of Carbon Footprint in the Petroleum Industry. Energies",
    href: "https://doi.org/10.3390/en16031167",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Alexey Cheremisin (2023). Foam EOR as an Optimization Technique for Gas EOR: A Comprehensive Review of Laboratory and Field Implementations. Energies",
    href: "https://doi.org/10.3390/en16020972",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Alexey Cheremisin (2022). Enhancing N2 and CO2 Foam Stability by Surfactants and Nanoparticles at High Temperature and Various Salinities. Journal of Petroleum Science and Engineering",
    href: "https://doi.org/10.1016/j.petrol.2022.110720",
  },
  {
    text: "Ayomikun Bello, Joy Ozoani, Adewale Adebayo, Dmitriy Kuriashov (2022). Rheological Study of Nanoparticle-based Cationic Surfactant Solutions. Journal of Petroleum",
    href: "https://doi.org/10.1016/j.petlm.2022.01.003",
  },
  {
    text: "Ayomikun Bello, Joy Ozoani, Dmitriy Kuriashov (2021). Proppant Transport in Hydraulic Fractures by Creating a Capillary Suspension. Journal of Petroleum Science and Engineering",
    href: "https://doi.org/10.1016/j.petrol.2021.109508",
  },
];

export const conferenceProceedings = [
  {
    text: "Ayomikun Bello (2025). A Numerical Study of CO2 Foams for Carbon Utilization and Storage. World CCUS Conference 2025, Bergen, Norway, 1 - 4 September, 2025.",
    href: "https://doi.org/10.3997/2214-4609.202522128",
  },
  {
    text: "Ayomikun Bello, Desmond B. Dorhjie, Anastasia Ivanova, Alexey Cheremisin (2025). Experimental and Numerical Simulation of Binary Surfactant Foam for the Co-Optimization of the Methods of Oil Recovery and CO2 Storage. SPE/AAPG/SEG Unconventional Resources Technology Conference, Houston, Texas, USA, 9 - 11 June, 2025.",
    href: "https://doi.org/10.15530/urtec-2025-4208589",
  },
  {
    text: "Ayomikun Bello, Desmond B. Dorhjie, Anastasia Ivanova, Alexey Cheremisin (2025). Experimental and Numerical Simulation of Foam for Co-optimizing the Methods of Oil Recovery and CO2 Storage. 86th EAGE Annual Conference & Exhibition, Toulouse, France, 2 - 5 June, 2025.",
    href: "https://doi.org/10.3997/2214-4609.202510014",
  },
  {
    text: "H. Belhaj, F. Rodriguez, A. Bello, R. Morales, A. Askarova, D. Dorhjie, C. Bejarano, F. Alhameli, M. AlDhuhoori, A. Cheremisin (2024). A Hybrid Scheme for the Sustainable Production of High Water Cut Unconventional Extra-Heavy Oil Reservoirs: First Simulation Predictions for the Orinoco Oil Belt-Venezuela Shows Hope! Paper presented at Abu Dhabi International Petroleum Exhibition & Conference (ADIPEC), Abu Dhabi, UAE, 4 - 7 November, 2024.",
    href: "https://doi.org/10.2118/222085-MS",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Desmond Batsa Dorhjie, Alexey Cheremisin (2024). Numerical Analysis of Foam-Assisted and Continuous CO2 Injection for Utilization and Storage in an Oil Reservoir. Paper presented at the Fifth EAGE Global Energy Transition Conference & Exhibition, Rotterdam, Netherlands, 4 - 7 November, 2024.",
    href: "https://doi.org/10.3997/2214-4609.202421010",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Denis Bakulin, Alexey Cheremisin (2024). Mechanistic Study of the Interactions between Oil and CO2 Foam Generated with Binary Surfactants. Paper presented at the 85th EAGE Annual Conference & Exhibition, Oslo, Norway, 10 - 13 June, 2024.",
    href: "https://doi.org/10.3997/2214-4609.202410233",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Alexey Cheremisin (2024). Application of Binary Surfactant Systems as Adsorption Reducers in a Carbonate Formation. Paper presented at the First EAGE Workshop on Advances in Carbonate Reservoirs from Prospects to Development, Kuwait City, Kuwait, 23 – 25 April, 2024.",
    href: "https://doi.org/10.3997/2214-4609.2024634008",
  },
  {
    text: "Ayomikun Bello, Alexander Rodionov, Anastasia Ivanova, Alexey Cheremisin (2024). Synergistic Effects of Binary Surfactant Systems for Enhanced Oil Recovery in Carbonates. Paper presented at SPE Improved Oil Recovery Conference, Tulsa, Oklahoma, USA, 22 – 25 April, 2024.",
    href: "https://doi.org/10.2118/218271-MS",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Alexander Rodionov, Alexey Cheremisin (2023). Mechanistic Study of the Prospects of Binary Surfactant Systems in Carbonate Formations. Paper presented at Latin America Unconventional Resources Technology Conference, Buenos Aires, Argentina, 4 – 6 December, 2023.",
    href: "https://onepetro.org/urtecla/proceedings-abstract/23JLAU/All-23JLAU/538824",
  },
  {
    text: "Ayomikun Bello (2023). Synergistic Influence Between Surfactants and Nanoparticles in Foam Flooding as an Optimization Method for Gas EOR. Paper presented at the SPE Annual Technical Conference and Exhibition, San Antonio, Texas, 23 - 25 December, 2023.",
    href: "https://doi.org/10.2118/217481-STU",
  },
  {
    text: "Ayomikun Bello, Desmond Batsa Dorhjie, Anastasia Ivanova, Alexey Cheremisin (2023). A Numerical Study of the Influence of Rock Mineralization on CO2 Storage. Paper presented at Gas & Oil Technology Showcase and Conference, Dubai, 13 – 15 March, 2023.",
    href: "https://doi.org/10.2118/214045-MS",
  },
  {
    text: "Ayomikun Bello, Desmond Batsa Dorhjie, Anastasia Ivanova, Alexander Cheremisin, Alexey Cheremisin, Ilnur Ilyasov (2023). Reservoir Modelling Of Nanoparticle-Assisted Foam To Optimize Gas Injection In An Unconsolidated Heavy Oilfield. Paper presented at Gas & Oil Technology Showcase and Conference, Dubai, 13 – 15 March, 2023.",
    href: "https://doi.org/10.2118/214161-MS",
  },
  {
    text: "Ayomikun Bello, Anastasia Ivanova, Alexey Cheremisin (2022). Application of Nanoparticles in Foam Flooding for Enhanced Oil Recovery and Foam Stability in Carbonate Reservoirs. Paper presented at the 83rd EAGE Annual Conference & Exhibition, Madrid, 6 - 9 June, 2022.",
    href: "https://doi.org/10.3997/2214-4609.202210009",
  },
  {
    text: "Ayomikun Bello (2021). Proppant Transport in Hydraulic Fractures by Creating a Capillary Suspension. Paper presented at the SPE Annual Technical Conference and Exhibition, Dubai, 21 - 23 September, 2021.",
    href: "https://doi.org/10.2118/208624-STU",
  },
  {
    text: 'A. S. Bello, Optimal Management of Topside Diluent Injection for Heavy Oil Field. 73rd International youth scientific conference "Oil and gas – 2019" - Moscow, Publishing center of the Russian state University of Oil and Gas (National Research University) named after I. M. Gubkin, 2019 ISBN 978-5-91961-300-8',
    href: null as string | null,
  },
];

export const researchProjects = [
  "Interfacial properties and their role in evaporation dynamics in porous media",
  "Design and Development of Binary surfactant systems for combined purposes of EOR and CO2 storage",
  "Nanofoam Design for Enhanced Oil Recovery in Orenburg oilfield",
  "Microfluidic Study of the Influence of Nanofluids in Improving Flow-back during Hydraulic Fracturing",
  "Numerical Simulation of Nanofoam Flooding as an Optimization Technique for Gas EOR",
  "Influence of Nanoparticles on the Stability of Bulk Foams for Enhanced Oil Recovery",
  "Ionic Liquids as Inhibitors for Gas Hydrates",
  "Application of Thermal EOR methods for Usinskoye Oil Field",
  "Experimental Study of Diesel-based Foam Stability",
  "Proppant Transport in Hydraulic Fractures by Creating a Capillary Suspension",
];

export const phdDefense = {
  heading: "Ayomikun Bello's PhD Defense",
  topic:
    "Co-optimization of the methods of oil recovery and CO2 storage using nonionic-based binary surfactant foams",
  day: "Monday",
  date: "December 9, 2024",
  time: "15:00",
  venue:
    "Skolkovo Institute of Science and Technology, 30, Bolshoi Boulevard, bld. 1, Room E-A2-2007 and E-A2-2008",
  materialsNote:
    "Full information on the defense jury composition and the materials of the defense is available at Skoltech web site",
  defenseUrl: "https://new.skoltech.ru/en/applicants/ayomikun-bello-sunday",
};

export const newsletter = {
  heading: "Sign up for my newsletter",
  body: "If you are in science and/or academia, or simply have an interest, I invite you to subscribe to my newsletter. Once a month, I'll drop you an email with what I am up to and share a few of the things I've learnt.",
};

export const contact = {
  heading: "Have some comments?",
  body: "Drop them here or feel free to write. I will respond as soon as I can.",
};
