/**
 * Hand-drawn pixel icons (original art, no franchise assets). Each icon is a
 * grid of rows where "#" is a filled pixel. Rendered as crisp SVG rects in
 * currentColor so they follow the theme accent.
 */
const ICONS = {
  plane: [
    "......#....",
    "......##...",
    "#.....###..",
    "###########",
    "#.....###..",
    "......##...",
    "......#....",
  ],
  mountain: [
    "...#......",
    "..###.....",
    "..####.#..",
    ".#######..",
    ".########.",
    "##########",
  ],
  dumbbell: [
    ".#......#.",
    "##......##",
    "##########",
    "##......##",
    ".#......#.",
  ],
  shuttle: [
    "#.#.#.#",
    "#######",
    ".#####.",
    "..###..",
    "...#...",
    "..###..",
    "..###..",
  ],
  gamepad: [
    ".##########.",
    "##.######.##",
    "#...####.#.#",
    "##.######.##",
    "############",
    "###......###",
    "##........##",
  ],
  flag: [
    "##.#.#.#.",
    "#.#.#.#.#",
    "##.#.#.#.",
    "#.#.#.#.#",
    "#........",
    "#........",
    "#........",
  ],
  bolt: [
    "....###",
    "...###.",
    "..###..",
    ".######",
    "...###.",
    "..###..",
    ".##....",
    "#......",
  ],
  invader: [
    "..#.....#..",
    "...#...#...",
    "..#######..",
    ".##.###.##.",
    "###########",
    "#.#######.#",
    "#.#.....#.#",
    "...##.##...",
  ],
} as const;

export type PixelIconName = keyof typeof ICONS;

export function PixelIcon({ name, className }: { name: PixelIconName; className?: string }) {
  const rows = ICONS[name];
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden
      className={className}
    >
      {rows.flatMap((row, y) =>
        [...row].map((c, x) => (c === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null)),
      )}
    </svg>
  );
}
