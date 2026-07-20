import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import { toParagraphs } from "@/lib/utils";
import type { StrapiMedia, StrapiStatItem } from "@/types/strapi";

interface MusicChoralOrganProps {
  eyebrow: string;
  title: string;
  body?: string;
  image: StrapiMedia | null;
  stats: StrapiStatItem[];
  imageLabel: string;
}

export function MusicChoralOrgan({ eyebrow, title, body, image, stats, imageLabel }: MusicChoralOrganProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container className="mx-auto grid max-w-[900px] grid-cols-1 items-center gap-5 sm:grid-cols-2 lg:gap-10">
        <div className="relative h-55 overflow-hidden rounded-2xl md:h-65 lg:h-75">
          <ImagePlaceholder label={imageLabel} src={getStrapiMediaUrl(image) ?? undefined} alt={imageLabel} className="h-full" />
        </div>
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
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-serif text-xl font-bold text-gold md:text-2xl">{stat.value}</span>
                  <span className="ml-1 text-[13px] text-[#A39E94]">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
