import {
  siCoursera,
  siCplusplus,
  siCss,
  siExpress,
  siFigma,
  siFreecodecamp,
  siGit,
  siHtml5,
  siIeee,
  siJavascript,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostman,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

// Explicit map keeps the bundle to the icons we use. Add an import + entry
// here when content references a new slug.
const icons: Record<string, SimpleIcon> = {
  coursera: siCoursera,
  cplusplus: siCplusplus,
  css: siCss,
  express: siExpress,
  figma: siFigma,
  freecodecamp: siFreecodecamp,
  git: siGit,
  html5: siHtml5,
  ieee: siIeee,
  javascript: siJavascript,
  mongodb: siMongodb,
  mysql: siMysql,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  postman: siPostman,
  python: siPython,
  react: siReact,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
};

export function getTechIcon(slug?: string): SimpleIcon | undefined {
  return slug ? icons[slug] : undefined;
}
