import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isDev = process.env.NODE_ENV !== "production";

// Strapi media URLs (`getStrapiMediaUrl()`) point at the CMS origin, not this
// app — next/image refuses to optimize any remote host that isn't allowlisted
// here. Derived from the same env var used at fetch time so a prod deploy
// with a different STRAPI_URL doesn't need a matching code change.
const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337");

// Next.js refuses to optimize (SSRF guard) any remote image whose host
// resolves to a loopback/private address — true for `localhost` even with a
// matching remotePatterns entry. Only ever the case for a local dev Strapi;
// a real deployment's STRAPI_URL is a public domain, so optimization stays on.
const isLocalStrapi = ["localhost", "127.0.0.1", "::1"].includes(strapiUrl.hostname);

const nextConfig: NextConfig = {
  images: {
    // Skip the image optimizer (and its on-disk cache) in dev, so an
    // overwritten file under public/ shows up on the next reload instead
    // of a stale resized copy.
    unoptimized: isDev || isLocalStrapi,
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
        pathname: "/uploads/**",
      },
    ],
  },
  async headers() {
    if (!isDev) return [];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
