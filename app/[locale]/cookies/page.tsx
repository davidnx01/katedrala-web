import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CookieTable } from "@/components/sections/CookieTable";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { PageHero } from "@/components/sections/PageHero";
import { getGlobal } from "@/lib/api";
import { formatLegalDate } from "@/lib/legal";
import { buildMetadata, excerpt } from "@/lib/seo";
import type { CookieTableRow, LegalSection } from "@/types/legal";

interface CookiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CookiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const [global, t] = await Promise.all([
    getGlobal({ locale }).catch(() => null),
    getTranslations({ locale, namespace: "Cookies" }),
  ]);

  return buildMetadata({ title: t("title"), description: excerpt(t("intro")), global });
}

export default async function CookiesPage() {
  const t = await getTranslations("Cookies");
  const tNav = await getTranslations("Nav");
  const tFooter = await getTranslations("Footer");
  const locale = await getLocale();

  return (
    <main>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        imageLabel={t("imageAlt")}
        breadcrumbItems={[{ label: tNav("home"), href: "/" }, { label: t("breadcrumb") }]}
      />
      <LegalDocument
        intro={t("intro")}
        updatedLabel={t("updated", { date: formatLegalDate(locale) })}
        sections={t.raw("sections") as LegalSection[]}
        footer={
          <p className="mt-10 text-[15px]">
            <Link href="/ochrana-udajov" className="font-semibold text-navy underline underline-offset-2">
              {tFooter("privacy")}
            </Link>
          </p>
        }
      >
        <CookieTable
          title={t("tableTitle")}
          columns={t.raw("columns") as { name: string; purpose: string; duration: string; category: string }}
          rows={t.raw("table") as CookieTableRow[]}
        />
      </LegalDocument>
    </main>
  );
}
