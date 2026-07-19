"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { EventCard } from "@/components/cards/EventCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatTime } from "@/lib/utils";
import { EVENT_CATEGORY_COLORS } from "@/lib/event-categories";
import type { Event } from "@/types/content";

interface EventsCalendarProps {
  events?: Event[];
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function EventsCalendar({ events = [] }: EventsCalendarProps) {
  const t = useTranslations("Calendar");
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const today = useMemo(() => new Date(), []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstWeekday === 0 ? 6 : firstWeekday - 1;

  const eventsByDay = useMemo(() => {
    const map = new Map<string, Event[]>();
    for (const event of events) {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    return map;
  }, [events]);

  const upcomingEvents = useMemo(
    () =>
      events
        .filter((event) => new Date(event.date) >= today)
        .slice(0, 4),
    [events, today],
  );

  const cells: (number | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (day: number | null) =>
    day !== null &&
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  return (
    <section id="kalendar" className="bg-navy py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          light
          center
        />

        <div className="flex flex-col items-center gap-8 mt-10 md:mt-16 lg:flex-row lg:items-start lg:justify-center">
          <div className="w-full max-w-sm shrink-0 rounded-2xl border border-white/6 bg-white/3 p-4 md:max-w-md md:p-5">
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                aria-label={t("previousMonth")}
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/3 text-white/50 hover:text-white/80"
              >
                <ChevronLeft size={14} aria-hidden="true" />
              </button>
              <div className="text-center">
                <div className="font-serif text-xl font-semibold text-white md:text-2xl">
                  {t(`months.${month}`)}
                </div>
                <div className="text-base md:text-lg text-white/75">{year}</div>
              </div>
              <button
                type="button"
                aria-label={t("nextMonth")}
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/3 text-white/50 hover:text-white/80"
              >
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 gap-1">
              {t.raw("daysShort").map((label: string) => (
                <div
                  key={label}
                  className="py-1 text-center text-[10px] font-semibold tracking-wide text-white/25 uppercase"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                const dayEvents = day
                  ? (eventsByDay.get(toDateKey(year, month, day)) ?? [])
                  : [];
                const hasEvents = dayEvents.length > 0;

                if (!day) {
                  return <div key={i} className="aspect-square" />;
                }

                const cellContent = (
                  <div
                    className={cn(
                      "flex aspect-square flex-col items-center justify-center gap-0.5 rounded-md",
                      isToday(day)
                        ? "border border-gold bg-gold/15"
                        : hasEvents
                          ? "border border-transparent bg-white/4"
                          : "border border-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "text-xs",
                        isToday(day) ? "font-bold text-gold" : "text-white/60",
                      )}
                    >
                      {day}
                    </span>
                    {hasEvents && (
                      <div className="flex gap-0.5">
                        {dayEvents.map((event) => (
                          <span
                            key={event.id}
                            className={cn(
                              "size-1.5 rounded-full ring-1 ring-white/40",
                              EVENT_CATEGORY_COLORS[event.category],
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );

                if (!hasEvents) {
                  return <div key={i}>{cellContent}</div>;
                }

                return (
                  <Popover key={i}>
                    <PopoverTrigger
                      openOnHover
                      delay={100}
                      closeDelay={100}
                      nativeButton={false}
                      render={<div className="cursor-pointer" />}
                    >
                      {cellContent}
                    </PopoverTrigger>
                    <PopoverContent className="w-70 border-stone bg-white p-5 text-[#2C2A26]">
                      <div className="mb-2 text-[11px] font-semibold tracking-wide text-[#A39E94] uppercase">
                        {day}. {t(`months.${month}`)} {year}
                      </div>
                      {dayEvents.map((event, idx) => (
                        <div
                          key={event.id}
                          className={cn(
                            idx > 0 && "mt-3 border-t border-stone pt-3",
                          )}
                        >
                          <div className="mb-1 flex items-start gap-1.5">
                            <span
                              className={cn(
                                "mt-1.5 size-2 shrink-0 rounded-full",
                                EVENT_CATEGORY_COLORS[event.category],
                              )}
                              aria-hidden="true"
                            />
                            <div className="min-w-0">
                              <h4 className="text-sm leading-snug font-semibold text-navy">
                                {event.title}
                              </h4>
                              <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-[#A39E94]">
                                <span>{t(`categories.${event.category}`)}</span>
                                <span aria-hidden="true">·</span>
                                <span>
                                  {formatTime(event.timeFrom)}–{formatTime(event.timeTo)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="mt-1 mb-2 text-[13px] leading-relaxed text-[#7A756B]">
                            {event.description}
                          </p>
                          <Link
                            href={`/udalosti/${event.slug}`}
                            className="text-xs font-semibold text-gold"
                          >
                            {t("viewDetail")} →
                          </Link>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                );
              })}
            </div>
          </div>

          <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
            <div className="mb-4 text-base lg:text-lg font-semibold tracking-widest text-white/75 uppercase">
              {t("upcoming")}
            </div>
            <div className="flex flex-col gap-2">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            <Link
              href="/udalosti"
              className="mt-3 inline-block text-sm font-semibold text-gold hover:underline"
            >
              {t("viewFullCalendar")} →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
