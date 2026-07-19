import type { EventCategory } from "@/types/content";

/** Category → Tailwind background class for calendar dots / badges. Colors defined in app/globals.css. */
export const EVENT_CATEGORY_COLORS: Record<EventCategory, string> = {
  pohreb: "bg-cat-funeral",
  koncert: "bg-cat-concert",
  sukromna_exkurzia: "bg-cat-excursion",
  krst: "bg-cat-baptism",
  omsa: "bg-cat-mass",
  adoracia: "bg-cat-adoration",
  sobas: "bg-cat-wedding",
  lectio: "bg-cat-lectio",
  prehliadka: "bg-cat-tour",
};

export const EVENT_CATEGORIES: EventCategory[] = [
  "omsa",
  "koncert",
  "pohreb",
  "adoracia",
  "sobas",
  "sukromna_exkurzia",
  "lectio",
  "prehliadka",
  "krst",
];

/** Category → Tailwind classes for a readable tinted badge (detail page, event lists). */
export const EVENT_CATEGORY_BADGE_CLASSES: Record<EventCategory, string> = {
  pohreb: "bg-cat-funeral-light text-cat-funeral",
  koncert: "bg-cat-concert-light text-cat-concert",
  sukromna_exkurzia: "bg-cat-excursion-light text-cat-excursion",
  krst: "bg-cat-baptism-light text-cat-baptism",
  omsa: "bg-cat-mass-light text-cat-mass",
  adoracia: "bg-cat-adoration-light text-cat-adoration",
  sobas: "bg-cat-wedding-light text-cat-wedding",
  lectio: "bg-cat-lectio-light text-cat-lectio",
  prehliadka: "bg-cat-tour-light text-cat-tour",
};

/** Category → Tailwind border-color class, used for the left accent border on calendar blocks/cards. */
export const EVENT_CATEGORY_BORDER_CLASSES: Record<EventCategory, string> = {
  pohreb: "border-cat-funeral",
  koncert: "border-cat-concert",
  sukromna_exkurzia: "border-cat-excursion",
  krst: "border-cat-baptism",
  omsa: "border-cat-mass",
  adoracia: "border-cat-adoration",
  sobas: "border-cat-wedding",
  lectio: "border-cat-lectio",
  prehliadka: "border-cat-tour",
};
