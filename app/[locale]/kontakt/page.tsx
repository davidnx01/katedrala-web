import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ContactLocations } from "@/components/sections/ContactLocations";
import { ContactCta } from "@/components/sections/ContactCta";
import { getContactPage } from "@/lib/api";

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
