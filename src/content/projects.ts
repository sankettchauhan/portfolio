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
    description:
      "A MERN app for posting personal memories — sign-up runs through an OTP flow instead of a plain password form.",
    image: "/assets/images/project/memories.webp",
    tags: ["MERN", "Tailwind"],
    live: "https://sanket-memories-app.vercel.app/home",
    featured: true,
  },
  {
    slug: "medium-clone",
    title: "Medium clone",
    description:
      "A Medium-style blogging platform, built as \"Maadhyam\" — Google and email sign-in on the front end, Firebase underneath.",
    image: "/assets/images/project/major-project.webp",
    tags: ["React", "Firebase", "Tailwind"],
    live: "https://major-project-2022.vercel.app/home",
    featured: true,
  },
  {
    slug: "tropius",
    title: "Tropius",
    description:
      "A movie-rental admin panel — CRUD screens for customers, movies, genres and rentals, with per-title stock counts and daily rates.",
    image: "/assets/images/project/tropius.webp",
    tags: ["React", "Node", "MongoDB", "Material UI"],
    live: "https://tropius-frontend.vercel.app/",
    featured: true,
  },
  {
    slug: "vedworld",
    title: "Ved World e-commerce",
    description:
      "Storefront for a live e-commerce site selling Vedic and astrology services — built the cart, login and shop, and integrated Razorpay for payments and Delhivery for shipping.",
    image: "/assets/images/project/vedworld.webp",
    tags: ["React", "Firebase", "Razorpay"],
    live: "https://vedworld.org/",
    featured: true,
  },
  {
    slug: "quiz",
    title: "Quiz",
    description: "A trivia quiz with category and difficulty selection and live scoring.",
    image: "/assets/images/project/quiz.webp",
    tags: ["React", "Tailwind"],
    live: "https://sanket-react-quiz.vercel.app/",
  },
  {
    slug: "rick-and-morty",
    title: "Rick and Morty characters",
    description: "Browses the Rick and Morty API — character bios linked to the episodes they appear in.",
    image: "/assets/images/project/rick-and-morty.webp",
    tags: ["React", "Tailwind", "API"],
    live: "https://sanket-rick-and-morty-characters.vercel.app/",
  },
  {
    slug: "pixabay",
    title: "Image search",
    description: "A Pixabay-powered image search with type and count filters.",
    image: "/assets/images/project/pixabay.webp",
    tags: ["React", "Material UI", "API"],
    live: "https://image-search-using-pixabay-api.vercel.app/",
  },
  {
    slug: "cocktail-db",
    title: "The Cocktail DB",
    description: "Searches TheCocktailDB for drink recipes, showing glass type and alcohol content for each.",
    image: "/assets/images/project/cocktail.webp",
    tags: ["React", "API"],
    live: "https://the-cocktail-db.vercel.app/",
  },
];
