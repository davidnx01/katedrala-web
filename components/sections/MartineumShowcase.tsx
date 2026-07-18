import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import { toParagraphs } from "@/lib/utils";
import type { StrapiMedia } from "@/types/strapi";

interface MartineumShowcaseProps {
  eyebrow: string;
  title: string;
  body?: string;
  awards: string[];
  images: StrapiMedia[];
  imageLabel: string;
}

export function MartineumShowcase({
  eyebrow,
  title,
  body,
  awards,
  images,
  imageLabel,
}: MartineumShowcaseProps) {
  const [img1, img2, img3] = images;

  return (
    <section id="martineum" className="py-12 md:py-16 lg:py-20">
      <Container className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <div className="-mt-4 flex flex-col gap-4">
            {toParagraphs(body).map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.75] text-[#7A756B] md:text-[17px]">
                {paragraph}
              </p>
            ))}
            {awards.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {awards.map((award) => (
                  <span
                    key={award}
                    className="rounded-full bg-gold-light px-3.5 py-1.5 text-sm font-medium text-gold-dark"
                  >
                    🏆 {award}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="relative h-40 overflow-hidden rounded-2xl md:h-50 lg:h-60">
            <ImagePlaceholder label={imageLabel} src={getStrapiMediaUrl(img1) ?? undefined} alt={imageLabel} className="h-full" />
          </div>
          <div className="relative h-40 overflow-hidden rounded-2xl md:h-50 lg:h-60">
            <ImagePlaceholder label={imageLabel} src={getStrapiMediaUrl(img2) ?? undefined} alt={imageLabel} className="h-full" />
          </div>
          <div className="relative col-span-2 h-35 overflow-hidden rounded-2xl md:h-45 lg:h-50">
            <ImagePlaceholder label={imageLabel} src={getStrapiMediaUrl(img3) ?? undefined} alt={imageLabel} className="h-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
