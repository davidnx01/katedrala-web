import { useTranslations } from "next-intl";
import { QuickLinkCard } from "@/components/cards/QuickLinkCard";
import { IconCathedral, IconHands, IconTourist } from "@/components/icons";
import { Phone } from "lucide-react";

export function QuickLinks() {
  const t = useTranslations("QuickLinks");

  const links = [
    {
      key: "cathedral",
      icon: <IconCathedral size={56} />,
      imageLabel: "/images/quick-links/obluky.jpg",
      href: "/kostoly",
    },
    {
      key: "parish",
      icon: <IconHands size={56} />,
      imageLabel: "/images/quick-links/farnost.jpg",
      href: "#",
    },
    {
      key: "visit",
      icon: <IconTourist size={56} />,
      imageLabel: "/images/quick-links/navsteva.webp",
      href: "#",
    },
    {
      key: "contact",
      icon: <Phone size={40} aria-hidden="true" />,
      imageLabel: "/images/quick-links/kontakt.jpg",
      href: "#",
    },
  ] as const;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {links.map((link) => (
        <QuickLinkCard
          key={link.key}
          icon={link.icon}
          title={t(link.key)}
          imageLabel={link.imageLabel}
          href={link.href}
        />
      ))}
    </section>
  );
}
