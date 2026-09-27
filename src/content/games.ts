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
    description:
      "Levels are arrays of ASCII strings — each character maps to a sprite and a tag (solid, dangerous, coin-surprise). Headbumping a question block spawns a coin or a mushroom that doubles Mario's size and jump for 6 seconds, and pressing ↓ on a pipe loads the next level.",
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
    description:
      "Rooms are ASCII grids too. Slicers bounce off walls, and skeletors patrol on a randomized timer. Space fires a directional \"kaboom\" one tile ahead — a kill shakes the camera and adds to the score, and stairs or a door load the next room.",
    thumbnail: "/assets/images/project/zelda.webp",
    engine: "Kaboom.js",
    controls: [
      { keys: "Arrows", action: "move" },
      { keys: "Space", action: "kaboom" },
    ],
    mobile: false,
  },
];
