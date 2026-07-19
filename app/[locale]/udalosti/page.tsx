import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { EventsWeeklyCalendar } from "@/components/sections/EventsWeeklyCalendar";
import { EventsUpcomingList } from "@/components/sections/EventsUpcomingList";
import { HistoryToday } from "@/components/sections/HistoryToday";
import { getEvents, getGlobal } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const global = await getGlobal({ locale }).catch(() => null);

  return buildMetadata({
    title: locale === "en" ? "Events" : "Udalosti",
    description:
      locale === "en"
        ? "Weekly schedule of Masses, concerts, weddings, tours and other events at St. Martin's Cathedral — see when the cathedral is free."
        : "Týždenný prehľad svätých omší, koncertov, sobášov, prehliadok a ďalších udalostí v Katedrále sv. Martina — zistite, kedy je katedrála voľná.",
    global,
  });
}

export default async function EventsPage() {
  const t = await getTranslations("EventsPage");
  const tNav = await getTranslations("Nav");
  const locale = await getLocale();

  const events = await getEvents({ locale, upcomingOnly: false }).catch(() => []);

  const now = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(`${event.date}T${event.timeTo}`) >= now)
    .slice(0, 4);

  return (
    <main>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        imageLabel={t("imageAlt")}
        breadcrumbItems={[{ label: tNav("home"), href: "/" }, { label: t("breadcrumb") }]}
      />
      <EventsWeeklyCalendar events={events} />
      <EventsUpcomingList events={upcomingEvents} locale={locale} />
      <HistoryToday
        eyebrow={t("ctaEyebrow")}
        title={t("ctaTitle")}
        body={t("ctaBody")}
        ctaPrimaryLabel={t("ctaPrimaryLabel")}
      />
    </main>
  );
}
