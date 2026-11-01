/**
 * Every word on /lung-cancer-in-bangalore/ (Lung Cancer).
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page (https://oncoxpert.in/lung-cancer-in-bangalore/, raw HTML
 *              fetched 1 Nov 2026). Render exactly.
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *   PENDING DOCTOR → something only the doctor can confirm.
 *
 * Never paraphrase, shorten or "improve" EXISTING text. The live page breaks some headings with <br>
 * ("Advanced Lung<br>Cancer Treatment<br>…"); those breaks are layout, so each line is one string in
 * `lines` and the plain heading is the lines joined by a space. Capitals are kept as the live markup
 * has them (the live hero labels are typed in capitals). The live headings are one colour each, so
 * there is no `emphasis`. Numbers live here as numbers; totals are computed (sumBy), never typed in.
 * Shared copy is reused, not repeated here: reviews, videos, locations and the final call band
 * (content/shared/sections.ts). Images: content/pages/lung-cancer.images.ts.
 */
import type { PageMeta, Stat, TechniqueSideContent } from "@/content/types";
import type { LungImageKey } from "@/content/pages/lung-cancer.images";
import { lungOgImage } from "@/content/pages/lung-cancer.images";
import type { AppointmentService } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";
import { reviewsSection } from "@/content/shared/sections";
import { sumBy } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** A button that opens the booking page with `service` preselected (and `note` in the email).
 *  `cta`: the analytics label, <page>:<section>:<action>. */
type AppointmentCta = { label: string; service: AppointmentService; note?: string; cta?: string };

/** Icon keys, mapped to lucide icons in components/pages/lung-cancer. */
export type HighlightIcon = "care" | "robotic" | "keyhole" | "stage-iv";
export type SymptomIcon = "cough" | "blood";
/** The three tests in the diagnostic lens (each has its own line art). */
export type TestKey = "bronchoscopy" | "biopsy" | "petct";
type BenefitIcon = "scars" | "pain" | "infection" | "discharge";
/** One side of the shared TechniqueCompare, with this page's image keys. */
type LungTechniqueSide = TechniqueSideContent<LungImageKey>;

/* ------------------------------------------------------------------ */
/* 1 · #hero                                                           */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. The heading's four lines (<br> on the live page). The live heading has no
// full stop after "Life"; it is kept that way.
const heroLines = ["Advanced Lung", "Cancer Treatment", "Focused On Recovery,", "Breathing & Quality Of Life"] as const;

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING (identical to the live page, keeps the SEO). The live page has no <h1> (its
// headings are styled divs): `h1` is the hero heading, which becomes the page's one <h1>.
export const meta = {
  title: "Lung Cancer Treatment in Bangalore | OncoXpert",
  description:
    "Get lung cancer treatment in Bangalore at OncoXpert, with robotic surgery, VATS, immunotherapy and personalized surgical oncology care.",
  h1: heroLines.join(" "),
  canonical: "https://oncoxpert.in/lung-cancer-in-bangalore/",
  ogImage: lungOgImage,
} as const satisfies PageMeta & { h1: string };

export const pageSlug = "lung-cancer-in-bangalore";

/** Buttons that name no service (header, menu, action bar) preselect this one. */
// SOURCE: NEW (choice; the first of the live "Service Required" options)
export const defaultAppointmentService: AppointmentService = "Consultation";

export const hero = {
  // SOURCE: NEW (eyebrow; the live hero has none)
  eyebrow: "Lung Cancer Care · Bengaluru",
  lines: heroLines,
  // SOURCE: NEW (choice: the word set in the gradient, with a drawn underline)
  emphasis: "Breathing",
  // SOURCE: EXISTING
  body: "Personalized lung cancer treatment using robotic surgery, keyhole surgery, immunotherapy and multidisciplinary cancer care designed to maximize outcomes while minimizing treatment burden.",
  // SOURCE: EXISTING (button labels); NEW (the service each one preselects, analytics labels)
  ctas: {
    primary: { label: "Book Consultation", service: "Consultation", cta: "lung:hero:book-consultation" },
    secondary: { label: "Get Second Opinion", service: "Second Opinion", cta: "lung:hero:second-opinion" },
  },
  // The photo card in the visual (the LCP image). The live hero shows the portrait, which moves
  // to #surgeon.
  image: "breathingCalm",
  // SOURCE: NEW
  // PENDING DOCTOR: the glass caption on the photo card.
  caption: "Care planned around every breath",
  // SOURCE: NEW (screen-reader labels)
  a11y: {
    visual: "Illustration: a pair of lungs drawn as one line, breathing slowly",
    pause: "Pause the hero animation",
    play: "Play the hero animation",
  },
} as const satisfies {
  eyebrow: string;
  lines: readonly string[];
  emphasis: string;
  body: string;
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  image: LungImageKey;
  caption: string;
  a11y: { visual: string; pause: string; play: string };
};

/* ------------------------------------------------------------------ */
/* 2 · #highlights                                                     */
/* ------------------------------------------------------------------ */

export const highlights = {
  // SOURCE: EXISTING (labels, in the live capitals); NEW (icon keys, detail lines, links). On the
  // live page the first label stands alone above the other three, which carry an icon each.
  // PENDING DOCTOR: the four detail lines.
  items: [
    {
      icon: "care",
      label: "PERSONALIZED CANCER CARE",
      detail: "One plan, shaped around your scans, your lungs and your life.",
    },
    {
      icon: "robotic",
      label: "ROBOTIC SURGERY",
      detail: "Precise, lung-sparing surgery through small incisions.",
      href: "/robotic-surgery/",
    },
    {
      icon: "keyhole",
      label: "KEYHOLE SURGERY",
      detail: "VATS: a camera and fine instruments instead of a large opening.",
    },
    {
      icon: "stage-iv",
      label: "STAGE IV TREATMENT OPTIONS",
      detail: "Immunotherapy and targeted options for advanced disease.",
      href: "#stage-iv",
    },
  ],
  // SOURCE: NEW (screen-reader label, analytics labels per link)
  a11y: { label: "What we offer" },
} as const satisfies {
  items: readonly { icon: HighlightIcon; label: string; detail: string; href?: string }[];
  a11y: { label: string };
};

/* ------------------------------------------------------------------ */
/* 3 · #diagnosis                                                      */
/* ------------------------------------------------------------------ */

export const diagnosis = {
  // SOURCE: EXISTING
  title: "Early Diagnosis Creates More Treatment Options",
  body: "Timely evaluation for symptoms like chronic cough, coughing blood, or persistent chest pain is critical. Our precision diagnostic suite includes high-resolution bronchoscopy and CT-guided biopsies, complemented by PET-CT for precise staging.",
  // SOURCE: EXISTING (titles: the two symptom chips above the heading); NEW (icon keys and the
  // "when to see a doctor" lines: general guidance, never a diagnosis)
  // PENDING DOCTOR: the two "when to see a doctor" lines.
  symptoms: [
    {
      icon: "cough",
      title: "Chronic Cough",
      when: "See a doctor if a cough lasts more than three weeks, or changes in a long-standing cough.",
    },
    {
      icon: "blood",
      title: "Coughing Blood",
      when: "See a doctor promptly if you cough up any blood, even a small streak.",
    },
  ],
  // SOURCE: NEW (the lens: the three tests named in the live paragraph, in its words; each caption
  // is a plain description of the test)
  // PENDING DOCTOR: the three test captions.
  tests: [
    {
      key: "bronchoscopy",
      title: "Bronchoscopy",
      caption: "A thin, flexible camera looks inside the airways and can take small samples.",
    },
    {
      key: "biopsy",
      title: "CT-guided biopsy",
      caption: "A CT scan guides a fine needle to take a tiny sample from the lung.",
    },
    {
      key: "petct",
      title: "PET-CT",
      caption: "A whole-body scan that shows where the disease is active, for precise staging.",
    },
  ],
  // SOURCE: EXISTING. One paragraph on the live page ("Did you know? Detection at …"); the lead is
  // split off so it can be styled. Rendered as `${lead} ${body}`.
  callout: {
    lead: "Did you know?",
    body: "Detection at Stage I increases survival rates significantly compared to later stages.",
    // SOURCE: NEW (the large figure beside it: the stage the sentence names, not a statistic)
    figure: "I",
  },
  // SOURCE: NEW (screen-reader labels)
  a11y: {
    symptoms: "Symptoms to watch",
    tests: "Diagnostic tests",
    lens: "How each test looks at the lungs",
  },
} as const satisfies {
  title: string;
  body: string;
  symptoms: readonly { icon: SymptomIcon; title: string; when: string }[];
  tests: readonly { key: TestKey; title: string; caption: string }[];
  callout: { lead: string; body: string; figure: string };
  a11y: { symptoms: string; tests: string; lens: string };
};

/* ------------------------------------------------------------------ */
/* 4 · #pathway                                                        */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. The live section is hidden on phones (elementor-hidden-mobile): visible on
// tablets and desktops only. Kept in full; the rebuilt page shows it on every device.
export const pathway = {
  title: "The OncoXpert Care Pathway",
  // The live step numbers are 1–6: the list order. NEW (photo per step, for the design).
  steps: [
    { title: "Symptoms", body: "Identification of persistent cough or discomfort.", image: "breathingCalm" },
    { title: "Biopsy", body: "Bronchoscopy or CT Guided diagnostic sample.", image: "xrayReview" },
    { title: "PET-CT", body: "Precise staging to map the cancer's spread.", image: "chestXray" },
    { title: "Planning", body: "Multidisciplinary tumor board review.", image: "consultation" },
    { title: "Treatment", body: "Surgery, Immunotherapy, or combination care.", image: "roboticArms" },
    { title: "Recovery", body: "Post-op care and long-term surveillance.", image: "seniorSmile" },
  ],
  // SOURCE: NEW (the button after the last step; label as the hero's)
  cta: { label: "Book Consultation", service: "Consultation", cta: "lung:pathway:book-consultation" },
  // SOURCE: NEW (screen-reader labels; "{n}" and "{total}" are filled in)
  a11y: {
    steps: "The six steps",
    stepper: "Go to a step",
    step: "Step",
    status: "Step {n} of {total}",
    progress: "Progress through the steps",
  },
} as const satisfies {
  title: string;
  steps: readonly { title: string; body: string; image: LungImageKey }[];
  cta: AppointmentCta;
  a11y: { steps: string; stepper: string; step: string; status: string; progress: string };
};

/* ------------------------------------------------------------------ */
/* 5 · #surgery                                                        */
/* ------------------------------------------------------------------ */

/** The five lobes of the lobe explorer: three in the right lung, two in the left. */
export type LobeKey = "rightUpper" | "rightMiddle" | "rightLower" | "leftUpper" | "leftLower";
/** The two operations the lobe explorer compares. */
export type SurgeryMode = "lobectomy" | "pneumonectomy";

export const surgery = {
  // SOURCE: EXISTING
  eyebrow: "SURGICAL EXCELLENCE",
  lines: ["Less Pain. Better", "Breathing.", "Faster Recovery."],
  body: "We prioritize Organ Preservation. By utilizing Lobectomy (removing only the affected lobe) instead of Pneumonectomy (full lung removal) whenever possible, we ensure our patients maintain the highest possible breathing capacity post-treatment.",
  // SOURCE: EXISTING (labels); NEW (icon keys)
  benefits: [
    { icon: "scars", label: "Minimal Scars" },
    { icon: "pain", label: "Less Pain" },
    { icon: "infection", label: "Lower Infection" },
    { icon: "discharge", label: "Early Discharge" },
  ],
  // SOURCE: NEW (the lobe explorer: labels, the lobes' names, the live summary). "{kept}", "{total}"
  // and "{lobe}" are filled in; the counts are computed from `lobes`.
  // PENDING DOCTOR: the explorer's captions ("4 of 5 lobes preserved" for a lobectomy, "2 of 5" for
  // a right pneumonectomy) and whether a right pneumonectomy is the right example.
  explorer: {
    modes: { lobectomy: "Lobectomy", pneumonectomy: "Pneumonectomy" },
    lobes: [
      { key: "rightUpper", name: "right upper lobe", side: "right" },
      { key: "rightMiddle", name: "right middle lobe", side: "right" },
      { key: "rightLower", name: "right lower lobe", side: "right" },
      { key: "leftUpper", name: "left upper lobe", side: "left" },
      { key: "leftLower", name: "left lower lobe", side: "left" },
    ],
    preserved: "{kept} of {total} lobes preserved",
    summary: {
      lobectomy: "Lobectomy: only the {lobe} is removed.",
      pneumonectomy: "Pneumonectomy: the whole right lung is removed.",
    },
    a11y: {
      modes: "Type of operation",
      lobes: "The lobes of both lungs",
      lobe: "Show a lobectomy of the {lobe}",
      hint: "Choose a lobe to see what a lobectomy keeps.",
    },
  },
} as const satisfies {
  eyebrow: string;
  lines: readonly string[];
  body: string;
  benefits: readonly { icon: BenefitIcon; label: string }[];
  explorer: {
    modes: Record<SurgeryMode, string>;
    lobes: readonly { key: LobeKey; name: string; side: "left" | "right" }[];
    preserved: string;
    summary: Record<SurgeryMode, string>;
    a11y: { modes: string; lobes: string; lobe: string; hint: string };
  };
};

/* ------------------------------------------------------------------ */
/* 6 · #techniques (the shared TechniqueCompare)                       */
/* ------------------------------------------------------------------ */

export const techniques = {
  // SOURCE: EXISTING
  title: "Advanced Minimally Invasive Techniques",
  // SOURCE: EXISTING (titles, text, points; "DaVinci" spelled as on the live page); NEW (tab labels,
  // icon keys, photos, the link)
  sides: [
    {
      key: "robotic",
      label: "Robotic",
      title: "Robotic Surgery",
      body: "The pinnacle of surgical precision, utilizing the DaVinci system for complex thoracic procedures.",
      points: [
        { icon: "view", title: "3D High-Definition Visualization" },
        { icon: "instruments", title: "Tremor-free, Articulated Instruments" },
        { icon: "access", title: "Enhanced Access to Deep Tissues" },
      ],
      image: "roboticArms",
      link: { label: "Explore robotic surgery", href: "/robotic-surgery/", cta: "lung:techniques:robotic-surgery" },
      drift: true,
    },
    {
      key: "vats",
      label: "VATS",
      title: "VATS (Video-Assisted Thoracic Surgery)",
      body: "A proven, effective keyhole approach for standard lung cancer resections.",
      points: [
        { icon: "incisions", title: "Minimally Invasive Small Incisions" },
        { icon: "recovery", title: "Reduced Recovery Time" },
        { icon: "complications", title: "Lower Risk of Complications" },
      ],
      image: "keyhole",
    },
  ],
  // SOURCE: NEW (the medallion, screen-reader labels)
  labels: { vs: "VS", tabs: "Choose a technique" },
} as const satisfies {
  title: string;
  sides: readonly [LungTechniqueSide, LungTechniqueSide];
  labels: { vs: string; tabs: string };
};

/* ------------------------------------------------------------------ */
/* 7 · #stage-iv and 8 · #survival                                     */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. One figure, shown twice on the live page (the #stage-iv stat and the Stage I
// benchmark), so it is kept once.
// PENDING DOCTOR: "86% STAGE I SURVIVAL" and "50% STAGE IV RESPONSE": confirm both figures, what
// they measure (5-year survival? response to which treatment?) and the period they cover.
const stageISurvival = 86;

export const stageIV = {
  // SOURCE: EXISTING. Two lines for the rise (layout only; the words are the live heading's).
  title: "When Advanced Cancer Still Has Effective Treatment Options",
  lines: ["When Advanced Cancer Still Has", "Effective Treatment Options"],
  body: "Stage IV lung cancer care has evolved. Through modern immunotherapy and detailed genetic analysis, we target specific mutations to provide long-term survival and excellent quality of life even in advanced cases.",
  stats: [
    { value: stageISurvival, suffix: "%", label: "STAGE I SURVIVAL" },
    { value: 50, suffix: "%", label: "STAGE IV RESPONSE" },
  ],
  // SOURCE: NEW
  // PENDING DOCTOR: the disclaimer under the figures.
  disclaimer:
    "Figures describe outcomes in our practice; every patient's response depends on their own cancer, health and treatment.",
  // SOURCE: EXISTING (label, as the hero's); NEW (the note and the analytics label)
  cta: {
    label: "Get Second Opinion",
    service: "Second Opinion",
    note: "Stage IV",
    cta: "lung:stage-iv:second-opinion",
  },
  // SOURCE: NEW (screen-reader labels)
  a11y: {
    table: "Stage I survival and Stage IV response",
    figure: "Figure",
    value: "Value",
    cells: "Illustration: immune cells gathering around a tumour",
  },
} as const satisfies {
  title: string;
  lines: readonly string[];
  body: string;
  stats: readonly Stat[];
  disclaimer: string;
  cta: AppointmentCta;
  a11y: { table: string; figure: string; value: string; cells: string };
};

// SOURCE: NEW
// PENDING DOCTOR: the footnote under the survival chart (shown once approved: set showFootnote).
const showFootnote = false as boolean;

export const survival = {
  // SOURCE: EXISTING
  // PENDING DOCTOR: the source of the survival benchmarks (86 / 80 / 72%): the practice's own
  // results or published figures? Over which years? 5-year survival?
  title: "Survival Benchmarks",
  rows: [
    { label: "Stage I", value: stageISurvival },
    { label: "Stage II", value: 80 },
    { label: "Stage III", value: 72 },
  ],
  unit: "%",
  // SOURCE: NEW
  footnote: showFootnote ? "Benchmarks are 5-year survival rates by stage at diagnosis." : undefined,
  // SOURCE: NEW (screen-reader labels)
  a11y: { table: "Survival benchmarks by stage", row: "Stage", value: "Survival" },
} as const satisfies {
  title: string;
  rows: readonly { label: string; value: number }[];
  unit: string;
  footnote: string | undefined;
  a11y: { table: string; row: string; value: string };
};

/* ------------------------------------------------------------------ */
/* 9 · #volume                                                         */
/* ------------------------------------------------------------------ */

// SOURCE: NEW
// PENDING DOCTOR: the total adds stage counts and surgery counts (46 + 18 + 24 + 12 = 100). Do
// they overlap (a Stage III patient who had VATS counted twice)? What period do they cover, and
// what should the total be called? Hidden until approved: set showTotal.
const showTotal = false as boolean;

export const volume = {
  // SOURCE: EXISTING
  title: "Clinical Volume & Experience",
  counts: [
    { value: 46, label: "STAGE IV CASES" },
    { value: 18, label: "STAGE III CASES" },
    { value: 24, label: "VATS SURGERIES" },
    { value: 12, label: "ROBOTIC SURGERIES" },
  ],
  // SOURCE: NEW (the live page shows no total)
  total: { show: showTotal, label: "TOTAL CASES", period: null as string | null },
  // SOURCE: NEW (screen-reader labels; the dot matrix: one dot per case)
  a11y: {
    table: "Clinical volume",
    group: "Group",
    count: "Count",
    matrix: "One dot per case, coloured by group",
  },
} as const satisfies {
  title: string;
  counts: readonly { value: number; label: string }[];
  total: { show: boolean; label: string; period: string | null };
  a11y: { table: string; group: string; count: string; matrix: string };
};

/** Sum of the four counts (100 with the live numbers). */
export const volumeTotal = sumBy(volume.counts, (count) => count.value);

/* ------------------------------------------------------------------ */
/* 10 · #surgeon (the shared DoctorCard)                               */
/* ------------------------------------------------------------------ */

export const surgeon = {
  // SOURCE: NEW (the label above the name, as on the colorectal page)
  label: "Lead Surgeon",
  name: "Dr. Sunil Navalgund",
  // SOURCE: EXISTING ("Organ Preservation—ensuring", the em dash and curly apostrophe as live)
  title: "Expertise Forged at Tata Memorial Hospital",
  bio: "Specializing in thoracic oncology and robotic-assisted surgery, Dr. Sunil Navalgund brings world-class training to personalized cancer care. His philosophy centers on Organ Preservation—ensuring that treatment not only removes the cancer but protects the patient’s long-term quality of life.",
  // SOURCE: EXISTING (labels, values); NEW (icon keys)
  facts: [
    { icon: "graduation-cap", label: "Training", value: "Tata Memorial Hospital, Mumbai" },
    { icon: "stethoscope", label: "Expertise", value: "Robotic & VATS Thoracic Surgery" },
  ],
  // SOURCE: NEW (the live lung block shows no years; the figure from the colorectal and endometrial pages)
  // PENDING DOCTOR: "15+" here and on the colorectal and endometrial pages, "10+" / "over a decade" on
  // About Us, the ovarian and the thyroid pages, "Over 25 years" on the booking page. Which is right?
  stats: [{ value: 15, suffix: "+ Years", label: "Clinical Experience" }],
  // SOURCE: NEW (the live block has no buttons; labels as on the endometrial and colorectal pages)
  cta: { label: "Book Appointment with Dr. Sunil", service: "Consultation" },
  link: { label: "View Full Profile", href: "/about-us/" },
  image: "doctor",
} as const satisfies {
  label: string;
  name: string;
  title: string;
  bio: string;
  facts: readonly { icon: "graduation-cap" | "stethoscope"; label: string; value: string }[];
  stats: readonly Stat[];
  cta: AppointmentCta;
  link: { label: string; href: string };
  image: LungImageKey;
};

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
  finalImage: "dawnBreath",
} as const satisfies { reviewOrder: readonly ReviewId[]; finalImage: LungImageKey };
