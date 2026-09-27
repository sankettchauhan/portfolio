/**
 * Hand-drawn pixel-art avatar (original art), used in the hero in place of
 * a photo. Likeness cues — dark hair, glasses, beard — are fixed so the
 * character reads the same in every palette; the lenses and collar use the
 * active accent color, so it visibly "wears" whichever theme is on.
 *
 * The grid itself lives in lib/avatar-grid.ts, shared with the static
 * share-preview images (opengraph-image / twitter-image).
 */
import { AVATAR_FIXED_COLORS, AVATAR_GRID } from "@/lib/avatar-grid";

const PALETTE: Record<string, string> = {
  ...AVATAR_FIXED_COLORS,
  L: "var(--accent-soft)", // lenses — reflects the active theme
  C: "var(--accent)", // collar — reflects the active theme
};

export function AvatarSprite({ className }: { className?: string }) {
  const size = AVATAR_GRID.length;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel-art avatar of Sanket"
      className={className}
    >
      {AVATAR_GRID.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PALETTE[c]} />,
        ),
      )}
    </svg>
  );
}
