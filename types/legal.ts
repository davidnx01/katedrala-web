/** One block of a legal document; the copy lives in the `Privacy` / `Cookies` i18n namespaces. */
export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  /** Paragraphs rendered after the list. */
  outro?: string[];
}

export interface CookieTableRow {
  name: string;
  purpose: string;
  duration: string;
  category: string;
}
