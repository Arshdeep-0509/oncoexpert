/**
 * Every word on /colon-cancer-treatment-bangalore/ (Colorectal Cancer).
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page (https://oncoxpert.in/colon-cancer-treatment-bangalore/,
 *              26 Oct 2026). Render exactly.
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *   PENDING DOCTOR → something only the doctor can confirm.
 *
 * Never paraphrase, shorten or "improve" EXISTING text. The live page breaks some lines with <br>
 * ("Initial biopsy &<br>imaging", "Temporary<br>Stoma"); those breaks are layout, so each line is
 * one string. Words the live page sets in blue are `emphasis`.
 * Numbers live here as numbers; totals are computed (sumBy), never typed in.
 * Shared copy is reused, not repeated here: the appointment block, reviews, videos, locations and
 * the final call band (content/shared/sections.ts). Images: content/pages/colorectal-cancer.images.ts.
 */
import type { PageMeta, Stat } from "@/content/types";
import type { ColorectalImageKey } from "@/content/pages/colorectal-cancer.images";
import { colorectalOgImage } from "@/content/pages/colorectal-cancer.images";
import type { AppointmentService } from "@/content/site";
import { sumBy } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING (identical to the live page, keeps the SEO)
export const meta = {
  title: "Colorectal Cancer Treatment & Surgery in Bangalore | OncoXpert",
  description:
    "Get colorectal cancer treatment in Bangalore at OncoXpert, with advanced surgery, robotic procedures, and personalized surgical oncology care.",
  canonical: "https://oncoxpert.in/colon-cancer-treatment-bangalore/",
  ogImage: colorectalOgImage,
} as const satisfies PageMeta;

/** Page name used in the appointment email subject and the form's hidden "page" field. */
export const pageName = "Colorectal Cancer";
export const pageSlug = "colon-cancer-treatment-bangalore";

/** Buttons that name no service (header, menu, action bar) preselect this one. */
// SOURCE: NEW (choice; the first of the live "Service Required" options)
export const defaultAppointmentService: AppointmentService = "Consultation";

/** Structured data (JSON-LD): the condition this page is about. Not visible on the page. */
export const structuredData = { pageAbout: "Colorectal cancer" } as const;

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** A button that opens the appointment form with `service` preselected. */
type AppointmentCta = { label: string; service: AppointmentService };

/** Icon keys, mapped to lucide icons in components/pages/colorectal-cancer. */
export type ApproachIcon = "plans" | "robotic" | "preservation" | "stoma" | "advanced" | "stage-four";
export type PathIcon = "colonoscopy" | "scan" | "staging" | "planning" | "surgery" | "recovery";

export type HeroContent = {
  eyebrow: string;
  title: string;
  /** Words of `title` set in the accent. */
  emphasis: string;
  body: string;
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  /** "78+ Complex Surgeries" with its caption. */
  stat: Stat & { caption: string };
  /** The round badge beside the stat. */
  badge: Stat;
  image: ColorectalImageKey;
};

export type ApproachContent = {
  title: string;
  intro: string;
  cards: readonly { icon: ApproachIcon; title: string; tagline?: string; body: string }[];
};

export type PathContent = {
  title: string;
  intro: string;
  /** Rendered "01" … "06" from the order (the live numbers). */
  steps: readonly { icon: PathIcon; title: string; body: string }[];
  a11y: { steps: string };
};

type Technique = {
  /** The large initial behind the card ("R", "L"). */
  letter: string;
  badge: string;
  title: string;
  features: readonly string[];
  idealFor: string;
  image: ColorectalImageKey;
};

export type TechniquesContent = {
  title: string;
  idealForLabel: string;
  robotic: Technique;
  laparoscopic: Technique;
};

export type QualityOfLifeContent = {
  title: string;
  subtitle: string;
  body: string;
  /** Share of ultra-low rectal cancer patients, %. The three add up to 100. */
  stoma: readonly Stat[];
  a11y: { chart: string };
};

export type OutcomesContent = {
  dashboard: {
    title: string;
    stages: readonly { label: string; cases: number }[];
    /** "7 Cases" */
    casesUnit: string;
    totalLabel: string;
    /** "78 Total" */
    totalUnit: string;
  };
  survival: {
    title: string;
    /** Rendered "Stage I: 98% Survival". */
    items: readonly { stage: string; rate: number; body: string }[];
    rateUnit: string;
  };
  table: { caption: string; stage: string; cases: string };
};

export type AdvancedCasesContent = {
  eyebrow: string;
  title: string;
  body: string;
  cta: AppointmentCta;
  image: ColorectalImageKey;
};

export type SurgeonContent = {
  credentials: string;
  bio: string;
  name: string;
  stats: readonly Stat[];
  cta: { label: string; href: string };
  image: ColorectalImageKey;
};

/* ------------------------------------------------------------------ */
/* 1 · #hero                                                           */
/* ------------------------------------------------------------------ */

export const hero = {
  // SOURCE: EXISTING
  eyebrow: "Global Standards in Surgical Oncology",
  title: "Advanced Colon & Rectal Cancer Treatment with Organ Preservation Focus",
  emphasis: "Organ Preservation",
  body: "Experience precise, minimally invasive robotic and laparoscopic surgeries designed to maximize cure rates while preserving your quality of life and bowel function.",
  // SOURCE: EXISTING (button labels); NEW (the service each one preselects)
  ctas: {
    primary: { label: "Book Consultation", service: "Consultation" },
    secondary: { label: "Get Second Opinion", service: "Second Opinion" },
  },
  // SOURCE: EXISTING
  // PENDING DOCTOR: "78+" here and in the bio, but the Outcome Dashboard's stages add up to 93.
  stat: {
    value: 78,
    suffix: "+",
    label: "Complex Surgeries",
    caption: "Successfully performed by Dr. Sunil Navalgund",
  },
  // SOURCE: EXISTING
  // PENDING DOCTOR: "5k+" has no label on the live page. 5,000+ what (patients? consultations?)
  badge: { value: 5, suffix: "k+", label: "" },
  image: "anatomyModel",
} as const satisfies HeroContent;

// SOURCE: NEW (breadcrumb; also published as BreadcrumbList JSON-LD)
export const breadcrumb = {
  label: "Breadcrumb",
  items: [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/our-services/" },
    { label: "Colorectal Cancer", href: "/colon-cancer-treatment-bangalore/" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 2 · #approach                                                       */
/* ------------------------------------------------------------------ */

export const approach = {
  // SOURCE: EXISTING
  title: "Precision Surgery, Compassionate Care",
  intro: "Our multi-disciplinary approach focuses on the intersection of medical excellence and patient lifestyle.",
  // SOURCE: EXISTING (titles, taglines, text); NEW (icon keys)
  cards: [
    {
      icon: "plans",
      title: "Personalized Plans",
      body: "Every tumor is unique. We tailor treatment based on genetic profiling and specific patient needs.",
    },
    {
      icon: "robotic",
      title: "Robotic Surgery",
      tagline: "Da Vinci Excellence",
      body: "Unmatched precision in narrow pelvic spaces, leading to better nerve preservation and faster recovery.",
    },
    {
      icon: "preservation",
      title: "Organ Preservation",
      body: "Our goal is to treat the cancer while maintaining natural bowel and sexual function wherever possible.",
    },
    {
      icon: "stoma",
      title: "Low Stoma Rates",
      body: "Advanced Inter-Sphincteric Resection (ISR) techniques significantly reduce the need for permanent bags.",
    },
    {
      icon: "advanced",
      title: "Advanced Care",
      body: "Access to the latest chemotherapy protocols and targeted immunotherapies integrated with surgery.",
    },
    {
      icon: "stage-four",
      title: "Stage IV Options",
      body: "Curative intents for metastatic cases through liver-first or synchronous resection strategies.",
    },
  ],
} as const satisfies ApproachContent;

/* ------------------------------------------------------------------ */
/* 3 · #path                                                           */
/* ------------------------------------------------------------------ */

export const recoveryPath = {
  // SOURCE: EXISTING. On the live page this block is in the markup but hidden on every device
  // (desktop, tablet and phone), so no visitor sees it there today.
  title: "Your Path to Recovery",
  intro: "A structured 6-step journey from diagnosis to long-term health.",
  // SOURCE: EXISTING (titles, text); NEW (icon keys)
  steps: [
    { icon: "colonoscopy", title: "Colonoscopy", body: "Initial biopsy & imaging" },
    { icon: "scan", title: "PET-CT Scan", body: "Full body mapping" },
    { icon: "staging", title: "Staging", body: "MDT Review & Planning" },
    { icon: "planning", title: "Planning", body: "Pre-op optimization" },
    { icon: "surgery", title: "Surgery", body: "Robotic/Laparoscopic" },
    { icon: "recovery", title: "Recovery", body: "ERAS Protocol Support" },
  ],
  // SOURCE: NEW (screen-reader label)
  a11y: { steps: "Your path to recovery, step by step" },
} as const satisfies PathContent;

/* ------------------------------------------------------------------ */
/* 4 · #techniques                                                     */
/* ------------------------------------------------------------------ */

export const techniques = {
  // SOURCE: EXISTING
  title: "Minimally Invasive Excellence",
  idealForLabel: "Ideal for:",
  robotic: {
    letter: "R",
    badge: "Cutting Edge",
    title: "Robotic Surgery",
    features: [
      "3D High-Definition Visualization",
      "Endowrist Technology (Extreme Dexterity)",
      "Superior Nerve Preservation (Sexual/Bladder)",
      "Tremor Filtration for Millimeter Precision",
    ],
    idealFor: "Ultra-low rectal tumors and narrow pelvis.",
    image: "roboticArms",
  },
  laparoscopic: {
    letter: "L",
    badge: "Proven Standard",
    title: "Laparoscopic Surgery",
    features: [
      "Keyhole Incisions (Smaller Scars)",
      "Reduced Post-operative Pain",
      "Shorter Hospital Stay (2-3 Days)",
      "Faster Return to Normal Diet",
    ],
    idealFor: "Most Colon and upper Rectal cancers.",
    image: "laparoscopy",
  },
} as const satisfies TechniquesContent;

/* ------------------------------------------------------------------ */
/* 5 · #quality-of-life                                                */
/* ------------------------------------------------------------------ */

export const qualityOfLife = {
  // SOURCE: EXISTING ("bag(stoma)" without a space, as on the live page)
  title: "Focus on Quality of Life",
  subtitle: "Inter-Sphincteric Resection (ISR)",
  body: "Most ultra-low rectal cancers used to require a permanent bag(stoma). With Dr. Sunil’s expertise in ISR and robotic platforms, we push the boundaries of what’s possible to avoid permanent stomas.",
  // SOURCE: EXISTING
  stoma: [
    { value: 60, suffix: "%", label: "No Stoma Ever" },
    { value: 36, suffix: "%", label: "Temporary Stoma" },
    { value: 4, suffix: "%", label: "Permanent Stoma" },
  ],
  // SOURCE: NEW (screen-reader label)
  a11y: { chart: "Stoma outcomes after rectal cancer surgery" },
} as const satisfies QualityOfLifeContent;

/* ------------------------------------------------------------------ */
/* 6 · #outcomes                                                       */
/* ------------------------------------------------------------------ */

export const outcomes = {
  dashboard: {
    // SOURCE: EXISTING
    title: "Outcome Dashboard",
    stages: [
      { label: "Stage I Surgeries", cases: 7 },
      { label: "Stage II Surgeries", cases: 23 },
      { label: "Stage III Surgeries", cases: 42 },
      { label: "Stage IV Curative", cases: 21 },
    ],
    casesUnit: "Cases",
    // SOURCE: EXISTING (labels). The number is computed (totalCases below).
    // PENDING DOCTOR: the live page shows "78 Total", but its four stages add up to 93
    // (7 + 23 + 42 + 21). Which stage counts, or which total, is right?
    totalLabel: "Total Complex Surgeries",
    totalUnit: "Total",
  },
  survival: {
    // SOURCE: EXISTING
    title: "5-Year Survival Rates",
    items: [
      { stage: "Stage I", rate: 98, body: "Exceptional outcomes with primary surgery" },
      { stage: "Stage II & III", rate: 85, body: "Multimodal treatment approach" },
      { stage: "Stage IV", rate: 60, body: "Our aggressive resection strategy for liver/lung mets" },
    ],
    rateUnit: "Survival",
  },
  // SOURCE: NEW (screen-reader table)
  table: { caption: "Colorectal surgeries by stage", stage: "Stage", cases: "Cases" },
} as const satisfies OutcomesContent;

/** Sum of the dashboard's stage cases (93 with the live numbers). */
export const totalCases = sumBy(outcomes.dashboard.stages, (stage) => stage.cases);

/* ------------------------------------------------------------------ */
/* 7 · #advanced-cases                                                 */
/* ------------------------------------------------------------------ */

export const advancedCases = {
  // SOURCE: EXISTING
  eyebrow: "Hope for Advanced Cases",
  title: "Metastatic Rectal Cancer is Curable",
  body: "Stage IV is no longer a terminal diagnosis. With modern chemo-immunotherapy and Dr. Sunil’s expertise in synchronous resections of primary and metastatic lesions, we offer a 60% survival chance for selected cases.",
  // SOURCE: EXISTING (label); NEW (the service it preselects)
  cta: { label: "Discuss Curative Strategy", service: "Consultation For Surgery" },
  image: "hopeSmile",
} as const satisfies AdvancedCasesContent;

/* ------------------------------------------------------------------ */
/* 8 · #surgeon                                                        */
/* ------------------------------------------------------------------ */

export const surgeon = {
  // SOURCE: EXISTING
  credentials: "MBBS, MS, MCh (Surgical Oncology)",
  bio: "A pioneer in Robotic and Laparoscopic Colorectal Surgery in Bangalore. Dr. Sunil is dedicated to the philosophy of organ preservation and minimally invasive recovery, having performed over 78+ highly complex rectal cancer resections with industry-leading outcomes.",
  name: "Dr. Sunil Navalgund",
  // SOURCE: EXISTING
  // PENDING DOCTOR: "15+ Years" here and on the endometrial page, "10+" / "over a decade" on
  // About Us, "Over 25 years" on the booking page. Which number is right?
  // PENDING DOCTOR: "95% Success Rate": success measured how, and over which cases?
  stats: [
    { value: 15, suffix: "+ Years", label: "Clinical Experience" },
    { value: 95, suffix: "%", label: "Success Rate" },
  ],
  // SOURCE: EXISTING (label). The live link goes nowhere ("#"); it now opens About Us.
  cta: { label: "View Full Profile", href: "/about-us/" },
  image: "doctor",
} as const satisfies SurgeonContent;

/* ------------------------------------------------------------------ */
/* 9–13 · shared sections                                              */
/* (reviews, videos, appointment, locations, final band:               */
/*  content/shared/sections.ts, in the live order)                     */
/* ------------------------------------------------------------------ */
