import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ChurchCard } from "@/components/cards/ChurchCard";
import { getChurches } from "@/lib/api";

const PREVIEW_LIMIT = 4;

export async function ChurchesPreview() {
  const t = await getTranslations("Churches");
  const locale = await getLocale();
  const churches = await getChurches({ locale }).catch(() => []);

  if (churches.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          link={{ label: t("link"), href: "/kostoly" }}
        />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:gap-3.5 lg:grid-cols-4 lg:gap-6">
          {churches.slice(0, PREVIEW_LIMIT).map((church) => (
            <ChurchCard key={church.id} church={church} />
          ))}
        </div>
      </Container>
    </section>
  );
}
