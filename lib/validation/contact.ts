import { z } from "zod";

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  subjectMax: 150,
  messageMin: 10,
  messageMax: 2000,
} as const;

/** Error codes double as zod messages and as keys of the `ContactForm.errors` i18n namespace. */
export type ContactErrorCode = "required" | "invalidEmail" | "tooShort" | "tooLong" | "consent";

export type ContactFieldName = "name" | "email" | "subject" | "message" | "consent";

export type ContactFieldErrors = Partial<Record<ContactFieldName, ContactErrorCode>>;

export type ContactFormValues = Partial<Record<Exclude<ContactFieldName, "consent">, string>>;

export interface ContactFormState {
  status: "idle" | "success" | "error";
  fieldErrors: ContactFieldErrors;
  /** Set when the submission was valid but could not be processed. */
  formError?: "sendFailed" | "rateLimited";
  /** Echoed back so the inputs keep their content after a failed submission. */
  values: ContactFormValues;
}

export const INITIAL_CONTACT_STATE: ContactFormState = {
  status: "idle",
  fieldErrors: {},
  values: {},
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactFormSchema = z.object({
  name: z
    .string({ error: "required" })
    .trim()
    .min(1, "required")
    .min(CONTACT_LIMITS.nameMin, "tooShort")
    .max(CONTACT_LIMITS.nameMax, "tooLong"),
  email: z
    .string({ error: "required" })
    .trim()
    .min(1, "required")
    .max(CONTACT_LIMITS.emailMax, "tooLong")
    .regex(EMAIL_PATTERN, "invalidEmail"),
  subject: z.string().trim().max(CONTACT_LIMITS.subjectMax, "tooLong").optional(),
  message: z
    .string({ error: "required" })
    .trim()
    .min(1, "required")
    .min(CONTACT_LIMITS.messageMin, "tooShort")
    .max(CONTACT_LIMITS.messageMax, "tooLong"),
  // A checked checkbox submits "on"; an unchecked one is absent from FormData.
  consent: z.literal("on", "consent"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/** Keeps only the first error per field. */
export function toFieldErrors(error: z.ZodError): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactFieldName | undefined;
    if (field && !errors[field]) errors[field] = issue.message as ContactErrorCode;
  }
  return errors;
}

/** Picks the string entries of a FormData payload (files and missing fields are ignored). */
export function formDataToRecord(formData: FormData): Record<string, string> {
  const record: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") record[key] = value;
  }
  return record;
}
