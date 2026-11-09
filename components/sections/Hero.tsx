import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { SplitHero } from "@/components/sections/SplitHero";
import { Link } from "@/i18n/navigation";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { StrapiHeroSection } from "@/types/strapi";

interface HeroProps {
  hero?: StrapiHeroSection;
}

const FALLBACK_SLIDES = ["/images/dom-martina.jpg", "/images/hero-main-2.webp"];

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

  const cmsSlides = (hero?.images ?? []).flatMap((image) => {
    const src = getStrapiMediaUrl(image);
    return src ? [{ src, alt: image.alternativeText || t("imageAlt") }] : [];
  });
  const slides =
    cmsSlides.length > 0
      ? cmsSlides
      : FALLBACK_SLIDES.map((src) => ({ src, alt: t("imageAlt") }));

  return (
    <SplitHero media={<HeroSlideshow slides={slides} />}>
      <div className="mb-3 w-fit rounded-md border border-gold/40 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-gold uppercase lg:mb-4">
        {eyebrow}
      </div>
      <h1 className="mb-4 font-serif text-4xl leading-[1.05] font-normal tracking-tight text-white lg:text-5xl xl:text-[56px]">
        {titleLine1}
        <br />
        {titleLine2} <span className="font-bold whitespace-nowrap">{titleEmphasis}</span>
      </h1>
      <p className="mb-8 max-w-md text-lg leading-relaxed text-white/80 lg:text-xl text-balance">
        {subtitle}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
        <Button
          className="w-full whitespace-nowrap sm:w-fit lg:w-full"
          render={<Link href={ctaPrimary.href} />}
          nativeButton={false}
        >
          {ctaPrimary.label}
        </Button>
        <Button
          render={<Link href={ctaSecondary.href} />}
          nativeButton={false}
          variant="outline"
          className="w-full whitespace-nowrap border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-fit lg:w-full"
        >
          {ctaSecondary.label}
        </Button>
      </div>
    </SplitHero>
  );
}
