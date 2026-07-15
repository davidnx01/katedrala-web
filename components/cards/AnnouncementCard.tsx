import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Announcement } from "@/types/content";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const t = useTranslations("Announcements");
  const locale = useLocale();
  const formattedDate = new Date(announcement.date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/farnost/oznamy/${announcement.slug}`}
      className="group block rounded-2xl border border-stone bg-white p-5 transition-[border-color,transform] duration-250 hover:-translate-y-1 hover:border-gold md:p-6 lg:p-7"
    >
      <time dateTime={announcement.date} className="text-[11px] font-medium text-[#A39E94]">
        {formattedDate}
      </time>
      <h3 className="mt-2.5 mb-2 text-base leading-snug font-semibold text-navy md:text-[17px] lg:text-lg">
        {announcement.title}
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-[#7A756B]">
        {announcement.content.split("\n\n")[0]}
      </p>
      <span className="mt-4 block text-sm font-medium text-gold">{t("readMore")} →</span>
    </Link>
  );
}
