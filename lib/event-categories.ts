import type { EventCategory } from "@/types/content";

/** Category → Tailwind background class for calendar dots / badges. Colors defined in app/globals.css. */
export const EVENT_CATEGORY_COLORS: Record<EventCategory, string> = {
  pohreb: "bg-cat-funeral",
  koncert: "bg-cat-concert",
  sukromna_exkurzia: "bg-cat-excursion",
  krst: "bg-cat-baptism",
};

export const EVENT_CATEGORIES: EventCategory[] = [
  "pohreb",
  "koncert",
  "sukromna_exkurzia",
  "krst",
];

/** Category → Tailwind classes for a readable tinted badge (detail page, event lists). */
export const EVENT_CATEGORY_BADGE_CLASSES: Record<EventCategory, string> = {
  pohreb: "bg-cat-funeral-light text-cat-funeral",
  koncert: "bg-cat-concert-light text-cat-concert",
  sukromna_exkurzia: "bg-cat-excursion-light text-cat-excursion",
  krst: "bg-cat-baptism-light text-cat-baptism",
};
