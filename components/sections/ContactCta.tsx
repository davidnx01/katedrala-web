import { useTranslations } from "next-intl";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  const t = useTranslations("ContactPage");

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container className="max-w-[800px]">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-stone bg-white p-8 text-center md:p-10 lg:p-14">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold-light text-gold">
            <Mail size={24} aria-hidden="true" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-navy md:text-3xl">
            {t("ctaTitle")}
          </h3>
          <p className="max-w-125 text-[15px] leading-relaxed text-[#7A756B] md:text-base">
            {t("ctaText")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="dark"
              size="lg"
              render={<a href="mailto:farnost@ba.ecclesia.sk" />}
              nativeButton={false}
            >
              <Mail size={16} aria-hidden="true" />
              {t("ctaEmail")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-stone bg-white text-navy hover:bg-surface"
              render={<a href="tel:+421254431359" />}
              nativeButton={false}
            >
              <Phone size={16} aria-hidden="true" />
              {t("ctaCall")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
