/**
 * Shared TypeScript types for all content in /content.
 *
 * Content rules (see docs/PROJECT.md):
 *  - ALL visible text lives in /content; components never hardcode copy.
 *  - Every block is tagged with a comment:
 *      // SOURCE: EXISTING  copied from the live page. Render exactly.
 *      // SOURCE: DOCTOR    from the doctor's own document. Render exactly.
 *      // SOURCE: NEW       labels or headings we added. Pending the doctor's approval.
 *  - Numbers (prices, percentages, case counts) live here as numbers. Totals are
 *    computed (lib/content.ts), never typed in.
 */

export type Source = "EXISTING" | "DOCTOR" | "NEW";

/* ------------------------------------------------------------------ */
/* Themes and pages                                                    */
/* ------------------------------------------------------------------ */

/** One file per theme in styles/themes/<name>.css. */
export type ThemeName = "breast" | "robotic";

/** "dark": the header floats over a dark hero (white text). "light": over a light hero. */
export type HeaderVariant = "light" | "dark";

/** Background tone of a page band (components/ui/section.tsx). */
export type SectionTone = "surface" | "alt" | "warm" | "plum";

export type PageMeta = {
  title: string;
  description: string;
  /** Absolute URL with trailing slash. */
  canonical: string;
  ogImage: { src: string; width: number; height: number };
};

/** One entry in content/pages/index.ts. */
export type PageEntry = {
  slug: string;
  /** URL path with trailing slash, e.g. "/breast-cancer-treatment-bangalore/". */
  path: string;
  title: string;
  theme: ThemeName;
  /** Mobile browser bar colour (generateViewport). */
  themeColor: string;
  meta: PageMeta;
};

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

export type PageImage = {
  /** File name in public/images/<page>/ */
  file: string;
  src: string;
  pexelsId?: number;
  /** Empty string for decorative images (rendered with aria-hidden). */
  alt: string;
  decorative?: boolean;
  credit: { photographer: string; url: string };
  /** CSS object-position, e.g. "50% 30%". */
  focal: string;
  width: number;
  height: number;
};

export type Cta = {
  label: string;
  /** Site path, "#anchor", "tel:…" or an external URL. */
  href: string;
};

/** A number shown with a Counter / ProgressRing. */
export type Stat = {
  value: number;
  /** e.g. "₹" */
  prefix?: string;
  /** e.g. "%", "k", "+" */
  suffix?: string;
  label: string;
};

/** Generic card: icon key + title + body. Icons are mapped to lucide in the component. */
export type CardItem = {
  icon?: string;
  title: string;
  body?: string;
};

export type StepItem = {
  title: string;
  body?: string;
  /** Optional sub-points */
  points?: readonly string[];
};

/** A priced line item. Amounts are rupees, as numbers. */
export type PriceItem = {
  label: string;
  amount: number;
  note?: string;
};

export type FaqItem = {
  question: string;
  /** One string per paragraph. */
  answer: readonly string[];
};

/** Google review, verbatim (reviewers' own spelling is preserved). */
export type Review = {
  /** Stable id for ordering per page. */
  id?: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  paragraphs: readonly string[];
  /** Page slugs where this review is hidden. */
  excludeOn?: readonly string[];
};

export type Location = {
  name: string;
  area: string;
  mapHref: string;
  image: { src: string; width: number; height: number } | null;
};

/** Heading block shared by most sections. `emphasis` = the one word set in Fraunces italic. */
export type SectionCopy = {
  eyebrow?: string;
  title: string;
  emphasis?: string;
  intro?: string;
};
