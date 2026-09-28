import location from "./location.json";

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
  // Edit src/content/location.json, then run `npm run maps` to redraw the map.
  location,
  email: "sanket.chauhan4@gmail.com",
  resume: "/resume.pdf",
  siteUrl: "https://www.sanketchauhan.in",
  photo: "/assets/images/sanket.jpg",
  socials: {
    github: "https://github.com/sankettchauhan",
    linkedin: "https://www.linkedin.com/in/sanket-chauhan/",
  },
} as const;
