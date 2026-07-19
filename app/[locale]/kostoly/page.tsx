import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/layout/Container";
import { ChurchCard } from "@/components/cards/ChurchCard";
import { Link } from "@/i18n/navigation";
import { getChurches, getGlobal } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { ChurchType } from "@/types/content";

interface ChurchesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const global = await getGlobal({ locale }).catch(() => null);

  return buildMetadata({
    title: locale === "en" ? "Churches & chapels" : "Kostoly a kaplnky",
    description:
      locale === "en"
        ? "All churches and chapels within the Parish of St. Martin in Bratislava — address, Mass schedule, rector and contact for each."
        : "Prehľad všetkých kostolov a kaplniek na území Farnosti sv. Martina v Bratislave — adresa, rozpis bohoslužieb, správca a kontakt ku každému z nich.",
    global,
  });
}

function sanitizeType(value: string | undefined): ChurchType | undefined {
  return value === "kostol" || value === "kaplnka" ? value : undefined;
}

export default async function ChurchesPage({ params, searchParams }: ChurchesPageProps) {
  const { locale } = await params;
  const { type } = await searchParams;
  const t = await getTranslations("ChurchesPage");
  const tNav = await getTranslations("Nav");

  const activeType = sanitizeType(type);
  const churches = await getChurches({ locale, type: activeType }).catch(() => []);

  const filters: { label: string; type?: ChurchType }[] = [
    { label: t("filterAll"), type: undefined },
    { label: t("filterChurches"), type: "kostol" },
    { label: t("filterChapels"), type: "kaplnka" },
  ];

  return (
    <main>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        imageLabel={t("imageAlt")}
        breadcrumbItems={[
          { label: tNav("home"), href: "/" },
          { label: t("breadcrumb") },
        ]}
      />
      <section className="py-12 md:py-16 lg:py-20">
        <Container>
          <div className="mb-6 flex flex-wrap gap-2 md:mb-8">
            {filters.map((filter) => {
              const isActive = activeType === filter.type;
              return (
                <Link
                  key={filter.label}
                  href={filter.type ? `/kostoly?type=${filter.type}` : "/kostoly"}
                  className={cn(
                    "flex min-h-11 items-center rounded-lg border px-4 text-sm font-medium transition-colors",
                    isActive
                      ? "border-gold bg-gold text-navy"
                      : "border-stone bg-white text-[#2C2A26] hover:border-gold",
                  )}
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>

          {churches.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
              {churches.map((church) => (
                <ChurchCard key={church.id} church={church} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#7A756B]">{t("empty")}</p>
          )}
        </Container>
      </section>
    </main>
  );
}
