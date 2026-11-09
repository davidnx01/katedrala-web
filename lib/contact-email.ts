import "server-only";
import type { MailInput } from "@/lib/mail";

type Translate = (key: string, values?: Record<string, string>) => string;

interface ContactEmailInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
  /** Language of the page the visitor wrote from (BCP 47 code). */
  locale: string;
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

/** Header values (subject, display name) must never contain line breaks. */
export function toSingleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function htmlLayout(paragraphs: string[]): string {
  const body = paragraphs
    .map((paragraph) => `<p style="margin:0 0 16px;line-height:1.6">${paragraph}</p>`)
    .join("");
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2c2a26;max-width:560px">${body}</div>`;
}

function messageBlock(message: string): string {
  return `<blockquote style="margin:0 0 16px;padding:12px 16px;border-left:3px solid #c5a44e;background:#faf7f2;white-space:pre-wrap">${escapeHtml(message)}</blockquote>`;
}

/** Notification for the parish office; replying goes straight to the sender. */
export function buildOwnerEmail(
  to: string,
  input: ContactEmailInput,
  t: Translate,
): MailInput {
  const subjectLine = input.subject || t("noSubject");
  const rows: [string, string][] = [
    [t("fromLabel"), toSingleLine(input.name)],
    [t("emailLabel"), input.email],
    [t("subjectLabel"), toSingleLine(subjectLine)],
    [t("languageLabel"), input.locale],
  ];

  const text = [
    t("ownerIntro"),
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `${t("messageLabel")}:`,
    input.message,
  ].join("\n");

  const html = htmlLayout([
    escapeHtml(t("ownerIntro")),
    rows.map(([label, value]) => `<strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}`).join("<br>"),
    `<strong>${escapeHtml(t("messageLabel"))}:</strong>`,
  ]).replace(/<\/div>$/, `${messageBlock(input.message)}</div>`);

  return {
    to,
    subject: toSingleLine(t("ownerSubject", { name: input.name })),
    text,
    html,
    replyTo: input.email,
  };
}

/** Confirmation copy for the sender, in the language of the page they used. */
export function buildConfirmationEmail(
  replyAddress: string,
  input: ContactEmailInput,
  t: Translate,
): MailInput {
  const greeting = t("confirmGreeting", { name: toSingleLine(input.name) });
  const footer = t("confirmFooter", { email: replyAddress });

  const text = [
    greeting,
    "",
    t("confirmBody"),
    "",
    t("confirmCopyLabel"),
    input.message,
    "",
    footer,
    t("signature"),
  ].join("\n");

  const html = htmlLayout([
    escapeHtml(greeting),
    escapeHtml(t("confirmBody")),
    `<strong>${escapeHtml(t("confirmCopyLabel"))}</strong>`,
  ]).replace(
    /<\/div>$/,
    `${messageBlock(input.message)}<p style="margin:0 0 4px;color:#7a756b;font-size:13px">${escapeHtml(footer)}</p><p style="margin:0;color:#7a756b;font-size:13px">${escapeHtml(t("signature"))}</p></div>`,
  );

  return {
    to: input.email,
    subject: toSingleLine(t("confirmSubject")),
    text,
    html,
    replyTo: replyAddress || undefined,
  };
}
