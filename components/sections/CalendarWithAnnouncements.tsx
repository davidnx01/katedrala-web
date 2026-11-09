import { getLocale, getTranslations } from "next-intl/server";
import { EventsCalendar } from "@/components/sections/EventsCalendar";
import { AnnouncementsPanel } from "@/components/sections/AnnouncementsPanel";
import { getLatestAnnouncements } from "@/lib/api";
import type { Event } from "@/types/content";
import type { AnnouncementsPreviewSection } from "@/types/strapi";

interface CalendarWithAnnouncementsProps {
  events: Event[];
  section?: AnnouncementsPreviewSection;
}

export async function CalendarWithAnnouncements({
  events,
  section,
}: CalendarWithAnnouncementsProps) {
  const t = await getTranslations("Calendar");
  const tAnnouncements = await getTranslations("Announcements");
  const locale = await getLocale();
  const announcements = await getLatestAnnouncements({
    locale,
    limit: section?.limit || 3,
  }).catch(() => []);

  return (
    <EventsCalendar
      events={events}
      eyebrow={t("combinedEyebrow")}
      title={t("combinedTitle")}
      aside={
        announcements.length > 0 ? (
          <AnnouncementsPanel
            announcements={announcements}
            title={section?.title || tAnnouncements("title")}
            linkLabel={section?.linkLabel || tAnnouncements("link")}
          />
        ) : undefined
      }
    />
  );
}
