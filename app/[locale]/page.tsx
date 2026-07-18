import { getLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { QuickLinks } from "@/components/sections/QuickLinks";
import { AnnouncementsPreview } from "@/components/sections/AnnouncementsPreview";
import { EventsCalendar } from "@/components/sections/EventsCalendar";
import { MassSchedule } from "@/components/sections/MassSchedule";
import { ChurchesPreview } from "@/components/sections/ChurchesPreview";
import { ContactsSection } from "@/components/sections/ContactsSection";
import { getHomepage, getEvents } from "@/lib/api";

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
