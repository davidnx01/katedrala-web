import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { Link } from "@/i18n/navigation";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { StrapiHeroSection } from "@/types/strapi";

interface HeroProps {
  hero?: StrapiHeroSection;
}

const FALLBACK_SLIDES: [string, string] = [
  "/images/dom-martina.jpg",
  "/images/hero-main-2.webp",
];

export function Hero({ hero }: HeroProps) {
  const t = useTranslations("Hero");

  const eyebrow = hero?.eyebrow || t("eyebrow");
  const titleLine1 = hero?.titleLine1 || t("titleLine1");
  const titleLine2 = hero?.titleLine2 || t("titleLine2");
  const titleEmphasis = hero?.titleEmphasis || t("titleEmphasis");
  const subtitle = hero?.subtitle || t("subtitle");
  const ctaPrimary = hero?.ctaPrimary ?? { label: t("ctaPrimary"), href: "#" };
  const ctaSecondary = hero?.ctaSecondary ?? {
    label: t("ctaSecondary"),
    href: "#",
  };

  const cmsSlideSrcs = (hero?.images ?? [])
    .map((image) => getStrapiMediaUrl(image))
    .filter((src): src is string => Boolean(src));
  const [slideSrc1, slideSrc2] =
    cmsSlideSrcs.length >= 2
      ? cmsSlideSrcs
      : cmsSlideSrcs.length === 1
        ? [cmsSlideSrcs[0], cmsSlideSrcs[0]]
        : FALLBACK_SLIDES;

  return (
    <section className="relative overflow-hidden pt-[400px] sm:pt-[500px] pb-[320px]">
      <HeroSlideshow
        slides={[
          { src: slideSrc1, alt: eyebrow },
          { src: slideSrc2, alt: eyebrow },
        ]}
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-b from-navy/15 via-navy/40 to-navy/85 px-4 pb-12 md:px-8 md:pb-14 lg:px-12 lg:pb-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-2.5 text-xs font-semibold tracking-[0.2em] text-gold uppercase md:mb-3 lg:mb-4">
            {eyebrow}
          </div>
          <h1 className="mb-4 max-w-3xl font-serif text-4xl leading-[1.02] font-normal tracking-tight text-white lg:text-[64px]">
            {titleLine1}
            <br />
            {titleLine2} <span className="font-bold">{titleEmphasis}</span>
          </h1>
          <p className="mb-8 max-w-md text-lg leading-relaxed font-light text-white lg:text-xl text-balance">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              className={"w-full sm:w-fit whitespace-nowrap"}
              render={<Link href={ctaPrimary.href} />}
              nativeButton={false}
            >
              {ctaPrimary.label}
            </Button>
            <Button
              render={<Link href={ctaSecondary.href} />}
              nativeButton={false}
              variant="outline"
              className={"w-full sm:w-fit whitespace-nowrap"}
            >
              {ctaSecondary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
