/**
 * Every word on /endometrial-cancer-treatment-bangalore/ (Endometrial Cancer).
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page (https://oncoxpert.in/endometrial-cancer-treatment-bangalore/,
 *              26 Oct 2026). Render exactly.
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *   PENDING DOCTOR → something only the doctor can confirm.
 *
 * Never paraphrase, shorten or "improve" EXISTING text. The live page breaks some lines with <br>
 * ("Post-menopausal<br>Bleeding", "ROBOTIC<br>SURGERY"); those breaks are layout, so each line is
 * one string. Capitals are kept as the live markup has them. Words the live page sets in blue are
 * `emphasis`. Numbers and prices live here as numbers (prices: formatRupees).
 * Shared copy is reused, not repeated here: the appointment block, reviews, videos, locations and
 * the final call band (content/shared/sections.ts). Images: content/pages/endometrial-cancer.images.ts.
 */
import type { PageMeta, Stat } from "@/content/types";
import type { EndometrialImageKey } from "@/content/pages/endometrial-cancer.images";
import { endometrialOgImage } from "@/content/pages/endometrial-cancer.images";
import type { AppointmentService } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";
import { reviewsSection } from "@/content/shared/sections";

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING (identical to the live page, keeps the SEO)
export const meta = {
  title: "Endometrial Cancer Treatment in Bangalore | OncoXpert",
  description:
    "Looking for endometrial cancer treatment in Bangalore? OncoXpert offers personalized surgical oncology care, including minimally invasive and robotic surgery options.",
  canonical: "https://oncoxpert.in/endometrial-cancer-treatment-bangalore/",
  ogImage: endometrialOgImage,
} as const satisfies PageMeta;

/** Page name used in the appointment email subject and the form's hidden "page" field. */
export const pageName = "Endometrial Cancer";
export const pageSlug = "endometrial-cancer-treatment-bangalore";

/** Buttons that name no service (header, menu, action bar) preselect this one. */
// SOURCE: NEW (choice; the first of the live "Service Required" options)
export const defaultAppointmentService: AppointmentService = "Consultation";

/** Structured data (JSON-LD): the condition this page is about. Not visible on the page. */
export const structuredData = { pageAbout: "Endometrial cancer" } as const;

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** A button that opens the appointment form with `service` preselected. */
type AppointmentCta = { label: string; service: AppointmentService; note?: string };

/** Icon keys, mapped to lucide icons in components/pages/endometrial-cancer. */
export type FeatureIcon = "robotic" | "sentinel" | "recovery" | "standards";
export type SymptomIcon = "drop" | "calendar" | "alert" | "pelvic";
export type PrecisionIcon = "precision" | "view" | "tremor" | "incision" | "blood" | "discharge";
export type SentinelIcon = "lymphedema" | "staging" | "preservation";

export type HeroContent = {
  eyebrow: string;
  title: string;
  /** Words of `title` set in the accent. */
  emphasis: string;
  body: string;
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  /** The four feature icons under the buttons. */
  features: readonly { icon: FeatureIcon; label: string }[];
  /** The photo card in front of the line art. */
  image: EndometrialImageKey;
  a11y: { features: string; pause: string; play: string };
};

export type ClinicalContent = {
  title: string;
  intro: string;
  /** "STAGE I SURVIVAL · 100% · 5-Year" */
  stats: readonly (Stat & { note: string })[];
};

export type SymptomsContent = {
  title: string;
  intro: string;
  items: readonly { icon: SymptomIcon; title: string; body: string }[];
  /** A calm line under the cards, then the button. */
  reassurance: string;
  cta: AppointmentCta;
};

type Approach = {
  badge: string;
  title: string;
  features: readonly { icon: PrecisionIcon; title: string; body: string }[];
  image?: EndometrialImageKey;
};

export type PrecisionContent = {
  title: string;
  intro: string;
  /** The two switches above the cards. */
  tabs: { robotic: string; laparoscopic: string };
  robotic: Approach;
  laparoscopic: Approach;
  a11y: { tabs: string };
};

export type SentinelContent = {
  title: string;
  body: string;
  benefits: readonly { icon: SentinelIcon; title: string; body: string }[];
  /** Small labels inside the animated diagram, and its controls. */
  diagram: { tracer: string; sentinel: string; label: string; replay: string };
};

export type PackagesContent = {
  title: string;
  intro: string;
  priceLabel: string;
  packages: readonly {
    name: string;
    body: string;
    /** Rupees, as a number (formatRupees: 190000 → "₹1,90,000"). */
    amount: number;
    features: readonly string[];
    cta: AppointmentCta;
    /** The highlighted card: gradient border, ribbon, raised; phones start their swipe row on it. */
    featured?: boolean;
  }[];
  /** The featured card's ribbon. */
  ribbon: string;
  disclaimer: string;
  pendingApproval: string;
  a11y: { list: string; swipeHint: string };
};

export type SurgeonContent = {
  experience: Stat;
  title: string;
  role: string;
  paragraphs: readonly string[];
  facts: readonly { label: string; value: string }[];
  cta: AppointmentCta;
  image: EndometrialImageKey;
};

/* ------------------------------------------------------------------ */
/* 1 · #hero                                                           */
/* ------------------------------------------------------------------ */

export const hero = {
  // SOURCE: EXISTING
  eyebrow: "Advanced Gynecologic Oncology Care",
  title: "Advanced Endometrial Cancer Treatment with Robotic & Minimally Invasive Surgery",
  // SOURCE: NEW (styling: the gradient words; the live page sets "… Surgery" in blue too)
  emphasis: "Robotic & Minimally Invasive",
  body: "Personalized oncological care led by world-class specialists. Experience faster recovery, minimal scarring, and precision surgical outcomes for uterine cancer.",
  // SOURCE: EXISTING (button labels); NEW (the service each one preselects)
  ctas: {
    primary: { label: "Book Consultation", service: "Consultation" },
    secondary: { label: "Get Second Opinion", service: "Second Opinion" },
  },
  // SOURCE: EXISTING (labels); NEW (icon keys)
  features: [
    { icon: "robotic", label: "ROBOTIC SURGERY" },
    { icon: "sentinel", label: "SENTINEL NODE" },
    { icon: "recovery", label: "FASTER RECOVERY" },
    { icon: "standards", label: "INT'L STANDARDS" },
  ],
  image: "womanSmiling",
  // SOURCE: NEW (screen-reader and control labels)
  a11y: { features: "What we offer", pause: "Pause animation", play: "Play animation" },
} as const satisfies HeroContent;

// SOURCE: NEW (breadcrumb; also published as BreadcrumbList JSON-LD)
export const breadcrumb = {
  label: "Breadcrumb",
  items: [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/our-services/" },
    { label: "Endometrial Cancer", href: "/endometrial-cancer-treatment-bangalore/" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 2 · #clinical                                                       */
/* ------------------------------------------------------------------ */

export const clinical = {
  // SOURCE: EXISTING
  title: "Clinical Excellence",
  intro: "Proven success rates across all clinical stages.",
  stats: [
    { label: "STAGE I SURVIVAL", value: 100, suffix: "%", note: "5-Year" },
    { label: "MINIMALLY INVASIVE", value: 82, suffix: "%", note: "Of Cases" },
  ],
} as const satisfies ClinicalContent;

/* ------------------------------------------------------------------ */
/* 3 · #symptoms                                                       */
/* ------------------------------------------------------------------ */

export const symptoms = {
  // SOURCE: EXISTING
  title: "When Should You See a Specialist?",
  intro: "Early detection of uterine cancer significantly improves treatment outcomes. Watch for these key indicators.",
  // SOURCE: EXISTING (titles, text); NEW (icon keys)
  items: [
    {
      icon: "drop",
      title: "Post-menopausal Bleeding",
      body: "Any spotting or bleeding after menopause should be investigated immediately.",
    },
    {
      icon: "calendar",
      title: "Heavy Periods",
      body: "Significant changes in flow or unusually heavy menstrual cycles.",
    },
    { icon: "alert", title: "Abnormal Bleeding", body: "Bleeding between cycles or prolonged watery discharge." },
    {
      icon: "pelvic",
      title: "Pelvic Discomfort",
      body: "Persistent pain, pressure, or cramping in the lower abdomen.",
    },
  ],
  // SOURCE: NEW
  // PENDING DOCTOR: approve this reassurance line (wording and medical tone).
  reassurance:
    "Noticing one of these signs is a reason to get checked, not a diagnosis. An early consultation brings clarity and peace of mind.",
  // SOURCE: EXISTING (the hero's button label); NEW (the service it preselects)
  cta: { label: "Book Consultation", service: "Consultation" },
} as const satisfies SymptomsContent;

/* ------------------------------------------------------------------ */
/* 4 · #precision                                                      */
/* ------------------------------------------------------------------ */

export const precision = {
  // SOURCE: EXISTING
  title: "Advanced Surgical Precision",
  intro:
    "We specialize in minimally invasive techniques that prioritize both cancer clearance and patient quality of life.",
  tabs: { robotic: "Robotic Expertise", laparoscopic: "Minimally Invasive" },
  // SOURCE: EXISTING (text); NEW (icon keys, photo)
  robotic: {
    badge: "GOLD STANDARD",
    title: "Robotic Surgery",
    features: [
      {
        icon: "precision",
        title: "Unmatched Precision",
        body: "Wristed instruments allow for movements beyond human hand capacity.",
      },
      {
        icon: "view",
        title: "3D High-Definition View",
        body: "10x magnification for superior nerve and vessel identification.",
      },
      { icon: "tremor", title: "Tremor Filtration", body: "Enhanced control during complex lymph node dissections." },
    ],
    image: "roboticInstruments",
  },
  laparoscopic: {
    badge: "MINIMALLY INVASIVE",
    title: "Advanced Laparoscopy",
    features: [
      {
        icon: "incision",
        title: "Smaller Incisions",
        body: "Keyhole access reduces physiological trauma and scarring.",
      },
      {
        icon: "blood",
        title: "Less Blood Loss",
        body: "Precision tools result in significantly less operative bleeding.",
      },
      {
        icon: "discharge",
        title: "Early Discharge",
        body: "Most patients return home within 24-48 hours post-surgery.",
      },
    ],
    image: "laparoscopy",
  },
  // SOURCE: NEW (screen-reader label of the switch)
  a11y: { tabs: "Compare surgical approaches" },
} as const satisfies PrecisionContent;

/* ------------------------------------------------------------------ */
/* 5 · #sentinel-node                                                  */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING
// PENDING DOCTOR: "reduces leg swelling risk by 90%": confirm the figure and its source.
const lymphedemaReduction = 90;

export const sentinel = {
  // SOURCE: EXISTING
  title: "Sentinel Lymph Node Biopsy",
  body: "Instead of removing all pelvic lymph nodes, we use advanced mapping (ICG Fluorescence) to identify only the nodes most likely to be affected by cancer.",
  // SOURCE: EXISTING (text); NEW (icon keys)
  benefits: [
    {
      icon: "lymphedema",
      title: "Lymphedema Reduction",
      body: `Selective node removal reduces leg swelling risk by ${lymphedemaReduction}%.`,
    },
    {
      icon: "staging",
      title: "Accurate Staging",
      body: "Provides precise data for adjuvant therapy planning without over-treatment.",
    },
    {
      icon: "preservation",
      title: "Functional Preservation",
      body: "Reduces long-term surgical morbidity and chronic discomfort.",
    },
  ],
  // SOURCE: NEW (labels in the diagram, its screen-reader description, the replay button)
  // PENDING DOCTOR: check the diagram (tracer from the uterus along the lymph paths to the first node).
  diagram: {
    tracer: "ICG tracer",
    sentinel: "Sentinel node",
    label:
      "Diagram: a green tracer travels from the uterus along the lymph paths and lights up the first node it reaches, the sentinel node",
    replay: "Replay",
  },
} as const satisfies SentinelContent;

/* ------------------------------------------------------------------ */
/* 6 · #packages                                                       */
/* ------------------------------------------------------------------ */

export const packages = {
  // SOURCE: EXISTING
  title: "Transparent Care Packages",
  intro: "Financial clarity for world-class surgical expertise.",
  priceLabel: "Starting at",
  // SOURCE: EXISTING (names, text, prices, features, button labels); NEW (service + note each
  // button sends with the form)
  // PENDING DOCTOR: confirm the three starting prices (₹96,000 · ₹1,90,000 · ₹3,90,000) and
  // what each includes.
  // PENDING DOCTOR: "3D AI Mapping" (robotic package): is this a feature the practice offers?
  packages: [
    {
      name: "Open Surgery",
      body: "Conventional radical hysterectomy.",
      amount: 96000,
      features: ["Standard Oncology Care", "Comprehensive Staging", "Hospital Stay Included"],
      cta: { label: "Inquire Now", service: "Consultation For Surgery", note: "Package: Open Surgery" },
    },
    {
      name: "Laparoscopic",
      body: "Advanced minimally invasive approach.",
      amount: 190000,
      features: ["Faster Hospital Discharge", "Minimal Scarring", "Sentinel Biopsy Capable"],
      cta: { label: "Select Package", service: "Consultation For Surgery", note: "Package: Laparoscopic" },
    },
    {
      name: "Robotic Surgery",
      body: "Intuitive DaVinci surgical platform.",
      amount: 390000,
      features: ["Highest Precision Level", "Superior Visualization", "3D AI Mapping"],
      cta: { label: "Book Premium", service: "Consultation For Surgery", note: "Package: Robotic Surgery" },
      // NEW (choice): the highlighted card (the live page raises the middle one).
      featured: true,
    },
  ],
  // SOURCE: NEW
  ribbon: "Premium",
  // SOURCE: NEW (the breast page's pattern: a plain line under the prices)
  disclaimer:
    "Starting prices. Your final cost depends on your diagnosis, the hospital and the length of stay; you receive a clear estimate before treatment.",
  // PENDING DOCTOR: confirm the prices and approve this line.
  pendingApproval: "Doctor to confirm the three starting prices and approve the pricing note",
  // SOURCE: NEW (swipe hint + screen-reader label)
  a11y: { list: "Care packages", swipeHint: "Swipe" },
} as const satisfies PackagesContent;

/* ------------------------------------------------------------------ */
/* 7 · #surgeon                                                        */
/* ------------------------------------------------------------------ */

export const surgeon = {
  // SOURCE: EXISTING
  // PENDING DOCTOR: "15+" here and on the colorectal page, "10+" / "over a decade" on About Us,
  // "Over 25 years" on the booking page. Which number is right?
  experience: { value: 15, suffix: "+", label: "YEARS EXPERIENCE" },
  title: "Meet Dr. Sunil Navalgund",
  role: "LEAD SURGICAL ONCOLOGIST",
  paragraphs: [
    "Dr. Sunil Navalgund is a pioneer in minimally invasive cancer surgery.",
    "With thousands of successful robotic and laparoscopic procedures, he brings a level of precision that ensures the best possible clinical outcomes for his patients.",
  ],
  facts: [
    { label: "Education", value: "MCH Surgical Oncology, FIAGES" },
    { label: "Expertise", value: "Robotic & GI Oncology" },
  ],
  // SOURCE: EXISTING (label); NEW (the service it preselects)
  cta: { label: "Book Appointment with Dr. Sunil", service: "Consultation" },
  image: "doctor",
} as const satisfies SurgeonContent;

/* ------------------------------------------------------------------ */
/* 8–12 · shared sections                                              */
/* (reviews, videos, appointment, locations, final band:               */
/*  content/shared/sections.ts, in the live order)                     */
/* ------------------------------------------------------------------ */

// PENDING DOCTOR: Vasudeva Murthy's review is about colon cancer surgery. Hidden on this page by
// default; set showColonReview to true to show it.
const showColonReview = false as boolean;

export const shared = {
  // SOURCE: NEW (order): the live order, without the colon cancer review unless the doctor wants it.
  reviewOrder: reviewsSection.order.filter((id) => showColonReview || id !== "vasudeva-murthy"),
  // The final call band's photo.
  finalImage: "motherDaughter",
} as const satisfies { reviewOrder: readonly ReviewId[]; finalImage: EndometrialImageKey };
