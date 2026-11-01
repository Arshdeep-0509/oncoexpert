/**
 * Every word on /ovarian-cancer-treatment/ (Ovarian Cancer).
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page (https://oncoxpert.in/ovarian-cancer-treatment/, raw HTML
 *              fetched 1 Nov 2026). Render exactly.
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *   PENDING DOCTOR → something only the doctor can confirm.
 *
 * Never paraphrase, shorten or "improve" EXISTING text. The live page breaks some lines with <br>
 * ("Advanced Ovarian<br>Cancer Treatment with<br>…", "COMPLETE / CYTOREDUCTION RATE"); those
 * breaks are layout, so each line is one string in `lines`. A <br> inside a sentence
 * ("therapeutic<br>efficacy.") is a space. Capitals are kept as the live markup has them. The live
 * headings are one colour each, so there is no `emphasis`. Numbers and prices live here as numbers
 * (prices: formatRupees).
 * Shared copy is reused, not repeated here: reviews, videos, locations and the final call band
 * (content/shared/sections.ts). Images: content/pages/ovarian-cancer.images.ts.
 */
import type { PageMeta } from "@/content/types";
import type { OvarianImageKey } from "@/content/pages/ovarian-cancer.images";
import { ovarianOgImage } from "@/content/pages/ovarian-cancer.images";
import type { AppointmentService } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";
import { reviewsSection } from "@/content/shared/sections";

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** A button that opens the booking page with `service` preselected (and `note` in the email). */
type AppointmentCta = { label: string; service: AppointmentService; note?: string };

/** Icon keys, mapped to lucide icons in components/pages/ovarian-cancer. */
type FeatureIcon = "plan" | "cytoreduction" | "hipec" | "fertility";
type TreatmentIcon = "cytoreduction" | "hipec" | "fertility" | "chemotherapy" | "immunotherapy";
type FactIcon = "training" | "team" | "certified" | "research";

/* ------------------------------------------------------------------ */
/* 1 · #hero                                                           */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. The heading's four lines (<br> on the live page).
const heroLines = ["Advanced Ovarian", "Cancer Treatment with", "Personalized Surgical", "Oncology Care"] as const;

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING (identical to the live page, keeps the SEO). The live description is the
// SEO plugin's automatic excerpt (the page's first words, line breaks dropped: "OvarianCancer"),
// kept exactly until the doctor approves a new one. The live page has no <h1> (its headings are
// styled divs): `h1` is the hero heading, which becomes the page's one <h1>.
// PENDING DOCTOR: a better title and description, not used yet:
//   title: "Ovarian Cancer Treatment in Bangalore | HIPEC & Cytoreductive Surgery | OncoXpert"
//   description: "Ovarian cancer treatment in Bangalore at OncoXpert: cytoreductive surgery, HIPEC,
//     fertility-preserving options, chemotherapy and immunotherapy, planned around each patient."
export const meta = {
  title: "Ovarian Cancer - oncoxpert.in",
  description:
    'For Appointment Precision Surgical Oncology Advanced OvarianCancer Treatment withPersonalized SurgicalOncology Care Comprehensive ovarian cancer care combining advanced diagnosis, cytoreductive surgery, HIPEC, chemotherapy, immunotherapy, fertility-preserving treatment, and personalized treatment planning. Book Consultation Get Second Opinion Personalized Treatment Plans Advanced Cytoreductive Surgery HIPEC Specialist Fertility Preservation Options Understanding Ovarian Cancer Often called the "silent killer," ovarian cancer',
  h1: heroLines.join(" "),
  canonical: "https://oncoxpert.in/ovarian-cancer-treatment/",
  ogImage: ovarianOgImage,
} as const satisfies PageMeta & { h1: string };

/** Page name used in the appointment email subject and the form's hidden "page" field. */
export const pageName = "Ovarian Cancer";
export const pageSlug = "ovarian-cancer-treatment";

/** Buttons that name no service (header, menu, action bar) preselect this one. */
// SOURCE: NEW (choice; the first of the live "Service Required" options)
export const defaultAppointmentService: AppointmentService = "Consultation";

export const hero = {
  // SOURCE: EXISTING
  eyebrow: "Precision Surgical Oncology",
  lines: heroLines,
  body: "Comprehensive ovarian cancer care combining advanced diagnosis, cytoreductive surgery, HIPEC, chemotherapy, immunotherapy, fertility-preserving treatment, and personalized treatment planning.",
  // SOURCE: EXISTING (button labels); NEW (the service each one preselects)
  ctas: {
    primary: { label: "Book Consultation", service: "Consultation" },
    secondary: { label: "Get Second Opinion", service: "Second Opinion" },
  },
  // The live hero shows the portrait beside the text.
  image: "doctor",
} as const satisfies {
  eyebrow: string;
  lines: readonly string[];
  body: string;
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  image: OvarianImageKey;
};

/* ------------------------------------------------------------------ */
/* 2 · #features                                                       */
/* ------------------------------------------------------------------ */

export const features = {
  // SOURCE: EXISTING (labels; the four icons under the hero buttons on the live page); NEW (icon keys)
  items: [
    { icon: "plan", label: "Personalized Treatment Plans" },
    { icon: "cytoreduction", label: "Advanced Cytoreductive Surgery" },
    { icon: "hipec", label: "HIPEC Specialist" },
    { icon: "fertility", label: "Fertility Preservation Options" },
  ],
  // SOURCE: NEW (screen-reader label)
  a11y: { label: "What we offer" },
} as const satisfies { items: readonly { icon: FeatureIcon; label: string }[]; a11y: { label: string } };

/* ------------------------------------------------------------------ */
/* 3 · #understanding                                                  */
/* ------------------------------------------------------------------ */

export const understanding = {
  // SOURCE: EXISTING (curly quotes as on the live page)
  title: "Understanding Ovarian Cancer",
  body: "Often called the “silent killer,” ovarian cancer symptoms can be subtle. Early diagnosis is the single most critical factor in successful treatment outcomes.",
  image: "anatomy",
} as const satisfies { title: string; body: string; image: OvarianImageKey };

/* ------------------------------------------------------------------ */
/* 4 · #warning-signs                                                  */
/* ------------------------------------------------------------------ */

export const warningSigns = {
  // SOURCE: EXISTING
  title: "Warning Signs",
  body: "Persistent abdominal bloating, pelvic pain, feeling full quickly, and frequent urination should not be ignored.",
  // SOURCE: NEW (chips: the four signs named in the live sentence, in its words)
  signs: ["Abdominal bloating", "Pelvic pain", "Feeling full quickly", "Frequent urination"],
  image: "womanCalm",
} as const satisfies { title: string; body: string; signs: readonly string[]; image: OvarianImageKey };

/* ------------------------------------------------------------------ */
/* 5 · #diagnostics                                                    */
/* ------------------------------------------------------------------ */

export const diagnostics = {
  // SOURCE: EXISTING
  title: "Diagnostic Markers",
  body: "We utilize advanced CA-125 blood testing, high-resolution transvaginal ultrasound, CT imaging, and genetic screening (BRCA1/2).",
  // SOURCE: NEW (chips: the four tests named in the live sentence, in its words)
  markers: ["CA-125", "Transvaginal ultrasound", "CT imaging", "BRCA1/2"],
  image: "consultation",
} as const satisfies { title: string; body: string; markers: readonly string[]; image: OvarianImageKey };

/* ------------------------------------------------------------------ */
/* 6 · #treatments                                                     */
/* ------------------------------------------------------------------ */

export const treatments = {
  // SOURCE: EXISTING (the right apostrophe in "patient’s" as live)
  title: "Personalized Treatment Options",
  intro:
    "We offer the full spectrum of advanced therapies, tailored to the unique molecular profile of each patient’s tumor.",
  // SOURCE: EXISTING (titles, text, bullets); NEW (icon keys, photos)
  items: [
    {
      icon: "cytoreduction",
      title: "Cytoreductive Surgery",
      // The live text breaks "therapeutic<br>efficacy." (layout).
      body: "Masterful surgical removal of all visible tumor masses to maximize therapeutic efficacy.",
      bullets: ["Ultra-radical techniques", "Minimal residual disease focus"],
    },
    {
      icon: "hipec",
      title: "HIPEC",
      body: "Heated Intraperitoneal Chemotherapy delivered directly during surgery to target microscopic cells.",
      bullets: ["Heated precision delivery", "Reduced systemic toxicity"],
    },
    {
      icon: "fertility",
      title: "Fertility Preservation",
      body: "Specialized techniques to protect ovarian function and reproductive potential for young patients.",
      bullets: ["Ovarian-sparing approaches", "Multidisciplinary support"],
      image: "youngFamily",
    },
    {
      icon: "chemotherapy",
      title: "Chemotherapy",
      body: "Evidence-based drug regimens optimized for tumor response and patient quality of life.",
      bullets: ["Latest agent combinations", "Side-effect management"],
      image: "infusion",
    },
    {
      icon: "immunotherapy",
      title: "Immunotherapy",
      body: "Advanced treatments that harness your body’s immune system to recognize and attack cancer cells.",
      bullets: ["Biomarker-driven selection", "Cutting-edge checkpoint inhibitors"],
    },
  ],
} as const satisfies {
  title: string;
  intro: string;
  items: readonly {
    icon: TreatmentIcon;
    title: string;
    body: string;
    bullets: readonly [string, string];
    image?: OvarianImageKey;
  }[];
};

/* ------------------------------------------------------------------ */
/* 7 · #second-opinion                                                 */
/* ------------------------------------------------------------------ */

export const secondOpinion = {
  // SOURCE: EXISTING (title, text, button label); NEW (the service it preselects)
  title: "Confused about options?",
  body: "Get a clear, expert perspective on your diagnosis.",
  cta: { label: "Second Opinion", service: "Second Opinion" },
} as const satisfies { title: string; body: string; cta: AppointmentCta };

/* ------------------------------------------------------------------ */
/* 8 · #outcomes                                                       */
/* ------------------------------------------------------------------ */

export const outcomes = {
  // SOURCE: EXISTING
  lines: ["Clinical Excellence &", "Outcomes"],
  intro:
    "Our surgical success and survival rates reflect our commitment to precision oncology and meticulous patient care protocols.",
  // SOURCE: EXISTING (figures; each label is two lines on the live page)
  // PENDING DOCTOR: "96% COMPLETE CYTOREDUCTION RATE": confirm the figure, how "complete" is
  // defined (no visible residual disease?) and the period it covers.
  // PENDING DOCTOR: "500+ SUCCESSFUL HIPEC PROCEDURES": confirm the count and the period.
  stats: [
    { value: 96, suffix: "%", lines: ["COMPLETE", "CYTOREDUCTION RATE"] },
    { value: 500, suffix: "+", lines: ["SUCCESSFUL HIPEC", "PROCEDURES"] },
  ],
  survival: {
    title: "5-Year Survival Rates",
    stages: [
      { stage: "Stage I", value: 94 },
      { stage: "Stage II", value: 86 },
      { stage: "Stage III", value: 72 },
      { stage: "Stage IV", value: 26 },
    ],
    unit: "%",
  },
  // SOURCE: EXISTING
  // PENDING DOCTOR: the survival data is marked "updated Dec 2023", almost three years old.
  // Update the figures and the date, or confirm they still stand?
  footnote: "*Clinical data updated Dec 2023. Individual results may vary based on tumor biology and staging.",
  image: "womanSmiling",
} as const satisfies {
  lines: readonly string[];
  intro: string;
  stats: readonly { value: number; suffix: string; lines: readonly string[] }[];
  survival: { title: string; stages: readonly { stage: string; value: number }[]; unit: string };
  footnote: string;
  image: OvarianImageKey;
};

/* ------------------------------------------------------------------ */
/* 9 · #packages                                                       */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. The live section is in the markup but hidden on every device
// (elementor-hidden-desktop/-tablet/-mobile). Kept in full.
// PENDING DOCTOR: show the packages on the rebuilt page? Confirm the three starting prices
// (₹96,000 · ₹4,10,000 · ₹16,000 per cycle) and what each includes. ₹96,000 is also the
// endometrial page's Open Surgery price: same figure by coincidence, or copied?
export const packages = {
  title: "Transparent Care Packages",
  intro: "Estimated treatment costs for financial planning.",
  // SOURCE: EXISTING (names, price labels, prices, features, button labels); NEW (service + note
  // each button sends with the form)
  items: [
    {
      name: "CYTOREDUCTIVE SURGERY",
      priceLabel: "from",
      amount: 96000,
      features: ["Pre-op evaluation", "Surgical expertise fee", "Post-op monitoring"],
      cta: { label: "Enquire Now", service: "Consultation For Surgery", note: "Package: Cytoreductive Surgery" },
    },
    {
      name: "HIPEC TREATMENT",
      priceLabel: "from",
      amount: 410000,
      features: ["Hyperthermic pump use", "Intra-op chemo agents", "Specialized ICU care"],
      cta: { label: "Select Package", service: "Consultation For Surgery", note: "Package: HIPEC Treatment" },
      // The middle card; the live markup gives it the "Select Package" button.
      featured: true,
    },
    {
      name: "CHEMOTHERAPY",
      priceLabel: "per cycle from",
      amount: 16000,
      features: ["Drug administration", "Daycare infusion", "Supportive care meds"],
      cta: { label: "Enquire Now", service: "Consultation", note: "Package: Chemotherapy" },
    },
  ],
} as const satisfies {
  title: string;
  intro: string;
  items: readonly {
    name: string;
    priceLabel: string;
    /** Rupees, as a number (formatRupees: 410000 → "₹4,10,000"). */
    amount: number;
    features: readonly string[];
    cta: AppointmentCta;
    featured?: boolean;
  }[];
};

/* ------------------------------------------------------------------ */
/* 10 · #surgeon                                                       */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING
// PENDING DOCTOR: "20+ Peer-Reviewed Research Papers": confirm the count.
const researchPapers = 20;

export const surgeon = {
  // SOURCE: EXISTING
  lines: ["Led by Expertise:", "Dr. Sunil Navalgund"],
  // PENDING DOCTOR: "over a decade" here, "15+" on the colorectal and endometrial pages, "10+" /
  // "over a decade" on About Us and the thyroid page, "Over 25 years" on the booking page. Which
  // is right?
  bio: "A renowned Surgical Oncologist with a specialized focus on Gynecological Oncology and advanced HIPEC procedures. Dr. Sunil Navalgund brings over a decade of clinical excellence in complex ovarian cancer management.",
  // SOURCE: EXISTING (labels, text); NEW (icon keys). "Advanced Surgical<br>Oncology & …" (layout).
  facts: [
    { icon: "training", label: "Specialized Training", value: "Advanced Surgical Oncology & Gyn-Onc fellowship." },
    { icon: "team", label: "Multidisciplinary", value: "Collaborative tumor board approach for every patient." },
  ],
  // SOURCE: EXISTING
  // PENDING DOCTOR: "Certified HIPEC Specialist & Trainer": certified by whom? Does he train others?
  badges: [
    { icon: "certified", label: "Certified HIPEC Specialist & Trainer" },
    { icon: "research", label: `Author of ${researchPapers}+ Peer-Reviewed Research Papers` },
  ],
  // SOURCE: EXISTING (the caption on the portrait card; the name is two lines on the live page)
  portrait: { role: "SURGICAL ONCOLOGIST", lines: ["Dr. Sunil", "Navalgund"] },
  // SOURCE: NEW (the live block has no button; label as on the endometrial page)
  cta: { label: "Book Appointment with Dr. Sunil", service: "Consultation" },
  image: "doctor",
} as const satisfies {
  lines: readonly string[];
  bio: string;
  facts: readonly { icon: FactIcon; label: string; value: string }[];
  badges: readonly { icon: FactIcon; label: string }[];
  portrait: { role: string; lines: readonly string[] };
  cta: AppointmentCta;
  image: OvarianImageKey;
};

/* ------------------------------------------------------------------ */
/* 11–14 · shared sections                                             */
/* (reviews, videos, locations, final band: content/shared/sections.ts, */
/*  in the live order; the live form is replaced by the booking page)  */
/* ------------------------------------------------------------------ */

// PENDING DOCTOR: the live page shows Vasudeva Murthy's review, which is about colon cancer
// surgery. Hidden on this page by default, as on the endometrial, lung and thyroid pages; set
// showColonReview to true to show it.
const showColonReview = false as boolean;

export const shared = {
  // SOURCE: NEW (order): the live order, without the colon cancer review unless the doctor wants it.
  reviewOrder: reviewsSection.order.filter((id) => showColonReview || id !== "vasudeva-murthy"),
  // The final call band's photo.
  finalImage: "friendsLaughing",
} as const satisfies { reviewOrder: readonly ReviewId[]; finalImage: OvarianImageKey };
