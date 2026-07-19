import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import {
  ScrollText,
  Heart,
  Droplets,
  BookOpen,
  Flame,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { QuickNavGrid } from "@/components/sections/QuickNavGrid";
import { ContentSection } from "@/components/sections/ContentSection";
import { AnnouncementsPreview } from "@/components/sections/AnnouncementsPreview";
import { getParishPage, getGlobal } from "@/lib/api";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import { buildMetadata } from "@/lib/seo";
import { toParagraphs } from "@/lib/utils";
import type { ImageTextSection, MetaRowIcon } from "@/types/strapi";

const META_ICON_MAP: Record<MetaRowIcon, LucideIcon> = {
  clock: Clock,
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
  "scroll-text": ScrollText,
  heart: Heart,
  droplets: Droplets,
  "book-open": BookOpen,
  flame: Flame,
  calendar: Calendar,
  users: Users,
};

interface ParishPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ParishPageProps): Promise<Metadata> {
  const { locale } = await params;
  const [parishPage, global, t] = await Promise.all([
    getParishPage({ locale }).catch(() => null),
    getGlobal({ locale }).catch(() => null),
    getTranslations({ locale, namespace: "Parish.hub" }),
  ]);

  return buildMetadata({
    title: parishPage?.seo?.metaTitle || t("title"),
    description: parishPage?.seo?.metaDescription,
    image: parishPage?.seo?.ogImage,
    noIndex: parishPage?.seo?.noIndex,
    global,
  });
}

export default async function ParishPage() {
  const t = await getTranslations("Parish.hub");
  const tNav = await getTranslations("Nav");
  const tWedding = await getTranslations("Parish.wedding");
  const tBaptism = await getTranslations("Parish.baptism");
  const tLectio = await getTranslations("Parish.lectioDivina");
  const tAdoration = await getTranslations("Parish.adoration");
  const locale = await getLocale();
  const parishPage = await getParishPage({ locale }).catch(() => null);

  const announcementsSection = parishPage?.sections.find(
    (section) => section.__component === "sections.announcements-preview",
  );
  const [weddingSection, baptismSection, lectioSection, adorationSection] = (
    parishPage?.sections.filter(
      (section): section is ImageTextSection => section.__component === "sections.image-text",
    ) ?? []
  ) as (ImageTextSection | undefined)[];

  return (
    <main>
      <PageHero
        eyebrow={parishPage?.heroEyebrow || t("eyebrow")}
        title={parishPage?.heroTitle || t("title")}
        imageLabel={t("imageAlt")}
        imageSrc={getStrapiMediaUrl(parishPage?.heroImage) ?? undefined}
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
      <AnnouncementsPreview section={announcementsSection} />
      <ContentSection
        id="sobas"
        eyebrow={weddingSection?.eyebrow || tWedding("eyebrow")}
        title={weddingSection?.title || tWedding("title")}
        paragraphs={
          weddingSection
            ? toParagraphs(weddingSection.body)
            : [tWedding("paragraph1"), tWedding("paragraph2")]
        }
        cta={{
          label: weddingSection?.cta?.label || tWedding("cta"),
          href: weddingSection?.cta?.href || "/kontakt",
        }}
        imageSrc={getStrapiMediaUrl(weddingSection?.image) ?? undefined}
        imageLabel={tWedding("imageAlt")}
        tinted
      />
      <ContentSection
        id="krst"
        eyebrow={baptismSection?.eyebrow || tBaptism("eyebrow")}
        title={baptismSection?.title || tBaptism("title")}
        paragraphs={
          baptismSection
            ? toParagraphs(baptismSection.body)
            : [tBaptism("paragraph1"), tBaptism("paragraph2")]
        }
        cta={{
          label: baptismSection?.cta?.label || tBaptism("cta"),
          href: baptismSection?.cta?.href || "/kontakt",
        }}
        imageSrc={getStrapiMediaUrl(baptismSection?.image) ?? undefined}
        imageLabel={tBaptism("imageAlt")}
        reverse
      />
      <ContentSection
        id="lectio-divina"
        eyebrow={lectioSection?.eyebrow || tLectio("eyebrow")}
        title={lectioSection?.title || tLectio("title")}
        paragraphs={lectioSection ? toParagraphs(lectioSection.body) : [tLectio("paragraph1")]}
        meta={
          lectioSection?.meta?.length
            ? lectioSection.meta.map((row) => ({ icon: META_ICON_MAP[row.icon], label: row.label }))
            : [
                { icon: Clock, label: tLectio("schedule") },
                { icon: MapPin, label: tLectio("location") },
              ]
        }
        imageSrc={getStrapiMediaUrl(lectioSection?.image) ?? undefined}
        imageLabel={tLectio("imageAlt")}
        tinted
      />
      <ContentSection
        id="adoracia"
        eyebrow={adorationSection?.eyebrow || tAdoration("eyebrow")}
        title={adorationSection?.title || tAdoration("title")}
        paragraphs={adorationSection ? toParagraphs(adorationSection.body) : [tAdoration("paragraph1")]}
        meta={
          adorationSection?.meta?.length
            ? adorationSection.meta.map((row) => ({ icon: META_ICON_MAP[row.icon], label: row.label }))
            : [
                { icon: Clock, label: tAdoration("schedule") },
                { icon: MapPin, label: tAdoration("location") },
              ]
        }
        imageSrc={getStrapiMediaUrl(adorationSection?.image) ?? undefined}
        imageLabel={tAdoration("imageAlt")}
        reverse
      />
    </main>
  );
}
