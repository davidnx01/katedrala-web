"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={cn("flex gap-0.5 rounded-md bg-white/6 p-0.5", className)}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={l === locale}
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            "min-h-6 rounded px-2 py-0.5 text-[11px] font-semibold uppercase transition-colors",
            l === locale
              ? "bg-gold text-navy"
              : "text-white/35 hover:text-white/60"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
