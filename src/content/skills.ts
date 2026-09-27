/**
 * `icon` is a Simple Icons slug (see simpleicons.org) or omitted for a text
 * badge (e.g. AWS services, whose logos Simple Icons doesn't ship).
 */
export type Skill = { name: string; icon?: string };

/** The highlighted row: what you reach for today, with a one-line why. */
export const currentStack: (Skill & { blurb: string })[] = [
  { name: "React", icon: "react", blurb: "UI for everything I ship" },
  { name: "TypeScript", icon: "typescript", blurb: "JavaScript, but safer" },
  { name: "Node.js", icon: "nodedotjs", blurb: "APIs and services" },
  { name: "AWS", blurb: "Lambda, API Gateway, Cognito, S3" },
  { name: "DynamoDB", blurb: "Serverless data at scale" },
  { name: "Python", icon: "python", blurb: "Scripts, data and LLM glue" },
];

export const skillGroups: { label: string; skills: Skill[] }[] = [
  {
    label: "Languages",
    skills: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Python", icon: "python" },
      { name: "C++", icon: "cplusplus" },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React", icon: "react" },
      { name: "React Native", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css" },
      { name: "Tailwind", icon: "tailwindcss" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "REST APIs" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "DynamoDB" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    label: "Cloud",
    skills: [
      { name: "Lambda" },
      { name: "API Gateway" },
      { name: "Cognito" },
      { name: "S3" },
      { name: "Infrastructure as code" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "Postman", icon: "postman" },
      { name: "Figma", icon: "figma" },
    ],
  },
];
