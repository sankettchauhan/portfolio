#!/usr/bin/env node
/**
 * Pre-renders the site's maps from OpenStreetMap tiles into static images, so
 * visitors never hit a tile server and no API key is needed.
 *
 *   npm run maps
 *
 * Re-run after changing a map's center/zoom below. Tiles are cached in
 * scripts/.tile-cache (gitignored), so re-runs are cheap and polite.
 * Map data © OpenStreetMap contributors (ODbL) — attribution is shown on the map.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const TILE = 256;
const ROOT = path.resolve(import.meta.dirname, "..");
const CACHE = path.join(ROOT, "scripts/.tile-cache");
const OUT = path.join(ROOT, "public/maps");
const META = path.join(ROOT, "src/content/generated/maps.json");
const UA = "sanketchauhan.me portfolio static map build";
const location = JSON.parse(await readFile(path.join(ROOT, "src/content/location.json"), "utf8"));

/**
 * Raster maps only (the travel map is vector: components/map/TravelMap.tsx).
 * name → center, tile zoom and output size in px (displayed at 0.5x for retina). */
const MAPS = {
  home: { lat: location.lat, lng: location.lng, zoom: 11, width: 1200, height: 800 },
};

function project(lat, lng, z) {
  const size = TILE * 2 ** z;
  const rad = (lat * Math.PI) / 180;
  return {
    x: ((lng + 180) / 360) * size,
    y: ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * size,
  };
}

async function tile(z, x, y) {
  const file = path.join(CACHE, `${z}-${x}-${y}.png`);
  if (existsSync(file)) return readFile(file);
  const res = await fetch(`https://tile.openstreetmap.org/${z}/${x}/${y}.png`, {
    headers: { "User-Agent": UA },
  });
  if (!res.ok) throw new Error(`tile ${z}/${x}/${y}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(file, buf);
  await new Promise((r) => setTimeout(r, 150)); // be gentle with the tile server
  return buf;
}

async function build(name, { lat, lng, zoom, width, height }) {
  const n = 2 ** zoom;
  const c = project(lat, lng, zoom);
  const x0 = c.x - width / 2;
  const y0 = c.y - height / 2;
  const composites = [];
  for (let tx = Math.floor(x0 / TILE); tx <= Math.floor((x0 + width) / TILE); tx++) {
    for (let ty = Math.floor(y0 / TILE); ty <= Math.floor((y0 + height) / TILE); ty++) {
      if (ty < 0 || ty >= n) continue;
      composites.push({
        input: await tile(zoom, ((tx % n) + n) % n, ty),
        left: Math.round(tx * TILE - x0),
        top: Math.round(ty * TILE - y0),
      });
    }
  }
  // Tiles overhang the canvas edges; composite onto a padded canvas, then crop.
  const pad = TILE;
  const base = sharp({
    create: { width: width + pad * 2, height: height + pad * 2, channels: 3, background: "#aad3df" },
  }).composite(composites.map((t) => ({ ...t, left: t.left + pad, top: t.top + pad })));
  const stitched = await sharp(await base.png().toBuffer())
    .extract({ left: pad, top: pad, width, height })
    .removeAlpha()
    .grayscale()
    .toBuffer();

  // Light variant: soft grey. Dark variant: inverted and dimmed.
  await sharp(stitched).linear(0.9, 20).webp({ quality: 78 }).toFile(path.join(OUT, `${name}-light.webp`));
  // sharp runs linear() before negate() regardless of call order, so invert in its own pass.
  const inverted = await sharp(stitched).negate({ alpha: false }).png().toBuffer();
  await sharp(inverted).linear(2, -36).webp({ quality: 78 }).toFile(path.join(OUT, `${name}-dark.webp`));
  console.log(`✓ ${name}: ${composites.length} tiles → public/maps/${name}-{light,dark}.webp`);
}

await mkdir(CACHE, { recursive: true });
await mkdir(OUT, { recursive: true });
await mkdir(path.dirname(META), { recursive: true });
for (const [name, cfg] of Object.entries(MAPS)) await build(name, cfg);
await writeFile(META, JSON.stringify(MAPS, null, 2) + "\n");
console.log("✓ wrote src/content/generated/maps.json");
