import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { IconCross } from "@/components/icons";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { getNavigation } from "@/lib/api";
import type { StrapiNavLink } from "@/types/strapi";

export async function Header() {
  const t = await getTranslations("Nav");
  const locale = await getLocale();
  const navigation = await getNavigation({ locale }).catch(() => null);

  const fallbackLinks: StrapiNavLink[] = [
    { label: t("home"), href: "/" },
    { label: t("parish"), href: "/farnost" },
    { label: t("visit"), href: "/navsteva" },
    { label: t("contact"), href: "/kontakt" },
  ];
  const headerLinks = navigation?.headerLinks.length ? navigation.headerLinks : fallbackLinks;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-navy/85 backdrop-blur-lg py-2">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5 md:px-8 md:py-3 lg:px-12 lg:py-3.5">
        <Link href="/" className="mr-auto flex items-center gap-2.5">
          <span className="text-gold">
            <IconCross size={40} />
          </span>
          <span>
            <span className="block font-serif text-sm lg:text-base leading-tight font-semibold text-white md:text-sm">
              {t("brand")}
            </span>
            <span className="block text-xs tracking-wide text-white/50 mt-0.5 uppercase">
              {t("brandSub")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3.5 font-medium py-1.5 text-lg text-white transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher className="ml-4 hidden md:flex" />
        <MobileMenu links={headerLinks} />
      </div>
    </header>
  );
}
