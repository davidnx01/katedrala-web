import { ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import { toParagraphs } from "@/lib/utils";
import type { StrapiCta, StrapiMedia } from "@/types/strapi";

interface MusicChoirProps {
  eyebrow: string;
  title: string;
  body?: string;
  image: StrapiMedia | null;
  socialLinks: StrapiCta[];
  imageLabel: string;
}

export function MusicChoir({ eyebrow, title, body, image, socialLinks, imageLabel }: MusicChoirProps) {
  return (
    <section className="bg-surface py-12 md:py-16 lg:py-20">
      <Container className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-14">
        <div className="relative h-60 overflow-hidden rounded-2xl md:h-80 lg:h-100">
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

          {socialLinks.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone bg-white px-4.5 text-sm font-medium text-navy transition-colors hover:border-gold"
                >
                  <ExternalLink size={16} className="shrink-0 text-gold" aria-hidden="true" />
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
