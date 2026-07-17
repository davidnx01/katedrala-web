import "server-only";
import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand ISR endpoint. Point a Strapi webhook (Settings → Webhooks) at
 * `POST {FRONTEND_URL}/api/revalidate` for entry publish/update/delete on
 * every content type, with header `x-revalidate-secret: <REVALIDATE_SECRET>`
 * and body `{ "model": "church" }` (Strapi sends the content-type UID as
 * `model` in its webhook payload — we map it to our cache tag below).
 *
 * This lets published content appear immediately instead of waiting out the
 * timed `revalidate` window in lib/api.ts, while that window still acts as
 * a safety net if a webhook call is ever missed.
 */

const MODEL_TO_TAG: Record<string, string> = {
  church: "churches",
  announcement: "announcements",
  concert: "concerts",
  page: "pages",
  homepage: "homepage",
  "parish-page": "parish-page",
  "visit-page": "visit-page",
  "contact-page": "contact-page",
  event: "events",
  global: "global",
};

function isValidSecret(provided: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !provided) return false;

  const providedBuf = Buffer.from(provided);
  const expectedBuf = Buffer.from(expected);
  if (providedBuf.length !== expectedBuf.length) return false;

  return timingSafeEqual(providedBuf, expectedBuf);
}

export async function POST(request: NextRequest) {
  if (!isValidSecret(request.headers.get("x-revalidate-secret"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const model = typeof body?.model === "string" ? body.model : null;
  const tag = model ? MODEL_TO_TAG[model] : null;

  if (!tag) {
    return NextResponse.json({ error: "Unknown or missing model" }, { status: 400 });
  }

  revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: tag });
}
