import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ChurchCard } from "@/components/cards/ChurchCard";
import { getChurches } from "@/lib/api";

const RELATED_LIMIT = 4;

interface RelatedChurchesProps {
  currentSlug: string;
}

/** The next churches after the current one in the parish order, wrapping around. */
export async function RelatedChurches({ currentSlug }: RelatedChurchesProps) {
  const t = await getTranslations("ChurchDetail");
  const tChurches = await getTranslations("Churches");
  const locale = await getLocale();
  const churches = await getChurches({ locale }).catch(() => []);

  const currentIndex = churches.findIndex((church) => church.slug === currentSlug);
  const related = [
    ...churches.slice(currentIndex + 1),
    ...churches.slice(0, Math.max(currentIndex, 0)),
  ]
    .filter((church) => church.slug !== currentSlug)
    .slice(0, RELATED_LIMIT);

  if (related.length === 0) return null;

  return (
    <section className="bg-surface py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow={tChurches("eyebrow")}
          title={t("moreChurchesTitle")}
          link={{ label: tChurches("link"), href: "/kostoly" }}
        />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:gap-3.5 lg:grid-cols-4 lg:gap-6">
          {related.map((church) => (
            <ChurchCard key={church.id} church={church} />
          ))}
        </div>
      </Container>
    </section>
  );
}
