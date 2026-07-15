import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  images: {
    // Skip the image optimizer (and its on-disk cache) in dev, so an
    // overwritten file under public/ shows up on the next reload instead
    // of a stale resized copy.
    unoptimized: isDev,
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
