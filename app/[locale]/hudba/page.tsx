import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { MusicHero } from "@/components/sections/MusicHero";
import { MusicOrganShowcase } from "@/components/sections/MusicOrganShowcase";
import { MusicOrganQuote } from "@/components/sections/MusicOrganQuote";
import { MusicChoir } from "@/components/sections/MusicChoir";
import { MusicConcerts } from "@/components/sections/MusicConcerts";
import { MusicSungMasses } from "@/components/sections/MusicSungMasses";
import { MusicRecordings } from "@/components/sections/MusicRecordings";
import { MusicChoralOrgan } from "@/components/sections/MusicChoralOrgan";
import { getMusicPage, getConcerts, getGlobal } from "@/lib/api";
import { buildMetadata, excerpt } from "@/lib/seo";

interface MusicPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: MusicPageProps): Promise<Metadata> {
  const { locale } = await params;
  const [musicPage, global, t] = await Promise.all([
    getMusicPage({ locale }).catch(() => null),
    getGlobal({ locale }).catch(() => null),
    getTranslations({ locale, namespace: "MusicPage" }),
  ]);

  return buildMetadata({
    title: musicPage?.seo?.metaTitle || musicPage?.heroTitle || t("breadcrumb"),
    description:
      musicPage?.seo?.metaDescription ||
      (musicPage?.organBody ? excerpt(musicPage.organBody) : undefined),
    image: musicPage?.seo?.ogImage ?? musicPage?.heroImage,
    noIndex: musicPage?.seo?.noIndex,
    global,
  });
}

export default async function MusicPage() {
  const t = await getTranslations("MusicPage");
  const tNav = await getTranslations("Nav");
  const locale = await getLocale();
  const [musicPage, concerts] = await Promise.all([
    getMusicPage({ locale }).catch(() => null),
    getConcerts({ locale, upcomingOnly: true }).catch(() => []),
  ]);

  if (!musicPage) return null;

  return (
    <main>
      <MusicHero
        musicPage={musicPage}
        imageLabel={t("heroImageAlt")}
        breadcrumbItems={[{ label: tNav("home"), href: "/" }, { label: t("breadcrumb") }]}
      />
      <MusicOrganShowcase
        eyebrow={musicPage.organEyebrow ?? ""}
        title={musicPage.organTitle ?? ""}
        body={musicPage.organBody}
        stats={musicPage.organStats}
        images={musicPage.organImages}
        imageLabel={t("organImageAlt")}
      />
      <MusicOrganQuote text={musicPage.organQuoteText} author={musicPage.organQuoteAuthor} />
      <MusicChoir
        eyebrow={musicPage.choirEyebrow ?? ""}
        title={musicPage.choirTitle ?? ""}
        body={musicPage.choirBody}
        image={musicPage.choirImage}
        socialLinks={musicPage.choirSocialLinks}
        imageLabel={t("choirImageAlt")}
      />
      <MusicConcerts
        eyebrow={musicPage.concertsEyebrow ?? ""}
        title={musicPage.concertsTitle ?? ""}
        concerts={concerts}
        freeLabel={t("freeLabel")}
      />
      <MusicSungMasses
        eyebrow={musicPage.massesEyebrow ?? ""}
        title={musicPage.massesTitle ?? ""}
        body={musicPage.massesBody}
        schedule={musicPage.massesSchedule}
        image={musicPage.massesImage}
        imageLabel={t("massesImageAlt")}
      />
      <MusicRecordings
        eyebrow={musicPage.recordingsEyebrow ?? ""}
        title={musicPage.recordingsTitle ?? ""}
        recordings={musicPage.recordings}
      />
      <MusicChoralOrgan
        eyebrow={musicPage.choralOrganEyebrow ?? ""}
        title={musicPage.choralOrganTitle ?? ""}
        body={musicPage.choralOrganBody}
        image={musicPage.choralOrganImage}
        stats={musicPage.choralOrganStats}
        imageLabel={t("choralOrganImageAlt")}
      />
    </main>
  );
}
