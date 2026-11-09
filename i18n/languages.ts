import languages from "./languages.json";

/** ISO 639-1 codes of every language the project knows how to describe (not necessarily served). */
export type KnownLanguageCode = keyof typeof languages;

export interface LanguageInfo {
  nativeName: string;
  englishName: string;
  /** Open Graph locale, e.g. "sk_SK". */
  ogLocale: string;
  dir: "ltr" | "rtl";
}

/**
 * Catalog of all known languages (`languages.json`). Adding a language to the
 * site does NOT happen here — see `config.ts` / `pnpm i18n:add`.
 */
export const KNOWN_LANGUAGES: Record<KnownLanguageCode, LanguageInfo> = languages as Record<
  KnownLanguageCode,
  LanguageInfo
>;

export function isKnownLanguage(code: string): code is KnownLanguageCode {
  return Object.prototype.hasOwnProperty.call(KNOWN_LANGUAGES, code);
}

/** Language info for any locale code; unknown codes fall back to a minimal descriptor. */
export function getLanguage(code: string): LanguageInfo {
  return isKnownLanguage(code)
    ? KNOWN_LANGUAGES[code]
    : { nativeName: code, englishName: code, ogLocale: code, dir: "ltr" };
}
