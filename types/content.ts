import type {
  ContactPageSection,
  HomepageSection,
  ParishPageSection,
  StrapiContactLocation,
  StrapiCta,
  StrapiHeroSection,
  StrapiMedia,
  StrapiSeo,
  VisitPageSection,
  FlexiblePageSection,
} from "./strapi";

export type ChurchType = "kostol" | "kaplnka";
export type MassLanguage = "sk" | "en" | "hu";

export interface MassTime {
  dayLabel: string;
  times: string[];
  language: MassLanguage;
}

export interface Church {
  id: number;
  name: string;
  slug: string;
  type: ChurchType;
  address: string;
  rector: string;
  email: string;
  phone: string;
  massSchedule: MassTime[];
  about: string;
  photo: StrapiMedia | null;
  gallery: StrapiMedia[];
  announcementsUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  order: number;
  seo?: StrapiSeo;
}

export type ChurchPreview = Pick<Church, "id" | "name" | "slug" | "address" | "photo">;

export interface Announcement {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
  seo?: StrapiSeo;
}

export interface Concert {
  id: number;
  title: string;
  slug: string;
  date: string;
  description: string;
  photo: StrapiMedia | null;
  seo?: StrapiSeo;
}

export type Cta = StrapiCta;

export interface QuickLink {
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface ContactLocation {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  photo: StrapiMedia | null;
  description: string;
  iban?: string;
}

export interface CalendarEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  href: string;
}

/** Generic flexible content page (Kapitulská ulica, Martineum, Sprievodca, Audioguides, Exkurzia, Omša s kňazom, ...). */
export interface Page {
  id: number;
  title: string;
  slug: string;
  eyebrow?: string;
  heroImage: StrapiMedia | null;
  sections: FlexiblePageSection[];
  seo?: StrapiSeo;
}

export interface Homepage {
  hero: StrapiHeroSection;
  sections: HomepageSection[];
  seo?: StrapiSeo;
}

export interface ParishPage {
  heroEyebrow?: string;
  heroTitle: string;
  heroImage: StrapiMedia | null;
  sections: ParishPageSection[];
  seo?: StrapiSeo;
}

export interface VisitPage {
  heroEyebrow?: string;
  heroTitle: string;
  heroImage: StrapiMedia | null;
  mainSquareUrl?: string;
  walletCardUrl?: string;
  qrCodeReservation?: StrapiMedia | null;
  qrCodeWallet?: StrapiMedia | null;
  sections: VisitPageSection[];
  seo?: StrapiSeo;
}

export interface ContactPage {
  heroEyebrow?: string;
  heroTitle: string;
  locations: StrapiContactLocation[];
  sections: ContactPageSection[];
  seo?: StrapiSeo;
}

export interface ReservationInput {
  name: string;
  email: string;
  phone?: string;
  preferredDate?: string;
  groupSize?: number;
  note?: string;
  locale: string;
}

export interface ExcursionInput {
  name: string;
  email: string;
  phone?: string;
  preferredDate?: string;
  groupSize?: number;
  message?: string;
  locale: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
  locale: string;
}
