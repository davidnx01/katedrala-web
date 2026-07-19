import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { HistoryHero } from "@/components/sections/HistoryHero";
import { HistoryTimeline } from "@/components/sections/HistoryTimeline";
import { HistoryCoronations } from "@/components/sections/HistoryCoronations";
import { HistoryStory } from "@/components/sections/HistoryStory";
import { ContentSection } from "@/components/sections/ContentSection";
import { HistoryKapitulska } from "@/components/sections/HistoryKapitulska";
import { HistoryToday } from "@/components/sections/HistoryToday";
import { getHistoryPage, getGlobal } from "@/lib/api";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import { buildMetadata, excerpt } from "@/lib/seo";
import { toParagraphs } from "@/lib/utils";

interface HistoryMetadataProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HistoryMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const [historyPage, global, t] = await Promise.all([
    getHistoryPage({ locale }).catch(() => null),
    getGlobal({ locale }).catch(() => null),
    getTranslations({ locale, namespace: "HistoryPage" }),
  ]);

  return buildMetadata({
    title: historyPage?.seo?.metaTitle || historyPage?.heroTitle || t("breadcrumb"),
    description:
      historyPage?.seo?.metaDescription ||
      (historyPage?.historyBody ? excerpt(historyPage.historyBody) : undefined),
    image: historyPage?.seo?.ogImage ?? historyPage?.heroImage,
    noIndex: historyPage?.seo?.noIndex,
    global,
  });
}

export default async function HistoryPage() {
  const t = await getTranslations("HistoryPage");
  const tNav = await getTranslations("Nav");
  const locale = await getLocale();
  const historyPage = await getHistoryPage({ locale }).catch(() => null);

  if (!historyPage) return null;

  return (
    <main>
      <HistoryHero
        historyPage={historyPage}
        imageLabel={t("heroImageAlt")}
        breadcrumbItems={[{ label: tNav("home"), href: "/" }, { label: t("breadcrumb") }]}
      />
      <HistoryTimeline
        eyebrow={historyPage.timelineEyebrow ?? ""}
        title={historyPage.timelineTitle ?? ""}
        events={historyPage.timelineEvents}
      />
      <HistoryCoronations
        eyebrow={historyPage.coronationsEyebrow ?? ""}
        title={historyPage.coronationsTitle ?? ""}
        body={historyPage.coronationsBody}
        listLabel={historyPage.coronationsListLabel}
        kings={historyPage.coronationsKings}
      />
      <HistoryStory
        eyebrow={historyPage.historyEyebrow ?? ""}
        title={historyPage.historyTitle ?? ""}
        body={historyPage.historyBody}
        images={historyPage.historyImages}
        imageLabel={t("historyImageAlt")}
      />
      <ContentSection
        eyebrow={historyPage.chapelEyebrow ?? ""}
        title={historyPage.chapelTitle ?? ""}
        paragraphs={toParagraphs(historyPage.chapelBody)}
        imageLabel={t("chapelImageAlt")}
        imageSrc={getStrapiMediaUrl(historyPage.chapelImage) ?? undefined}
        reverse
        tinted
      />
      <HistoryKapitulska
        eyebrow={historyPage.kapitulskaEyebrow ?? ""}
        title={historyPage.kapitulskaTitle ?? ""}
        body={historyPage.kapitulskaBody}
        images={historyPage.kapitulskaImages}
        imageLabel={t("kapitulskaImageAlt")}
      />
      <HistoryToday
        eyebrow={historyPage.todayEyebrow ?? ""}
        title={historyPage.todayTitle ?? ""}
        body={historyPage.todayBody}
        ctaPrimaryLabel={historyPage.todayCtaPrimaryLabel}
        ctaSecondaryLabel={historyPage.todayCtaSecondaryLabel}
      />
    </main>
  );
}
