/**
 * Hand-drawn 16x16 pixel-art avatar (original art), used in the hero in
 * place of a photo. Likeness cues — dark hair, glasses, beard — are fixed
 * so the character reads the same in every palette; the lenses and collar
 * use the active accent color, so it visibly "wears" whichever theme is on.
 */
const GRID = [
  "................",
  "....########....",
  "...##########...",
  "..############..",
  "..#SSSSSSSSSS#..",
  ".#SSSSSSSSSSSS#.",
  ".#SSSSSSSSSSSS#.",
  ".#SGGGGGGGGGGS#.",
  ".#SGLLGGGGLLGS#.",
  ".#SGGGGGGGGGGS#.",
  "..#SSSSSSSSSS#..",
  "..#SSBBBBBBSS#..",
  "..#BBBKKKKBBB#..",
  "..#BBBBBBBBBB#..",
  "...#SSSSSSSS#...",
  "..#CCCCCCCCCC#..",
] as const;

const PALETTE: Record<string, string> = {
  "#": "#2b1e14", // hair / outline (warm dark brown, not pure black)
  S: "#caa07a", // skin
  G: "#141110", // glasses frame
  L: "var(--accent-soft)", // lenses — reflects the active theme
  B: "#4a3a2c", // beard (visibly darker than skin, lighter than hair)
  K: "#1c140e", // mouth
  C: "var(--accent)", // collar — reflects the active theme
};

export function AvatarSprite({ className }: { className?: string }) {
  const size = GRID.length;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel-art avatar of Sanket"
      className={className}
    >
      {GRID.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PALETTE[c]} />,
        ),
      )}
    </svg>
  );
}
