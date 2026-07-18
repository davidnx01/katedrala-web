import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { AnnouncementCard } from "@/components/cards/AnnouncementCard";
import { getLatestAnnouncements } from "@/lib/api";
import type { AnnouncementsPreviewSection } from "@/types/strapi";

interface AnnouncementsPreviewProps {
  section?: AnnouncementsPreviewSection;
}

export async function AnnouncementsPreview({ section }: AnnouncementsPreviewProps) {
  const t = await getTranslations("Announcements");
  const locale = await getLocale();
  const limit = section?.limit || 3;
  const announcements = await getLatestAnnouncements({ locale, limit }).catch(() => []);

  if (announcements.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow={section?.eyebrow || t("eyebrow")}
          title={section?.title || t("title")}
          link={{ label: section?.linkLabel || t("link"), href: "/farnost/oznamy" }}
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
