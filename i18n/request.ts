import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE } from "./config";
import { routing } from "./routing";

type MessageValue = string | MessageValue[] | Messages;
interface Messages {
  [key: string]: MessageValue;
}

function isMessages(value: MessageValue | undefined): value is Messages {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function loadMessages(locale: string): Promise<Messages> {
  return (await import(`../messages/${locale}.json`)).default as Messages;
}

/** Recursively overlays `override` on `base`, so a missing translation key falls back to the default language. */
function mergeMessages(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = result[key];
    // Arrays (legal sections, table rows) are leaf values: a translation replaces them whole.
    result[key] = isMessages(value) && isMessages(baseValue) ? mergeMessages(baseValue, value) : value;
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const defaultMessages = await loadMessages(DEFAULT_LOCALE);
  const messages =
    locale === DEFAULT_LOCALE
      ? defaultMessages
      : mergeMessages(defaultMessages, await loadMessages(locale));

  return { locale, messages };
});
