import "server-only";
import qs from "qs";
import { routing } from "@/i18n/routing";
import type {
  Announcement,
  Church,
  ChurchType,
  Concert,
  ContactMessageInput,
  ContactPage,
  Event,
  Global,
  HistoryPage,
  Homepage,
  MassLanguage,
  Page,
  ParishPage,
  ReservationInput,
  ExcursionInput,
  VisitPage,
} from "@/types/content";
import type { StrapiContactLocation, StrapiResponse } from "@/types/strapi";

/**
 * Server-only Strapi data-access layer.
 *
 * Security boundaries enforced here:
 * - `import "server-only"` makes this module a hard build error if it is
 *   ever imported from a Client Component, so `STRAPI_API_TOKEN` /
 *   `STRAPI_FORMS_TOKEN` can never end up in client JS.
 * - No function accepts a raw filter/query object from the caller. Every
 *   exported function has a fixed, narrow signature and builds its own
 *   Strapi query internally — callers can never inject arbitrary
 *   `filters[...]`/`sort`/`populate` values.
 * - `page`/`pageSize`/`locale` inputs (which usually originate from a URL
 *   search param, i.e. attacker-controlled) are clamped/allow-listed before
 *   they reach the query builder.
 * - Every request has a hard timeout so a slow/unreachable CMS can't hang
 *   a render indefinitely.
 */

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const STRAPI_FORMS_TOKEN = process.env.STRAPI_FORMS_TOKEN;

if (!STRAPI_URL) {
  throw new Error("Missing STRAPI_URL environment variable");
}

const FETCH_TIMEOUT_MS = 8000;
const MAX_PAGE_SIZE = 24;
const DEFAULT_PAGE_SIZE = 6;

export class StrapiFetchError extends Error {
  constructor(
    public readonly status: number,
    public readonly endpoint: string,
  ) {
    super(`Strapi request failed (${status}): ${endpoint}`);
    this.name = "StrapiFetchError";
  }
}

// ---------------------------------------------------------------------------
// Input sanitizers — every value that can originate from a URL/user input
// passes through one of these before it's allowed into a query.
// ---------------------------------------------------------------------------

type Locale = (typeof routing.locales)[number];

export function sanitizeLocale(locale: string | undefined | null): Locale {
  if (locale && (routing.locales as readonly string[]).includes(locale)) {
    return locale as Locale;
  }
  return routing.defaultLocale;
}

export function sanitizePage(value: string | number | undefined | null): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

export function sanitizePageSize(value: number, max: number = MAX_PAGE_SIZE): number {
  if (!Number.isFinite(value) || value < 1) return DEFAULT_PAGE_SIZE;
  return Math.min(Math.floor(value), max);
}

// ---------------------------------------------------------------------------
// Core fetch wrapper
// ---------------------------------------------------------------------------

interface FetchOptions {
  /** Seconds; `false` disables ISR caching (revalidate on every request). */
  revalidate?: number | false;
  /** Cache tags for on-demand revalidation via /api/revalidate. */
  tags?: string[];
}

// In development, ISR caching means an edited Strapi field can survive a
// hard refresh for minutes (up to each function's `revalidate` value) —
// confusing while actively authoring content. Production keeps the real
// per-type revalidate/tags strategy documented in web/CLAUDE.md.
const isDev = process.env.NODE_ENV !== "production";

async function fetchStrapi<T>(
  endpoint: string,
  query: Record<string, unknown> = {},
  { revalidate = 60, tags }: FetchOptions = {},
): Promise<T> {
  const queryString = qs.stringify(query, { encodeValuesOnly: true, arrayFormat: "brackets" });
  const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ""}`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : undefined,
      ...(isDev ? { cache: "no-store" as const } : { next: { revalidate, tags } }),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch {
    throw new StrapiFetchError(0, endpoint);
  }

  if (!res.ok) {
    throw new StrapiFetchError(res.status, endpoint);
  }

  return (await res.json()) as T;
}

/** POST helper for form submissions — uses the write-only forms token, never the read token. */
async function postStrapi(endpoint: string, data: object): Promise<void> {
  if (!STRAPI_FORMS_TOKEN) {
    throw new Error("Missing STRAPI_FORMS_TOKEN environment variable");
  }

  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_FORMS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
    cache: "no-store",
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new StrapiFetchError(res.status, endpoint);
  }
}

// ---------------------------------------------------------------------------
// Populate fragments — dynamic-zone / component media & sub-components need
// to be populated explicitly in Strapi 5 (the `on` syntax targets each
// possible dynamic-zone component by its UID).
// ---------------------------------------------------------------------------

const seoPopulate = { seo: { populate: { ogImage: true } } };

const flexibleSectionsPopulate = {
  sections: {
    on: {
      "sections.rich-text": true,
      "sections.image-text": { populate: { image: true, cta: true, meta: true } },
      "sections.cta-banner": { populate: { cta: true } },
      "sections.gallery": { populate: { images: true } },
      "sections.faq": { populate: { items: true } },
      "sections.mass-schedule": { populate: { schedule: true, image: true } },
    },
  },
};

const homepageSectionsPopulate = {
  sections: {
    on: {
      "sections.announcements-preview": true,
      "sections.mass-schedule": { populate: { schedule: true, image: true } },
      "sections.churches-preview": true,
      "sections.contacts": {
        populate: { locations: { populate: { photo: true, hours: true } } },
      },
    },
  },
};

const parishPageSectionsPopulate = {
  sections: {
    on: {
      "sections.quick-nav": { populate: { items: true } },
      "sections.announcements-preview": true,
      "sections.image-text": { populate: { image: true, cta: true, meta: true } },
      "sections.rich-text": true,
      "sections.faq": { populate: { items: true } },
    },
  },
};

// ---------------------------------------------------------------------------
// Church
// ---------------------------------------------------------------------------

/** Raw shape of `shared.mass-time` as it actually comes back from Strapi (`times` is a comma-separated string, not JSON — see cms/CLAUDE.md). */
interface RawMassTime {
  dayLabel: string;
  times: string;
  language: MassLanguage;
}

function parseCommaList(value: string | null | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeMassSchedule(schedule: unknown): { dayLabel: string; times: string[]; language: MassLanguage }[] {
  return (schedule as RawMassTime[]).map((row) => ({
    dayLabel: row.dayLabel,
    times: parseCommaList(row.times),
    language: row.language,
  }));
}

/** Normalizes `schedule[].times` on any `sections.mass-schedule` dynamic-zone entry. */
function normalizeSections<T extends { __component: string; schedule?: unknown }>(sections: T[]): T[] {
  return sections.map((section) =>
    section.__component === "sections.mass-schedule"
      ? { ...section, schedule: normalizeMassSchedule(section.schedule) }
      : section,
  );
}

/**
 * Strapi returns `null` (not `[]`) for an unpopulated `media, multiple: true`
 * field, and `massSchedule[].times` comes back as a comma-separated string
 * (see `RawMassTime`) — both are coerced here into the clean `Church` shape.
 */
function normalizeChurch(church: Church): Church {
  return {
    ...church,
    gallery: church.gallery ?? [],
    massSchedule: normalizeMassSchedule(church.massSchedule),
  };
}

export async function getChurches({
  locale,
  type,
}: {
  locale: string;
  type?: ChurchType;
}): Promise<Church[]> {
  const response = await fetchStrapi<StrapiResponse<Church[]>>(
    "churches",
    {
      locale: sanitizeLocale(locale),
      sort: ["order:asc", "name:asc"],
      populate: { photo: true, gallery: true, massSchedule: true },
      ...(type ? { filters: { type: { $eq: type } } } : {}),
    },
    { revalidate: 3600, tags: ["churches"] },
  );
  return response.data.map(normalizeChurch);
}

export async function getChurchBySlug({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}): Promise<Church | null> {
  const response = await fetchStrapi<StrapiResponse<Church[]>>(
    "churches",
    {
      locale: sanitizeLocale(locale),
      filters: { slug: { $eq: slug } },
      populate: { photo: true, gallery: true, massSchedule: true, ...seoPopulate },
      pagination: { limit: 1 },
    },
    { revalidate: 3600, tags: ["churches"] },
  );
  const church = response.data[0];
  return church ? normalizeChurch(church) : null;
}

// ---------------------------------------------------------------------------
// Announcement
// ---------------------------------------------------------------------------

export async function getAnnouncements({
  locale,
  page,
  pageSize = DEFAULT_PAGE_SIZE,
}: {
  locale: string;
  page?: string | number;
  pageSize?: number;
}): Promise<{ items: Announcement[]; pagination: StrapiResponse<unknown>["meta"]["pagination"] }> {
  const response = await fetchStrapi<StrapiResponse<Announcement[]>>(
    "announcements",
    {
      locale: sanitizeLocale(locale),
      sort: ["date:desc"],
      pagination: { page: sanitizePage(page), pageSize: sanitizePageSize(pageSize) },
    },
    { revalidate: 60, tags: ["announcements"] },
  );
  return { items: response.data, pagination: response.meta.pagination };
}

export async function getLatestAnnouncements({
  locale,
  limit = 3,
}: {
  locale: string;
  limit?: number;
}): Promise<Announcement[]> {
  const response = await fetchStrapi<StrapiResponse<Announcement[]>>(
    "announcements",
    {
      locale: sanitizeLocale(locale),
      sort: ["date:desc"],
      pagination: { limit: sanitizePageSize(limit, 12) },
    },
    { revalidate: 60, tags: ["announcements"] },
  );
  return response.data;
}

export async function getAnnouncementBySlug({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}): Promise<Announcement | null> {
  const response = await fetchStrapi<StrapiResponse<Announcement[]>>(
    "announcements",
    {
      locale: sanitizeLocale(locale),
      filters: { slug: { $eq: slug } },
      populate: seoPopulate,
      pagination: { limit: 1 },
    },
    { revalidate: 60, tags: ["announcements"] },
  );
  return response.data[0] ?? null;
}

/**
 * Fetches the chronological neighbours of `date` directly via the API
 * (two narrow `$lt`/`$gt` queries, limit 1 each) instead of pulling the
 * whole collection into memory to find them — the mock implementation this
 * replaces sorted every announcement on every request.
 */
export async function getAdjacentAnnouncements({
  locale,
  date,
}: {
  locale: string;
  date: string;
}): Promise<{ previous: Announcement | null; next: Announcement | null }> {
  const safeLocale = sanitizeLocale(locale);

  const [previousRes, nextRes] = await Promise.all([
    fetchStrapi<StrapiResponse<Announcement[]>>(
      "announcements",
      {
        locale: safeLocale,
        filters: { date: { $lt: date } },
        sort: ["date:desc"],
        pagination: { limit: 1 },
      },
      { revalidate: 60, tags: ["announcements"] },
    ),
    fetchStrapi<StrapiResponse<Announcement[]>>(
      "announcements",
      {
        locale: safeLocale,
        filters: { date: { $gt: date } },
        sort: ["date:asc"],
        pagination: { limit: 1 },
      },
      { revalidate: 60, tags: ["announcements"] },
    ),
  ]);

  return {
    previous: previousRes.data[0] ?? null,
    next: nextRes.data[0] ?? null,
  };
}

export async function getOlderAnnouncements({
  locale,
  excludeSlug,
  limit = 3,
}: {
  locale: string;
  excludeSlug: string;
  limit?: number;
}): Promise<Announcement[]> {
  const response = await fetchStrapi<StrapiResponse<Announcement[]>>(
    "announcements",
    {
      locale: sanitizeLocale(locale),
      filters: { slug: { $ne: excludeSlug } },
      sort: ["date:desc"],
      pagination: { limit: sanitizePageSize(limit, 12) },
    },
    { revalidate: 60, tags: ["announcements"] },
  );
  return response.data;
}

// ---------------------------------------------------------------------------
// Concert
// ---------------------------------------------------------------------------

export async function getConcerts({
  locale,
  upcomingOnly = true,
}: {
  locale: string;
  upcomingOnly?: boolean;
}): Promise<Concert[]> {
  const response = await fetchStrapi<StrapiResponse<Concert[]>>(
    "concerts",
    {
      locale: sanitizeLocale(locale),
      sort: ["date:asc"],
      populate: { photo: true },
      ...(upcomingOnly ? { filters: { date: { $gte: new Date().toISOString() } } } : {}),
    },
    { revalidate: 3600, tags: ["concerts"] },
  );
  return response.data;
}

export async function getConcertBySlug({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}): Promise<Concert | null> {
  const response = await fetchStrapi<StrapiResponse<Concert[]>>(
    "concerts",
    {
      locale: sanitizeLocale(locale),
      filters: { slug: { $eq: slug } },
      populate: { photo: true, ...seoPopulate },
      pagination: { limit: 1 },
    },
    { revalidate: 3600, tags: ["concerts"] },
  );
  return response.data[0] ?? null;
}

// ---------------------------------------------------------------------------
// Generic flexible Page (Kapitulská, Martineum, Sprievodca, Audioguides, ...)
// ---------------------------------------------------------------------------

export async function getPageBySlug({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}): Promise<Page | null> {
  const response = await fetchStrapi<StrapiResponse<Page[]>>(
    "pages",
    {
      locale: sanitizeLocale(locale),
      filters: { slug: { $eq: slug } },
      populate: { heroImage: true, ...flexibleSectionsPopulate, ...seoPopulate },
      pagination: { limit: 1 },
    },
    { revalidate: 86400, tags: ["pages", `page:${slug}`] },
  );
  const page = response.data[0];
  if (!page) return null;
  return { ...page, sections: normalizeSections(page.sections) };
}

// ---------------------------------------------------------------------------
// Single types
// ---------------------------------------------------------------------------

export async function getHomepage({ locale }: { locale: string }): Promise<Homepage> {
  const response = await fetchStrapi<StrapiResponse<Homepage>>(
    "homepage",
    {
      locale: sanitizeLocale(locale),
      populate: {
        hero: { populate: { images: true, ctaPrimary: true, ctaSecondary: true } },
        quickLinks: { populate: { image: true, icon: true } },
        ...homepageSectionsPopulate,
        ...seoPopulate,
      },
    },
    { revalidate: 300, tags: ["homepage"] },
  );
  return { ...response.data, sections: normalizeSections(response.data.sections) };
}

export async function getParishPage({ locale }: { locale: string }): Promise<ParishPage> {
  const response = await fetchStrapi<StrapiResponse<ParishPage>>(
    "parish-page",
    {
      locale: sanitizeLocale(locale),
      populate: { heroImage: true, ...parishPageSectionsPopulate, ...seoPopulate },
    },
    { revalidate: 300, tags: ["parish-page"] },
  );
  return response.data;
}

export async function getVisitPage({ locale }: { locale: string }): Promise<VisitPage> {
  const response = await fetchStrapi<StrapiResponse<VisitPage>>(
    "visit-page",
    {
      locale: sanitizeLocale(locale),
      populate: {
        heroImage: true,
        stats: true,
        martineumImages: true,
        services: true,
        journeySteps: { populate: { image: true } },
        cellarsImage: true,
        hours: true,
        tickets: true,
        restrictions: true,
        qrCodeReservation: true,
        qrCodeWallet: true,
        ...flexibleSectionsPopulate,
        ...seoPopulate,
      },
    },
    { revalidate: 86400, tags: ["visit-page"] },
  );
  return {
    ...response.data,
    martineumAwards: parseCommaList(response.data.martineumAwards as unknown as string | undefined),
    martineumImages: response.data.martineumImages ?? [],
  };
}

/** `tags` comes back from Strapi as a comma-separated string, not JSON (see cms/CLAUDE.md). */
function normalizeContactLocation(location: StrapiContactLocation): StrapiContactLocation {
  return { ...location, tags: parseCommaList(location.tags as unknown as string | undefined) };
}

export async function getContactPage({ locale }: { locale: string }): Promise<ContactPage> {
  const response = await fetchStrapi<StrapiResponse<ContactPage>>(
    "contact-page",
    {
      locale: sanitizeLocale(locale),
      populate: {
        locations: { populate: { photo: true, hours: true } },
        ...flexibleSectionsPopulate,
        ...seoPopulate,
      },
    },
    { revalidate: 86400, tags: ["contact-page"] },
  );
  return { ...response.data, locations: response.data.locations.map(normalizeContactLocation) };
}

export async function getHistoryPage({ locale }: { locale: string }): Promise<HistoryPage> {
  const response = await fetchStrapi<StrapiResponse<HistoryPage>>(
    "history-page",
    {
      locale: sanitizeLocale(locale),
      populate: {
        heroImage: true,
        timelineEvents: true,
        coronationsKings: true,
        historyImages: true,
        chapelImage: true,
        kapitulskaImages: true,
        ...seoPopulate,
      },
    },
    { revalidate: 86400, tags: ["history-page"] },
  );
  return {
    ...response.data,
    historyImages: response.data.historyImages ?? [],
    kapitulskaImages: response.data.kapitulskaImages ?? [],
  };
}

// ---------------------------------------------------------------------------
// Event (homepage calendar)
// ---------------------------------------------------------------------------

export async function getEvents({
  locale,
  upcomingOnly = true,
}: {
  locale: string;
  upcomingOnly?: boolean;
}): Promise<Event[]> {
  const response = await fetchStrapi<StrapiResponse<Event[]>>(
    "events",
    {
      locale: sanitizeLocale(locale),
      sort: ["date:asc"],
      ...(upcomingOnly
        ? { filters: { date: { $gte: new Date().toISOString().slice(0, 10) } } }
        : {}),
    },
    { revalidate: 300, tags: ["events"] },
  );
  return response.data;
}

// ---------------------------------------------------------------------------
// Global (site-wide brand/footer settings)
// ---------------------------------------------------------------------------

export async function getGlobal({ locale }: { locale: string }): Promise<Global> {
  const response = await fetchStrapi<StrapiResponse<Global>>(
    "global",
    {
      locale: sanitizeLocale(locale),
      populate: { ...seoPopulate },
    },
    { revalidate: 86400, tags: ["global"] },
  );
  return response.data;
}

// ---------------------------------------------------------------------------
// Form submissions — write-only, uses STRAPI_FORMS_TOKEN (never the read
// token). Callers are expected to have already validated `input` with zod
// in the Server Action; this layer only transports it.
// ---------------------------------------------------------------------------

export async function createReservation(input: ReservationInput): Promise<void> {
  await postStrapi("reservations", input);
}

export async function createExcursion(input: ExcursionInput): Promise<void> {
  await postStrapi("excursions", input);
}

export async function createContactMessage(input: ContactMessageInput): Promise<void> {
  await postStrapi("contact-messages", input);
}
