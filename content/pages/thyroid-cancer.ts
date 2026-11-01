/**
 * Every word on /thyroid-cancer/ (Thyroid Cancer).
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page (https://oncoxpert.in/thyroid-cancer/, raw HTML fetched
 *              1 Nov 2026). Render exactly.
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *   PENDING DOCTOR → something only the doctor can confirm.
 *
 * Never paraphrase, shorten or "improve" EXISTING text. The live page breaks some headings with <br>
 * ("Advanced <br> Thyroid Cancer Treatment with …", "Understanding Thyroid<br>Cancer"); those breaks
 * are layout, so each line is one string in `lines`. Capitals are kept as the live markup has them
 * ("BOOK CONSULTATION"). The live headings are one colour each, so there is no `emphasis`. Numbers
 * and prices live here as numbers (prices: formatRupees; the live prices carry an asterisk, kept as
 * `mark`). Shared copy is reused, not repeated here: reviews, videos, locations and the final call
 * band (content/shared/sections.ts). Images: content/pages/thyroid-cancer.images.ts.
 */
import type { PageMeta } from "@/content/types";
import type { ThyroidImageKey } from "@/content/pages/thyroid-cancer.images";
import { thyroidOgImage } from "@/content/pages/thyroid-cancer.images";
import type { AppointmentService } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";
import { reviewsSection } from "@/content/shared/sections";

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** A button that opens the booking page with `service` preselected (and `note` in the email). */
type AppointmentCta = { label: string; service: AppointmentService; note?: string };

/** A hero figure: a number that counts up, or a word ("High") shown as it is. */
type HeroStat = { label: string } & ({ value: number; suffix: string } | { text: string });

/** Icon keys, mapped to lucide icons in components/pages/thyroid-cancer. */
type ModalityIcon = "thyroidectomy" | "neck-dissection" | "radioiodine" | "monitoring";
type StrengthIcon = "volume" | "diagnosis" | "nerve-monitor" | "affordable";
type BadgeIcon = "surgeries" | "fellow";

/* ------------------------------------------------------------------ */
/* Shared figures (shown in #hero and #dashboard)                      */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. Each figure appears twice on the live page (hero and dashboard), so it is
// kept once.
const completeRemoval = 100;
// PENDING DOCTOR: "0% Voice Change" (hero) / "0% Permanent Voice Change" (dashboard): confirm the
// figure, over how many cases and which years. The hero's wording drops "Permanent": keep it?
const voiceChange = 0;

/* ------------------------------------------------------------------ */
/* 1 · #hero                                                           */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. The heading's two lines (<br> on the live page).
const heroLines = ["Advanced", "Thyroid Cancer Treatment with Expert Surgical Care"] as const;

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING (identical to the live page, keeps the SEO). The live description is the
// SEO plugin's automatic excerpt (the page's first words, line breaks dropped: "ThyroidCancer"),
// kept exactly until the doctor approves a new one. The live page has no <h1> (its headings are
// styled divs): `h1` is the hero heading, which becomes the page's one <h1>.
// PENDING DOCTOR: a better title and description, not used yet:
//   title: "Thyroid Cancer Treatment & Surgery in Bangalore | OncoXpert"
//   description: "Thyroid cancer surgery in Bangalore at OncoXpert: thyroidectomy and neck dissection
//     with nerve monitoring to protect the voice, radioiodine therapy and long-term follow-up."
export const meta = {
  title: "Thyroid Cancer - oncoxpert.in",
  description:
    "For Appointment CLINICAL EXCELLENCE IN ONCOLOGY Advanced Thyroid Cancer Treatment with Expert Surgical Care 100% Complete Removal 0% Voice Change High Cure Rates BOOK CONSULTATION GET SECOND OPINION Understanding ThyroidCancer Thyroid cancer occurs when cells in the thyroid gland undergo genetic mutations that allow them to grow and multiply rapidly. While generally highly curable, early",
  h1: heroLines.join(" "),
  canonical: "https://oncoxpert.in/thyroid-cancer/",
  ogImage: thyroidOgImage,
} as const satisfies PageMeta & { h1: string };

/** Page name used in the appointment email subject and the form's hidden "page" field. */
export const pageName = "Thyroid Cancer";
export const pageSlug = "thyroid-cancer";

/** Buttons that name no service (header, menu, action bar) preselect this one. */
// SOURCE: NEW (choice; the first of the live "Service Required" options)
export const defaultAppointmentService: AppointmentService = "Consultation";

export const hero = {
  // SOURCE: EXISTING
  eyebrow: "CLINICAL EXCELLENCE IN ONCOLOGY",
  lines: heroLines,
  // SOURCE: EXISTING. "High" is a word on the live page, not a figure: modelled as text.
  stats: [
    { value: completeRemoval, suffix: "%", label: "Complete Removal" },
    { value: voiceChange, suffix: "%", label: "Voice Change" },
    { text: "High", label: "Cure Rates" },
  ],
  // SOURCE: EXISTING (button labels, in the live capitals); NEW (the service each one preselects)
  ctas: {
    primary: { label: "BOOK CONSULTATION", service: "Consultation" },
    secondary: { label: "GET SECOND OPINION", service: "Second Opinion" },
  },
  image: "youngWoman",
} as const satisfies {
  eyebrow: string;
  lines: readonly string[];
  stats: readonly HeroStat[];
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  image: ThyroidImageKey;
};

/* ------------------------------------------------------------------ */
/* 2 · #understanding                                                  */
/* ------------------------------------------------------------------ */

export const understanding = {
  // SOURCE: EXISTING
  lines: ["Understanding Thyroid", "Cancer"],
  body: "Thyroid cancer occurs when cells in the thyroid gland undergo genetic mutations that allow them to grow and multiply rapidly. While generally highly curable, early diagnosis and precise surgical intervention are paramount to preserving vital functions like voice and calcium balance.",
  image: "womanGarden",
} as const satisfies { lines: readonly string[]; body: string; image: ThyroidImageKey };

/* ------------------------------------------------------------------ */
/* 3 · #symptoms and 4 · #early-detection                              */
/* (two cards beside "Understanding Thyroid Cancer" on the live page)  */
/* ------------------------------------------------------------------ */

export const symptoms = {
  // SOURCE: EXISTING
  title: "Key Symptoms",
  body: "Painless lumps in the neck, persistent cough, voice changes, or difficulty swallowing. Many patients remain asymptomatic in early stages.",
  // SOURCE: NEW (chips: the four symptoms named in the live sentence, in its words)
  items: ["Painless lumps in the neck", "Persistent cough", "Voice changes", "Difficulty swallowing"],
  image: "neckExam",
} as const satisfies { title: string; body: string; items: readonly string[]; image: ThyroidImageKey };

export const earlyDetection = {
  // SOURCE: EXISTING
  title: "Importance of Early Detection",
  body: "Early-stage thyroid cancer has nearly a 100% cure rate. Delayed diagnosis may lead to local spread to lymph nodes or vital structures.",
  image: "ultrasound",
} as const satisfies { title: string; body: string; image: ThyroidImageKey };

/* ------------------------------------------------------------------ */
/* 5 · #modalities (8 cards: 4 treatments, then 4 strengths)           */
/* ------------------------------------------------------------------ */

export const modalities = {
  // SOURCE: EXISTING (title, card titles, text); NEW (icon keys)
  title: "Specialized Treatment Modalities",
  items: [
    {
      icon: "thyroidectomy",
      title: "Thyroidectomy",
      body: "Precise removal of part or all of the thyroid gland with nerve monitoring.",
    },
    {
      icon: "neck-dissection",
      title: "Neck Dissection",
      body: "Expert clearance of lymph nodes to prevent regional spread and recurrence.",
    },
    {
      icon: "radioiodine",
      title: "Radioiodine",
      body: "Targeted RAI therapy to eliminate residual microscopic cancer cells.",
    },
    {
      icon: "monitoring",
      title: "Monitoring",
      body: "Rigorous long-term surveillance with Tg testing and neck ultrasounds.",
    },
  ],
  // SOURCE: EXISTING (the four cards in the next live block, which has no heading); NEW (icon keys)
  strengths: [
    {
      icon: "volume",
      title: "High-Volume Care",
      body: "Experienced team performing hundreds of complex neck surgeries annually.",
    },
    {
      icon: "diagnosis",
      title: "Precise Diagnosis",
      body: "Advanced molecular profiling and PET-CT integration for accurate staging.",
    },
    {
      icon: "nerve-monitor",
      title: "Expert Surgery",
      body: "Utilization of Nerve Monitors to ensure vocal cord safety during every case.",
    },
    {
      icon: "affordable",
      title: "Affordable Treatment",
      body: "Transparent, competitive pricing models without compromising quality.",
    },
  ],
} as const satisfies {
  title: string;
  items: readonly { icon: ModalityIcon; title: string; body: string }[];
  strengths: readonly { icon: StrengthIcon; title: string; body: string }[];
};

/* ------------------------------------------------------------------ */
/* 6 · #dashboard                                                      */
/* ------------------------------------------------------------------ */

export const dashboard = {
  // SOURCE: EXISTING
  title: "Surgical Performance Dashboard",
  // PENDING DOCTOR: "2% Hypocalcemia … Significantly lower than global average": which global
  // average (source, figure)? Temporary or permanent hypocalcemia? Over how many cases?
  stats: [
    {
      value: completeRemoval,
      suffix: "%",
      label: "Complete Removal",
      note: "Zero residual macroscopic disease in planned total thyroidectomy cases.",
    },
    {
      value: voiceChange,
      suffix: "%",
      label: "Permanent Voice Change",
      note: "Clinical record of zero permanent recurrent laryngeal nerve injuries.",
    },
    {
      value: 2,
      suffix: "%",
      label: "Hypocalcemia",
      note: "Significantly lower than global average for parathyroid stunning.",
    },
  ],
} as const satisfies {
  title: string;
  stats: readonly { value: number; suffix: string; label: string; note: string }[];
};

/* ------------------------------------------------------------------ */
/* 7 · #outcomes                                                       */
/* ------------------------------------------------------------------ */

export const outcomes = {
  // SOURCE: EXISTING
  title: "Unrivaled Clinical Outcomes",
  intro:
    "Our survival data reflects the global benchmark for thyroid cancer management, achieved through multidisciplinary synergy.",
  stages: [
    { label: "Stage I & II Survival Rate", value: 100 },
    { label: "Stage III Survival Rate", value: 94 },
    { label: "Stage IV Survival Rate", value: 82 },
  ],
  unit: "%",
  // SOURCE: EXISTING. Kept as stated, not computed: it is aggregated across cancer types and cases,
  // which the three stage rates above cannot reproduce.
  // PENDING DOCTOR: "98.5% Overall 5-Year Survival": confirm the figure, its source and period.
  overall: {
    value: 98.5,
    suffix: "%",
    label: "Overall 5-Year Survival",
    note: "Aggregated across all differentiated thyroid cancer types.",
  },
  image: "seniorSmile",
} as const satisfies {
  title: string;
  intro: string;
  stages: readonly { label: string; value: number }[];
  unit: string;
  overall: { value: number; suffix: string; label: string; note: string };
  image: ThyroidImageKey;
};

/* ------------------------------------------------------------------ */
/* 8 · #packages                                                       */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. The live section is in the markup but hidden on every device
// (elementor-hidden-desktop/-tablet/-mobile). Kept in full. The live buttons link to "#".
// PENDING DOCTOR: show the packages on the rebuilt page? Confirm the three prices (₹85,000* ·
// ₹1,15,000* · ₹98,000*) and what each includes. The live order lists the ₹1,15,000 package
// before the ₹98,000 one: keep that order?
export const packages = {
  title: "Transparent Surgical Packages",
  // SOURCE: EXISTING (names, prices with their asterisk, features, button labels); NEW (service +
  // note each button sends with the form)
  items: [
    {
      name: "Total Thyroidectomy",
      amount: 85000,
      mark: "*",
      features: ["Comprehensive Surgery", "Nerve Monitoring Included", "2-Day Stay Package"],
      cta: { label: "SELECT PACKAGE", service: "Consultation For Surgery", note: "Package: Total Thyroidectomy" },
    },
    {
      name: "Modified Neck Dissection",
      amount: 115000,
      mark: "*",
      features: ["Advanced Nodal Clearance", "Cosmetic Incision Planning", "3-Day Post-Op Monitoring"],
      cta: {
        label: "SELECT PACKAGE",
        service: "Consultation For Surgery",
        note: "Package: Modified Neck Dissection",
      },
      // The middle card.
      featured: true,
    },
    {
      name: "Neck Dissection (Level 1-3)",
      amount: 98000,
      mark: "*",
      features: ["Selective Nodal Removal", "Standard Nerve Checks", "2-Day Hospitalization"],
      cta: {
        label: "SELECT PACKAGE",
        service: "Consultation For Surgery",
        note: "Package: Neck Dissection (Level 1-3)",
      },
    },
  ],
  // SOURCE: EXISTING
  footnote: "*Prices are indicative and may vary based on co-morbidities and hospital choice.",
} as const satisfies {
  title: string;
  items: readonly {
    name: string;
    /** Rupees, as a number (formatRupees: 115000 → "₹1,15,000"); `mark` follows it. */
    amount: number;
    mark: string;
    features: readonly string[];
    cta: AppointmentCta;
    featured?: boolean;
  }[];
  footnote: string;
};

/* ------------------------------------------------------------------ */
/* 9 · #surgeon                                                        */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING
// PENDING DOCTOR: "10,000+ Surgeries": confirm the count (Home and About say "3,000+ PATIENTS
// TREATED").
const surgeries = 10000;

export const surgeon = {
  // SOURCE: EXISTING
  name: "Dr. Sunil Navalgund",
  role: "Expert Surgical Oncologist",
  // PENDING DOCTOR: "over a decade" here and on the ovarian page, "10+" on About Us, "15+" on the
  // colorectal and endometrial pages, "Over 25 years" on the booking page. Which is right?
  bio: "Specializing in high-precision head and neck oncology, Dr. Navalgund has spent over a decade perfecting surgical techniques that prioritize organ function preservation. His approach to Thyroid Cancer integrates robotic-assisted technology with traditional surgical wisdom to deliver outcomes that go beyond mere survival.",
  // SOURCE: EXISTING (labels); NEW (icon keys)
  badges: [
    { icon: "surgeries", label: `${surgeries.toLocaleString("en-IN")}+ Surgeries` },
    { icon: "fellow", label: "Robotic Oncology Fellow" },
  ],
  // SOURCE: NEW (the live block has no button; label as on the endometrial page)
  cta: { label: "Book Appointment with Dr. Sunil", service: "Consultation" },
  image: "doctor",
} as const satisfies {
  name: string;
  role: string;
  bio: string;
  badges: readonly { icon: BadgeIcon; label: string }[];
  cta: AppointmentCta;
  image: ThyroidImageKey;
};

/* ------------------------------------------------------------------ */
/* 10 · #second-opinion                                                */
/* ------------------------------------------------------------------ */

export const secondOpinion = {
  // SOURCE: EXISTING
  title: "Unsure about your diagnosis?",
  body: "Get a definitive second opinion from Dr. Sunil Navalgund. We review your scans and pathology reports to provide expert clarity.",
  // SOURCE: NEW (the live block has no button; the hero's label in sentence case)
  cta: { label: "Get Second Opinion", service: "Second Opinion" },
  image: "consultation",
} as const satisfies { title: string; body: string; cta: AppointmentCta; image: ThyroidImageKey };

/* ------------------------------------------------------------------ */
/* 11–14 · shared sections                                             */
/* (reviews, videos, locations, final band: content/shared/sections.ts, */
/*  in the live order; the live form is replaced by the booking page)  */
/* ------------------------------------------------------------------ */

// PENDING DOCTOR: the live page shows Vasudeva Murthy's review, which is about colon cancer
// surgery. Hidden on this page by default; set showColonReview to true to show it.
const showColonReview = false as boolean;

export const shared = {
  // SOURCE: NEW (order): the live order, without the colon cancer review unless the doctor wants it.
  reviewOrder: reviewsSection.order.filter((id) => showColonReview || id !== "vasudeva-murthy"),
  // The final call band's photo.
  finalImage: "womanSaree",
} as const satisfies { reviewOrder: readonly ReviewId[]; finalImage: ThyroidImageKey };
