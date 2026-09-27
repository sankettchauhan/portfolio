/**
 * Shared 16x16 pixel-art avatar grid — the single source of drawn pixels
 * for both the live `<AvatarSprite>` (theme-reactive, CSS vars) and the
 * static share-preview images (opengraph-image / twitter-image, which run
 * outside any page and can't resolve CSS custom properties).
 */
export const AVATAR_GRID = [
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

/** Colors that never change with the theme — hair, skin, glasses frame, beard, mouth. */
export const AVATAR_FIXED_COLORS: Record<string, string> = {
  "#": "#2b1e14", // hair / outline (warm dark brown, not pure black)
  S: "#caa07a", // skin
  G: "#141110", // glasses frame
  B: "#4a3a2c", // beard (visibly darker than skin, lighter than hair)
  K: "#1c140e", // mouth
};

/**
 * Builds a standalone SVG markup string for the avatar with explicit colors
 * (no CSS vars) — used to embed the avatar as a data URI `<img>` inside a
 * next/og ImageResponse, which renders outside the page's stylesheet.
 */
export function renderAvatarSvg({ accent, lensColor }: { accent: string; lensColor: string }): string {
  const size = AVATAR_GRID.length;
  const colors: Record<string, string> = { ...AVATAR_FIXED_COLORS, L: lensColor, C: accent };
  const rects = AVATAR_GRID.flatMap((row, y) =>
    [...row].map((c, x) => (c === "." ? "" : `<rect x="${x}" y="${y}" width="1" height="1" fill="${colors[c]}"/>`)),
  ).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">${rects}</svg>`;
}
