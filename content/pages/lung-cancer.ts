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
import type { PageMeta, Stat } from "@/content/types";
import type { LungImageKey } from "@/content/pages/lung-cancer.images";
import { lungOgImage } from "@/content/pages/lung-cancer.images";
import type { AppointmentService } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";
import { reviewsSection } from "@/content/shared/sections";
import { sumBy } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** A button that opens the booking page with `service` preselected (and `note` in the email). */
type AppointmentCta = { label: string; service: AppointmentService; note?: string };

/** Icon keys, mapped to lucide icons in components/pages/lung-cancer. */
type HighlightIcon = "care" | "robotic" | "keyhole" | "stage-iv";
type BenefitIcon = "scars" | "pain" | "infection" | "discharge";
type TechniqueIcon = "view" | "instruments" | "access" | "incisions" | "recovery" | "complications";
type FactIcon = "training" | "expertise";

type Technique = {
  title: string;
  body: string;
  features: readonly { icon: TechniqueIcon; label: string }[];
  image: LungImageKey;
};

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

/** Page name used in the appointment email subject and the form's hidden "page" field. */
export const pageName = "Lung Cancer";
export const pageSlug = "lung-cancer-in-bangalore";

/** Buttons that name no service (header, menu, action bar) preselect this one. */
// SOURCE: NEW (choice; the first of the live "Service Required" options)
export const defaultAppointmentService: AppointmentService = "Consultation";

export const hero = {
  lines: heroLines,
  // SOURCE: EXISTING
  body: "Personalized lung cancer treatment using robotic surgery, keyhole surgery, immunotherapy and multidisciplinary cancer care designed to maximize outcomes while minimizing treatment burden.",
  // SOURCE: EXISTING (button labels); NEW (the service each one preselects)
  ctas: {
    primary: { label: "Book Consultation", service: "Consultation" },
    secondary: { label: "Get Second Opinion", service: "Second Opinion" },
  },
  // The live hero shows the portrait beside the text.
  image: "doctor",
} as const satisfies {
  lines: readonly string[];
  body: string;
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  image: LungImageKey;
};

/* ------------------------------------------------------------------ */
/* 2 · #highlights                                                     */
/* ------------------------------------------------------------------ */

export const highlights = {
  // SOURCE: EXISTING (labels, in the live capitals); NEW (icon keys). On the live page the first
  // label stands alone above the other three, which carry an icon each.
  items: [
    { icon: "care", label: "PERSONALIZED CANCER CARE" },
    { icon: "robotic", label: "ROBOTIC SURGERY" },
    { icon: "keyhole", label: "KEYHOLE SURGERY" },
    { icon: "stage-iv", label: "STAGE IV TREATMENT OPTIONS" },
  ],
  // SOURCE: NEW (screen-reader label)
  a11y: { label: "What we offer" },
} as const satisfies { items: readonly { icon: HighlightIcon; label: string }[]; a11y: { label: string } };

/* ------------------------------------------------------------------ */
/* 3 · #diagnosis                                                      */
/* ------------------------------------------------------------------ */

export const diagnosis = {
  // SOURCE: EXISTING
  title: "Early Diagnosis Creates More Treatment Options",
  body: "Timely evaluation for symptoms like chronic cough, coughing blood, or persistent chest pain is critical. Our precision diagnostic suite includes high-resolution bronchoscopy and CT-guided biopsies, complemented by PET-CT for precise staging.",
  // SOURCE: EXISTING (the two symptom chips above the heading)
  symptoms: ["Chronic Cough", "Coughing Blood"],
  // SOURCE: NEW (chips: the three tests named in the live paragraph, in its words)
  tests: ["Bronchoscopy", "CT-guided biopsy", "PET-CT"],
  // SOURCE: EXISTING. One paragraph on the live page ("Did you know? Detection at …"); the lead is
  // split off so it can be styled. Rendered as `${lead} ${body}`.
  callout: {
    lead: "Did you know?",
    body: "Detection at Stage I increases survival rates significantly compared to later stages.",
  },
  image: "chestXray",
} as const satisfies {
  title: string;
  body: string;
  symptoms: readonly string[];
  tests: readonly string[];
  callout: { lead: string; body: string };
  image: LungImageKey;
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
    { title: "Symptoms", body: "Identification of persistent cough or discomfort." },
    { title: "Biopsy", body: "Bronchoscopy or CT Guided diagnostic sample.", image: "xrayReview" },
    { title: "PET-CT", body: "Precise staging to map the cancer's spread." },
    { title: "Planning", body: "Multidisciplinary tumor board review.", image: "consultation" },
    { title: "Treatment", body: "Surgery, Immunotherapy, or combination care." },
    { title: "Recovery", body: "Post-op care and long-term surveillance." },
  ],
} as const satisfies { title: string; steps: readonly { title: string; body: string; image?: LungImageKey }[] };

/* ------------------------------------------------------------------ */
/* 5 · #surgery                                                        */
/* ------------------------------------------------------------------ */

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
  image: "breathingCalm",
} as const satisfies {
  eyebrow: string;
  lines: readonly string[];
  body: string;
  benefits: readonly { icon: BenefitIcon; label: string }[];
  image: LungImageKey;
};

/* ------------------------------------------------------------------ */
/* 6 · #techniques                                                     */
/* ------------------------------------------------------------------ */

export const techniques = {
  // SOURCE: EXISTING
  title: "Advanced Minimally Invasive Techniques",
  // SOURCE: EXISTING (text, "DaVinci" spelled as on the live page); NEW (icon keys, photos)
  robotic: {
    title: "Robotic Surgery",
    body: "The pinnacle of surgical precision, utilizing the DaVinci system for complex thoracic procedures.",
    features: [
      { icon: "view", label: "3D High-Definition Visualization" },
      { icon: "instruments", label: "Tremor-free, Articulated Instruments" },
      { icon: "access", label: "Enhanced Access to Deep Tissues" },
    ],
    image: "roboticArms",
  },
  vats: {
    title: "VATS (Video-Assisted Thoracic Surgery)",
    body: "A proven, effective keyhole approach for standard lung cancer resections.",
    features: [
      { icon: "incisions", label: "Minimally Invasive Small Incisions" },
      { icon: "recovery", label: "Reduced Recovery Time" },
      { icon: "complications", label: "Lower Risk of Complications" },
    ],
    image: "keyhole",
  },
  // SOURCE: NEW (switch labels for phones)
  tabs: { robotic: "Robotic", vats: "VATS" },
} as const satisfies { title: string; robotic: Technique; vats: Technique; tabs: { robotic: string; vats: string } };

/* ------------------------------------------------------------------ */
/* 7 · #stage-iv and 8 · #survival                                     */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. One figure, shown twice on the live page (the #stage-iv stat and the Stage I
// benchmark), so it is kept once.
// PENDING DOCTOR: "86% STAGE I SURVIVAL" and "50% STAGE IV RESPONSE": confirm both figures, what
// they measure (5-year survival? response to which treatment?) and the period they cover.
const stageISurvival = 86;

export const stageIV = {
  // SOURCE: EXISTING
  title: "When Advanced Cancer Still Has Effective Treatment Options",
  body: "Stage IV lung cancer care has evolved. Through modern immunotherapy and detailed genetic analysis, we target specific mutations to provide long-term survival and excellent quality of life even in advanced cases.",
  stats: [
    { value: stageISurvival, suffix: "%", label: "STAGE I SURVIVAL" },
    { value: 50, suffix: "%", label: "STAGE IV RESPONSE" },
  ],
  image: "seniorSmile",
} as const satisfies { title: string; body: string; stats: readonly Stat[]; image: LungImageKey };

export const survival = {
  // SOURCE: EXISTING
  // PENDING DOCTOR: the source of the survival benchmarks (86 / 80 / 72%): the practice's own
  // results or published figures? Over which years? 5-year survival?
  title: "Survival Benchmarks",
  stages: [
    { stage: "Stage I", value: stageISurvival },
    { stage: "Stage II", value: 80 },
    { stage: "Stage III", value: 72 },
  ],
  unit: "%",
} as const satisfies { title: string; stages: readonly { stage: string; value: number }[]; unit: string };

/* ------------------------------------------------------------------ */
/* 9 · #volume                                                         */
/* ------------------------------------------------------------------ */

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
  // PENDING DOCTOR: the total adds stage counts and surgery counts (46 + 18 + 24 + 12 = 100). Do
  // they overlap (a Stage III patient who had VATS counted twice)? What period do they cover, and
  // what should the total be called?
  total: { label: "TOTAL CASES", period: null as string | null },
} as const satisfies {
  title: string;
  counts: readonly { value: number; label: string }[];
  total: { label: string; period: string | null };
};

/** Sum of the four counts (100 with the live numbers). */
export const volumeTotal = sumBy(volume.counts, (count) => count.value);

/* ------------------------------------------------------------------ */
/* 10 · #surgeon                                                       */
/* ------------------------------------------------------------------ */

export const surgeon = {
  // SOURCE: EXISTING ("Organ Preservation—ensuring", the em dash and curly apostrophe as live)
  title: "Expertise Forged at Tata Memorial Hospital",
  bio: "Specializing in thoracic oncology and robotic-assisted surgery, Dr. Sunil Navalgund brings world-class training to personalized cancer care. His philosophy centers on Organ Preservation—ensuring that treatment not only removes the cancer but protects the patient’s long-term quality of life.",
  // SOURCE: EXISTING (labels, values); NEW (icon keys)
  facts: [
    { icon: "training", label: "Training", value: "Tata Memorial Hospital, Mumbai" },
    { icon: "expertise", label: "Expertise", value: "Robotic & VATS Thoracic Surgery" },
  ],
  // SOURCE: NEW (the live block has no button; label as on the endometrial page)
  cta: { label: "Book Appointment with Dr. Sunil", service: "Consultation" },
  image: "doctor",
} as const satisfies {
  title: string;
  bio: string;
  facts: readonly { icon: FactIcon; label: string; value: string }[];
  cta: AppointmentCta;
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
