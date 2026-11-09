import "server-only";
import { Resend } from "resend";

export interface MailInput {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

/**
 * Sends one e-mail through Resend. Needs `RESEND_API_KEY` and `MAIL_FROM`
 * (a sender on a domain verified in Resend). Outside production, missing
 * configuration only logs the message so the forms stay usable locally;
 * in production it throws, so a misconfigured deploy never looks like a
 * successful submission.
 */
export async function sendMail({ to, subject, text, html, replyTo }: MailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[mail:dev] RESEND_API_KEY/MAIL_FROM not set — skipped e-mail to ${to}: ${subject}`);
      return;
    }
    throw new Error("Missing RESEND_API_KEY or MAIL_FROM environment variable");
  }

  const { error } = await new Resend(apiKey).emails.send({ from, to, subject, text, html, replyTo });
  if (error) {
    throw new Error(`Resend rejected the e-mail: ${error.name}`);
  }
}
