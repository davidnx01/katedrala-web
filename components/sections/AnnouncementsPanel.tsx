import { Link } from "@/i18n/navigation";
import { AnnouncementListItem } from "@/components/cards/AnnouncementListItem";
import type { Announcement } from "@/types/content";

interface AnnouncementsPanelProps {
  announcements: Announcement[];
  title: string;
  linkLabel: string;
}

export function AnnouncementsPanel({
  announcements,
  title,
  linkLabel,
}: AnnouncementsPanelProps) {
  return (
    <aside className="w-full max-w-sm rounded-2xl border border-stone bg-white p-5 md:max-w-md md:p-6 lg:max-w-sm">
      <h3 className="font-serif text-xl font-bold text-navy md:text-2xl">{title}</h3>
      <ul className="mt-2 divide-y divide-stone">
        {announcements.map((announcement) => (
          <li key={announcement.id}>
            <AnnouncementListItem announcement={announcement} />
          </li>
        ))}
      </ul>
      <Link
        href="/farnost/oznamy"
        className="mt-2 inline-flex min-h-12 items-center text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-dark"
      >
        {linkLabel} →
      </Link>
    </aside>
  );
}
