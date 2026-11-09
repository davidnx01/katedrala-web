import type { KnownLanguageCode } from "./languages";

/**
 * The ONLY place that decides which languages the site serves.
 * Do not edit by hand — run `pnpm i18n:add <code>` (e.g. `pnpm i18n:add it`),
 * which adds the code here and scaffolds `messages/<code>.json`.
 */
export const ENABLED_LOCALES = ["sk", "en"] as const satisfies readonly KnownLanguageCode[];

/** Fallback language: used for unknown locales and for any message key a translation is still missing. */
export const DEFAULT_LOCALE = "sk" as const satisfies KnownLanguageCode;
