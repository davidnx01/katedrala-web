import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import { toParagraphs } from "@/lib/utils";
import type { StrapiMedia, StrapiStatItem } from "@/types/strapi";

interface MusicOrganShowcaseProps {
  eyebrow: string;
  title: string;
  body?: string;
  stats: StrapiStatItem[];
  images: StrapiMedia[];
  imageLabel: string;
}

export function MusicOrganShowcase({
  eyebrow,
  title,
  body,
  stats,
  images,
  imageLabel,
}: MusicOrganShowcaseProps) {
  const [img1, img2] = images;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <div className="-mt-4 flex flex-col gap-4">
            {toParagraphs(body).map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.75] text-[#7A756B] md:text-[17px]">
                {paragraph}
              </p>
            ))}
          </div>

          {stats.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-stone bg-surface p-3.5 md:p-4 lg:p-4.5"
                >
                  <div className="font-serif text-2xl leading-none font-bold text-gold md:text-[28px] lg:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[13px] text-[#A39E94]">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative h-60 overflow-hidden rounded-2xl md:h-75 lg:h-95">
            <ImagePlaceholder label={imageLabel} src={getStrapiMediaUrl(img1) ?? undefined} alt={imageLabel} className="h-full" />
          </div>
          <div className="relative h-35 overflow-hidden rounded-2xl md:h-42 lg:h-50">
            <ImagePlaceholder label={imageLabel} src={getStrapiMediaUrl(img2) ?? undefined} alt={imageLabel} className="h-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
