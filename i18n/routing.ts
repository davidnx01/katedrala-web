import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sk", "en"],
  defaultLocale: "sk",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
