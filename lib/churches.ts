import { mockChurches } from "@/lib/mock-data";
import type { Church, ChurchType } from "@/types/content";

function sortedByOrder(items: Church[]): Church[] {
  return [...items].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export function getChurches({
  locale,
  type,
}: {
  locale: string;
  type?: ChurchType;
}): Church[] {
  void locale;
  const items = type ? mockChurches.filter((church) => church.type === type) : mockChurches;
  return sortedByOrder(items);
}

export function getChurchBySlug({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}): Church | null {
  void locale;
  return mockChurches.find((church) => church.slug === slug) ?? null;
}
