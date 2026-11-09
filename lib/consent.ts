/**
 * Cookie consent state — safe to import from Client Components.
 *
 * The decision is stored in a first-party cookie (`cookie_consent`) as JSON,
 * valid for 12 months (the Slovak regulator's guidance for how long a choice
 * should be respected before asking again). Only strictly necessary cookies
 * exist today, so no category beyond "necessary" is active; see ACTIVATING.
 *
 * ACTIVATING A NEW CATEGORY (e.g. analytics): set `active: true` on it below,
 * and load the tracking script only when `hasConsent("analytics")` is true
 * (listen to CONSENT_CHANGE_EVENT to react to later changes). Visitors who
 * already answered are asked again, because their stored decision lacks the
 * new category. Also update messages `Cookies.table` and the privacy policy.
 */

export type ConsentCategory = "necessary" | "analytics";

export interface ConsentCategoryConfig {
  id: ConsentCategory;
  /** Required categories are always on and cannot be switched off. */
  required: boolean;
  /** Inactive categories are neither shown nor asked about. */
  active: boolean;
}

export const CONSENT_CATEGORIES: readonly ConsentCategoryConfig[] = [
  { id: "necessary", required: true, active: true },
  { id: "analytics", required: false, active: false },
];

/** Optional categories the visitor is currently asked about. */
export const OPTIONAL_CATEGORIES: readonly ConsentCategory[] = CONSENT_CATEGORIES.filter(
  (category) => category.active && !category.required,
).map((category) => category.id);

export const CONSENT_COOKIE = "cookie_consent";
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
export const CONSENT_VERSION = 1;
/** Fired on `window` after a decision is saved. */
export const CONSENT_CHANGE_EVENT = "cookie-consent-change";
/** Dispatch on `window` to reopen the cookie settings (see CookieSettingsButton). */
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

export type ConsentChoices = Partial<Record<ConsentCategory, boolean>>;

export interface ConsentRecord {
  version: number;
  /** ISO timestamp of the decision, kept as proof of consent. */
  timestamp: string;
  choices: ConsentChoices;
}

/** Raw cookie value, "" when absent. Stable primitive, so it works as a useSyncExternalStore snapshot. */
export function readRawConsent(): string {
  const entry = document.cookie.split("; ").find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  return entry ? entry.slice(CONSENT_COOKIE.length + 1) : "";
}

/** Parses a raw cookie value; null when missing, malformed, outdated or not covering every active optional category. */
export function parseConsent(raw: string): ConsentRecord | null {
  if (!raw) return null;
  try {
    const record = JSON.parse(decodeURIComponent(raw)) as ConsentRecord;
    if (record.version !== CONSENT_VERSION || typeof record.choices !== "object" || !record.choices) {
      return null;
    }
    const answeredAll = OPTIONAL_CATEGORIES.every((id) => typeof record.choices[id] === "boolean");
    return answeredAll ? record : null;
  } catch {
    return null;
  }
}

export function readConsent(): ConsentRecord | null {
  return parseConsent(readRawConsent());
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  return readConsent()?.choices[category] === true;
}

/** Saves the decision (optional categories only; necessary is implicit) and notifies listeners. */
export function writeConsent(choices: ConsentChoices): void {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    choices,
  };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(record))}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/** Choice object with every active optional category set to `value`. */
export function allOptional(value: boolean): ConsentChoices {
  return Object.fromEntries(OPTIONAL_CATEGORIES.map((id) => [id, value])) as ConsentChoices;
}
