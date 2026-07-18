import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Badge } from "@/components/ui/badge";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { MassScheduleSection } from "@/types/strapi";

interface MassScheduleProps {
  section?: MassScheduleSection;
}

const FALLBACK_SCHEDULE = [
  { labelKey: "weekdays", times: ["8:00", "18:00"] },
  { labelKey: "saturday", times: ["8:00", "18:00"] },
  {
    labelKey: "sundayAndHolidays",
    times: ["8:00", "9:30", "11:00", "18:00"],
  },
] as const;

export function MassSchedule({ section }: MassScheduleProps) {
  const t = useTranslations("MassSchedule");

  const eyebrow = section?.eyebrow || t("eyebrow");
  const title = section?.title || t("title");
  const location = section?.location || t("location");
  const note = section?.note || t("note");
  const imageSrc = getStrapiMediaUrl(section?.image) || "/images/quick-links/farnost.jpg";

  const schedule =
    section?.schedule && section.schedule.length > 0
      ? section.schedule.map((row) => ({
          key: row.dayLabel,
          label: row.dayLabel,
          times: row.times,
        }))
      : FALLBACK_SCHEDULE.map((row) => ({
          key: row.labelKey,
          label: t(row.labelKey),
          times: row.times as unknown as string[],
        }));

  return (
    <section className="bg-surface py-12 md:py-16 lg:py-20">
      <Container className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <p className="-mt-4 mb-7 text-sm text-[#7A756B] md:text-base">
            {location}
          </p>
          {schedule.map((row) => (
            <div
              key={row.key}
              className="flex flex-wrap items-center justify-between gap-2 border-b border-stone py-3.5 md:py-4 lg:py-4.5"
            >
              <span className="text-sm font-medium text-[#2C2A26] md:text-base">
                {row.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {row.times.map((time) => (
                  <Badge
                    key={time}
                    className="rounded-lg bg-gold-light px-3.5 py-1 text-sm font-semibold text-gold-dark"
                  >
                    {time}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
          <p className="mt-4 text-[13px] text-[#A39E94] italic">{note}</p>
        </div>
        <div className="sm:max-w-[560px] w-full h-70 rounded-2xl md:h-90 lg:h-110 overflow-hidden relative">
          <ImagePlaceholder
            label={t("imageAlt")}
            src={imageSrc}
            className="absolute w-full h-full inset-0 z-0 object-cover object-center"
          />
        </div>
      </Container>
    </section>
  );
}
