export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: StrapiPagination;
  };
}

export interface StrapiSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: StrapiMedia | null;
  noIndex?: boolean;
}

export interface StrapiCta {
  label: string;
  href: string;
  style: "primary" | "secondary" | "outline";
}

export type MetaRowIcon =
  | "clock"
  | "map-pin"
  | "phone"
  | "mail"
  | "scroll-text"
  | "heart"
  | "droplets"
  | "book-open"
  | "flame"
  | "calendar"
  | "users";

export interface StrapiMetaRow {
  icon: MetaRowIcon;
  label: string;
}

export interface StrapiFaqItem {
  question: string;
  answer: string;
}

/**
 * Dynamic-zone section components. Each entry carries `__component` as the
 * discriminant Strapi returns, so consuming code can `switch` on it safely.
 */
export interface RichTextSection {
  __component: "sections.rich-text";
  id: number;
  title?: string;
  body: string;
}

export interface ImageTextSection {
  __component: "sections.image-text";
  id: number;
  eyebrow?: string;
  title: string;
  body: string;
  image: StrapiMedia;
  cta?: StrapiCta;
  meta?: StrapiMetaRow[];
  reverse: boolean;
  tinted: boolean;
}

export interface CtaBannerSection {
  __component: "sections.cta-banner";
  id: number;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta: StrapiCta;
}

export interface GallerySection {
  __component: "sections.gallery";
  id: number;
  title?: string;
  images: StrapiMedia[];
}

export interface FaqSection {
  __component: "sections.faq";
  id: number;
  eyebrow?: string;
  title: string;
  items: StrapiFaqItem[];
}

export interface QuickNavSection {
  __component: "sections.quick-nav";
  id: number;
  eyebrow?: string;
  items: StrapiQuickLink[];
}

export interface MassScheduleSection {
  __component: "sections.mass-schedule";
  id: number;
  eyebrow?: string;
  title: string;
  location?: string;
  note?: string;
  schedule: StrapiMassTime[];
  image?: StrapiMedia | null;
}

export interface AnnouncementsPreviewSection {
  __component: "sections.announcements-preview";
  id: number;
  eyebrow?: string;
  title: string;
  limit: number;
  linkLabel?: string;
}

export interface ChurchesPreviewSection {
  __component: "sections.churches-preview";
  id: number;
  eyebrow?: string;
  title: string;
  limit: number;
  linkLabel?: string;
}

export interface ContactsSection {
  __component: "sections.contacts";
  id: number;
  eyebrow?: string;
  title: string;
  locations: StrapiContactLocation[];
}

export type FlexiblePageSection =
  | RichTextSection
  | ImageTextSection
  | CtaBannerSection
  | GallerySection
  | FaqSection
  | MassScheduleSection;

export type HomepageSection =
  | AnnouncementsPreviewSection
  | MassScheduleSection
  | ChurchesPreviewSection
  | ContactsSection;

export type ParishPageSection =
  | QuickNavSection
  | AnnouncementsPreviewSection
  | ImageTextSection
  | RichTextSection
  | FaqSection;

export type VisitPageSection =
  | RichTextSection
  | ImageTextSection
  | CtaBannerSection
  | FaqSection
  | GallerySection;

export type ContactPageSection = RichTextSection | CtaBannerSection | FaqSection;

export interface StrapiMassTime {
  dayLabel: string;
  times: string[];
  language: "sk" | "en" | "hu";
}

export interface StrapiHoursRow {
  dayLabel: string;
  time: string;
  note?: string;
}

export interface StrapiContactLocation {
  name: string;
  /** Stable frontend key (e.g. map markers) — plain string, not a Strapi uid. */
  slug?: string;
  address: string;
  /** e.g. "811 01 Bratislava" — kept separate from address for display + map query formatting. */
  city?: string;
  phone?: string;
  email?: string;
  hours?: StrapiHoursRow[];
  photo?: StrapiMedia | null;
  description?: string;
  iban?: string;
  /** Short chip labels shown over the photo — homepage contacts section only. */
  tags?: string[];
}

export interface StrapiQuickLink {
  icon: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl: string;
}

export interface StrapiQuickLinkCard {
  icon: StrapiMedia | null;
  title: string;
  image: StrapiMedia | null;
  href: string;
}

export interface StrapiHeroSection {
  eyebrow?: string;
  titleLine1: string;
  titleLine2: string;
  titleEmphasis: string;
  subtitle?: string;
  /** 2+ photos for the Ken Burns crossfade slideshow. */
  images: StrapiMedia[];
  ctaPrimary?: StrapiCta;
  ctaSecondary?: StrapiCta;
}

export interface StrapiStatItem {
  value: string;
  label: string;
}

export type IconCardIcon = "ticket" | "headphones" | "gift" | "gallery";

export interface StrapiIconCard {
  icon: IconCardIcon;
  title: string;
  description: string;
}

export interface StrapiJourneyStep {
  title: string;
  description: string;
  image?: StrapiMedia | null;
}

export interface StrapiTicketRow {
  label: string;
  price: string;
}

export interface StrapiRestrictionItem {
  icon: string;
  text: string;
}

export interface StrapiTimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface StrapiCoronationKing {
  name: string;
  year: string;
}

export interface StrapiRecordingItem {
  title: string;
  year?: string;
  type: string;
  description: string;
  photo?: StrapiMedia | null;
}
