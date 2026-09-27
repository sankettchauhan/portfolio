/**
 * Personal projects. `featured: true` puts a project on the homepage (keep it
 * to 4); everything shows on /projects with tag filters.
 */
export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  live?: string;
  code?: string;
  featured?: boolean;
};

export const projects: ProjectItem[] = [
  {
    slug: "memories",
    title: "Memories",
    description: "[One or two lines: what it does, who it's for, and the interesting technical bit.]",
    image: "/assets/images/project/memories.webp",
    tags: ["MERN", "Tailwind"],
    live: "https://sanket-memories-app.vercel.app/home",
    featured: true,
  },
  {
    slug: "medium-clone",
    title: "Medium clone",
    description: "[One or two lines: what it does, who it's for, and the interesting technical bit.]",
    image: "/assets/images/project/major-project.webp",
    tags: ["React", "Firebase", "Tailwind"],
    live: "https://major-project-2022.vercel.app/home",
    featured: true,
  },
  {
    slug: "tropius",
    title: "Tropius",
    description: "[One or two lines: what it does, who it's for, and the interesting technical bit.]",
    image: "/assets/images/project/tropius.webp",
    tags: ["React", "Node", "MongoDB", "Material UI"],
    live: "https://tropius-frontend.vercel.app/",
    featured: true,
  },
  {
    slug: "vedworld",
    title: "Ved World e-commerce",
    description: "[One or two lines: what it does, who it's for, and the interesting technical bit.]",
    image: "/assets/images/project/vedworld.webp",
    tags: ["React", "Firebase", "Razorpay"],
    live: "https://vedworld.org/",
    featured: true,
  },
  {
    slug: "quiz",
    title: "Quiz",
    description: "[One or two lines.]",
    image: "/assets/images/project/quiz.webp",
    tags: ["React", "Tailwind"],
    live: "https://sanket-react-quiz.vercel.app/",
  },
  {
    slug: "rick-and-morty",
    title: "Rick and Morty characters",
    description: "[One or two lines.]",
    image: "/assets/images/project/rick-and-morty.webp",
    tags: ["React", "Tailwind", "API"],
    live: "https://sanket-rick-and-morty-characters.vercel.app/",
  },
  {
    slug: "pixabay",
    title: "Image search",
    description: "[One or two lines.]",
    image: "/assets/images/project/pixabay.webp",
    tags: ["React", "Material UI", "API"],
    live: "https://image-search-using-pixabay-api.vercel.app/",
  },
  {
    slug: "cocktail-db",
    title: "The Cocktail DB",
    description: "[One or two lines.]",
    image: "/assets/images/project/cocktail.webp",
    tags: ["React", "API"],
    live: "https://the-cocktail-db.vercel.app/",
  },
];
