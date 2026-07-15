import type { StrapiMedia } from "@/types/strapi";

const STRAPI_MEDIA_BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

/**
 * Resolves a Strapi media object into an absolute URL. Strapi's self-hosted
 * provider returns paths relative to the Strapi origin (`/uploads/...`); an
 * external provider (S3/Cloudinary) already returns an absolute URL, which is
 * passed through unchanged.
 *
 * Safe to import from Client Components — unlike `lib/api.ts`, this file
 * never touches the API token and only reads the public Strapi origin.
 */
export function getStrapiMediaUrl(media: StrapiMedia | null | undefined): string | null {
  if (!media?.url) return null;
  if (media.url.startsWith("http://") || media.url.startsWith("https://")) {
    return media.url;
  }
  return `${STRAPI_MEDIA_BASE}${media.url}`;
}
