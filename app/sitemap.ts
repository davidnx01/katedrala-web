import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAnnouncements, getChurches, getEvents } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

interface StaticRoute {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

const STATIC_ROUTES: StaticRoute[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/farnost", changeFrequency: "weekly", priority: 0.8 },
  { path: "/farnost/oznamy", changeFrequency: "daily", priority: 0.7 },
  { path: "/navsteva", changeFrequency: "monthly", priority: 0.8 },
  { path: "/kostoly", changeFrequency: "monthly", priority: 0.7 },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.6 },
  { path: "/historia", changeFrequency: "yearly", priority: 0.5 },
  { path: "/hudba", changeFrequency: "weekly", priority: 0.6 },
  { path: "/udalosti", changeFrequency: "daily", priority: 0.8 },
  { path: "/ochrana-udajov", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.2 },
];

/** Absolute URL of a path in a locale; the default locale has no prefix (`localePrefix: "as-needed"`). */
function localizedUrl(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}` || SITE_URL;
}

/** hreflang map for a path that exists in every enabled locale, plus `x-default`. */
function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(routing.locales.map((locale) => [locale, localizedUrl(locale, path)])),
    "x-default": localizedUrl(routing.defaultLocale, path),
  };
}

/** Walks every page of the announcements archive so the sitemap isn't capped at the listing's page size. */
async function getAllAnnouncements(locale: string) {
  const first = await getAnnouncements({ locale, page: 1 });
  const all = [...first.items];
  const pageCount = first.pagination?.pageCount ?? 1;
  for (let page = 2; page <= pageCount; page++) {
    all.push(...(await getAnnouncements({ locale, page })).items);
  }
  return all;
}

/** A failing CMS must never break the sitemap — the affected section is simply left out. */
async function orEmpty<T>(label: string, load: Promise<T[]>): Promise<T[]> {
  try {
    return await load;
  } catch (error) {
    console.error(`[sitemap] could not load ${label}:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // One entry per language version of each static page; every entry lists all its siblings.
  const entries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    STATIC_ROUTES.map((route) => ({
      url: localizedUrl(locale, route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: languageAlternates(route.path) },
    })),
  );

  for (const locale of routing.locales) {
    const [churches, announcements, events] = await Promise.all([
      orEmpty("churches", getChurches({ locale })),
      orEmpty("announcements", getAllAnnouncements(locale)),
      orEmpty("events", getEvents({ locale, upcomingOnly: false })),
    ]);

    // Detail pages exist only in the languages their record was written in, so no hreflang here.
    for (const church of churches) {
      if (!church.slug) continue;
      entries.push({
        url: localizedUrl(locale, `/kostoly/${church.slug}`),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const announcement of announcements) {
      if (!announcement.slug) continue;
      entries.push({
        url: localizedUrl(locale, `/farnost/oznamy/${announcement.slug}`),
        lastModified: announcement.date,
        changeFrequency: "never",
        priority: 0.4,
      });
    }

    for (const event of events) {
      if (!event.slug) continue;
      entries.push({
        url: localizedUrl(locale, `/udalosti/${event.slug}`),
        lastModified: event.date,
        changeFrequency: "never",
        priority: 0.4,
      });
    }
  }

  return entries;
}
