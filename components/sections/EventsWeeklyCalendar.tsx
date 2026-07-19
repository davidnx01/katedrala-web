"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { cn, formatTime, getMonday, timeToDecimalHours, toDateKey } from "@/lib/utils";
import {
  EVENT_CATEGORIES,
  EVENT_CATEGORY_BADGE_CLASSES,
  EVENT_CATEGORY_BORDER_CLASSES,
  EVENT_CATEGORY_COLORS,
} from "@/lib/event-categories";
import type { Event } from "@/types/content";

interface EventsWeeklyCalendarProps {
  events: Event[];
}

const HOUR_START = 6;
const HOUR_END = 21;
/** Matches Tailwind's h-12 (48px) so hour rows and event-block pixel math stay in sync. */
const HOUR_HEIGHT = 48;
const GRID_HEIGHT = (HOUR_END - HOUR_START) * HOUR_HEIGHT;

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function EventsWeeklyCalendar({ events }: EventsWeeklyCalendarProps) {
  const t = useTranslations("EventsPage");
  const tCalendar = useTranslations("Calendar");
  const locale = useLocale();
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );
  const todayKey = toDateKey(new Date());
  const now = new Date();
  const nowDecimalHours = now.getHours() + now.getMinutes() / 60;

  const eventsByDay = useMemo(() => {
    const map = new Map<string, Event[]>();
    for (const day of weekDays) map.set(toDateKey(day), []);
    for (const event of events) {
      map.get(event.date)?.push(event);
    }
    return map;
  }, [events, weekDays]);

  const hasAnyEvent = weekDays.some((day) => (eventsByDay.get(toDateKey(day))?.length ?? 0) > 0);
  const selectedEvent = events.find((event) => event.id === selectedId) ?? null;

  const rangeLabel = `${weekDays[0].toLocaleDateString(locale, { day: "numeric", month: "long" })} – ${weekDays[6].toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}`;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="mb-2 w-fit rounded-lg bg-white px-2.5 py-1 text-xs font-bold tracking-widest text-gold uppercase">
              {t("weeklyEyebrow")}
            </div>
            <h2 className="font-serif text-2xl font-bold text-navy lg:text-[32px]">{rangeLabel}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setWeekStart(getMonday(new Date()));
                setSelectedId(null);
              }}
              className="flex min-h-10 items-center rounded-lg border border-stone bg-white px-4 text-sm font-medium text-navy hover:border-gold"
            >
              {t("today")}
            </button>
            <button
              type="button"
              aria-label={t("previousWeek")}
              onClick={() => {
                setWeekStart(addDays(weekStart, -7));
                setSelectedId(null);
              }}
              className="flex size-10 items-center justify-center rounded-lg border border-stone bg-white text-navy hover:border-gold"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={t("nextWeek")}
              onClick={() => {
                setWeekStart(addDays(weekStart, 7));
                setSelectedId(null);
              }}
              className="flex size-10 items-center justify-center rounded-lg border border-stone bg-white text-navy hover:border-gold"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2">
          {EVENT_CATEGORIES.map((category) => (
            <div key={category} className="flex items-center gap-1.5">
              <span className={cn("size-2.5 rounded-sm", EVENT_CATEGORY_COLORS[category])} aria-hidden="true" />
              <span className="text-xs text-[#7A756B]">{tCalendar(`categories.${category}`)}</span>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-stone bg-white">
          <div className="grid grid-cols-[44px_repeat(7,minmax(100px,1fr))]">
            <div className="sticky left-0 z-10 border-b border-stone bg-white" />
            {weekDays.map((day) => {
              const isToday = toDateKey(day) === todayKey;
              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "border-b border-l border-stone px-2 py-3 text-center",
                    isToday && "bg-gold-light",
                  )}
                >
                  <div
                    className={cn(
                      "text-[11px] font-semibold tracking-wide uppercase",
                      isToday ? "text-gold-dark" : "text-[#A39E94]",
                    )}
                  >
                    {tCalendar(`daysShort.${day.getDay() === 0 ? 6 : day.getDay() - 1}`)}
                  </div>
                  <div
                    className={cn(
                      "mt-0.5 text-lg",
                      isToday ? "font-bold text-gold" : "font-medium text-navy",
                    )}
                  >
                    {day.getDate()}
                  </div>
                </div>
              );
            })}

            <div className="sticky left-0 z-10 bg-white">
              {Array.from({ length: HOUR_END - HOUR_START }, (_, i) => (
                <div
                  key={i}
                  className="flex h-12 items-start justify-center pt-1 text-[11px] font-medium text-[#A39E94]"
                >
                  {HOUR_START + i}:00
                </div>
              ))}
            </div>

            {weekDays.map((day) => {
              const dayKey = toDateKey(day);
              const isToday = dayKey === todayKey;
              const dayEvents = eventsByDay.get(dayKey) ?? [];
              return (
                <div
                  key={dayKey}
                  className={cn(
                    "relative border-l border-stone bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_47px,var(--color-stone)_47px,var(--color-stone)_48px)]",
                    isToday && "bg-gold/3",
                  )}
                  style={{ height: GRID_HEIGHT }}
                >
                  {isToday && nowDecimalHours >= HOUR_START && nowDecimalHours <= HOUR_END && (
                    <div
                      className="absolute right-0 left-0 z-5 h-0.5 bg-red-600"
                      style={{ top: (nowDecimalHours - HOUR_START) * HOUR_HEIGHT }}
                    >
                      <span className="absolute -top-0.75 -left-1 size-2 rounded-full bg-red-600" />
                    </div>
                  )}
                  {dayEvents.map((event) => {
                    const top = (timeToDecimalHours(event.timeFrom) - HOUR_START) * HOUR_HEIGHT;
                    const height = Math.max(
                      (timeToDecimalHours(event.timeTo) - timeToDecimalHours(event.timeFrom)) *
                        HOUR_HEIGHT -
                        2,
                      22,
                    );
                    const isSelected = selectedId === event.id;
                    return (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => setSelectedId(isSelected ? null : event.id)}
                        className={cn(
                          "absolute right-0.5 left-0.5 z-3 overflow-hidden rounded-md border-l-3 px-1.5 py-1 text-left text-[11px] leading-tight",
                          EVENT_CATEGORY_BADGE_CLASSES[event.category],
                          EVENT_CATEGORY_BORDER_CLASSES[event.category],
                          isSelected && "ring-2 ring-gold",
                        )}
                        style={{ top, height }}
                      >
                        <div className="line-clamp-2 font-semibold">{event.title}</div>
                        {height > 34 && (
                          <div className="mt-0.5 opacity-70">
                            {formatTime(event.timeFrom)}–{formatTime(event.timeTo)}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {!hasAnyEvent && (
          <p className="mt-4 text-center text-sm text-[#7A756B]">{t("emptyWeek")}</p>
        )}

        {selectedEvent && (
          <div
            className={cn(
              "mt-4 flex flex-col items-start gap-4 rounded-2xl border border-stone bg-white p-6 sm:flex-row",
              EVENT_CATEGORY_BORDER_CLASSES[selectedEvent.category],
              "border-l-4",
            )}
          >
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2.5">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    EVENT_CATEGORY_BADGE_CLASSES[selectedEvent.category],
                  )}
                >
                  {tCalendar(`categories.${selectedEvent.category}`)}
                </span>
                <span className="text-[13px] text-[#A39E94]">
                  {new Date(selectedEvent.date).toLocaleDateString(locale, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              <h3 className="mb-1 font-serif text-xl font-bold text-navy">{selectedEvent.title}</h3>
              <p className="text-sm text-[#7A756B]">
                {formatTime(selectedEvent.timeFrom)}–{formatTime(selectedEvent.timeTo)} ·{" "}
                {selectedEvent.location}
              </p>
              <Link
                href={`/udalosti/${selectedEvent.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-gold hover:underline"
              >
                {t("viewFullDetail")} →
              </Link>
            </div>
            <button
              type="button"
              aria-label={t("close")}
              onClick={() => setSelectedId(null)}
              className="text-[#A39E94] hover:text-navy"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
