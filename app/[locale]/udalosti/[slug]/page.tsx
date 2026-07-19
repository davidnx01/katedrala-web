import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Calendar, ChevronRight, Clock, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { getEventBySlug, getGlobal, getUpcomingEvents } from "@/lib/api";
import { cn, formatTime, toParagraphs } from "@/lib/utils";
import { EVENT_CATEGORY_BADGE_CLASSES, EVENT_CATEGORY_COLORS } from "@/lib/event-categories";
import { buildMetadata, excerpt } from "@/lib/seo";

interface EventDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const [event, global] = await Promise.all([
    getEventBySlug({ locale, slug }).catch(() => null),
    getGlobal({ locale }).catch(() => null),
  ]);

  if (!event) return {};

  return buildMetadata({
    title: event.title,
    description: excerpt(event.description),
    global,
  });
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { locale, slug } = await params;
  const event = await getEventBySlug({ locale, slug }).catch(() => null);

  if (!event) {
    notFound();
  }

  const t = await getTranslations("EventDetail");
  const tCalendar = await getTranslations("Calendar");
  const tNav = await getTranslations("Nav");
  const currentLocale = await getLocale();

  const upcomingEvents = await getUpcomingEvents({
    locale,
    excludeSlug: slug,
    fromDate: event.date,
    limit: 3,
  }).catch(() => []);

  const formattedDate = new Date(event.date).toLocaleDateString(currentLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="mt-14 px-4 py-8 md:mt-16 md:px-8 md:py-12 lg:mt-18 lg:px-12 lg:py-16">
      <Container className="max-w-3xl px-0">
        <Breadcrumb
          items={[
            { label: tNav("home"), href: "/" },
            { label: t("breadcrumbCalendar"), href: "/udalosti" },
            { label: event.title },
          ]}
        />

        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              EVENT_CATEGORY_BADGE_CLASSES[event.category],
            )}
          >
            {tCalendar(`categories.${event.category}`)}
          </span>
          <time dateTime={event.date} className="text-[13px] text-[#A39E94]">
            {formattedDate}
          </time>
        </div>

        <h1 className="mb-8 font-serif text-[28px] leading-tight font-bold tracking-tight text-navy md:text-[34px] lg:text-[40px]">
          {event.title}
        </h1>

        <div className="grid grid-cols-1 gap-5 rounded-2xl border border-stone bg-white p-6 sm:grid-cols-3">
          <div className="flex items-start gap-2.5">
            <Calendar size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium tracking-wide text-[#A39E94] uppercase">
                {t("dateLabel")}
              </p>
              <p className="text-sm font-medium text-[#2C2A26] md:text-[15px]">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium tracking-wide text-[#A39E94] uppercase">
                {t("timeLabel")}
              </p>
              <p className="text-sm font-medium text-[#2C2A26] md:text-[15px]">
                {formatTime(event.timeFrom)}–{formatTime(event.timeTo)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium tracking-wide text-[#A39E94] uppercase">
                {t("locationLabel")}
              </p>
              <p className="text-sm font-medium text-[#2C2A26] md:text-[15px]">{event.location}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 text-base leading-[1.8] text-[#2C2A26] md:text-lg">
          {toParagraphs(event.description).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="my-10 border-t border-stone" />

        <Link
          href="/udalosti"
          className="text-[13px] font-medium text-gold hover:underline"
        >
          ← {t("backToCalendar")}
        </Link>

        {upcomingEvents.length > 0 && (
          <>
            <div className="my-8 border-t border-stone" />
            <div>
              <div className="mb-2 text-xs font-semibold tracking-widest text-gold uppercase">
                {t("upcomingEyebrow")}
              </div>
              <h2 className="mb-5 font-serif text-2xl font-bold text-navy lg:text-[28px]">
                {t("upcomingTitle")}
              </h2>
              <div className="flex flex-col gap-2.5">
                {upcomingEvents.map((item) => (
                  <Link
                    key={item.id}
                    href={`/udalosti/${item.slug}`}
                    className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-stone bg-white px-5 py-3.5 hover:border-gold"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "size-2 shrink-0 rounded-full",
                          EVENT_CATEGORY_COLORS[item.category],
                        )}
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-sm leading-snug font-medium text-navy md:text-base">
                          {item.title}
                        </div>
                        <div className="mt-0.5 text-xs text-[#A39E94]">
                          {new Date(item.date).toLocaleDateString(currentLocale, {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}{" "}
                          · {formatTime(item.timeFrom)}–{formatTime(item.timeTo)}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="shrink-0 text-[#A39E94]" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}
