import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { OperatorCard } from "@/components/sections/OperatorCard";
import { PageHero } from "@/components/sections/PageHero";
import { getContactPage, getGlobal } from "@/lib/api";
import { formatLegalDate } from "@/lib/legal";
import { buildMetadata, excerpt } from "@/lib/seo";
import type { LegalSection } from "@/types/legal";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const [global, t] = await Promise.all([
    getGlobal({ locale }).catch(() => null),
    getTranslations({ locale, namespace: "Privacy" }),
  ]);

  return buildMetadata({ title: t("title"), description: excerpt(t("intro")), global });
}

export default async function PrivacyPage() {
  const t = await getTranslations("Privacy");
  const tNav = await getTranslations("Nav");
  const tFooter = await getTranslations("Footer");
  const locale = await getLocale();
  const contactPage = await getContactPage({ locale }).catch(() => null);

  // The location carrying billing details (IČO) is the legal entity; fall back to the first one.
  const locations = contactPage?.locations ?? [];
  const operator = locations.find((location) => location.ico) ?? locations[0];

  const address = operator
    ? [operator.address, operator.city].filter(Boolean).join(", ")
    : tFooter("address");
  const email = operator?.email || tFooter("email");
  const phone = operator?.phone || tFooter("phone");

  const rows = [
    { label: t("operatorLabels.address"), value: address },
    { label: t("operatorLabels.email"), value: email, href: `mailto:${email}` },
    { label: t("operatorLabels.phone"), value: phone, href: `tel:${phone.replace(/\s+/g, "")}` },
    ...(operator?.ico ? [{ label: t("operatorLabels.ico"), value: operator.ico }] : []),
  ];

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
            <Link href="/cookies" className="font-semibold text-navy underline underline-offset-2">
              {t("relatedCookies")}
            </Link>
          </p>
        }
      >
        <OperatorCard title={t("operatorTitle")} name={t("operatorName")} rows={rows} />
      </LegalDocument>
    </main>
  );
}
