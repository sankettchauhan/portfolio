/** Games playable at /games/<slug>. Add new games here. */
export type Game = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  engine: string;
  controls: { keys: string; action: string }[];
  mobile: boolean;
};

export const games: Game[] = [
  {
    slug: "mario",
    title: "Mario",
    tagline: "2-level platformer",
    description: "[How you built it and what you learned: level maps as ASCII grids, power-ups, pipe transitions.]",
    thumbnail: "/assets/images/project/mario.webp",
    engine: "Kaboom.js",
    controls: [
      { keys: "← →", action: "move" },
      { keys: "Space", action: "jump" },
      { keys: "↓", action: "enter pipe" },
    ],
    mobile: false,
  },
  {
    slug: "zelda",
    title: "Zelda",
    tagline: "Top-down dungeon crawler",
    description: "[How you built it and what you learned: enemies with simple AI, room transitions, scoring.]",
    thumbnail: "/assets/images/project/zelda.webp",
    engine: "Kaboom.js",
    controls: [
      { keys: "Arrows", action: "move" },
      { keys: "Space", action: "kaboom" },
    ],
    mobile: false,
  },
];
