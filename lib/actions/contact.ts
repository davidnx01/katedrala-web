"use server";

import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { createContactMessage } from "@/lib/api";
import { buildConfirmationEmail, buildOwnerEmail } from "@/lib/contact-email";
import { sendMail } from "@/lib/mail";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  contactFormSchema,
  formDataToRecord,
  toFieldErrors,
  type ContactFormState,
} from "@/lib/validation/contact";

/** Submissions faster than this after the form rendered are treated as bots. */
const MIN_FILL_MS = 2500;
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

async function getClientIp(): Promise<string> {
  const requestHeaders = await headers();
  return requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function resolveLocale(value: string | undefined): string {
  return value && (routing.locales as readonly string[]).includes(value) ? value : DEFAULT_LOCALE;
}

function success(): ContactFormState {
  return { status: "success", fieldErrors: {}, values: {} };
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = formDataToRecord(formData);

  // Honeypot: real visitors never see or fill the `website` field. Bots get a
  // fake success so they have nothing to adapt to.
  if (raw.website) return success();

  const startedAt = Number(raw.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return success();
  }

  const values = { name: raw.name, email: raw.email, subject: raw.subject, message: raw.message };

  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", fieldErrors: toFieldErrors(parsed.error), values };
  }

  if (!checkRateLimit(`contact:${await getClientIp()}`, RATE_LIMIT)) {
    return { status: "error", fieldErrors: {}, formError: "rateLimited", values };
  }

  const { name, email, subject, message } = parsed.data;
  const locale = resolveLocale(raw.locale);
  const input = { name, email, subject: subject || undefined, message, locale };

  const officeAddress = process.env.CONTACT_TO_EMAIL;

  try {
    // The notification to the parish office is the point of the form, so its
    // failure fails the submission. The Strapi archive is best-effort.
    const [ownerT, senderT] = await Promise.all([
      getTranslations({ locale: DEFAULT_LOCALE, namespace: "ContactForm.email" }),
      getTranslations({ locale, namespace: "ContactForm.email" }),
    ]);

    if (!officeAddress && process.env.NODE_ENV === "production") {
      throw new Error("Missing CONTACT_TO_EMAIL environment variable");
    }

    const [mailResult, archiveResult] = await Promise.allSettled([
      sendMail(buildOwnerEmail(officeAddress ?? "dev@localhost", input, ownerT)),
      createContactMessage({ name, email, subject: input.subject, message, locale }),
    ]);

    if (archiveResult.status === "rejected") {
      console.error("[contact] Strapi archive failed:", archiveResult.reason);
    }
    if (mailResult.status === "rejected") {
      throw mailResult.reason;
    }

    // Courtesy copy for the sender — never fails the submission.
    await sendMail(
      buildConfirmationEmail(officeAddress ?? "", input, senderT),
    ).catch((error) => console.error("[contact] confirmation e-mail failed:", error));

    return success();
  } catch (error) {
    console.error("[contact] submission failed:", error);
    return { status: "error", fieldErrors: {}, formError: "sendFailed", values };
  }
}
