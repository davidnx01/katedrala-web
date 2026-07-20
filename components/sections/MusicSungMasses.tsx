import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import { toParagraphs } from "@/lib/utils";
import type { StrapiHoursRow, StrapiMedia } from "@/types/strapi";

interface MusicSungMassesProps {
  eyebrow: string;
  title: string;
  body?: string;
  schedule: StrapiHoursRow[];
  image: StrapiMedia | null;
  imageLabel: string;
}

export function MusicSungMasses({ eyebrow, title, body, schedule, image, imageLabel }: MusicSungMassesProps) {
  return (
    <section className="bg-navy py-12 md:py-16 lg:py-20">
      <Container className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} light />
          <div className="-mt-4 flex flex-col gap-4">
            {toParagraphs(body).map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.75] text-white/55 md:text-[17px]">
                {paragraph}
              </p>
            ))}
          </div>

          {schedule.length > 0 && (
            <div className="mt-6 flex flex-col gap-2">
              {schedule.map((row) => (
                <div
                  key={row.dayLabel}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/6 bg-white/4 px-4.5 py-3.5"
                >
                  <div>
                    <div className="text-[15px] font-medium text-white/80">{row.dayLabel}</div>
                    {row.note && <div className="mt-0.5 text-[13px] text-white/35">{row.note}</div>}
                  </div>
                  <span className="rounded-lg bg-gold/12 px-3.5 py-1.5 text-[15px] font-semibold text-gold">
                    {row.time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative h-60 overflow-hidden rounded-2xl md:h-80 lg:h-[400px]">
          <ImagePlaceholder label={imageLabel} src={getStrapiMediaUrl(image) ?? undefined} alt={imageLabel} className="h-full" />
        </div>
      </Container>
    </section>
  );
}
