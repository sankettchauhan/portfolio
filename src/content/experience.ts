/**
 * Experience tab content. One entry per company; a company with several
 * roles (e.g. a promotion) lists them newest first and renders as a mini
 * timeline inside one card.
 */
export type Project = {
  name: string;
  summary?: string;
  bullets: string[];
};

export type Role = {
  title: string;
  start: string; // "Oct 2024"
  end: string; // "Present"
  /** Named projects inside the role (shown as sub-headings). */
  projects?: Project[];
  /** Plain bullets when a role has no named projects. */
  bullets?: string[];
};

export type Company = {
  company: string;
  /** Path under /public, or omit to show a monogram. */
  logo?: string;
  url?: string;
  location: string;
  type: "Full-time" | "Internship";
  tech: string[];
  roles: Role[];
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
  location: string;
  logo?: string;
  url?: string;
  details: string[];
};

export const work: Company[] = [
  {
    company: "Amazon",
    url: "https://www.amazon.jobs",
    location: "Gurugram, India",
    type: "Full-time",
    tech: ["React", "TypeScript", "Node.js", "AWS Lambda", "API Gateway", "Cognito", "DynamoDB", "IaC"],
    roles: [
      {
        title: "Software Engineer 2",
        start: "Oct 2024",
        end: "Present",
        projects: [
          {
            name: "Lumina AI · EV charging network",
            bullets: [
              "Shipped an AI dashboard tracking charger health across 200+ EU sites, used by 500+ people.",
              "Built the fault-detection and auto-reset backend, provisioned as infrastructure as code.",
            ],
          },
          {
            name: "Quartz · LLM-based internal chatbot",
            bullets: ["Rebuilt the chatbot UI in React (from Python Panel) and added structured table output."],
          },
          {
            name: "Notch · notification dispatch platform",
            bullets: ["Replaced bulk email with targeted alerts via an AND/OR/NOT query builder."],
          },
        ],
      },
      {
        title: "Software Engineer",
        start: "Nov 2022",
        end: "Oct 2024",
        projects: [
          {
            name: "Polaris · project & budget planning",
            bullets: [
              "Owned and modernized a legacy planning tool used by 2,000+ people daily.",
              "Built intake, approvals, tracking and bulk import/export workflows.",
            ],
          },
          {
            name: "Lessons Learnt & Page 0 portals",
            bullets: ["Cut recurring ops issues by 25% and reporting admin time by 40%."],
          },
        ],
      },
    ],
  },
  {
    company: "Finscience Technologies",
    location: "Bengaluru, India",
    type: "Full-time",
    tech: ["React", "Node.js", "MySQL", "REST"],
    roles: [
      {
        title: "Fullstack Development Engineer",
        start: "Jun 2022",
        end: "Nov 2022",
        bullets: ["Built an internal RBAC dashboard and REST APIs (React, Node.js, MySQL) with payments."],
      },
    ],
  },
  {
    company: "Subzclick",
    logo: "/assets/images/workex/subzcribe-logo.webp",
    location: "Remote",
    type: "Internship",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    roles: [
      {
        title: "Fullstack Development Intern",
        start: "Dec 2020",
        end: "May 2021",
        bullets: ["Shipped a landing page in 5 days (+30% traffic) and Node/MongoDB services."],
      },
    ],
  },
  {
    company: "Ved World & Across the Globe",
    logo: "/assets/images/workex/vedworld-logo.webp",
    location: "Remote",
    type: "Internship",
    tech: ["React", "JavaScript", "Browser extensions"],
    roles: [
      {
        title: "Frontend & Extension Developer Intern",
        start: "Jan 2020",
        end: "Dec 2020",
        bullets: ["Built React e-commerce features and extensions that cut manual work by 90%."],
      },
    ],
  },
];

export const education: Education[] = [
  {
    school: "Jaypee Institute of Information Technology",
    degree: "B.Tech, Electronics & Communication Engineering",
    start: "2018",
    end: "2022",
    location: "Noida, India",
    url: "https://www.jiit.ac.in",
    details: [
      "CGPA 8.0",
      "Winner, Smart India Hackathon 2020",
      "Taught Python to 120+ students with the IEEE student chapter",
    ],
  },
];
