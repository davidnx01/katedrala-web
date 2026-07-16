import { Hero } from "@/components/sections/Hero";
import { QuickLinks } from "@/components/sections/QuickLinks";
import { AnnouncementsPreview } from "@/components/sections/AnnouncementsPreview";
import { EventsCalendar } from "@/components/sections/EventsCalendar";
import { MassSchedule } from "@/components/sections/MassSchedule";
import { ChurchesPreview } from "@/components/sections/ChurchesPreview";
import { ContactsSection } from "@/components/sections/ContactsSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <QuickLinks />
      <AnnouncementsPreview />
      <EventsCalendar />
      <MassSchedule />
      <ChurchesPreview />
      <ContactsSection />
    </main>
  );
}
