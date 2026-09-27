import { addClicks, getClicks } from "@/lib/counter";

// Always hit storage; never serve a cached total.
export const dynamic = "force-dynamic";

// Clients batch rapid clicks into one request; anything above this per
// request is almost certainly scripted, so it's clamped rather than trusted.
const MAX_PER_REQUEST = 25;

const noStore = { "Cache-Control": "no-store" };

export async function GET() {
  try {
    return Response.json({ total: await getClicks() }, { headers: noStore });
  } catch (err) {
    console.error(err);
    return Response.json({ total: null }, { status: 503, headers: noStore });
  }
}

export async function POST(request: Request) {
  let n = 1;
  try {
    const body = (await request.json()) as { n?: unknown };
    if (typeof body.n === "number" && Number.isFinite(body.n)) n = Math.trunc(body.n);
  } catch {
    // Empty or invalid body (e.g. a bare beacon) counts as one click.
  }
  n = Math.min(Math.max(n, 1), MAX_PER_REQUEST);

  try {
    return Response.json({ total: await addClicks(n) }, { headers: noStore });
  } catch (err) {
    console.error(err);
    return Response.json({ total: null }, { status: 503, headers: noStore });
  }
}
