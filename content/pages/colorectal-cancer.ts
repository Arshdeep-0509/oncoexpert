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
import type { ReviewId } from "@/content/shared/reviews";
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
  /** The round badge beside the stat (not shown until the doctor confirms it). */
  badge: Stat;
  /** Short labels under the buttons. */
  trust: readonly { icon: TrustIcon; label: string }[];
  /** The photo card in front of the colon line art. */
  image: ColorectalImageKey;
  a11y: { pause: string; play: string; trust: string };
};

export type TrustIcon = "robotic" | "laparoscopic" | "preservation";

export type ApproachContent = {
  title: string;
  /** Words of `title` set in the serif italic accent. */
  emphasis: string;
  intro: string;
  cards: readonly {
    icon: ApproachIcon;
    title: string;
    tagline?: string;
    body: string;
    /** Short line that expands on hover / tap: key words of `body`. */
    detail: string;
    /** The card's background photo. */
    image: ColorectalImageKey;
    /** Large bento tile (desktop: a tall tile; tablet: a full-width one). */
    large?: boolean;
  }[];
  /** The small ISR diagram on "Low Stoma Rates" (three frames). */
  isrDiagram: string;
  a11y: { cards: string; swipeHint: string };
};

export type PathContent = {
  title: string;
  intro: string;
  /** Words of `title` set in the serif italic accent. */
  emphasis: string;
  /** Rendered "01" … "06" from the order (the live numbers). Each step's photo crossfades in (desktop). */
  steps: readonly { icon: PathIcon; title: string; body: string; image: ColorectalImageKey }[];
  /** `step`: the milestone buttons' label, "Step 3: Staging". */
  a11y: { steps: string; milestones: string; step: string; progress: string };
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
  /** Words of `title` set in the serif italic accent. */
  emphasis: string;
  idealForLabel: string;
  robotic: Technique;
  laparoscopic: Technique;
  /** Under the robotic side: to the robotic surgery page. */
  link: { label: string; href: string };
  a11y: { tabs: string };
};

export type QualityOfLifeContent = {
  title: string;
  subtitle: string;
  body: string;
  /** Share of ultra-low rectal cancer patients, %. The three add up to 100. */
  stoma: readonly Stat[];
  a11y: { chart: string; outcome: string; share: string };
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
    /**
     * Which total the dashboard shows (PENDING DOCTOR): "stages" = the sum of the four stage counts
     * (computed, 93), "live" = the figure the live page shows (`liveTotal`, 78).
     */
    totalSource: "stages" | "live";
    liveTotal: number;
  };
  survival: {
    title: string;
    /** Rendered "Stage I: 98% Survival". */
    items: readonly { stage: string; rate: number; body: string }[];
    rateUnit: string;
  };
  disclaimer: string;
  pendingApproval: string;
  table: { caption: string; stage: string; cases: string; survivalCaption: string; survival: string };
};

export type AdvancedCasesContent = {
  eyebrow: string;
  title: string;
  body: string;
  /** The 60% in `body`, shown large in its glow. */
  stat: Stat;
  cta: AppointmentCta & { note: string };
  image: ColorectalImageKey;
};

export type SurgeonContent = {
  /** Small label above the name. */
  label: string;
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
  // SOURCE: NEW (labels taken from the page's own text: "Da Vinci Excellence", "Laparoscopic
  // Surgery", "Organ Preservation")
  trust: [
    { icon: "robotic", label: "Da Vinci robotic" },
    { icon: "laparoscopic", label: "Laparoscopic" },
    { icon: "preservation", label: "Organ preservation" },
  ],
  image: "consultation",
  // SOURCE: NEW (control and screen-reader labels)
  a11y: { pause: "Pause animation", play: "Play animation", trust: "Surgical approaches" },
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
  // SOURCE: NEW (styling only: these words in the serif italic accent)
  emphasis: "Compassionate Care",
  intro: "Our multi-disciplinary approach focuses on the intersection of medical excellence and patient lifestyle.",
  // SOURCE: EXISTING (titles, taglines, text); NEW (icon keys, photos, and `detail`: key words
  // lifted from each card's own text, shown on hover / tap)
  cards: [
    {
      icon: "plans",
      title: "Personalized Plans",
      body: "Every tumor is unique. We tailor treatment based on genetic profiling and specific patient needs.",
      detail: "Genetic profiling · Specific patient needs",
      image: "pathologyLab",
    },
    {
      icon: "robotic",
      title: "Robotic Surgery",
      tagline: "Da Vinci Excellence",
      body: "Unmatched precision in narrow pelvic spaces, leading to better nerve preservation and faster recovery.",
      detail: "Nerve preservation · Faster recovery",
      image: "roboticArms",
      large: true,
    },
    {
      icon: "preservation",
      title: "Organ Preservation",
      body: "Our goal is to treat the cancer while maintaining natural bowel and sexual function wherever possible.",
      detail: "Bowel function · Sexual function",
      image: "anatomyModel",
      large: true,
    },
    {
      icon: "stoma",
      title: "Low Stoma Rates",
      body: "Advanced Inter-Sphincteric Resection (ISR) techniques significantly reduce the need for permanent bags.",
      detail: "Inter-Sphincteric Resection (ISR)",
      image: "activeCouple",
    },
    {
      icon: "advanced",
      title: "Advanced Care",
      body: "Access to the latest chemotherapy protocols and targeted immunotherapies integrated with surgery.",
      detail: "Chemotherapy · Targeted immunotherapies",
      image: "infusion",
    },
    {
      icon: "stage-four",
      title: "Stage IV Options",
      body: "Curative intents for metastatic cases through liver-first or synchronous resection strategies.",
      detail: "Liver-first · Synchronous resection",
      image: "imagingScan",
    },
  ],
  // SOURCE: NEW (screen-reader label of the diagram)
  // PENDING DOCTOR: check the three-frame ISR diagram on "Low Stoma Rates" and this description.
  isrDiagram:
    "Diagram: the low rectum and the inner sphincter muscle are removed, then the bowel is joined just above the outer sphincter, so no permanent bag is needed",
  // SOURCE: NEW (swipe hint + screen-reader label)
  a11y: { cards: "Our approach", swipeHint: "Swipe" },
} as const satisfies ApproachContent;

/* ------------------------------------------------------------------ */
/* 3 · #path                                                           */
/* ------------------------------------------------------------------ */

export const recoveryPath = {
  // SOURCE: EXISTING. On the live page this block is in the markup but hidden on every device
  // (desktop, tablet and phone), so no visitor sees it there today.
  title: "Your Path to Recovery",
  // SOURCE: NEW (styling only)
  emphasis: "Recovery",
  intro: "A structured 6-step journey from diagnosis to long-term health.",
  // SOURCE: EXISTING (titles, text); NEW (icon keys, photos)
  steps: [
    { icon: "colonoscopy", title: "Colonoscopy", body: "Initial biopsy & imaging", image: "anatomyModel" },
    { icon: "scan", title: "PET-CT Scan", body: "Full body mapping", image: "imagingScan" },
    { icon: "staging", title: "Staging", body: "MDT Review & Planning", image: "consultationReport" },
    { icon: "planning", title: "Planning", body: "Pre-op optimization", image: "doctor" },
    { icon: "surgery", title: "Surgery", body: "Robotic/Laparoscopic", image: "laparoscopy" },
    { icon: "recovery", title: "Recovery", body: "ERAS Protocol Support", image: "recoveryWalk" },
  ],
  // SOURCE: NEW (screen-reader labels)
  a11y: {
    steps: "Your path to recovery, step by step",
    milestones: "Go to a step",
    step: "Step",
    progress: "Progress through the steps",
  },
} as const satisfies PathContent;

/* ------------------------------------------------------------------ */
/* 4 · #techniques                                                     */
/* ------------------------------------------------------------------ */

export const techniques = {
  // SOURCE: EXISTING
  title: "Minimally Invasive Excellence",
  // SOURCE: NEW (styling only)
  emphasis: "Excellence",
  // SOURCE: EXISTING
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
  // SOURCE: NEW (link label, as on the breast page)
  link: { label: "Explore robotic surgery", href: "/robotic-surgery/" },
  // SOURCE: NEW (screen-reader label of the Robotic | Laparoscopic switch)
  a11y: { tabs: "Compare surgical approaches" },
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
  // SOURCE: NEW (screen-reader table: caption and column headings)
  a11y: { chart: "Stoma outcomes after rectal cancer surgery", outcome: "Outcome", share: "Share of patients" },
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
    // PENDING DOCTOR: switch to "live" to show the live page's 78 instead of the computed sum
    // (or correct the stage counts above, and the sum follows).
    totalSource: "stages" as OutcomesContent["dashboard"]["totalSource"],
    // SOURCE: EXISTING (the total the live page shows; used only with totalSource "live")
    liveTotal: 78,
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
  // SOURCE: NEW (the breast page's wording)
  disclaimer:
    "Figures are from OncoXpert's own patient records. Individual outcomes vary with stage, tumour biology and overall health.",
  // PENDING DOCTOR: approve the disclaimer, and choose the total (see totalSource).
  pendingApproval:
    "Doctor to approve the outcomes disclaimer and confirm the total (stages add up to 93; the live page says 78)",
  // SOURCE: NEW (screen-reader tables)
  table: {
    caption: "Colorectal surgeries by stage",
    stage: "Stage",
    cases: "Cases",
    survivalCaption: "5-year survival rates by stage",
    survival: "5-year survival",
  },
} as const satisfies OutcomesContent;

/** Sum of the dashboard's stage cases (93 with the live numbers). */
export const totalCases = sumBy(outcomes.dashboard.stages, (stage) => stage.cases);

/** The total the dashboard shows: the computed sum, unless the doctor picks the live figure. */
export const dashboardTotal = outcomes.dashboard.totalSource === "live" ? outcomes.dashboard.liveTotal : totalCases;

/* ------------------------------------------------------------------ */
/* 7 · #advanced-cases                                                 */
/* ------------------------------------------------------------------ */

export const advancedCases = {
  // SOURCE: EXISTING
  eyebrow: "Hope for Advanced Cases",
  title: "Metastatic Rectal Cancer is Curable",
  body: "Stage IV is no longer a terminal diagnosis. With modern chemo-immunotherapy and Dr. Sunil’s expertise in synchronous resections of primary and metastatic lesions, we offer a 60% survival chance for selected cases.",
  // SOURCE: EXISTING (the 60% in the text above); NEW (its label, words from the same sentence)
  stat: { value: 60, suffix: "%", label: "survival chance for selected cases" },
  // SOURCE: EXISTING (label); NEW (the service it preselects and the note sent with the form)
  cta: { label: "Discuss Curative Strategy", service: "Second Opinion", note: "Curative strategy" },
  image: "hopeSmile",
} as const satisfies AdvancedCasesContent;

/* ------------------------------------------------------------------ */
/* 8 · #surgeon                                                        */
/* ------------------------------------------------------------------ */

export const surgeon = {
  // SOURCE: NEW (the breast page's label; the live colorectal block has none)
  label: "Lead Surgeon",
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
/* (copy: content/shared/sections.ts; reviews in this page's order)    */
/* ------------------------------------------------------------------ */

export const shared = {
  // SOURCE: NEW (order). The colon cancer review (Vasudeva Murthy) first, then the live order.
  reviewOrder: [
    "vasudeva-murthy",
    "muralidharan-chinnusamy",
    "veena-iyer",
    "shwetha-jayaraj",
    "padmavathi-p",
    "jayashree-ajith",
    "friendly-work",
    "narasimhamurthy-sm",
    "mangala-music",
  ],
  // The final call band's photo.
  finalImage: "recoveryWalk",
} as const satisfies { reviewOrder: readonly ReviewId[]; finalImage: ColorectalImageKey };
