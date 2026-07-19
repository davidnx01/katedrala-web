import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { VisitHero } from "@/components/sections/VisitHero";
import { VisitStats } from "@/components/sections/VisitStats";
import { MartineumShowcase } from "@/components/sections/MartineumShowcase";
import { VisitServices } from "@/components/sections/VisitServices";
import { VisitJourney } from "@/components/sections/VisitJourney";
import { VisitCellars } from "@/components/sections/VisitCellars";
import { VisitPracticalInfo } from "@/components/sections/VisitPracticalInfo";
import { VisitRestrictions } from "@/components/sections/VisitRestrictions";
import { getVisitPage, getGlobal } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

interface VisitPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: VisitPageProps): Promise<Metadata> {
  const { locale } = await params;
  const [visitPage, global, t] = await Promise.all([
    getVisitPage({ locale }).catch(() => null),
    getGlobal({ locale }).catch(() => null),
    getTranslations({ locale, namespace: "VisitPage" }),
  ]);

  return buildMetadata({
    title: visitPage?.seo?.metaTitle || visitPage?.heroTitle || t("breadcrumb"),
    description: visitPage?.seo?.metaDescription,
    image: visitPage?.seo?.ogImage,
    noIndex: visitPage?.seo?.noIndex,
    global,
  });
}

export default async function VisitPage() {
  const t = await getTranslations("VisitPage");
  const tNav = await getTranslations("Nav");
  const locale = await getLocale();
  const visitPage = await getVisitPage({ locale }).catch(() => null);

  if (!visitPage) return null;

  return (
    <main>
      <VisitHero
        visitPage={visitPage}
        imageLabel={t("heroImageAlt")}
        breadcrumbItems={[{ label: tNav("home"), href: "/" }, { label: t("breadcrumb") }]}
      />
      <VisitStats stats={visitPage.stats} />
      <MartineumShowcase
        eyebrow={visitPage.martineumEyebrow ?? ""}
        title={visitPage.martineumTitle ?? ""}
        body={visitPage.martineumBody}
        awards={visitPage.martineumAwards ?? []}
        images={visitPage.martineumImages}
        imageLabel={t("martineumImageAlt")}
      />
      <VisitServices
        eyebrow={visitPage.servicesEyebrow ?? ""}
        title={visitPage.servicesTitle ?? ""}
        services={visitPage.services}
      />
      <VisitJourney
        eyebrow={visitPage.journeyEyebrow ?? ""}
        title={visitPage.journeyTitle ?? ""}
        steps={visitPage.journeySteps}
      />
      <VisitCellars
        eyebrow={visitPage.cellarsEyebrow ?? ""}
        title={visitPage.cellarsTitle ?? ""}
        body={visitPage.cellarsBody}
        image={visitPage.cellarsImage}
        ctaLabel={visitPage.cellarsCtaLabel}
        imageLabel={t("cellarsImageAlt")}
      />
      <VisitPracticalInfo
        eyebrow={visitPage.practicalEyebrow ?? ""}
        title={visitPage.practicalTitle ?? ""}
        hours={visitPage.hours}
        tickets={visitPage.tickets}
        reservationTitle={visitPage.reservationTitle}
        reservationBody={visitPage.reservationBody}
        reservationCtaLabel={visitPage.reservationCtaLabel}
        mainSquareUrl={visitPage.mainSquareUrl}
      />
      <VisitRestrictions
        eyebrow={visitPage.restrictionsEyebrow ?? ""}
        title={visitPage.restrictionsTitle ?? ""}
        restrictions={visitPage.restrictions}
      />
    </main>
  );
}
