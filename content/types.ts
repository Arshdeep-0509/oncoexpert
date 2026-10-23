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

/* ------------------------------------------------------------------ */
/* Themes and pages                                                    */
/* ------------------------------------------------------------------ */

/** One file per theme in styles/themes/<name>.css. */
export type ThemeName = "home" | "breast" | "robotic";

/**
 * Header bar sizes and layout (components/layout/header/header-variants.ts), named after the hero
 * each was first built for. "dark": the robotic page's original bar (80 → 68px, CTA from md).
 * "light": the shared bar (64px; 76 → 64px on desktop, CTA from lg). Text colour over the hero
 * is a separate choice: HeroTone.
 */
export type HeaderVariant = "light" | "dark";

/** Tone of the hero the transparent header floats over: "dark" → white text, "light" → ink text. */
export type HeroTone = "light" | "dark";

/** Background tone of a page band (components/ui/section.tsx). */
export type SectionTone = "surface" | "alt" | "warm" | "plum" | "white" | "black" | "ink";

/** Visual style of a shared section: "soft" (rounded pills, display serif; the default) or "classic" (the robotic page's original look). */
export type SectionLook = "soft" | "classic";

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
  /** app/sitemap.ts priority. Default 0.8. */
  sitemapPriority?: number;
  meta: PageMeta;
};

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

export type PageImage = {
  /** File name; the folder is the one in `src` (public/images/<page>/, or brand/, robotic/ … for reused photos). */
  file: string;
  src: string;
  pexelsId?: number;
  /** Empty string for decorative images (rendered with aria-hidden). */
  alt: string;
  decorative?: boolean;
  /** Stock photos only (Pexels); own photos have none. */
  credit?: { photographer: string; url: string };
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

/** Icon shown on a FAQ card (components/shared/Faq.tsx). */
export type FaqIcon =
  "stethoscope" | "clipboard-list" | "heart-handshake" | "cpu" | "indian-rupee" | "shield-check" | "users" | "map-pin";

export type FaqItem = {
  question: string;
  /** One string per paragraph. */
  answer: readonly string[];
  icon: FaqIcon;
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
