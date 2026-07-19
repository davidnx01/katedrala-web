import type {
  ContactPageSection,
  HomepageSection,
  ParishPageSection,
  StrapiContactLocation,
  StrapiCoronationKing,
  StrapiCta,
  StrapiHeroSection,
  StrapiHoursRow,
  StrapiIconCard,
  StrapiJourneyStep,
  StrapiMedia,
  StrapiQuickLinkCard,
  StrapiRestrictionItem,
  StrapiSeo,
  StrapiStatItem,
  StrapiTicketRow,
  StrapiTimelineEvent,
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

export type ChurchPreview = Pick<Church, "id" | "name" | "slug" | "address" | "photo" | "type">;

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
  quickLinks: StrapiQuickLinkCard[];
  sections: HomepageSection[];
  seo?: StrapiSeo;
}

/** Determines the calendar dot/badge color — see lib/event-categories.ts for the color mapping. */
export type EventCategory = "pohreb" | "koncert" | "sukromna_exkurzia" | "krst";

/** Homepage calendar entry (masses, concerts, feast days, tours, meetings...). Has its own detail page at /udalosti/[slug]. */
export interface Event {
  id: number;
  title: string;
  slug: string;
  date: string;
  category: EventCategory;
  timeFrom: string;
  timeTo: string;
  location: string;
  description: string;
}

/** Site-wide settings — brand name + footer text. Nav/footer links stay fixed in code. */
export interface Global {
  siteName: string;
  siteTagline?: string;
  footerTagline?: string;
  diocese?: string;
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
  heroTitleEmphasis?: string;
  heroSubtitle?: string;
  heroCtaPrimaryLabel?: string;
  heroCtaSecondaryLabel?: string;
  heroImage: StrapiMedia | null;
  stats: StrapiStatItem[];
  martineumEyebrow?: string;
  martineumTitle?: string;
  martineumBody?: string;
  /** Comma-separated in Strapi (see cms/CLAUDE.md), parsed to a list in lib/api.ts. */
  martineumAwards?: string[];
  martineumImages: StrapiMedia[];
  servicesEyebrow?: string;
  servicesTitle?: string;
  services: StrapiIconCard[];
  journeyEyebrow?: string;
  journeyTitle?: string;
  journeySteps: StrapiJourneyStep[];
  cellarsEyebrow?: string;
  cellarsTitle?: string;
  cellarsBody?: string;
  cellarsImage?: StrapiMedia | null;
  cellarsCtaLabel?: string;
  practicalEyebrow?: string;
  practicalTitle?: string;
  hours: StrapiHoursRow[];
  tickets: StrapiTicketRow[];
  reservationTitle?: string;
  reservationBody?: string;
  reservationCtaLabel?: string;
  restrictionsEyebrow?: string;
  restrictionsTitle?: string;
  restrictions: StrapiRestrictionItem[];
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

export interface HistoryPage {
  heroEyebrow?: string;
  heroTitle: string;
  heroTitleEmphasis?: string;
  heroSubtitle?: string;
  heroImage: StrapiMedia | null;
  timelineEyebrow?: string;
  timelineTitle?: string;
  timelineEvents: StrapiTimelineEvent[];
  coronationsEyebrow?: string;
  coronationsTitle?: string;
  coronationsBody?: string;
  coronationsListLabel?: string;
  coronationsKings: StrapiCoronationKing[];
  historyEyebrow?: string;
  historyTitle?: string;
  historyBody?: string;
  historyImages: StrapiMedia[];
  chapelEyebrow?: string;
  chapelTitle?: string;
  chapelBody?: string;
  chapelImage?: StrapiMedia | null;
  kapitulskaEyebrow?: string;
  kapitulskaTitle?: string;
  kapitulskaBody?: string;
  kapitulskaImages: StrapiMedia[];
  todayEyebrow?: string;
  todayTitle?: string;
  todayBody?: string;
  todayCtaPrimaryLabel?: string;
  todayCtaSecondaryLabel?: string;
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
