/** Date of the last substantive change to the privacy policy / cookie page copy (ISO). Bump on every edit. */
export const LEGAL_LAST_UPDATED = "2026-10-24";

/** Formats a date in the visitor's language (works for any enabled locale). */
export function formatLegalDate(locale: string, isoDate: string = LEGAL_LAST_UPDATED): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(isoDate));
}
