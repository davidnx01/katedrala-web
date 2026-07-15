import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ChurchCard } from "@/components/cards/ChurchCard";
import { mockChurches } from "@/lib/mock-data";

export function ChurchesPreview() {
  const t = useTranslations("Churches");

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          link={{ label: t("link"), href: "/kostoly" }}
        />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:gap-3.5 lg:grid-cols-4 lg:gap-6">
          {mockChurches.map((church) => (
            <ChurchCard key={church.id} church={church} />
          ))}
        </div>
      </Container>
    </section>
  );
}
