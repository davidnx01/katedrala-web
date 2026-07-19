import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Splits a richtext/markdown body into plain paragraphs on blank lines. */
export function toParagraphs(body?: string): string[] {
  return (body ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

/** Formats a Strapi time value ("HH:mm:ss.SSS") down to "HH:mm". */
export function formatTime(time: string): string {
  return time.slice(0, 5);
}

/** Converts a Strapi time value ("HH:mm:ss.SSS") to decimal hours (e.g. "09:30:00.000" -> 9.5). */
export function timeToDecimalHours(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours + minutes / 60;
}

/** Monday of the week containing `date`, at midnight local time. */
export function getMonday(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day + (day === 0 ? -6 : 1);
  result.setDate(diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

/** Formats a Date as "YYYY-MM-DD" in local time (not UTC, unlike toISOString). */
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
