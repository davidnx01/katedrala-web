import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { HistoryPage } from "@/types/content";

interface HistoryHeroProps {
  historyPage: HistoryPage;
  breadcrumbItems: { label: string; href?: string }[];
  imageLabel: string;
}

export function HistoryHero({ historyPage, breadcrumbItems, imageLabel }: HistoryHeroProps) {
  return (
    <section className="relative mt-11 h-[65vh] max-h-[650px] min-h-[400px] overflow-hidden md:mt-12 md:h-[70vh] lg:mt-[50px] lg:h-[75vh]">
      <ImagePlaceholder
        label={imageLabel}
        src={getStrapiMediaUrl(historyPage.heroImage) ?? undefined}
        alt={imageLabel}
        priority
        className="h-full"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-b from-navy/20 via-navy/50 to-navy/90 px-4 pb-10 md:px-8 md:pb-14 lg:px-12 lg:pb-18">
        <div className="mx-auto w-full max-w-7xl">
          <Breadcrumb items={breadcrumbItems} light />
          {historyPage.heroEyebrow && (
            <div className="mb-2.5 text-xs font-semibold tracking-[0.2em] text-gold uppercase md:mb-3">
              {historyPage.heroEyebrow}
            </div>
          )}
          <h1 className="mb-3.5 max-w-2xl font-serif text-4xl leading-[1.02] font-normal tracking-tight text-white lg:text-[64px]">
            {historyPage.heroTitle}{" "}
            {historyPage.heroTitleEmphasis && (
              <span className="font-bold italic">{historyPage.heroTitleEmphasis}</span>
            )}
          </h1>
          {historyPage.heroSubtitle && (
            <p className="max-w-lg text-lg leading-relaxed font-light text-white/60 lg:text-xl">
              {historyPage.heroSubtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
