/**
 * Certifications and awards, shown newest/most important first. The first 5
 * are visible; the rest sit behind "+N more".
 * `icon` is a Simple Icons slug; omit it for a monogram of the issuer.
 */
export type Certification = {
  title: string;
  issuer: string;
  date?: string;
  link?: string;
  icon?: string;
  kind: "award" | "cert";
};

export const certifications: Certification[] = [
  {
    title: "Winner · Smart India Hackathon",
    issuer: "Government of India",
    date: "2020",
    kind: "award",
  },
  {
    title: "Research paper · Soil Health Monitoring System",
    issuer: "IJRASET",
    link: "https://www.ijraset.com/print-certificate.php?member=28655",
    kind: "award",
  },
  {
    title: "Runner-up · Tech Savvy",
    issuer: "JIIT",
    date: "2019",
    link: "https://drive.google.com/file/d/1K76Me7ZA4EHw2EdWPUl0h31iVghnxdJ0/view?usp=sharing",
    kind: "award",
  },
  {
    title: "Front-End Web Development with React",
    issuer: "Coursera · HKUST",
    icon: "coursera",
    link: "https://coursera.org/share/03719f9de420979ee693c2102aedd932",
    kind: "cert",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    icon: "freecodecamp",
    link: "https://www.freecodecamp.org/certification/sankettchauhan/javascript-algorithms-and-data-structures",
    kind: "cert",
  },
  {
    title: "Front End Libraries",
    issuer: "freeCodeCamp",
    icon: "freecodecamp",
    link: "https://www.freecodecamp.org/certification/sankettchauhan/front-end-libraries",
    kind: "cert",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    icon: "freecodecamp",
    link: "https://www.freecodecamp.org/certification/sankettchauhan/responsive-web-design",
    kind: "cert",
  },
  {
    title: "Front-End Web UI Frameworks: Bootstrap 4",
    issuer: "Coursera · HKUST",
    icon: "coursera",
    link: "https://coursera.org/share/03719f9de420979ee693c2102aedd932",
    kind: "cert",
  },
  {
    title: "Python instructor · 120+ students",
    issuer: "IEEE student chapter, JIIT",
    icon: "ieee",
    kind: "award",
  },
  {
    title: "Campus Ambassador · Robothlon",
    issuer: "IIT Delhi",
    link: "https://drive.google.com/file/d/1IFx4bWSa3_-CtSRKXWToTkOoIm4dwwru/view?usp=sharing",
    kind: "award",
  },
];
