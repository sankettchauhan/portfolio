import "server-only";

/**
 * Global click counter storage.
 *
 * Production: Upstash Redis over its REST API (no SDK needed). Set
 *   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 * or the KV_REST_API_URL / KV_REST_API_TOKEN pair that Vercel's Upstash
 * integration creates.
 *
 * Without credentials: an in-memory counter in development (so the tile is
 * demoable, resets on restart); disabled in production (the UI then hides
 * the global total instead of showing a fake number).
 *
 * Key is namespaced by deploy environment so local dev, Vercel preview
 * deploys and testing never add to the real production total. Only
 * VERCEL_ENV === "production" (the live site) writes to the bare key.
 */
const envSuffix =
  process.env.VERCEL_ENV === "production" ? "" : `:${process.env.VERCEL_ENV ?? "dev"}`;
const KEY = `portfolio:clicks${envSuffix}`;

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export type CounterMode = "redis" | "memory" | "off";
export const counterMode: CounterMode =
  url && token ? "redis" : process.env.NODE_ENV === "development" ? "memory" : "off";

let memory = 0;

async function redis(command: (string | number)[]): Promise<number> {
  const res = await fetch(url!, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash ${command[0]} failed: HTTP ${res.status}`);
  const { result } = (await res.json()) as { result: string | number | null };
  return Number(result ?? 0);
}

export async function getClicks(): Promise<number | null> {
  if (counterMode === "redis") return redis(["GET", KEY]);
  if (counterMode === "memory") return memory;
  return null;
}

export async function addClicks(n: number): Promise<number | null> {
  if (counterMode === "redis") return redis(["INCRBY", KEY, n]);
  if (counterMode === "memory") return (memory += n);
  return null;
}
