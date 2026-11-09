import "server-only";

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

const hits = new Map<string, number[]>();

/**
 * Minimal in-memory sliding-window limiter, keyed by an arbitrary string
 * (we use the client IP). It is per server process — on serverless/multi-
 * instance hosting each instance counts separately — so treat it as a
 * speed bump against accidental floods, not as real abuse protection;
 * that belongs in front of the app (Cloudflare/Nginx), see cms/CLAUDE.md.
 * Returns true when the request is allowed.
 */
export function checkRateLimit(key: string, { limit, windowMs }: RateLimitOptions): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [storedKey, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(storedKey);
    }
  }
  return true;
}
