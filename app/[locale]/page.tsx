import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { QuickLinks } from "@/components/sections/QuickLinks";
import { AnnouncementsPreview } from "@/components/sections/AnnouncementsPreview";
import { EventsCalendar } from "@/components/sections/EventsCalendar";
import { MassSchedule } from "@/components/sections/MassSchedule";
import { ChurchesPreview } from "@/components/sections/ChurchesPreview";
import { ContactsSection } from "@/components/sections/ContactsSection";
import { getHomepage, getEvents, getGlobal } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const [homepage, global] = await Promise.all([
    getHomepage({ locale }).catch(() => null),
    getGlobal({ locale }).catch(() => null),
  ]);

  const metadata = buildMetadata({
    title: homepage?.seo?.metaTitle || "Katedrála sv. Martina | Bratislava",
    description: homepage?.seo?.metaDescription,
    image: homepage?.seo?.ogImage,
    noIndex: homepage?.seo?.noIndex,
    global,
  });

  // Homepage title is already the full site title — skip the root layout's
  // "%s | Katedrála sv. Martina" template so it doesn't get appended twice.
  return { ...metadata, title: { absolute: String(metadata.title ?? "") } };
}

export default async function HomePage() {
  const locale = await getLocale();
  const homepage = await getHomepage({ locale }).catch(() => null);
  const events = await getEvents({ locale, upcomingOnly: false }).catch(() => []);

  const announcementsSection = homepage?.sections.find(
    (section) => section.__component === "sections.announcements-preview",
  );
  const massScheduleSection = homepage?.sections.find(
    (section) => section.__component === "sections.mass-schedule",
  );

  return (
    <main>
      <Hero hero={homepage?.hero} />
      <QuickLinks quickLinks={homepage?.quickLinks} />
      <AnnouncementsPreview section={announcementsSection} />
      <EventsCalendar events={events} />
      <MassSchedule section={massScheduleSection} />
      <ChurchesPreview />
      <ContactsSection />
    </main>
  );
}
