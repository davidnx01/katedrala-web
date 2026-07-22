import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAnnouncements, getChurches, getEvents } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

function localizedPath(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

const STATIC_ROUTES: { path: string; changeFrequency: ChangeFrequency; priority: number }[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/farnost", changeFrequency: "weekly", priority: 0.8 },
  { path: "/farnost/oznamy", changeFrequency: "daily", priority: 0.7 },
  { path: "/navsteva", changeFrequency: "monthly", priority: 0.8 },
  { path: "/kostoly", changeFrequency: "monthly", priority: 0.7 },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.6 },
  { path: "/historia", changeFrequency: "yearly", priority: 0.5 },
  { path: "/hudba", changeFrequency: "weekly", priority: 0.6 },
  { path: "/udalosti", changeFrequency: "daily", priority: 0.8 },
];

/** Walks every page of the announcements archive so the sitemap isn't capped at the public listing's page-size limit. */
async function getAllAnnouncements(locale: string) {
  const first = await getAnnouncements({ locale, page: 1 });
  const all = [...first.items];
  const pageCount = first.pagination?.pageCount ?? 1;
  for (let page = 2; page <= pageCount; page++) {
    const next = await getAnnouncements({ locale, page });
    all.push(...next.items);
  }
  return all;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: localizedPath(routing.defaultLocale, route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedPath(locale, route.path)]),
      ),
    },
  }));

  for (const locale of routing.locales) {
    const [churches, announcements, events] = await Promise.all([
      getChurches({ locale }).catch(() => []),
      getAllAnnouncements(locale).catch(() => []),
      getEvents({ locale, upcomingOnly: false }).catch(() => []),
    ]);

    for (const church of churches) {
      entries.push({
        url: localizedPath(locale, `/kostoly/${church.slug}`),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const announcement of announcements) {
      entries.push({
        url: localizedPath(locale, `/farnost/oznamy/${announcement.slug}`),
        lastModified: announcement.date,
        changeFrequency: "never",
        priority: 0.4,
      });
    }

    for (const event of events) {
      entries.push({
        url: localizedPath(locale, `/udalosti/${event.slug}`),
        lastModified: event.date,
        changeFrequency: "never",
        priority: 0.4,
      });
    }
  }

  return entries;
}
