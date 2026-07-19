import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Link } from "@/i18n/navigation";
import { cn, formatTime } from "@/lib/utils";
import { EVENT_CATEGORY_BADGE_CLASSES, EVENT_CATEGORY_BORDER_CLASSES } from "@/lib/event-categories";
import type { Event } from "@/types/content";

interface EventsUpcomingListProps {
  events: Event[];
  locale: string;
}

export async function EventsUpcomingList({ events, locale }: EventsUpcomingListProps) {
  const t = await getTranslations("EventsPage");
  const tCalendar = await getTranslations("Calendar");

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={t("upcomingEyebrow")} title={tCalendar("upcoming")} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/udalosti/${event.slug}`}
              className={cn(
                "rounded-2xl border border-stone bg-white p-6 border-l-4 transition-colors hover:border-gold",
                EVENT_CATEGORY_BORDER_CLASSES[event.category],
              )}
            >
              <div className="mb-2.5 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    EVENT_CATEGORY_BADGE_CLASSES[event.category],
                  )}
                >
                  {tCalendar(`categories.${event.category}`)}
                </span>
                <span className="text-[13px] text-[#A39E94]">
                  {new Date(event.date).toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h3 className="mb-1 text-[17px] leading-snug font-semibold text-navy">{event.title}</h3>
              <p className="mb-2 text-sm font-semibold text-gold">
                {formatTime(event.timeFrom)}–{formatTime(event.timeTo)}
              </p>
              <p className="line-clamp-2 text-sm leading-relaxed text-[#7A756B]">{event.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
