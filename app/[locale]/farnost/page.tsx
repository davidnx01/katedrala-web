import { getTranslations } from "next-intl/server";
import {
  ScrollText,
  Heart,
  Droplets,
  BookOpen,
  Flame,
  Clock,
  MapPin,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { QuickNavGrid } from "@/components/sections/QuickNavGrid";
import { ContentSection } from "@/components/sections/ContentSection";
import { AnnouncementsPreview } from "@/components/sections/AnnouncementsPreview";

export default async function ParishPage() {
  const t = await getTranslations("Parish.hub");
  const tNav = await getTranslations("Nav");
  const tWedding = await getTranslations("Parish.wedding");
  const tBaptism = await getTranslations("Parish.baptism");
  const tLectio = await getTranslations("Parish.lectioDivina");
  const tAdoration = await getTranslations("Parish.adoration");

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow={t("eyebrow")}
          title={t("title")}
          imageLabel={t("imageAlt")}
          breadcrumbItems={[
            { label: tNav("home"), href: "/" },
            { label: t("breadcrumb") },
          ]}
        />
        <QuickNavGrid
          eyebrow={t("quickNavEyebrow")}
          items={[
            {
              icon: ScrollText,
              label: t("announcements"),
              href: "/farnost/oznamy",
            },
            { icon: Heart, label: t("wedding"), href: "#sobas" },
            { icon: Droplets, label: t("baptism"), href: "#krst" },
            {
              icon: BookOpen,
              label: t("lectioDivina"),
              href: "#lectio-divina",
            },
            { icon: Flame, label: t("adoration"), href: "#adoracia" },
          ]}
        />
        <AnnouncementsPreview />
        <ContentSection
          id="sobas"
          eyebrow={tWedding("eyebrow")}
          title={tWedding("title")}
          paragraphs={[tWedding("paragraph1"), tWedding("paragraph2")]}
          cta={{ label: tWedding("cta"), href: "/kontakt" }}
          imageLabel={tWedding("imageAlt")}
          tinted
        />
        <ContentSection
          id="krst"
          eyebrow={tBaptism("eyebrow")}
          title={tBaptism("title")}
          paragraphs={[tBaptism("paragraph1"), tBaptism("paragraph2")]}
          cta={{ label: tBaptism("cta"), href: "/kontakt" }}
          imageLabel={tBaptism("imageAlt")}
          reverse
        />
        <ContentSection
          id="lectio-divina"
          eyebrow={tLectio("eyebrow")}
          title={tLectio("title")}
          paragraphs={[tLectio("paragraph1")]}
          meta={[
            { icon: Clock, label: tLectio("schedule") },
            { icon: MapPin, label: tLectio("location") },
          ]}
          imageLabel={tLectio("imageAlt")}
          tinted
        />
        <ContentSection
          id="adoracia"
          eyebrow={tAdoration("eyebrow")}
          title={tAdoration("title")}
          paragraphs={[tAdoration("paragraph1")]}
          meta={[
            { icon: Clock, label: tAdoration("schedule") },
            { icon: MapPin, label: tAdoration("location") },
          ]}
          imageLabel={tAdoration("imageAlt")}
          reverse
        />
      </main>
      <Footer />
    </>
  );
}
