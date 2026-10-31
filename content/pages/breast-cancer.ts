/**
 * Every word on /breast-cancer-treatment-bangalore/.
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page. Render exactly.
 *   DOCTOR   → from Dr. Sunil's own document. Render exactly.
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *
 * Never paraphrase, shorten or "improve" EXISTING or DOCTOR text. The only permitted
 * edits are the spelling fixes listed in the step that fills each section.
 * Numbers live here as numbers; totals are computed (lib/content.ts), never typed in.
 *
 * STEP 1: the section objects below are typed and intentionally EMPTY.
 * Steps 2–6 fill them. Images: content/pages/breast-cancer.images.ts.
 */
import type { Cta, FaqItem, PageMeta, SectionCopy, Stat } from "@/content/types";
import type { BreastImageKey } from "@/content/pages/breast-cancer.images";
import { breastOgImage } from "@/content/pages/breast-cancer.images";
import type { AppointmentService } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";
import { formatRupees } from "@/lib/format";
import { bookingHref } from "@/lib/booking";

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING (identical to the live page, keeps the SEO)
export const meta = {
  title: "Breast Cancer Treatment & Surgery in Bangalore | OncoXpert",
  description:
    "Get personalized breast cancer treatment in Bangalore with expert oncology care, surgery and multidisciplinary treatment options. Consult OncoXpert for trusted, affordable cancer care.",
  canonical: "https://oncoxpert.in/breast-cancer-treatment-bangalore/",
  ogImage: breastOgImage,
} as const satisfies PageMeta;

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** The four treatments of multimodality care. Icons are mapped in the components. */
export type Treatment = "surgery" | "chemotherapy" | "immunotherapy" | "radiotherapy";

type AppointmentCta = { label: string; service: AppointmentService };

/** The hero's three floating cards. Icons are mapped in the components. */
export type HeroHighlight = "awareness" | "screening" | "support";

export type HeroContent = {
  eyebrow: string;
  /** Rendered as separate lines of the H1. */
  headline: readonly string[];
  /** Index of the headline line set in italic gradient with the hand-drawn underline. */
  emphasisLine: number;
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  chips: readonly { key: Treatment; label: string }[];
  /** The three cards floating around the photo (no figures). */
  highlights: readonly { key: HeroHighlight; label: string }[];
  /** The hero photo (frameless: it melts into the hero's blush). */
  image: BreastImageKey;
  a11y: { pause: string; play: string; highlights: string; chips: string };
};

export type OverviewContent = Required<Pick<SectionCopy, "eyebrow" | "title" | "emphasis">> & {
  paragraphs: readonly string[];
  image: BreastImageKey;
  diagram: { label: string; centre: string; nodes: readonly { key: Treatment; label: string }[] };
};

/* ------------------------------------------------------------------ */
/* 1 · #hero                                                           */
/* ------------------------------------------------------------------ */

export const hero = {
  // SOURCE: EXISTING
  eyebrow: "Advanced Breast Cancer Center",
  // SOURCE: EXISTING (one string per line)
  headline: ["Precision, Personalized & Comprehensive", "Breast Cancer", "Treatment"],
  emphasisLine: 1,
  // SOURCE: EXISTING (button labels)
  ctas: {
    primary: { label: "Book Consultation", service: "Consultation" },
    secondary: { label: "Get Second Opinion", service: "Second Opinion" },
  },
  // SOURCE: NEW (labels taken from the doctor's sentence about multimodality treatment)
  chips: [
    { key: "surgery", label: "Surgery" },
    { key: "chemotherapy", label: "Chemotherapy" },
    { key: "immunotherapy", label: "Immunotherapy" },
    { key: "radiotherapy", label: "Radiotherapy" },
  ],
  // SOURCE: DOCTOR (the client's review, 30 Oct 2026: these three around the hero photo instead of
  // the outcome figures, which stay in #outcomes and #surgery). "Awareness Create/ Programmes" is
  // set as "Awareness Programmes". PENDING DOCTOR: confirm that first label's wording.
  highlights: [
    { key: "awareness", label: "Awareness Programmes" },
    { key: "screening", label: "Screening" },
    { key: "support", label: "Survivor Support Groups" },
  ],
  // The client's review, 30 Oct 2026: one hopeful woman (the live page's), no frame.
  image: "heroHope",
  // SOURCE: NEW (screen-reader / control labels)
  a11y: {
    pause: "Pause animation",
    play: "Play animation",
    highlights: "Awareness, screening and survivor support",
    chips: "Treatments we offer",
  },
} as const satisfies HeroContent;

// SOURCE: NEW (breadcrumb; also published as BreadcrumbList JSON-LD)
export const breadcrumb = {
  label: "Breadcrumb",
  items: [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/our-services/" },
    { label: "Breast Cancer", href: "/breast-cancer-treatment-bangalore/" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 2 · #overview                                                       */
/* ------------------------------------------------------------------ */

export const overview = {
  // SOURCE: DOCTOR (title of his document)
  eyebrow: "Breast cancer",
  // SOURCE: NEW
  title: "Comprehensive care, built around you",
  emphasis: "built around you",
  // SOURCE: DOCTOR (approved fixes only: "the one of the most common" → "one of the most common"; "oncoxpert" → "OncoXpert")
  paragraphs: [
    "Breast cancers are one of the most common cancers treated at OncoXpert. Most of our patients regard our center as one of the best cancer hospitals for the same. In keeping with the international standards breast cancer is given multimodality treatment at our center involving surgery, chemotherapy, immunotherapy and radiotherapy.",
  ],
  image: "consultation",
  // SOURCE: NEW
  diagram: {
    label: "Multimodality treatment",
    centre: "Your care plan",
    nodes: [
      { key: "surgery", label: "Surgery" },
      { key: "chemotherapy", label: "Chemotherapy" },
      { key: "immunotherapy", label: "Immunotherapy" },
      { key: "radiotherapy", label: "Radiotherapy" },
    ],
  },
} as const satisfies OverviewContent;

/* ------------------------------------------------------------------ */
/* 3 · #why-trust                                                      */
/* ------------------------------------------------------------------ */

export type WhyTrustIcon = "crosshair" | "scissors" | "flask" | "wallet" | "heart-handshake";

export type WhyTrustContent = {
  title: string;
  intro: string;
  cards: readonly {
    icon: WhyTrustIcon;
    title: string;
    body: string;
    /** Claim awaiting the doctor's confirmation before launch. */
    pendingApproval?: string;
  }[];
  band: { text: string; cta: AppointmentCta; image: BreastImageKey };
  a11y: { cards: string; swipeHint: string };
};

export const whyTrust = {
  // SOURCE: EXISTING
  title: "Why Trust OncoXpert",
  intro: "Providing world-class oncology standards with a patient-first philosophy.",
  // SOURCE: EXISTING
  cards: [
    {
      icon: "crosshair",
      title: "Precise Planning",
      body: "Advanced diagnostics ensuring every step of your treatment is mapped with surgical precision.",
    },
    {
      icon: "scissors",
      title: "Advanced Surgery",
      body: "Specializing in breast conservation and robotic-assisted procedures for faster recovery.",
    },
    {
      icon: "flask",
      title: "Personalized Chemo & Immunotherapy",
      body: "Customized immunotherapy and chemotherapy protocols tailored to your unique biology.",
    },
    {
      icon: "wallet",
      title: "Value for Money",
      body: "Transparent, institutional-grade care without the premium corporate hospital overhead.",
    },
    {
      icon: "heart-handshake",
      title: "Proven Outcomes",
      body: "Consistent 98% satisfaction rates across 5,000+ successful patient transformations.",
      // PENDING DOCTOR: confirm the 98% satisfaction rate and the 5,000+ patients claim.
      pendingApproval: "Doctor to confirm: 98% satisfaction rate and 5,000+ patients",
    },
  ],
  band: {
    // SOURCE: EXISTING
    text: "Connect with our specialists for a roadmap to your recovery.",
    cta: { label: "Book Consultation", service: "Consultation" },
    image: "ribbonHands",
  },
  // SOURCE: NEW (swipe hint + screen-reader label)
  a11y: { cards: "Why trust OncoXpert", swipeHint: "Swipe" },
} as const satisfies WhyTrustContent;

/* ------------------------------------------------------------------ */
/* 4 · #planning                                                       */
/* ------------------------------------------------------------------ */

export type PlanningContent = {
  eyebrow: string;
  title: string;
  intro: string;
  steps: readonly { title: string; body: string; image: BreastImageKey; chips?: readonly string[] }[];
  /** Phones show one image instead of the crossfading frame. */
  mobileImage: BreastImageKey;
  staging: {
    title: string;
    body: string;
    roles: readonly string[];
    quote: string;
    quoteBy: string;
  };
  a11y: { steps: string };
};

export const planning = {
  // SOURCE: EXISTING
  eyebrow: "PRECISION-BASED CANCER PLANNING",
  title: "Every Treatment Begins with Precise Planning",
  intro:
    "Our thorough evaluation process ensures that every patient receives a treatment plan as unique as their biology, leveraging the world’s most advanced diagnostic technologies.",
  // SOURCE: EXISTING (titles and text); NEW (image pairing, receptor chips)
  steps: [
    {
      title: "Mammogram",
      body: "High-resolution breast imaging to detect abnormalities with clinical precision.",
      image: "planningCalendar",
    },
    {
      title: "Biopsy",
      body: "Laboratory examination of tissue samples to confirm cancer type and grade.",
      image: "pathologyLab",
    },
    {
      title: "Receptor Status",
      body: "Evaluation of ER, PR, and HER2 receptors to guide hormonal and targeted therapy.",
      image: "pathologyLab",
      chips: ["ER", "PR", "HER2"],
    },
    {
      title: "PET-CT Scan",
      body: "Advanced whole body imaging to determine the exact extent of cancer spread.",
      image: "imagingScan",
    },
    {
      title: "NGS Testing",
      body: "Genomic testing for personalized targeted therapy based on genetic mutations.",
      image: "pathologyLab",
    },
  ],
  mobileImage: "imagingScan",
  staging: {
    // SOURCE: EXISTING
    title: "Precise Evaluation & Accurate Cancer Staging",
    body: "Our multidisciplinary approach combines the expertise of radiologists, pathologists, and oncologists. By integrating these advanced diagnostics, we create a comprehensive clinical map that minimizes surprises and maximizes the effectiveness of your treatment journey.",
    // SOURCE: NEW (labels taken from the text above)
    roles: ["Radiologists", "Pathologists", "Oncologists"],
    // SOURCE: DOCTOR (approved fixes only: "PETCT" → "PET-CT"; "there is minimal" → "there are minimal")
    quote:
      "Each patient is staged and subtyped precisely with biopsy and PET-CT scans and appropriate treatment advised. The treatment is customized and administered in such a way that there are minimal side effects and all patients comfortably complete the treatment.",
    // SOURCE: NEW
    quoteBy: "Dr. Sunil Navalgund",
  },
  // SOURCE: NEW (screen-reader label)
  a11y: { steps: "Diagnostic steps" },
} as const satisfies PlanningContent;

/* ------------------------------------------------------------------ */
/* 5 · #surgery                                                        */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* #team (before #surgery)                                             */
/* ------------------------------------------------------------------ */

export type TeamContent = {
  eyebrow: string;
  title: string;
  /** Words of `title` set in the serif italic. */
  emphasis: string;
  intro: string;
  /** Short promises beside the photo (no names or roles: none are confirmed). */
  points: readonly string[];
  image: BreastImageKey;
  /** The tag on the photo. */
  badge: string;
};

// SOURCE: NEW (the client's review, 31 Oct 2026: an "Our Team" section with the team photo,
// before #surgery). PENDING DOCTOR: approve the wording; add names and roles if wanted.
export const team = {
  eyebrow: "Our Team",
  title: "The people beside you, every step of the way",
  emphasis: "every step of the way",
  intro:
    "Behind every treatment plan is a dedicated team led by Dr. Sunil Navalgund, working together so you are cared for, informed and never alone.",
  points: ["Led by Dr. Sunil Navalgund", "One team, one plan for you", "Care that continues after surgery"],
  image: "team",
  badge: "Team OncoXpert",
} as const satisfies TeamContent;

export type SurgeryCardKey = "conservation" | "sentinel" | "robotic" | "reconstruction" | "planning";

export type SurgeryContent = {
  eyebrow: string;
  title: string;
  intro: string;
  highlight: string;
  stat: Stat;
  image: BreastImageKey;
  cards: readonly {
    key: SurgeryCardKey;
    title: string;
    body: string;
    link?: { label: string; href: string };
    options?: readonly string[];
  }[];
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
};

export const surgery = {
  // SOURCE: EXISTING (the live page's leading hospital emoji is replaced by the eyebrow icon)
  eyebrow: "ADVANCED BREAST SURGERY",
  title: "Advanced Surgical Techniques for Breast Cancer",
  intro:
    "We combine oncological safety with aesthetic preservation through personalized surgical planning tailored to your unique anatomy and diagnosis.",
  // SOURCE: DOCTOR
  highlight:
    "The focus of surgery is to remove the tumor with oncological safety and also to maintain the size and shape of the breast. This cosmetic surgery is achieved using oncoplastic techniques and flaps.",
  // SOURCE: DOCTOR
  stat: { value: 65, suffix: "%", label: "Breast conservation and cosmetic surgeries" },
  image: "surgeryTeam",
  // SOURCE: EXISTING (the stray word "mic" on the live page is a leftover and is not reproduced)
  cards: [
    {
      key: "conservation",
      title: "Breast Conservation Surgery",
      body: "Advanced techniques to remove the tumor while preserving healthy tissue and achieving superior cosmetic outcomes.",
    },
    {
      key: "sentinel",
      title: "Sentinel Lymph Node Biopsy",
      body: "Minimally invasive evaluation of lymph nodes to prevent unnecessary removal and reduce the risk of lymphedema.",
    },
    {
      key: "robotic",
      title: "Robotic & Minimally Invasive Surgery",
      body: "Utilizing state-of-the-art robotic assistance for extreme precision, smaller incisions, and significantly faster recovery times.",
      // SOURCE: NEW
      link: { label: "Explore robotic surgery", href: "/robotic-surgery/" },
    },
    {
      key: "reconstruction",
      title: "Breast Reconstruction Options",
      body: "Restoring form and confidence through immediate or delayed reconstructive procedures.",
      options: ["Oncoplasty", "Implant-Based", "Whole Breast Reconstruction"],
    },
    {
      key: "planning",
      title: "Personalized Surgical Planning",
      body: "Every case is reviewed by our multidisciplinary tumor board for optimal outcomes.",
    },
  ],
  // SOURCE: EXISTING (button labels)
  ctas: {
    primary: { label: "Book a Surgical Consultation", service: "Consultation For Surgery" },
    secondary: { label: "Get a Second Opinion", service: "Second Opinion" },
  },
} as const satisfies SurgeryContent;

/* ------------------------------------------------------------------ */
/* 6 · #journey                                                        */
/* ------------------------------------------------------------------ */

export type JourneyContent = {
  title: string;
  steps: readonly { title: string; body: string }[];
  /** Step 4 (the hopeful ending): main photo + small inset. */
  images: { main: BreastImageKey; inset: BreastImageKey };
  a11y: { steps: string };
};

export const journey = {
  // SOURCE: EXISTING
  title: "Personalized Care Journey",
  // SOURCE: EXISTING
  steps: [
    {
      title: "Comprehensive Diagnosis",
      body: "Genetic profiling and deep imaging to understand the tumor’s blueprint.",
    },
    { title: "Collaborative Planning", body: "Designing your surgical and systemic roadmap with the Tumor Board." },
    { title: "Targeted Therapy", body: "Executing treatment using advanced chemo and immunotherapy agents." },
    { title: "Holistic Recovery", body: "Continuous monitoring and support during your return to full health." },
  ],
  images: { main: "recoveryWalk", inset: "recoveryFamily" },
  // SOURCE: NEW (screen-reader label)
  a11y: { steps: "Your care journey, step by step" },
} as const satisfies JourneyContent;

/* ------------------------------------------------------------------ */
/* 7 · #survivors                                                      */
/* ------------------------------------------------------------------ */

export type SurvivorsContent = {
  eyebrow: string;
  title: string;
  emphasis: string;
  body: string;
  /** PENDING DOCTOR: each line renders only once it is filled in. */
  details: { meets: string; place: string; contactName: string };
  detailLabels: { meets: string; place: string; contactName: string };
  cta: Cta;
  images: { main: BreastImageKey; secondary: BreastImageKey };
};

export const survivors = {
  // SOURCE: NEW
  eyebrow: "Survivors group",
  title: "You are not alone",
  emphasis: "not alone",
  // SOURCE: DOCTOR
  body: "We have a survivors group which meets regularly and helps new patients cope with the treatment effectively.",
  // PENDING DOCTOR: when / where the group meets and whom to contact. Leave "" to hide.
  details: { meets: "", place: "", contactName: "" },
  // SOURCE: NEW (labels for the details above)
  detailLabels: { meets: "Meets", place: "Where", contactName: "Contact" },
  // SOURCE: NEW
  cta: {
    label: "Ask about the survivors group",
    href: "https://wa.me/918002800295?text=Hi%2C%20I%27d%20like%20to%20know%20about%20the%20survivors%20group",
  },
  images: { main: "survivorsGroup", secondary: "joyFlowers" },
} as const satisfies SurvivorsContent;

/* ------------------------------------------------------------------ */
/* 8 · #outcomes                                                       */
/* ------------------------------------------------------------------ */

export type StageOutcome = {
  stage: string;
  /** Number of patients treated at this stage. */
  cases: number;
  /** 5-year survival rate, %. */
  survival5y: number;
  caseLabel: string;
};

export type OutcomesContent = {
  label: string;
  title: string;
  responses: readonly Stat[];
  stages: readonly StageOutcome[];
  survivalLabel: string;
  totalLabel: string;
  disclaimer: string;
  pendingApproval: string;
  table: { caption: string; stage: string; cases: string; survival: string };
};

export const outcomes = {
  // SOURCE: EXISTING
  label: "Proven Outcomes",
  title: "Patient Experience Statistics",
  // SOURCE: EXISTING (also in the doctor's document)
  responses: [
    { value: 96, suffix: "%", label: "Chemotherapy Response" },
    { value: 97, suffix: "%", label: "Immunotherapy Response" },
  ],
  // SOURCE: DOCTOR (numbers); EXISTING (case labels)
  stages: [
    { stage: "Stage I", cases: 46, survival5y: 96, caseLabel: "Stage I Cases" },
    { stage: "Stage II", cases: 54, survival5y: 92, caseLabel: "Stage II Cases" },
    { stage: "Stage III", cases: 90, survival5y: 80, caseLabel: "Stage III Cases" },
    { stage: "Stage IV", cases: 26, survival5y: 60, caseLabel: "Stage IV Cases" },
  ],
  // SOURCE: DOCTOR
  survivalLabel: "Survival rate at 5 yrs",
  // SOURCE: DOCTOR (label only: the number is the computed sum of the stage cases, lib/content.ts)
  totalLabel: "Total cases treated",
  // SOURCE: NEW
  disclaimer:
    "Figures are from OncoXpert's own patient records. Individual outcomes vary with stage, tumour biology and overall health.",
  // PENDING DOCTOR: approve the disclaimer wording.
  pendingApproval: "Doctor to approve the outcomes disclaimer",
  // SOURCE: NEW (screen-reader table)
  table: {
    caption: "Breast cancer outcomes by stage",
    stage: "Stage",
    cases: "Cases treated",
    survival: "Survival rate at 5 yrs",
  },
} as const satisfies OutcomesContent;

/* ------------------------------------------------------------------ */
/* 9 · #value                                                          */
/* ------------------------------------------------------------------ */

export type ValueIcon = "shield-check" | "receipt" | "piggy-bank" | "headset";

export type ValueContent = {
  title: string;
  body: string;
  highlight: { title: string; body: string };
  label: string;
  items: readonly { icon: ValueIcon; title: string; body: string }[];
};

export const value = {
  // SOURCE: EXISTING
  title: "Institutional Care. Personal Value.",
  body: "We believe world-class oncology should be accessible. At OncoXpert, we provide institutional-grade clinical outcomes without the bloated costs of traditional corporate healthcare.",
  highlight: { title: "Transparent Pricing", body: "No hidden charges. Predictable costs from day one." },
  label: "Our Packages",
  items: [
    {
      icon: "shield-check",
      title: "All Insurances Accepted",
      body: "We assist with most major health insurance providers for a hassle-free treatment experience.",
    },
    {
      icon: "receipt",
      title: "Transparent Pricing",
      body: "No hidden charges. Clear treatment plans and upfront cost estimates.",
    },
    {
      icon: "piggy-bank",
      title: "Budget-Friendly Options",
      body: "Flexible treatment packages tailored to your medical needs and financial comfort.",
    },
    {
      icon: "headset",
      title: "Priority Patient Assistance",
      body: "Dedicated care coordinators to support appointments, reports, admissions, and follow-ups.",
    },
  ],
} as const satisfies ValueContent;

/* ------------------------------------------------------------------ */
/* 10 · #pricing                                                       */
/* ------------------------------------------------------------------ */

type PriceCard = {
  name: string;
  /** Rupees, as a number. */
  amount: number;
  /** Unit from the doctor's document (PENDING DOCTOR). */
  unit: string;
  /** Unit as shown on the live site (reference). */
  unitLive: string;
  body: string;
};

export type PricingContent = {
  title: string;
  intro: string;
  doctorLine: string;
  /** Which unit set the cards show: "doctor" (his document) or "live" (current website). */
  unitSet: "doctor" | "live";
  cards: readonly PriceCard[];
  plan: {
    title: string;
    body: string;
    cta: AppointmentCta & { note: string };
    contactLine: string;
    contactLink: Cta;
    image: BreastImageKey;
  };
};

export const pricing = {
  // SOURCE: EXISTING
  title: "Transparent Care Financing",
  intro: "Quality medical care should be accessible. We provide clear, upfront cost estimates.",
  // SOURCE: DOCTOR (approved fix: "bangalore" → "Bangalore")
  doctorLine: "Treatments are offered in best cancer hospitals in Bangalore by best oncologists.",
  // PENDING DOCTOR: confirm the units. Switch to "live" to show the current website's units.
  unitSet: "doctor" as PricingContent["unitSet"],
  // SOURCE: DOCTOR = EXISTING (amounts); DOCTOR (unit); EXISTING (unitLive, descriptions)
  cards: [
    {
      name: "SURGERY",
      amount: 70000,
      unit: "onwards",
      unitLive: "Starting Price",
      body: "Inclusive of routine surgical expenses and comprehensive post-operative care.",
    },
    {
      name: "CHEMOTHERAPY",
      amount: 12000,
      unit: "per cycle onwards",
      unitLive: "Per Cycle",
      body: "Evidence-based protocols using standard international medical safety standards.",
    },
    {
      name: "RADIATION",
      amount: 65000,
      unit: "onwards",
      unitLive: "Full Course",
      body: "Comprehensive treatment packages utilizing targeted beam technology.",
    },
    {
      name: "IMMUNOTHERAPY",
      amount: 17000,
      unit: "per cycle",
      unitLive: "Per Session",
      body: "Advanced systemic therapy cycles tailored specifically for your biology.",
    },
  ],
  plan: {
    // SOURCE: EXISTING
    title: "Get Your Personalized Treatment Plan",
    body: "Receive a customized treatment plan with clear pricing, insurance support, and dedicated patient assistance from our oncology team.",
    cta: { label: "Request Package", service: "Consultation", note: "Package request" },
    contactLine: "For Customized Package Kindly",
    // SOURCE: EXISTING (label); NEW (the booking page with Consultation preselected and a note)
    contactLink: { label: "Contact Us", href: bookingHref("Consultation", "Customized package") },
    image: "ribbonMinimal",
  },
} as const satisfies PricingContent;

/* ------------------------------------------------------------------ */
/* 11 · #surgeon                                                       */
/* ------------------------------------------------------------------ */

export type SurgeonContent = {
  label: string;
  name: string;
  title: string;
  bio: string;
  /** Phrase of the bio set in italic accent. */
  emphasis: string;
  badges: readonly { icon: "badge-check" | "award"; label: string }[];
  cta: AppointmentCta;
  image: { src: string; alt: string; width: number; height: number };
};

export const surgeon = {
  // SOURCE: EXISTING
  label: "LEAD SURGEON",
  name: "Dr. Sunil Navalgund",
  title: "Surgical Oncologist & Breast Care Specialist",
  bio: "With over 15 years of dedicated practice in surgical oncology, Dr. Sunil Navalgund has performed thousands of successful breast cancer procedures. His philosophy centers on ‘Precision and Preservation’ ensuring complete cancer removal while respecting the physical and emotional integrity of his patients. He is a pioneer in minimally invasive keyhole surgery in the region.",
  emphasis: "‘Precision and Preservation’",
  badges: [
    { icon: "badge-check", label: "Board Certified" },
    { icon: "award", label: "Award Winning" },
  ],
  // SOURCE: EXISTING (button label from the robotic page)
  cta: { label: "Book Appointment with Dr. Sunil", service: "Consultation" },
  image: {
    src: "/images/brand/dr-sunil-navalgund.png",
    // SOURCE: NEW
    alt: "Dr. Sunil Navalgund, Surgical Oncologist and Breast Care Specialist",
    width: 886,
    height: 1024,
  },
} as const satisfies SurgeonContent;

/* ------------------------------------------------------------------ */
/* 12–17 · shared sections: this page's settings and headings          */
/* (reviews: content/shared/reviews.ts; videos: content/shared/videos.ts;
    appointment, locations, final band: content/shared/sections.ts)    */
/* ------------------------------------------------------------------ */

export const pageSlug = "breast-cancer-treatment-bangalore";

/** Structured data (JSON-LD): the condition this page is about. Not visible on the page. */
export const structuredData = { pageAbout: "Breast cancer" } as const;

export const reviews = {
  // SOURCE: EXISTING. Set in two lines (the client's review, 30 Oct 2026): the break is layout.
  title: ["Every Patient Story Reflects", "Our Commitment To Clinical Excellence."],
  // Breast page order. PENDING DOCTOR: Vasudeva Murthy's review is about colon cancer;
  // add excludeOn: ["breast-cancer-treatment-bangalore"] to it in content/shared/reviews.ts to hide it here.
  order: [
    "muralidharan-chinnusamy",
    "veena-iyer",
    "jayashree-ajith",
    "shwetha-jayaraj",
    "padmavathi-p",
    "mangala-music",
    "friendly-work",
    "narasimhamurthy-sm",
    "vasudeva-murthy",
  ],
} as const satisfies { title: readonly string[]; order: readonly ReviewId[] };

export const videos = {
  // SOURCE: NEW; "warriors": the client's review, 30 Oct 2026
  eyebrow: "Watch & learn",
  title: "Hear from our warriors",
  // SOURCE: NEW (screen-reader labels)
  a11y: { play: "Play video", frame: "YouTube video", list: "Videos" },
} as const;

/* FAQ: questions are NEW; answers reuse ONLY existing / doctor sentences (exact). */

const priceAnswer =
  pricing.cards
    .map((c) => {
      const name = c.name.charAt(0) + c.name.slice(1).toLowerCase();
      const unit = pricing.unitSet === "live" ? c.unitLive : c.unit;
      return `${name} ${formatRupees(c.amount)} ${unit}`;
    })
    .join(", ") + ".";

export type FaqEntry = FaqItem & {
  link?: Cta;
  /** Show the clinic list under the answer. */
  showLocations?: boolean;
};

export const faq = {
  // SOURCE: NEW
  title: "Questions women often ask",
  // SOURCE: NEW (contact card after the questions)
  contactTitle: "Still have a question?",
  items: [
    {
      question: "What treatments are available for breast cancer at OncoXpert?",
      icon: "stethoscope",
      // SOURCE: DOCTOR
      answer: [
        "In keeping with the international standards breast cancer is given multimodality treatment at our center involving surgery, chemotherapy, immunotherapy and radiotherapy.",
      ],
    },
    {
      question: "How is my treatment planned?",
      icon: "clipboard-list",
      // SOURCE: DOCTOR + EXISTING
      answer: [
        "Each patient is staged and subtyped precisely with biopsy and PET-CT scans and appropriate treatment advised.",
        "Every case is reviewed by our multidisciplinary tumor board for optimal outcomes.",
      ],
    },
    {
      question: "Can my breast be preserved during surgery?",
      icon: "heart-handshake",
      // SOURCE: DOCTOR
      answer: [
        "The focus of surgery is to remove the tumor with oncological safety and also to maintain the size and shape of the breast. This cosmetic surgery is achieved using oncoplastic techniques and flaps.",
      ],
    },
    {
      question: "Do you offer robotic or keyhole surgery?",
      icon: "cpu",
      // SOURCE: EXISTING
      answer: [
        "Utilizing state-of-the-art robotic assistance for extreme precision, smaller incisions, and significantly faster recovery times.",
      ],
      // SOURCE: NEW
      link: { label: "Explore robotic surgery", href: "/robotic-surgery/" },
    },
    {
      question: "What does breast cancer treatment cost?",
      icon: "indian-rupee",
      // Generated from the price cards (DOCTOR = EXISTING) + EXISTING contact line
      answer: [priceAnswer, `${pricing.plan.contactLine} ${pricing.plan.contactLink.label}.`],
    },
    {
      question: "Do you accept health insurance?",
      icon: "shield-check",
      // SOURCE: EXISTING
      answer: ["We assist with most major health insurance providers for a hassle-free treatment experience."],
    },
    {
      question: "Is there support during and after treatment?",
      icon: "users",
      // SOURCE: DOCTOR + EXISTING
      answer: [
        "We have a survivors group which meets regularly and helps new patients cope with the treatment effectively.",
        "Continuous monitoring and support during your return to full health.",
      ],
    },
    {
      question: "Where can I consult Dr. Sunil Navalgund?",
      icon: "map-pin",
      // SOURCE: EXISTING (+ the clinic list from content/site.ts)
      answer: [
        "Visit any of our cancer care centers across Bengaluru for expert consultations and advanced surgical oncology care.",
      ],
      showLocations: true,
    },
  ] satisfies FaqEntry[],
} as const;
