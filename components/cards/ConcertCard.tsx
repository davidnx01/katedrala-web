import { useTranslations } from "next-intl";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Badge } from "@/components/ui/badge";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import { excerpt } from "@/lib/seo";
import { formatClockTime } from "@/lib/utils";
import type { Concert } from "@/types/content";

interface ConcertCardProps {
  concert: Concert;
  freeLabel: string;
}

export function ConcertCard({ concert, freeLabel }: ConcertCardProps) {
  const t = useTranslations("Calendar");
  const date = new Date(concert.date);
  const day = date.getDate();
  const monthShort = t(`months.${date.getMonth()}`).slice(0, 3);

  return (
    <div className="group overflow-hidden rounded-[20px] border border-stone bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
      <div className="relative h-40 md:h-45 lg:h-50">
        <ImagePlaceholder
          label={`Foto: ${concert.title}`}
          src={getStrapiMediaUrl(concert.photo) ?? undefined}
          alt={concert.title}
          className="h-full"
        />
      </div>
      <div className="p-5 md:p-5.5 lg:p-6">
        <div className="mb-2.5 flex items-start justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl leading-none font-bold text-gold md:text-[32px] lg:text-4xl">
              {day}
            </span>
            <span className="text-sm font-medium text-[#A39E94]">{monthShort}</span>
          </div>
          {concert.isFree && (
            <Badge className="h-auto rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
              {freeLabel}
            </Badge>
          )}
        </div>
        <h3 className="mb-1 font-serif text-lg leading-snug font-semibold text-navy md:text-xl">
          {concert.title}
        </h3>
        <p className="mb-2 text-sm font-semibold text-gold">{formatClockTime(concert.date)}</p>
        <p className="m-0 text-sm leading-relaxed text-[#7A756B]">{excerpt(concert.description, 130)}</p>
      </div>
    </div>
  );
}
