import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Announcement } from "@/types/content";

interface AnnouncementListItemProps {
  announcement: Announcement;
}

/** First paragraph of the announcement without Markdown marks, for a two-line teaser. */
function toExcerpt(content: string): string {
  return (content.split("\n\n").find((part) => part.trim()) ?? "")
    .replace(/^#+\s*/gm, "")
    .replace(/[*_`>]/g, "")
    .trim();
}

export function AnnouncementListItem({ announcement }: AnnouncementListItemProps) {
  const locale = useLocale();
  const formattedDate = new Date(announcement.date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/farnost/oznamy/${announcement.slug}`}
      className="group block py-4"
    >
      <time dateTime={announcement.date} className="text-xs font-medium text-[#7A756B]">
        {formattedDate}
      </time>
      <h4 className="mt-1 text-base leading-snug font-semibold text-navy group-hover:text-gold-dark">
        {announcement.title}
      </h4>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#7A756B]">
        {toExcerpt(announcement.content)}
      </p>
    </Link>
  );
}
