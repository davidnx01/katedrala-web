import type { Metadata } from "next";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { StrapiMedia } from "@/types/strapi";
import type { Global } from "@/types/content";

/** Production domain — used by sitemap.ts, robots.ts and the root layout's metadataBase. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Strips common markdown syntax so richtext content reads cleanly as a plain-text meta description. */
export function stripMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/`{1,3}([^`]*)`{1,3}/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Truncates to `maxLength` at the nearest word boundary, appending an ellipsis when cut. */
export function excerpt(text: string, maxLength = 155): string {
  const clean = stripMarkdown(text);
  if (clean.length <= maxLength) return clean;
  const truncated = clean.slice(0, maxLength);
  return `${truncated.slice(0, truncated.lastIndexOf(" "))}…`;
}

interface BuildMetadataInput {
  title: string;
  description?: string;
  image?: StrapiMedia | null;
  noIndex?: boolean;
  /** Site-wide fallback (Global.seo) used when a page/record has no description or image of its own. */
  global?: Global | null;
}

/**
 * Single source of truth for page `<title>`/description/OG image across the
 * site. Dynamic detail pages (church/announcement/event) call this with
 * values derived straight from their own content fields — they have no
 * Strapi `seo` component, see cms/CLAUDE.md "SEO polia". Single-type pages
 * pass their own `seo` component's fields through as title/description/image.
 */
export function buildMetadata({
  title,
  description,
  image,
  noIndex,
  global,
}: BuildMetadataInput): Metadata {
  const resolvedDescription = description || global?.seo?.metaDescription || undefined;
  const resolvedImage = image ?? global?.seo?.ogImage ?? undefined;
  const imageUrl = getStrapiMediaUrl(resolvedImage) ?? undefined;

  return {
    title,
    description: resolvedDescription,
    robots: noIndex ? { index: false } : undefined,
    openGraph: {
      title,
      description: resolvedDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
