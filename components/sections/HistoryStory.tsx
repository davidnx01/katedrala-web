import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import { toParagraphs } from "@/lib/utils";
import type { StrapiMedia } from "@/types/strapi";

interface HistoryStoryProps {
  eyebrow: string;
  title: string;
  body?: string;
  images: StrapiMedia[];
  imageLabel: string;
}

export function HistoryStory({ eyebrow, title, body, images, imageLabel }: HistoryStoryProps) {
  const [img1, img2, img3] = images;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="-mt-4 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-4">
            {toParagraphs(body).map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.75] text-[#7A756B] md:text-[17px]">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="relative h-50 overflow-hidden rounded-2xl md:h-60 lg:h-70">
              <ImagePlaceholder label={imageLabel} src={getStrapiMediaUrl(img1) ?? undefined} alt={imageLabel} className="h-full" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-33 overflow-hidden rounded-xl md:h-40 lg:h-45">
                <ImagePlaceholder label={imageLabel} src={getStrapiMediaUrl(img2) ?? undefined} alt={imageLabel} className="h-full" />
              </div>
              <div className="relative h-33 overflow-hidden rounded-xl md:h-40 lg:h-45">
                <ImagePlaceholder label={imageLabel} src={getStrapiMediaUrl(img3) ?? undefined} alt={imageLabel} className="h-full" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
