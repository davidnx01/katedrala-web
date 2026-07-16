import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ContactLocations } from "@/components/sections/ContactLocations";
import { ContactCta } from "@/components/sections/ContactCta";

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");
  const tNav = await getTranslations("Nav");

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
      <ContactLocations />
      <ContactCta />
    </main>
  );
}
