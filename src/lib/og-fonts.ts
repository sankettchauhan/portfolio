import "server-only";

/**
 * Fetches a static font file for use with next/og's ImageResponse, which
 * (unlike next/font) can't load fonts itself — it needs raw font bytes.
 * Google Fonts serves a legacy woff (not woff2) to browsers that predate
 * woff2 support, which is the simplest widely-used way to get a plain,
 * satori-compatible font file without vendoring one into the repo.
 *
 * Runs at build time for statically-generated OG images (the common case
 * here), so this network call happens once per build, not per visitor.
 */
const LEGACY_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2";

export async function fetchGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
    { headers: { "User-Agent": LEGACY_UA } },
  ).then((r) => r.text());
  const url = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`fetchGoogleFont: no font URL found for "${family}" ${weight}`);
  const res = await fetch(url);
  return res.arrayBuffer();
}
