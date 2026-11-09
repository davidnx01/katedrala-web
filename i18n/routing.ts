import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, ENABLED_LOCALES } from "./config";

export const routing = defineRouting({
  locales: ENABLED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
