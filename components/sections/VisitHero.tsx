import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Link } from "@/i18n/navigation";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { VisitPage } from "@/types/content";

interface VisitHeroProps {
  visitPage: VisitPage;
  breadcrumbItems: { label: string; href?: string }[];
  imageLabel: string;
}

export function VisitHero({ visitPage, breadcrumbItems, imageLabel }: VisitHeroProps) {
  return (
    <section className="relative mt-11 h-[75vh] max-h-[750px] min-h-[450px] overflow-hidden md:mt-12 md:h-[80vh] lg:mt-[50px] lg:h-[85vh]">
      <ImagePlaceholder
        label={imageLabel}
        src={getStrapiMediaUrl(visitPage.heroImage) ?? undefined}
        alt={imageLabel}
        priority
        className="h-full"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-b from-navy/20 via-navy/45 to-navy/90 px-4 pb-10 md:px-8 md:pb-14 lg:px-12 lg:pb-18">
        <div className="mx-auto w-full max-w-7xl">
          <Breadcrumb items={breadcrumbItems} light />
          {visitPage.heroEyebrow && (
            <div className="mb-2.5 text-xs font-semibold tracking-[0.2em] text-gold uppercase md:mb-3">
              {visitPage.heroEyebrow}
            </div>
          )}
          <h1 className="mb-3.5 max-w-2xl font-serif text-4xl leading-[1.02] font-normal tracking-tight text-white lg:text-[64px]">
            {visitPage.heroTitle}{" "}
            {visitPage.heroTitleEmphasis && (
              <span className="font-bold italic">{visitPage.heroTitleEmphasis}</span>
            )}
          </h1>
          {visitPage.heroSubtitle && (
            <p className="mb-7 max-w-md text-lg leading-relaxed font-light text-white/70 lg:text-xl">
              {visitPage.heroSubtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            {visitPage.heroCtaPrimaryLabel && (
              <Button
                className="w-full sm:w-fit whitespace-nowrap"
                render={<Link href="/navsteva#sluzby" />}
                nativeButton={false}
              >
                {visitPage.heroCtaPrimaryLabel}
              </Button>
            )}
            {visitPage.heroCtaSecondaryLabel && (
              <Button
                className="w-full sm:w-fit whitespace-nowrap"
                render={<Link href="/navsteva#martineum" />}
                nativeButton={false}
                variant="outline"
              >
                {visitPage.heroCtaSecondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
