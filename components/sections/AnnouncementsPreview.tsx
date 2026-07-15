import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { AnnouncementCard } from "@/components/cards/AnnouncementCard";
import { getLatestAnnouncements } from "@/lib/announcements";

export function AnnouncementsPreview() {
  const t = useTranslations("Announcements");
  const locale = useLocale();
  const announcements = getLatestAnnouncements({ locale, limit: 3 });

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          link={{ label: t("link"), href: "/farnost/oznamy" }}
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
