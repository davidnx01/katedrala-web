import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { QuickLinks } from "@/components/sections/QuickLinks";
import { ContactsSection } from "@/components/sections/ContactsSection";
import { CalendarWithAnnouncements } from "@/components/sections/CalendarWithAnnouncements";
import { ChurchesPreview } from "@/components/sections/ChurchesPreview";
import { getHomepage, getEvents, getGlobal } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
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

  return { ...metadata, title: { absolute: String(metadata.title ?? "") } };
}

export default async function HomePage() {
  const locale = await getLocale();
  const homepage = await getHomepage({ locale }).catch(() => null);
  const events = await getEvents({ locale, upcomingOnly: false }).catch(
    () => [],
  );

  const announcementsSection = homepage?.sections.find(
    (section) => section.__component === "sections.announcements-preview",
  );
  const contactsSection = homepage?.sections.find(
    (section) => section.__component === "sections.contacts",
  );

  return (
    <main>
      <Hero hero={homepage?.hero} />
      <QuickLinks quickLinks={homepage?.quickLinks} />
      <ContactsSection section={contactsSection} />
      <CalendarWithAnnouncements
        events={events}
        section={announcementsSection}
      />
      <ChurchesPreview />
    </main>
  );
}
