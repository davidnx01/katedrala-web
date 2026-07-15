import { mockAnnouncements } from "@/lib/mock-data";
import type { Announcement } from "@/types/content";

/**
 * Data-access layer for Announcements. Mock-backed for now, but the
 * signatures and return shapes already match what `lib/api.ts` will return
 * once the Strapi `announcements` collection is populated (see
 * `StrapiResponse<T>` in types/strapi.ts) — call sites won't need to change.
 */

const DEFAULT_PAGE_SIZE = 6;

function sortedByDateDesc(items: Announcement[]) {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
}

interface GetAnnouncementsParams {
  locale: string;
  page?: number;
  pageSize?: number;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export function getAnnouncements({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: GetAnnouncementsParams): { items: Announcement[]; pagination: Pagination } {
  const sorted = sortedByDateDesc(mockAnnouncements);
  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * pageSize;

  return {
    items: sorted.slice(start, start + pageSize),
    pagination: { page: safePage, pageSize, pageCount, total },
  };
}

export function getLatestAnnouncements({ locale, limit = 3 }: { locale: string; limit?: number }) {
  void locale;
  return sortedByDateDesc(mockAnnouncements).slice(0, limit);
}

export function getAnnouncementBySlug({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}): Announcement | null {
  void locale;
  return mockAnnouncements.find((item) => item.slug === slug) ?? null;
}

export function getAdjacentAnnouncements({ slug }: { slug: string }) {
  const sorted = sortedByDateDesc(mockAnnouncements);
  const index = sorted.findIndex((item) => item.slug === slug);

  return {
    previous: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null,
    next: index > 0 ? sorted[index - 1] : null,
  };
}

export function getOlderAnnouncements({ excludeSlug, limit = 3 }: { excludeSlug: string; limit?: number }) {
  return sortedByDateDesc(mockAnnouncements)
    .filter((item) => item.slug !== excludeSlug)
    .slice(0, limit);
}
