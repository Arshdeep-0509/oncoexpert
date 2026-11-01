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
import type { PageMeta, SymptomIcon } from "@/content/types";
import type { ThyroidImageKey } from "@/content/pages/thyroid-cancer.images";
import { thyroidOgImage } from "@/content/pages/thyroid-cancer.images";
import type { AppointmentService } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";
import { reviewsSection } from "@/content/shared/sections";

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** A button that opens the booking page with `service` preselected (and `note` in the email). */
type AppointmentCta = { label: string; service: AppointmentService; note?: string; cta?: string };

/** A hero figure: a number that counts up, or a word ("High") shown as it is. */
type HeroStat = { label: string } & ({ value: number; suffix: string } | { text: string });

/** Icon keys, mapped to lucide icons in components/pages/thyroid-cancer. */
export type ModalityIcon = "thyroidectomy" | "neck-dissection" | "radioiodine" | "monitoring";
export type StrengthIcon = "volume" | "diagnosis" | "nerve-monitor" | "affordable";
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
  // SOURCE: NEW (choice: the words set in the gradient, with a drawn underline)
  emphasis: "Expert Surgical Care",
  // SOURCE: EXISTING. "High" is a word on the live page, not a figure: modelled as text. The 0% is
  // shown as it is, with a calm check (never a countdown).
  stats: [
    { value: completeRemoval, suffix: "%", label: "Complete Removal" },
    { value: voiceChange, suffix: "%", label: "Voice Change" },
    { text: "High", label: "Cure Rates" },
  ],
  // SOURCE: EXISTING (button labels, in the live capitals); NEW (the service each one preselects,
  // analytics labels)
  ctas: {
    primary: { label: "BOOK CONSULTATION", service: "Consultation", cta: "thyroid:hero:book-consultation" },
    secondary: { label: "GET SECOND OPINION", service: "Second Opinion", cta: "thyroid:hero:second-opinion" },
  },
  // The photo card: a man laughing as he talks (voice preserved). The LCP image.
  image: "speaking",
  // SOURCE: NEW (screen-reader labels)
  a11y: {
    visual: "Illustration: the thyroid drawn as a butterfly",
    stats: "At a glance",
    pause: "Pause the hero animation",
    play: "Play the hero animation",
  },
} as const satisfies {
  eyebrow: string;
  lines: readonly string[];
  emphasis: string;
  stats: readonly HeroStat[];
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  image: ThyroidImageKey;
  a11y: { visual: string; stats: string; pause: string; play: string };
};

/* ------------------------------------------------------------------ */
/* 2 · #understanding (the neck anatomy explorer)                      */
/* ------------------------------------------------------------------ */

/** The three structures of the anatomy explorer. */
export type AnatomyKey = "thyroid" | "nerve" | "parathyroids";

export const understanding = {
  // SOURCE: EXISTING
  lines: ["Understanding Thyroid", "Cancer"],
  body: "Thyroid cancer occurs when cells in the thyroid gland undergo genetic mutations that allow them to grow and multiply rapidly. While generally highly curable, early diagnosis and precise surgical intervention are paramount to preserving vital functions like voice and calcium balance.",
  // SOURCE: NEW (hotspot labels and one-liners); each `phrase` is the live paragraph's own words,
  // highlighted in it when its hotspot is chosen
  // PENDING DOCTOR: the three one-liners.
  hotspots: [
    {
      key: "thyroid",
      label: "Thyroid",
      phrase: "the thyroid gland",
      note: "A small, butterfly-shaped gland at the front of the neck that sets the body's pace.",
    },
    {
      key: "nerve",
      label: "Voice nerve",
      phrase: "voice",
      note: "The recurrent laryngeal nerves run just behind the thyroid and move the vocal cords.",
    },
    {
      key: "parathyroids",
      label: "Parathyroids",
      phrase: "calcium balance",
      note: "Four tiny glands behind the thyroid keep the body's calcium level steady.",
    },
  ],
  // SOURCE: NEW (screen-reader labels)
  a11y: { hotspots: "Parts of the neck", diagram: "Diagram of the front of the neck" },
} as const satisfies {
  lines: readonly string[];
  body: string;
  hotspots: readonly { key: AnatomyKey; label: string; phrase: string; note: string }[];
  a11y: { hotspots: string; diagram: string };
};

/* ------------------------------------------------------------------ */
/* 3 · #symptoms (the shared SymptomGrid, mode "disclose")             */
/* ------------------------------------------------------------------ */

export const symptoms = {
  // SOURCE: EXISTING
  title: "Key Symptoms",
  body: "Painless lumps in the neck, persistent cough, voice changes, or difficulty swallowing. Many patients remain asymptomatic in early stages.",
  // SOURCE: EXISTING (the live sentence's second half, shown as a highlighted note)
  note: "Many patients remain asymptomatic in early stages.",
  // SOURCE: NEW (card titles: the four symptoms named in the live sentence, in its words; the line
  // each card reveals: general guidance, never a diagnosis)
  // PENDING DOCTOR: the four card lines.
  items: [
    {
      key: "lump",
      icon: "lump",
      title: "Painless lumps in the neck",
      body: "A lump at the front of the neck that you can feel or see, usually without pain.",
      image: "neckExam",
    },
    {
      key: "cough",
      icon: "cough",
      title: "Persistent cough",
      body: "A cough that lingers for weeks without a cold or infection to explain it.",
      image: "cough",
    },
    {
      key: "voice",
      icon: "voice",
      title: "Voice changes",
      body: "Hoarseness or a change in your voice that does not settle within a few weeks.",
      image: "conversation",
    },
    {
      key: "swallow",
      icon: "swallow",
      title: "Difficulty swallowing",
      body: "A feeling that food or drink catches, or pressure in the throat when you swallow.",
      image: "glassOfWater",
    },
  ],
  // SOURCE: NEW (the button by the note, analytics label)
  cta: { label: "Book Consultation", service: "Consultation", cta: "thyroid:symptoms:book-consultation" },
  a11y: { group: "Symptoms to watch" },
} as const satisfies {
  title: string;
  body: string;
  note: string;
  items: readonly { key: string; icon: SymptomIcon; title: string; body: string; image: ThyroidImageKey }[];
  cta: AppointmentCta;
  a11y: { group: string };
};

/* ------------------------------------------------------------------ */
/* 4 · #early-detection ("Early vs Late")                              */
/* ------------------------------------------------------------------ */

export const earlyDetection = {
  // SOURCE: EXISTING. The live paragraph's two sentences, one per state.
  title: "Importance of Early Detection",
  early: "Early-stage thyroid cancer has nearly a 100% cure rate.",
  late: "Delayed diagnosis may lead to local spread to lymph nodes or vital structures.",
  // SOURCE: NEW (the switch, screen-reader labels)
  modes: { early: "Detected early", late: "Detected late" },
  a11y: {
    modes: "When the cancer is found",
    early: "Diagram: a small tumour contained in the thyroid",
    late: "Diagram: cancer cells spreading along the lymph paths to the neck lymph nodes",
  },
} as const satisfies {
  title: string;
  early: string;
  late: string;
  modes: { early: string; late: string };
  a11y: { modes: string; early: string; late: string };
};

/* ------------------------------------------------------------------ */
/* 5 · #modalities (8 cards: 4 treatments, then 4 strengths)           */
/* ------------------------------------------------------------------ */

export const modalities = {
  // SOURCE: EXISTING (title, card titles, text); NEW (icon keys, the in-text links: the live words
  // `link.phrase` become a link)
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
      link: { phrase: "Nerve Monitors", href: "#dashboard" },
    },
    {
      icon: "affordable",
      title: "Affordable Treatment",
      body: "Transparent, competitive pricing models without compromising quality.",
      link: { phrase: "Transparent, competitive pricing models", href: "#packages" },
    },
  ],
  // SOURCE: NEW (the filter, group labels, screen-reader label)
  filters: { all: "All", treatments: "Treatments", why: "Why OncoXpert" },
  a11y: { filter: "Show" },
} as const satisfies {
  title: string;
  items: readonly { icon: ModalityIcon; title: string; body: string }[];
  strengths: readonly {
    icon: StrengthIcon;
    title: string;
    body: string;
    link?: { phrase: string; href: string };
  }[];
  filters: { all: string; treatments: string; why: string };
  a11y: { filter: string };
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
