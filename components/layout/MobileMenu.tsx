"use client";

import { useState } from "react";
import { Menu, Home, Church, Compass, Landmark, Mail, Link2, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { StrapiNavLink } from "@/types/strapi";

/** Maps the free-text `icon` field on a nav link (Strapi) to a lucide component. */
const ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  church: Church,
  compass: Compass,
  landmark: Landmark,
  mail: Mail,
};

const LANGUAGE_NAMES: Record<string, string> = {
  sk: "Slovenčina",
  en: "English",
};

interface MobileMenuProps {
  links: StrapiNavLink[];
}

export function MobileMenu({ links }: MobileMenuProps) {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={t("openMenu")}
        className="flex min-h-12 min-w-12 items-center justify-center text-white md:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col gap-0 border-l border-white/10 bg-navy p-0"
      >
        <SheetHeader className="border-b border-white/8 px-5 py-5">
          <div className="flex items-center gap-2.5">
            <Logo size={26} />
            <div>
              <SheetTitle className="font-serif text-base text-white">
                {t("brand")}
              </SheetTitle>
              <p className="text-[11px] tracking-wide text-white/35 uppercase">
                {t("brandSub")}
              </p>
            </div>
          </div>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-3 py-4">
          {links.map((link) => {
            const Icon = (link.icon && ICON_MAP[link.icon]) || Link2;
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-14 items-center gap-3 rounded-xl px-3 text-base font-medium transition-colors",
                  active
                    ? "bg-gold/12 text-gold"
                    : "text-white/75 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon
                  size={20}
                  className={active ? "text-gold" : "text-white/40"}
                  aria-hidden="true"
                />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/8 px-3 py-4">
          <p className="mb-2 px-3 text-[11px] font-semibold tracking-widest text-white/35 uppercase">
            {t("language")}
          </p>
          <div className="flex flex-col gap-1">
            {routing.locales.map((l) => {
              const active = l === locale;
              return (
                <button
                  key={l}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    router.replace(pathname, { locale: l });
                    setOpen(false);
                  }}
                  className={cn(
                    "flex min-h-12 items-center justify-between rounded-xl px-3 text-[15px] font-medium transition-colors",
                    active
                      ? "bg-white/8 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {LANGUAGE_NAMES[l]}
                  {active && <Check size={18} className="text-gold" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
