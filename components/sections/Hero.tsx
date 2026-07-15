import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden pt-[400px] sm:pt-[500px] pb-[320px]">
      <HeroSlideshow
        slides={[
          { src: "/images/dom-martina.jpg", alt: t("imageAlt") },
          { src: "/images/hero-main-2.webp", alt: t("imageAlt") },
        ]}
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-b from-navy/15 via-navy/40 to-navy/85 px-4 pb-12 md:px-8 md:pb-14 lg:px-12 lg:pb-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-2.5 text-xs font-semibold tracking-[0.2em] text-gold uppercase md:mb-3 lg:mb-4">
            {t("eyebrow")}
          </div>
          <h1 className="mb-4 max-w-3xl font-serif text-4xl leading-[1.02] font-normal tracking-tight text-white lg:text-[64px]">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}{" "}
            <span className="font-bold">{t("titleEmphasis")}</span>
          </h1>
          <p className="mb-8 max-w-md text-lg leading-relaxed font-light text-white lg:text-xl text-balance">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              className={"w-full sm:w-fit whitespace-nowrap"}
              render={<Link href="#" />}
              nativeButton={false}
            >
              {t("ctaPrimary")}
            </Button>
            <Button
              render={<Link href="#" />}
              nativeButton={false}
              variant="outline"
              className={"w-full sm:w-fit whitespace-nowrap"}
            >
              {t("ctaSecondary")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
