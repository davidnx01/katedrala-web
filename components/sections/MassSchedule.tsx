import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Badge } from "@/components/ui/badge";

export function MassSchedule() {
  const t = useTranslations("MassSchedule");

  const schedule = [
    { labelKey: "weekdays", times: ["8:00", "18:00"] },
    { labelKey: "saturday", times: ["8:00", "18:00"] },
    {
      labelKey: "sundayAndHolidays",
      times: ["8:00", "9:30", "11:00", "18:00"],
    },
  ] as const;

  return (
    <section className="bg-surface py-12 md:py-16 lg:py-20">
      <Container className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          <p className="-mt-4 mb-7 text-sm text-[#7A756B] md:text-base">
            {t("location")}
          </p>
          {schedule.map((row) => (
            <div
              key={row.labelKey}
              className="flex flex-wrap items-center justify-between gap-2 border-b border-stone py-3.5 md:py-4 lg:py-4.5"
            >
              <span className="text-sm font-medium text-[#2C2A26] md:text-base">
                {t(row.labelKey)}
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
          <p className="mt-4 text-[13px] text-[#A39E94] italic">{t("note")}</p>
        </div>
        <div className="sm:max-w-[560px] w-full h-70 rounded-2xl md:h-90 lg:h-110 overflow-hidden relative">
          <ImagePlaceholder
            label={t("imageAlt")}
            src="/images/quick-links/farnost.jpg"
            className="absolute w-full h-full inset-0 z-0 object-cover object-center"
          />
        </div>
      </Container>
    </section>
  );
}
