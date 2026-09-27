/**
 * Renders a pre-built map image (see scripts/build-maps.mjs) centered in its
 * container, tinted with the theme accent, with pins projected onto it.
 * No tile server or API key at runtime.
 */
import maps from "@/content/generated/maps.json";

const TILE = 256;
// Images are rendered at 2x pixel density for crisp retina display.
const DISPLAY_SCALE = 0.5;

export type MapName = keyof typeof maps;
type Pin = { lat: number; lng: number; label?: string };

function project(lat: number, lng: number, z: number) {
  const size = TILE * 2 ** z;
  const rad = (lat * Math.PI) / 180;
  return {
    x: ((lng + 180) / 360) * size,
    y: ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * size,
  };
}

export function StaticMap({
  map,
  pins = [],
  showCenterPin = false,
  label,
  className,
}: {
  map: MapName;
  pins?: Pin[];
  showCenterPin?: boolean;
  label: string;
  className?: string;
}) {
  const m = maps[map];
  const c = project(m.lat, m.lng, m.zoom);
  const w = m.width * DISPLAY_SCALE;
  const h = m.height * DISPLAY_SCALE;
  const imgStyle = { width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2 };

  return (
    <div role="img" aria-label={label} className={`relative overflow-hidden bg-surface-2 ${className ?? ""}`}>
      {/* This map only ever appears in the "currently based in" bento tile,
          near the top of the homepage — eager-loaded since it's practically
          always in or near the initial viewport, unlike a typical <img> lower
          on the page. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size decorative raster */}
      <img alt="" src={`/maps/${map}-dark.webp`} loading="eager" className="map-tile-dark absolute left-1/2 top-1/2 max-w-none" style={imgStyle} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={`/maps/${map}-light.webp`} loading="eager" className="map-tile-light absolute left-1/2 top-1/2 max-w-none" style={imgStyle} />

      <div aria-hidden className="map-tint pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, var(--surface) 100%)" }}
      />

      {showCenterPin && <MapPin left={0} top={0} pulse />}
      {pins.map((p) => {
        const pt = project(p.lat, p.lng, m.zoom);
        return (
          <MapPin
            key={`${p.lat},${p.lng}`}
            left={(pt.x - c.x) * DISPLAY_SCALE}
            top={(pt.y - c.y) * DISPLAY_SCALE}
            label={p.label}
          />
        );
      })}

      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-1 right-1.5 font-mono text-[9px] text-subtle hover:text-muted"
      >
        © OpenStreetMap
      </a>
    </div>
  );
}

function MapPin({ left, top, label, pulse }: { left: number; top: number; label?: string; pulse?: boolean }) {
  return (
    <span className="absolute" style={{ left: `calc(50% + ${left}px)`, top: `calc(50% + ${top}px)` }}>
      {pulse && <span aria-hidden className="absolute -left-3 -top-3 size-6 animate-ping rounded-full bg-accent/40" />}
      <span
        aria-hidden
        className="absolute -left-1.5 -top-1.5 size-3 rounded-full border-2 border-bg bg-accent shadow-[0_0_10px_var(--accent-glow)]"
      />
      {label && (
        <span className="absolute -top-2 left-2.5 whitespace-nowrap rounded bg-bg/85 px-1 font-mono text-[10px] text-fg">
          {label}
        </span>
      )}
    </span>
  );
}
