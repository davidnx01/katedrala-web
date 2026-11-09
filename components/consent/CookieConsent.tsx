"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CookieCategoryToggle } from "@/components/consent/CookieCategoryToggle";
import {
  CONSENT_CHANGE_EVENT,
  OPEN_COOKIE_SETTINGS_EVENT,
  OPTIONAL_CATEGORIES,
  allOptional,
  parseConsent,
  readRawConsent,
  writeConsent,
  type ConsentChoices,
} from "@/lib/consent";

/** Server snapshot: nothing is known about the cookie until the client hydrates. */
const PENDING = "pending";

function subscribe(callback: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
}

type Panel = "summary" | "settings";

const hasOptionalCategories = OPTIONAL_CATEGORIES.length > 0;

export function CookieConsent() {
  const t = useTranslations("CookieConsent");
  const raw = useSyncExternalStore(subscribe, readRawConsent, () => PENDING);
  const [reopened, setReopened] = useState(false);
  const [panel, setPanel] = useState<Panel>("summary");
  const [draft, setDraft] = useState<ConsentChoices>(allOptional(false));

  const record = raw === PENDING ? null : parseConsent(raw);
  const visible = raw !== PENDING && (record === null || reopened);

  // Reopen from the footer button, preloading the current choices.
  useEffect(() => {
    function handleOpen() {
      const current = parseConsent(readRawConsent());
      setDraft(current?.choices ?? allOptional(false));
      setPanel(hasOptionalCategories ? "settings" : "summary");
      setReopened(true);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpen);
  }, []);

  if (!visible) return null;

  function decide(choices: ConsentChoices) {
    writeConsent(choices);
    setReopened(false);
    setPanel("summary");
  }

  const rejectOptional = () => decide(allOptional(false));

  return (
    <section
      aria-label={t("regionLabel")}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-170 rounded-2xl border border-stone bg-white p-5 shadow-2xl md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-serif text-xl font-bold text-navy">
          {hasOptionalCategories ? t("consentTitle") : t("infoTitle")}
        </h2>
        <button
          type="button"
          onClick={rejectOptional}
          aria-label={t("close")}
          className="-mt-2 -mr-2 flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#7A756B] outline-none hover:text-navy focus-visible:ring-3 focus-visible:ring-gold/50"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <p className="mt-1 text-sm leading-relaxed text-[#7A756B] md:text-[15px]">
        {hasOptionalCategories ? t("consentBody") : t("infoBody")}{" "}
        <Link href="/cookies" className="font-semibold text-navy underline underline-offset-2">
          {t("learnMore")}
        </Link>
      </p>

      {panel === "settings" && hasOptionalCategories && (
        <div className="mt-4 flex flex-col gap-3">
          <CookieCategoryToggle
            id="cookie-necessary"
            title={t("categories.necessary.title")}
            description={t("categories.necessary.description")}
            checked
            lockedLabel={t("alwaysOn")}
          />
          {OPTIONAL_CATEGORIES.map((id) => (
            <CookieCategoryToggle
              key={id}
              id={`cookie-${id}`}
              title={t(`categories.${id}.title`)}
              description={t(`categories.${id}.description`)}
              checked={draft[id] === true}
              onChange={(checked) => setDraft((current) => ({ ...current, [id]: checked }))}
            />
          ))}
        </div>
      )}

      {/* Accept and reject share one style and size: equal prominence is a regulator requirement. */}
      <div className="mt-5 flex flex-wrap gap-3">
        {!hasOptionalCategories && (
          <Button type="button" variant="dark" size="lg" onClick={rejectOptional}>
            {t("infoAccept")}
          </Button>
        )}
        {hasOptionalCategories && panel === "summary" && (
          <>
            <Button type="button" variant="dark" size="lg" onClick={() => decide(allOptional(true))}>
              {t("acceptAll")}
            </Button>
            <Button type="button" variant="dark" size="lg" onClick={rejectOptional}>
              {t("rejectAll")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="border-stone bg-white text-navy hover:bg-surface"
              onClick={() => setPanel("settings")}
            >
              {t("customize")}
            </Button>
          </>
        )}
        {hasOptionalCategories && panel === "settings" && (
          <>
            <Button type="button" variant="dark" size="lg" onClick={() => decide(draft)}>
              {t("save")}
            </Button>
            <Button type="button" variant="dark" size="lg" onClick={() => decide(allOptional(true))}>
              {t("acceptAll")}
            </Button>
            <Button type="button" variant="dark" size="lg" onClick={rejectOptional}>
              {t("rejectAll")}
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
