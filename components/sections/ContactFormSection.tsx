import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactFormSection() {
  const t = useTranslations("ContactForm");

  return (
    <section id="napiste-nam" className="bg-surface py-12 md:py-16 lg:py-20">
      <Container className="max-w-[800px]">
        <div className="mb-8 text-center">
          <div className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">{t("eyebrow")}</div>
          <h2 className="mt-2 font-serif text-[32px] font-bold text-navy lg:text-[42px]">{t("title")}</h2>
          <p className="mx-auto mt-3 max-w-125 text-[15px] leading-relaxed text-[#7A756B] md:text-base">
            {t("intro")}
          </p>
        </div>
        <div className="rounded-3xl border border-stone bg-white p-6 md:p-10">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
