/**
 * Vector outline map for the travel tile. Rendered on the server (the country
 * data never reaches the browser) and auto-fits to the pins, so adding a trip
 * abroad just widens the view. Country shapes: Natural Earth (public domain)
 * via world-atlas.
 */
import { geoContains, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, MultiPoint } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";
import world from "world-atlas/countries-50m.json";
import type { Place } from "@/content/hobbies";

const W = 800;
const H = 500;
// Generous padding: the SVG uses "slice", so wide tiles crop top/bottom and
// narrow (phone) tiles crop the sides.
const PAD_X = 150;
const PAD_Y = 95;

const countries = feature(
  world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>,
  (world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>).objects.countries,
) as FeatureCollection<GeoJSON.Geometry, { name: string }>;

/**
 * Shrinks d3's path output: whole-pixel coordinates and drops points closer
 * than MIN_STEP to the previous one. Server components are serialized twice
 * (HTML + RSC payload), so every byte here counts double.
 */
const MIN_STEP = 4;
function compact(d: string | null) {
  if (!d) return "";
  // Each subpath is "x,yLx,y…" optionally ending in "Z"; drop specks entirely.
  return d
    .split("M")
    .filter(Boolean)
    .map((sub) => {
      const closed = sub.endsWith("Z");
      const pts = (closed ? sub.slice(0, -1) : sub).split("L").map((p) => p.split(",").map(Number));
      const kept: number[][] = [];
      for (const [x, y] of pts) {
        const last = kept[kept.length - 1];
        if (!last || Math.hypot(x - last[0], y - last[1]) >= MIN_STEP) kept.push([x, y]);
      }
      if (kept.length < 3) return "";
      return "M" + kept.map(([x, y]) => `${Math.round(x)},${Math.round(y)}`).join("L") + (closed ? "Z" : "");
    })
    .join("");
}

type Layout = {
  shapes: { name: string; d: string; visited: boolean }[];
  pins: { name: string; x: number; y: number; showLabel: boolean }[];
};

// Projecting ~240 country outlines is the slowest part of the homepage render,
// so memoize per pin set (module-level: survives across requests in dev too).
const layoutCache = new Map<string, Layout>();

function computeLayout(places: Place[]): Layout {
  const key = JSON.stringify(places);
  const cached = layoutCache.get(key);
  if (cached) return cached;

  const pins: Feature<MultiPoint> = {
    type: "Feature",
    properties: {},
    geometry: { type: "MultiPoint", coordinates: places.map((p) => [p.lng, p.lat]) },
  };
  // Fit to the pins with padding; cap the zoom so a single-city list still shows context.
  const projection = geoMercator().fitExtent(
    [
      [PAD_X, PAD_Y],
      [W - PAD_X, H - PAD_Y],
    ],
    pins,
  );
  projection.scale(Math.min(projection.scale(), 1400));
  const [cx, cy] = projection([
    (Math.min(...places.map((p) => p.lng)) + Math.max(...places.map((p) => p.lng))) / 2,
    (Math.min(...places.map((p) => p.lat)) + Math.max(...places.map((p) => p.lat))) / 2,
  ])!;
  projection.translate([projection.translate()[0] + W / 2 - cx, projection.translate()[1] + H / 2 - cy]);
  projection.clipExtent([
    [-10, -10],
    [W + 10, H + 10],
  ]);
  const path = geoPath(projection);

  const layout: Layout = {
    shapes: countries.features
      .map((f) => ({ name: f.properties.name, d: compact(path(f)), feature: f }))
      .filter((s) => s.d)
      // Point-in-polygon only for the handful of countries actually on screen.
      .map(({ name, d, feature: f }) => ({ name, d, visited: places.some((p) => geoContains(f, [p.lng, p.lat])) })),
    pins: places.map((p) => {
      const [x, y] = projection([p.lng, p.lat])!;
      return { name: p.name, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, showLabel: p.label !== false };
    }),
  };
  layoutCache.set(key, layout);
  return layout;
}

export function TravelMap({ places, className }: { places: Place[]; className?: string }) {
  const { shapes, pins } = computeLayout(places);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden className={className}>
      <defs>
        <pattern id="travel-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--grid)" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#travel-grid)" />
      {shapes.map((s) => (
        <path
          key={s.name}
          d={s.d}
          fill={s.visited ? "var(--accent-soft)" : "var(--surface-2)"}
          stroke={s.visited ? "var(--accent)" : "var(--border-strong)"}
          strokeWidth={s.visited ? 1.2 : 0.8}
          strokeLinejoin="round"
        />
      ))}
      {pins.map((p) =>
        p.showLabel ? (
          <g key={p.name} transform={`translate(${p.x} ${p.y})`}>
            <circle r="9" fill="var(--accent)" opacity="0.18" />
            <circle r="4.5" fill="var(--accent)" stroke="var(--bg)" strokeWidth="2" />
            <text x="10" y="4" fontSize="13" fontFamily="var(--font-mono)" fill="var(--fg)" paintOrder="stroke" stroke="var(--surface)" strokeWidth="4">
              {p.name}
            </text>
          </g>
        ) : (
          // Unlabeled dot (e.g. an Indian state) — smaller and quieter than a
          // country pin, since ten of these sit close together.
          <circle key={p.name} cx={p.x} cy={p.y} r="3" fill="var(--accent)" stroke="var(--bg)" strokeWidth="1.5" opacity="0.85" />
        ),
      )}
    </svg>
  );
}
