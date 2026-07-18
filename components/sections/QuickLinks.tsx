import { useTranslations } from "next-intl";
import { QuickLinkCard } from "@/components/cards/QuickLinkCard";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { StrapiQuickLinkCard } from "@/types/strapi";

interface QuickLinksProps {
  quickLinks?: StrapiQuickLinkCard[];
}

export function QuickLinks({ quickLinks = [] }: QuickLinksProps) {
  const t = useTranslations("QuickLinks");

  const fallbackLinks = [
    {
      key: "cathedral",
      iconSrc: "/images/quick-links/icons/cathedral.svg",
      imageLabel: "/images/quick-links/obluky.jpg",
      title: t("cathedral"),
      href: "/kostoly",
    },
    {
      key: "parish",
      iconSrc: "/images/quick-links/icons/parish.svg",
      imageLabel: "/images/quick-links/farnost.jpg",
      title: t("parish"),
      href: "#",
    },
    {
      key: "visit",
      iconSrc: "/images/quick-links/icons/visit.svg",
      imageLabel: "/images/quick-links/navsteva.webp",
      title: t("visit"),
      href: "#",
    },
    {
      key: "contact",
      iconSrc: "/images/quick-links/icons/contact.svg",
      imageLabel: "/images/quick-links/kontakt.jpg",
      title: t("contact"),
      href: "/kontakt",
    },
  ];

  // Only trust CMS quick links once every card actually has a background photo uploaded.
  const cmsLinks = quickLinks
    .filter((card) => getStrapiMediaUrl(card.image))
    .map((card, index) => ({
      key: `${card.title}-${index}`,
      iconSrc: getStrapiMediaUrl(card.icon) ?? undefined,
      imageLabel: getStrapiMediaUrl(card.image) ?? "",
      title: card.title,
      href: card.href,
    }));

  const links = cmsLinks.length > 0 ? cmsLinks : fallbackLinks;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {links.map((link) => (
        <QuickLinkCard
          key={link.key}
          iconSrc={link.iconSrc}
          title={link.title}
          imageLabel={link.imageLabel}
          href={link.href}
        />
      ))}
    </section>
  );
}
