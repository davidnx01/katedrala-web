import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { CalendarEvent } from "@/types/content";

interface EventCardProps {
  event: CalendarEvent;
}

export function EventCard({ event }: EventCardProps) {
  const t = useTranslations("Calendar");
  const date = new Date(event.date);
  const day = date.getDate();
  const monthShort = t(`months.${date.getMonth()}`).slice(0, 3);

  return (
    <Link
      href={event.href}
      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 px-3.5 py-3 transition-colors hover:bg-white/6 md:gap-4 md:px-4.5 md:py-3.5 lg:gap-5 lg:px-5 lg:py-4"
    >
      <div className="flex h-11 w-11 shrink-0 flex-col gap-1 items-center justify-center rounded-lg border border-gold/15 bg-gold/8 md:h-12 md:w-12 lg:h-13 lg:w-13">
        <span className="text-base leading-none font-bold text-gold md:text-lg lg:text-xl">
          {day}
        </span>
        <span className="text-[9px] font-semibold text-white/50 uppercase">
          {monthShort}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-base line-clamp-1 leading-snug font-bold text-white">
          {event.title}
        </div>
        <div className="mt-0.5 truncate text-[13px] text-white/35">
          {event.description}
        </div>
      </div>
      <ChevronRight
        size={16}
        className="shrink-0 text-white/20"
        aria-hidden="true"
      />
    </Link>
  );
}
