import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import { toParagraphs } from "@/lib/utils";
import type { StrapiMedia } from "@/types/strapi";

interface VisitCellarsProps {
  eyebrow: string;
  title: string;
  body?: string;
  image?: StrapiMedia | null;
  ctaLabel?: string;
  imageLabel: string;
}

export function VisitCellars({ eyebrow, title, body, image, ctaLabel, imageLabel }: VisitCellarsProps) {
  return (
    <section className="bg-navy py-12 md:py-16 lg:py-20">
      <Container className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-14">
        <div className="relative order-2 h-65 overflow-hidden rounded-2xl md:h-80 lg:order-1 lg:h-100">
          <ImagePlaceholder label={imageLabel} src={getStrapiMediaUrl(image) ?? undefined} alt={imageLabel} className="h-full" />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow={eyebrow} title={title} light />
          <div className="-mt-4 flex flex-col gap-4">
            {toParagraphs(body).map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.75] text-white/55 md:text-[17px]">
                {paragraph}
              </p>
            ))}
            {ctaLabel && (
              <a
                href="#"
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-white/4 px-8 py-3.5 text-base font-medium text-white/80"
              >
                {ctaLabel}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
