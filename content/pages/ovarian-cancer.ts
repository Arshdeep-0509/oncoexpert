/**
 * Every word on /ovarian-cancer-hospital/ (Ovarian Cancer).
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
import type { PackageCardsContent, PageMeta, Stat, SymptomIcon } from "@/content/types";
import type { OvarianImageKey } from "@/content/pages/ovarian-cancer.images";
import { ovarianOgImage } from "@/content/pages/ovarian-cancer.images";
import type { AppointmentService } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";
import { reviewsSection } from "@/content/shared/sections";

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** A button that opens the booking page with `service` preselected (and `note` in the email). */
type AppointmentCta = { label: string; service: AppointmentService; note?: string; cta?: string };

/** Icon keys, mapped to lucide icons in components/pages/ovarian-cancer. */
export type FeatureIcon = "plan" | "cytoreduction" | "hipec" | "fertility";
type TreatmentIcon = "cytoreduction" | "hipec" | "fertility" | "chemotherapy" | "immunotherapy";

/* ------------------------------------------------------------------ */
/* 1 · #hero                                                           */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. The heading's four lines (<br> on the live page).
const heroLines = ["Advanced Ovarian", "Cancer Treatment with", "Personalized Surgical", "Oncology Care"] as const;

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING title (identical to the live page, keeps the SEO). The live page has no
// written description: its meta description is the SEO plugin's automatic excerpt (the page's
// first 80 words, line breaks dropped: "For Appointment Precision Surgical Oncology Advanced
// OvarianCancer …"), replaced by a NEW one. The live page has no <h1> (its headings are styled
// divs): `h1` is the hero heading, which becomes the page's one <h1>.
// PENDING DOCTOR: approve the description; a better title, not used yet:
//   title: "Ovarian Cancer Treatment in Bangalore | HIPEC & Cytoreductive Surgery | OncoXpert"
export const meta = {
  title: "Ovarian Cancer - oncoxpert.in",
  // SOURCE: NEW (160 characters)
  description:
    "Ovarian cancer treatment in Bangalore at OncoXpert: cytoreductive surgery, HIPEC, fertility-preserving options, chemotherapy and immunotherapy, planned for you.",
  h1: heroLines.join(" "),
  canonical: "https://oncoxpert.in/ovarian-cancer-hospital/",
  ogImage: ovarianOgImage,
} as const satisfies PageMeta & { h1: string };

export const pageSlug = "ovarian-cancer-hospital";

/** Buttons that name no service (header, menu, action bar) preselect this one. */
// SOURCE: NEW (choice; the first of the live "Service Required" options)
export const defaultAppointmentService: AppointmentService = "Consultation";

export const hero = {
  // SOURCE: EXISTING
  eyebrow: "Precision Surgical Oncology",
  lines: heroLines,
  // SOURCE: NEW (choice: the words set in the gradient, with a drawn underline)
  emphasis: "Personalized Surgical Oncology Care",
  // SOURCE: EXISTING
  body: "Comprehensive ovarian cancer care combining advanced diagnosis, cytoreductive surgery, HIPEC, chemotherapy, immunotherapy, fertility-preserving treatment, and personalized treatment planning.",
  // SOURCE: EXISTING (button labels); NEW (the service each one preselects, analytics labels)
  ctas: {
    primary: { label: "Book Consultation", service: "Consultation", cta: "ovarian:hero:book-consultation" },
    secondary: { label: "Get Second Opinion", service: "Second Opinion", cta: "ovarian:hero:second-opinion" },
  },
  // SOURCE: NEW (the steps of the hero illustration; the live hero shows the portrait, which is
  // in #surgeon). PENDING DOCTOR: the step names.
  story: ["Cytoreductive Surgery", "HIPEC", "Recovery"],
  // SOURCE: NEW (screen-reader labels)
  a11y: {
    steps: "Treatment steps",
    pause: "Pause the hero animation",
    play: "Play the hero animation",
  },
} as const satisfies {
  eyebrow: string;
  lines: readonly string[];
  emphasis: string;
  body: string;
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  story: readonly string[];
  a11y: { steps: string; pause: string; play: string };
};

/* ------------------------------------------------------------------ */
/* 2 · #features                                                       */
/* ------------------------------------------------------------------ */

export const features = {
  // SOURCE: EXISTING (labels; the four icons under the hero buttons on the live page); NEW (icon
  // keys, the detail on each card's back, the link to the matching treatment)
  // PENDING DOCTOR: the four detail lines.
  items: [
    {
      icon: "plan",
      label: "Personalized Treatment Plans",
      detail: "Your scans, tumour biology and life goals shape one plan, reviewed by the whole team.",
      href: "#treatments",
    },
    {
      icon: "cytoreduction",
      label: "Advanced Cytoreductive Surgery",
      detail: "Removing every visible tumour deposit, the step that most improves long-term outcomes.",
      href: "#treatments-cytoreduction",
    },
    {
      icon: "hipec",
      label: "HIPEC Specialist",
      detail: "Heated chemotherapy washed through the abdomen during surgery, where it is needed.",
      href: "#treatments-hipec",
    },
    {
      icon: "fertility",
      label: "Fertility Preservation Options",
      detail: "For younger patients, ovarian-sparing choices discussed before treatment begins.",
      href: "#treatments-fertility",
    },
  ],
  // SOURCE: NEW (the link on each card's back, screen-reader labels)
  learnMore: "Learn more",
  a11y: { label: "What we offer", flip: "Show details" },
} as const satisfies {
  items: readonly { icon: FeatureIcon; label: string; detail: string; href: string }[];
  learnMore: string;
  a11y: { label: string; flip: string };
};

/* ------------------------------------------------------------------ */
/* 3 · #understanding                                                  */
/* ------------------------------------------------------------------ */

export const understanding = {
  // SOURCE: EXISTING (curly quotes as on the live page). The live paragraph's two sentences are
  // shown in turn (`lead` large, word by word; `rest` after it); together they are the paragraph.
  title: "Understanding Ovarian Cancer",
  lead: "Often called the “silent killer,” ovarian cancer symptoms can be subtle.",
  rest: "Early diagnosis is the single most critical factor in successful treatment outcomes.",
  // SOURCE: NEW (choice: the words that end in the gradient)
  emphasis: ["silent", "killer"],
} as const satisfies { title: string; lead: string; rest: string; emphasis: readonly string[] };

/* ------------------------------------------------------------------ */
/* 4 · #warning-signs (the shared SymptomGrid, mode "check")           */
/* ------------------------------------------------------------------ */

export const warningSigns = {
  // SOURCE: EXISTING
  title: "Warning Signs",
  body: "Persistent abdominal bloating, pelvic pain, feeling full quickly, and frequent urination should not be ignored.",
  // SOURCE: NEW (the four signs named in the live sentence, in its words; icon keys; the card photos)
  items: [
    { key: "bloating", icon: "bloating", title: "Abdominal bloating", image: "bloating" },
    { key: "pelvic", icon: "pelvic", title: "Pelvic pain", image: "pelvicPain" },
    { key: "full", icon: "full", title: "Feeling full quickly", image: "fullQuickly" },
    { key: "urination", icon: "urination", title: "Frequent urination", image: "restroom" },
  ],
  // SOURCE: NEW (the result once something is ticked: general guidance, never a diagnosis; the
  // button sends the ticked list as its note; nothing is stored)
  // PENDING DOCTOR: the result line.
  result: {
    some: "Noticing one or more of these for a few weeks? A short consultation can rule things out.",
    cta: { label: "Book Consultation", service: "Consultation", cta: "ovarian:warning-signs:book-consultation" },
    notePrefix: "Warning signs: ",
  },
  // SOURCE: NEW (screen-reader labels)
  a11y: { group: "Tick the signs you have noticed", result: "What to do next" },
} as const satisfies {
  title: string;
  body: string;
  items: readonly { key: string; icon: SymptomIcon; title: string; image: OvarianImageKey }[];
  result: { some: string; cta: AppointmentCta; notePrefix: string };
  a11y: { group: string; result: string };
};

/* ------------------------------------------------------------------ */
/* 5 · #diagnostics (the instrument tray)                              */
/* ------------------------------------------------------------------ */

export type TestKey = "ca125" | "tvus" | "ct" | "brca";

export const diagnostics = {
  // SOURCE: EXISTING
  title: "Diagnostic Markers",
  body: "We utilize advanced CA-125 blood testing, high-resolution transvaginal ultrasound, CT imaging, and genetic screening (BRCA1/2).",
  // SOURCE: NEW (the four tests named in the live sentence, in its words; each drawer's "What it
  // tells us" line is general information, never a diagnosis)
  // PENDING DOCTOR: the four "What it tells us" lines.
  tests: [
    {
      key: "ca125",
      title: "CA-125",
      kind: "Blood test",
      tells: "A protein that can rise with ovarian cancer; most useful for following treatment over time.",
    },
    {
      key: "tvus",
      title: "Transvaginal ultrasound",
      kind: "Imaging",
      tells: "A close, clear view of the ovaries that shows the size and character of a mass.",
    },
    {
      key: "ct",
      title: "CT imaging",
      kind: "Imaging",
      tells: "Shows whether the disease has spread in the abdomen, which guides the surgical plan.",
    },
    {
      key: "brca",
      title: "BRCA1/2",
      kind: "Genetic screening",
      tells: "Inherited changes that can shape treatment choices and matter for family members.",
    },
  ],
  // SOURCE: NEW (labels)
  tellsLabel: "What it tells us",
  a11y: { tray: "The four tests", close: "Close" },
} as const satisfies {
  title: string;
  body: string;
  tests: readonly { key: TestKey; title: string; kind: string; tells: string }[];
  tellsLabel: string;
  a11y: { tray: string; close: string };
};

/* ------------------------------------------------------------------ */
/* 6 · #treatments                                                     */
/* ------------------------------------------------------------------ */

/** The five treatments; `#treatments-<key>` selects one. */
export type TreatmentKey = "cytoreduction" | "hipec" | "fertility" | "chemo" | "immuno";

export const treatments = {
  // SOURCE: EXISTING (the right apostrophe in "patient’s" as live)
  title: "Personalized Treatment Options",
  intro:
    "We offer the full spectrum of advanced therapies, tailored to the unique molecular profile of each patient’s tumor.",
  // SOURCE: EXISTING (titles, text, bullets); NEW (keys, icon keys)
  items: [
    {
      key: "cytoreduction",
      icon: "cytoreduction",
      title: "Cytoreductive Surgery",
      // The live text breaks "therapeutic<br>efficacy." (layout).
      body: "Masterful surgical removal of all visible tumor masses to maximize therapeutic efficacy.",
      bullets: ["Ultra-radical techniques", "Minimal residual disease focus"],
    },
    {
      key: "hipec",
      icon: "hipec",
      title: "HIPEC",
      body: "Heated Intraperitoneal Chemotherapy delivered directly during surgery to target microscopic cells.",
      bullets: ["Heated precision delivery", "Reduced systemic toxicity"],
    },
    {
      key: "fertility",
      icon: "fertility",
      title: "Fertility Preservation",
      body: "Specialized techniques to protect ovarian function and reproductive potential for young patients.",
      bullets: ["Ovarian-sparing approaches", "Multidisciplinary support"],
    },
    {
      key: "chemo",
      icon: "chemotherapy",
      title: "Chemotherapy",
      body: "Evidence-based drug regimens optimized for tumor response and patient quality of life.",
      bullets: ["Latest agent combinations", "Side-effect management"],
    },
    {
      key: "immuno",
      icon: "immunotherapy",
      title: "Immunotherapy",
      body: "Advanced treatments that harness your body’s immune system to recognize and attack cancer cells.",
      bullets: ["Biomarker-driven selection", "Cutting-edge checkpoint inhibitors"],
    },
  ],
  // SOURCE: NEW (the button under each option, filled with its title; its note; labels)
  ask: { label: "Ask about {option}", service: "Consultation", notePrefix: "Treatment: " },
  a11y: { tabs: "Treatment options", replay: "Replay the illustration" },
} as const satisfies {
  title: string;
  intro: string;
  items: readonly {
    key: TreatmentKey;
    icon: TreatmentIcon;
    title: string;
    body: string;
    bullets: readonly [string, string];
  }[];
  ask: { label: string; service: AppointmentService; notePrefix: string };
  a11y: { tabs: string; replay: string };
};

/* ------------------------------------------------------------------ */
/* 7 · #second-opinion                                                 */
/* ------------------------------------------------------------------ */

export const secondOpinion = {
  // SOURCE: EXISTING (title, text, button label); NEW (the service it preselects, analytics label)
  title: "Confused about options?",
  body: "Get a clear, expert perspective on your diagnosis.",
  cta: { label: "Second Opinion", service: "Second Opinion", cta: "ovarian:second-opinion:second-opinion" },
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
    rows: [
      { label: "Stage I", value: 94 },
      { label: "Stage II", value: 86 },
      { label: "Stage III", value: 72 },
      { label: "Stage IV", value: 26 },
    ],
    unit: "%",
  },
  // SOURCE: EXISTING
  // PENDING DOCTOR: the survival data is marked "updated Dec 2023", almost three years old.
  // Update the figures and the date, or confirm they still stand?
  footnote: "*Clinical data updated Dec 2023. Individual results may vary based on tumor biology and staging.",
  // SOURCE: NEW (screen-reader labels)
  a11y: {
    figures: "Surgical outcomes",
    figure: "Figure",
    value: "Value",
    survival: "5-year survival rates by stage",
    row: "Stage",
    rate: "5-year survival",
  },
} as const satisfies {
  lines: readonly string[];
  intro: string;
  stats: readonly { value: number; suffix: string; lines: readonly string[] }[];
  survival: { title: string; rows: readonly { label: string; value: number }[]; unit: string };
  footnote: string;
  a11y: Record<"figures" | "figure" | "value" | "survival" | "row" | "rate", string>;
};

/* ------------------------------------------------------------------ */
/* 9 · #packages (the shared PackageCards)                             */
/* ------------------------------------------------------------------ */

// SOURCE: NEW
// PENDING DOCTOR: the chemotherapy cycle estimator (shown while showCycleEstimator is true): is a
// per-cycle multiplication appropriate, and is 1–12 cycles a sensible range?
const showCycleEstimator = true as boolean;

const chemoPerCycle = 16000;

// SOURCE: EXISTING. The live section is in the markup but hidden on every device
// (elementor-hidden-desktop/-tablet/-mobile). Kept in full.
// PENDING DOCTOR: show the packages on the rebuilt page? Confirm the three starting prices
// (₹96,000 · ₹4,10,000 · ₹16,000 per cycle) and what each includes. ₹96,000 is also the
// endometrial page's Open Surgery price: same figure by coincidence, or copied?
export const packages = {
  title: "Transparent Care Packages",
  intro: "Estimated treatment costs for financial planning.",
  // SOURCE: EXISTING (names, price labels, prices, inclusions, button labels); NEW (service + note
  // each button sends with the form, the ribbon)
  // PENDING DOCTOR: the ribbon on the HIPEC card.
  items: [
    {
      name: "CYTOREDUCTIVE SURGERY",
      lead: "from",
      price: 96000,
      prefix: "₹",
      inclusions: ["Pre-op evaluation", "Surgical expertise fee", "Post-op monitoring"],
      cta: { label: "Enquire Now", service: "Consultation For Surgery", note: "Package: Cytoreductive Surgery" },
    },
    {
      name: "HIPEC TREATMENT",
      lead: "from",
      price: 410000,
      prefix: "₹",
      inclusions: ["Hyperthermic pump use", "Intra-op chemo agents", "Specialized ICU care"],
      cta: { label: "Select Package", service: "Consultation For Surgery", note: "Package: HIPEC Treatment" },
      // The middle card; the live markup gives it the "Select Package" button.
      featured: true,
      ribbon: "Most comprehensive",
    },
    {
      name: "CHEMOTHERAPY",
      lead: "per cycle from",
      price: chemoPerCycle,
      prefix: "₹",
      inclusions: ["Drug administration", "Daycare infusion", "Supportive care meds"],
      cta: { label: "Enquire Now", service: "Consultation", note: "Package: Chemotherapy" },
    },
  ],
  // SOURCE: NEW
  // PENDING DOCTOR: the "indicative only" note.
  footnote: "Prices are indicative only: your final cost depends on your treatment plan and hospital.",
  // SOURCE: NEW (the estimator under the chemotherapy card; "{n}", "{price}" and "{total}" are filled in)
  estimator: showCycleEstimator
    ? {
        title: "Estimate chemotherapy cycles",
        label: "Number of cycles",
        sentence: "{n} cycles × {price} = from {total}",
        unitPrice: chemoPerCycle,
        min: 1,
        max: 12,
        initial: 6,
      }
    : undefined,
} as const satisfies { title: string; intro: string } & Omit<PackageCardsContent, "page">;

/* ------------------------------------------------------------------ */
/* 10 · #surgeon (the shared DoctorCard)                               */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING
// PENDING DOCTOR: "20+ Peer-Reviewed Research Papers": confirm the count.
const researchPapers = 20;

export const surgeon = {
  // SOURCE: EXISTING (the caption on the live portrait card and the heading)
  label: "SURGICAL ONCOLOGIST",
  lines: ["Led by Expertise:", "Dr. Sunil Navalgund"],
  // PENDING DOCTOR: "over a decade" here, "15+" on the colorectal and endometrial pages, "10+" /
  // "over a decade" on About Us and the thyroid page, "Over 25 years" on the booking page. Which
  // is right?
  bio: "A renowned Surgical Oncologist with a specialized focus on Gynecological Oncology and advanced HIPEC procedures. Dr. Sunil Navalgund brings over a decade of clinical excellence in complex ovarian cancer management.",
  // SOURCE: EXISTING (labels, text); NEW (icon keys). "Advanced Surgical<br>Oncology & …" (layout).
  facts: [
    {
      icon: "graduation-cap",
      label: "Specialized Training",
      value: "Advanced Surgical Oncology & Gyn-Onc fellowship.",
    },
    { icon: "stethoscope", label: "Multidisciplinary", value: "Collaborative tumor board approach for every patient." },
  ],
  // SOURCE: EXISTING
  // PENDING DOCTOR: "Certified HIPEC Specialist & Trainer": certified by whom? Does he train others?
  badges: [{ icon: "award", label: "Certified HIPEC Specialist & Trainer" }],
  // SOURCE: EXISTING ("Author of 20+ Peer-Reviewed Research Papers", as a figure that counts up; the
  // label is the rest of the live line)
  stats: [{ value: researchPapers, suffix: "+", label: "Peer-Reviewed Research Papers" }],
  // SOURCE: NEW (the live block has no buttons; labels as on the endometrial and colorectal pages)
  cta: { label: "Book Appointment with Dr. Sunil", service: "Consultation" },
  link: { label: "View Full Profile", href: "/about-us/" },
  image: "doctor",
} as const satisfies {
  label: string;
  lines: readonly string[];
  bio: string;
  facts: readonly { icon: "graduation-cap" | "stethoscope"; label: string; value: string }[];
  badges: readonly { icon: "award"; label: string }[];
  stats: readonly Stat[];
  cta: AppointmentCta;
  link: { label: string; href: string };
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
  finalImage: "finalFriends",
} as const satisfies { reviewOrder: readonly ReviewId[]; finalImage: OvarianImageKey };
