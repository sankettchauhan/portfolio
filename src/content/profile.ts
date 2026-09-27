/**
 * Who you are. Edit this file to change the hero, metadata, footer and
 * contact details across the whole site.
 */
export const profile = {
  name: "Sanket Chauhan",
  shortName: "Sanket",
  handle: "sanket",
  role: "Software Engineer 2",
  company: "Amazon",
  experienceYears: "~5",
  tagline:
    "Full-stack engineer building internal platforms and AI tooling at Amazon. I also make small browser games for fun.",
  location: {
    city: "Gurugram",
    region: "India",
    // Used by the map tile.
    lat: 28.4595,
    lng: 77.0266,
  },
  email: "sanket.chauhan4@gmail.com",
  resume: "/resume.pdf",
  siteUrl: "https://sanketchauhan.me",
  photo: "/assets/images/sanket.webp",
  socials: {
    github: "https://github.com/sankettchauhan",
    linkedin: "https://www.linkedin.com/in/sanket-chauhan/",
    x: "https://x.com/chauhan4_sanket",
    xHandle: "@chauhan4_sanket",
  },
} as const;
