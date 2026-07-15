import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IconCross } from "@/components/icons";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "parish", href: "/farnost" },
  { key: "visit", href: "#" },
  { key: "churches", href: "#" },
  { key: "contact", href: "#" },
] as const;

export function Header() {
  const t = useTranslations("Nav");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-navy/85 backdrop-blur-lg py-2">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5 md:px-8 md:py-3 lg:px-12 lg:py-3.5">
        <Link href="/" className="mr-auto flex items-center gap-2.5">
          <span className="text-gold">
            <IconCross size={28} />
          </span>
          <span>
            <span className="block font-serif text-[13px] leading-tight font-semibold text-white md:text-sm">
              {t("brand")}
            </span>
            <span className="block text-[10px] tracking-wide text-white/35 uppercase">
              {t("brandSub")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-md px-3.5 font-medium py-1.5 text-lg text-white transition-colors hover:bg-white/10 hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher className="ml-4 hidden md:flex" />
        <MobileMenu />
      </div>
    </header>
  );
}
