import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ContactLocations } from "@/components/sections/ContactLocations";
import { ContactCta } from "@/components/sections/ContactCta";
import { getContactPage, getGlobal } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const [contactPage, global, t] = await Promise.all([
    getContactPage({ locale }).catch(() => null),
    getGlobal({ locale }).catch(() => null),
    getTranslations({ locale, namespace: "ContactPage" }),
  ]);

  return buildMetadata({
    title: contactPage?.seo?.metaTitle || contactPage?.heroTitle || t("heroTitle"),
    description: contactPage?.seo?.metaDescription,
    image: contactPage?.seo?.ogImage,
    noIndex: contactPage?.seo?.noIndex,
    global,
  });
}

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");
  const tNav = await getTranslations("Nav");
  const locale = await getLocale();
  const contactPage = await getContactPage({ locale }).catch(() => null);
  const locations = contactPage?.locations ?? [];

  return (
    <main>
      <PageHero
        eyebrow={contactPage?.heroEyebrow || t("heroEyebrow")}
        title={contactPage?.heroTitle || t("heroTitle")}
        imageLabel={t("imageAlt")}
        breadcrumbItems={[
          { label: tNav("home"), href: "/" },
          { label: t("breadcrumb") },
        ]}
      />
      <ContactLocations locations={locations} />
      <ContactCta contact={locations[0]} />
    </main>
  );
}
