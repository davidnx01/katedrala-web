"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "parish", href: "/farnost" },
  { key: "visit", href: "#" },
  { key: "churches", href: "#" },
  { key: "contact", href: "#" },
] as const;

export function MobileMenu() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={t("openMenu")}
        className="flex min-h-12 min-w-12 items-center justify-center text-white md:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="border-l border-white/10 bg-navy">
        <SheetHeader>
          <SheetTitle className="font-serif text-white">{t("brand")}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-1 px-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center rounded-md px-3 text-[15px] text-white/70 hover:bg-white/5 hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="flex justify-center px-4 pb-4">
          <LanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
