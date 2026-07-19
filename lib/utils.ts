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
