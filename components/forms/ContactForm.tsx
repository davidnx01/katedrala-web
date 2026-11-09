"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/FormField";
import { FORM_CONTROL_CLASS } from "@/components/forms/form-styles";
import { submitContactForm } from "@/lib/actions/contact";
import {
  CONTACT_LIMITS,
  INITIAL_CONTACT_STATE,
  contactFormSchema,
  formDataToRecord,
  toFieldErrors,
  type ContactErrorCode,
  type ContactFieldErrors,
  type ContactFormState,
} from "@/lib/validation/contact";

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const [state, formAction, pending] = useActionState(submitContactForm, INITIAL_CONTACT_STATE);
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors | null>(null);
  const [dismissedState, setDismissedState] = useState<ContactFormState | null>(null);

  // Timestamp for the server-side "filled in too fast" bot check. Set on the
  // DOM node directly: a render-time Date.now() would differ between server
  // and client and break hydration.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  const errors = clientErrors ?? state.fieldErrors;
  const hasErrors = Object.keys(errors).length > 0;

  // Move focus to the first invalid field after a failed submission.
  useEffect(() => {
    if (hasErrors) {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [errors, hasErrors]);

  const errorMessage = (code: ContactErrorCode | undefined): string | undefined =>
    code
      ? t(`errors.${code}`, {
          min: code === "tooShort" ? CONTACT_LIMITS.messageMin : CONTACT_LIMITS.nameMin,
          max: CONTACT_LIMITS.messageMax,
        })
      : undefined;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const parsed = contactFormSchema.safeParse(formDataToRecord(new FormData(event.currentTarget)));
    if (parsed.success) {
      setClientErrors(null);
      return;
    }
    // Invalid: stop before the Server Action runs and show the errors locally.
    event.preventDefault();
    setClientErrors(toFieldErrors(parsed.error));
  }

  if (state.status === "success" && dismissedState !== state) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-6 text-center">
        <CheckCircle2 size={40} className="text-gold" aria-hidden="true" />
        <h3 className="font-serif text-2xl font-bold text-navy">{t("successTitle")}</h3>
        <p className="max-w-110 text-[15px] leading-relaxed text-[#7A756B] md:text-base">
          {t("successBody")}
        </p>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="border-stone bg-white text-navy hover:bg-surface"
          onClick={() => setDismissedState(state)}
        >
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  const describedBy = (field: string, hasError: boolean) => (hasError ? `${field}-error` : undefined);

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" ref={startedAtRef} defaultValue="" />
      {/* Honeypot: hidden from people and assistive tech, irresistible to bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField htmlFor="contact-name" label={t("nameLabel")} required error={errorMessage(errors.name)}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.nameMax}
            defaultValue={state.values.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("contact-name", !!errors.name)}
            className={FORM_CONTROL_CLASS}
          />
        </FormField>
        <FormField htmlFor="contact-email" label={t("emailLabel")} required error={errorMessage(errors.email)}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.emailMax}
            defaultValue={state.values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("contact-email", !!errors.email)}
            className={FORM_CONTROL_CLASS}
          />
        </FormField>
      </div>

      <FormField htmlFor="contact-subject" label={t("subjectLabel")} error={errorMessage(errors.subject)}>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={CONTACT_LIMITS.subjectMax}
          defaultValue={state.values.subject}
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={describedBy("contact-subject", !!errors.subject)}
          className={FORM_CONTROL_CLASS}
        />
      </FormField>

      <FormField htmlFor="contact-message" label={t("messageLabel")} required error={errorMessage(errors.message)}>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={CONTACT_LIMITS.messageMax}
          defaultValue={state.values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("contact-message", !!errors.message)}
          className={`${FORM_CONTROL_CLASS} resize-y`}
        />
      </FormField>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-consent" className="flex min-h-12 cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#2C2A26]">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy("contact-consent", !!errors.consent)}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-gold"
          />
          <span>
            {t.rich("consent", {
              link: (chunks) => (
                <Link href="/ochrana-udajov" target="_blank" className="font-semibold text-navy underline underline-offset-2">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errors.consent && (
          <p id="contact-consent-error" className="text-sm text-red-700">
            {errorMessage(errors.consent)}
          </p>
        )}
      </div>

      {state.formError && !hasErrors && (
        <p role="alert" className="rounded-lg border border-red-700/30 bg-red-50 px-4 py-3 text-sm text-red-800">
          {t(`errors.${state.formError}`)}
        </p>
      )}

      <div>
        <Button type="submit" variant="dark" size="lg" disabled={pending}>
          <Send size={16} aria-hidden="true" />
          {pending ? t("sending") : t("submit")}
        </Button>
      </div>
    </form>
  );
}
