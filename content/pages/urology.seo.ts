/**
 * Search and answer-engine facts for /urology/ (see lung-cancer.seo.ts). Built only from facts
 * already on the page (content/pages/urology.ts); figures and prices are imported, never typed.
 *
 * SOURCE: NEW (every sentence here). PENDING DOCTOR: the definition, every quick answer and the
 * figure sentences; each is shown only once approved (content/shared/approvals.ts). The page's
 * figures are themselves PENDING DOCTOR (content/pages/urology.ts).
 */
import type { CancerPageSeo } from "@/content/types";
import { leadership, pageName, pricing, specialties, technology } from "@/content/pages/urology";
import { formatRupees } from "@/lib/format";

const [open, laparoscopic, robotic] = pricing.plans;
const [survival, precision] = leadership.outcome.figures;
const [patients, satisfaction, turnaround] = leadership.tiles;
const years = leadership.cards[0].stat;
const fasterReturn = technology.features[0].emphasis;
const fig = (f: { value: number; suffix: string }) => `${f.value.toLocaleString("en-IN")}${f.suffix}`;

export const urologySeo = {
  // The live menu's label; the page is about uro-oncology.
  name: pageName,
  definition:
    "Dr. Sunil Navalgund, a surgical oncologist in Bengaluru, treats kidney, prostate, bladder, testicular and penile cancers at OncoXpert with robotic, keyhole and open surgery that preserves organ function.",
  condition: {
    name: "Urological cancers",
    // The five cancers named on the page (the sixth card covers rare urethral and adrenal tumours).
    alternateName: specialties.items
      .filter((item) => "code" in item)
      .map((item) => item.title.replace(" Cancer", " cancer")),
    possibleTreatment: [
      "Robotic partial nephrectomy",
      "Radical nephrectomy",
      "Robotic prostatectomy",
      "TURBT",
      "Robotic radical cystectomy",
      "Retroperitoneal lymph node dissection (RPLND)",
      "Trimodal therapy (bladder sparing)",
    ],
    signOrSymptom: [],
  },
  quickAnswers: [
    {
      question: "Which urological cancers does OncoXpert treat?",
      answer:
        "OncoXpert treats kidney, prostate, bladder, testicular and penile cancers, as well as adrenal masses and rare genitourinary tract tumours. Care is led by Dr. Sunil Navalgund, a Tata Memorial trained surgical oncologist in Bengaluru, and covers diagnosis, robotic-assisted surgery and personalised treatment pathways with a focus on functional preservation.",
    },
    {
      question: "What is a partial nephrectomy?",
      answer:
        "A partial nephrectomy removes only the renal tumour while sparing the healthy kidney tissue, which is essential for long-term renal health and avoiding dialysis risks. At OncoXpert, Dr. Sunil Navalgund performs robotic partial nephrectomy (organ sparing) for kidney cancer and radical nephrectomy for advanced renal cell carcinoma (RCC) cases.",
    },
    {
      question: "Can bladder cancer be treated without removing the bladder?",
      answer:
        "Sometimes, yes. Bladder sparing protocols use trimodal therapy (TMT), combining surgery, chemotherapy and radiation, to keep the natural bladder intact when it is oncologically viable. When it is not, care at OncoXpert spans TURBT to robotic radical cystectomy with intracorporeal urinary diversion, and every case is reviewed by a multi-disciplinary tumour board.",
    },
    {
      question: "How much does urological cancer surgery cost in Bangalore?",
      answer: `At OncoXpert, urological cancer surgery starts from ${formatRupees(open.price)} for open surgery, ${formatRupees(laparoscopic.price)} for laparoscopic surgery and ${formatRupees(robotic.price)} for robotic surgery. These are honest, upfront starting estimates. Robotic surgery offers extreme surgical precision, the best cosmetic outcomes and the fastest hospital discharge; laparoscopic surgery a faster recovery window and minimal scarring.`,
    },
    {
      question: "What are the benefits of robotic surgery for urological cancer?",
      answer: `Robotic surgery allows ultra-precise procedures that minimise trauma and accelerate healing. At OncoXpert, patients typically experience a ${fasterReturn} return to daily activities, and nerve preservation rates are significantly higher than with traditional surgery. OncoXpert uses the Da Vinci surgical platform, and its robotic-first approach is the gold standard for urological oncology.`,
    },
    {
      question: "What is robotic prostatectomy?",
      answer:
        "Robotic prostatectomy is the removal of the prostate with robotic assistance for prostate cancer. At OncoXpert, Dr. Sunil Navalgund performs precision robotic prostatectomy focusing on early functional recovery, nerve sparing and oncological clearance, on the Da Vinci surgical platform, which minimises trauma and accelerates healing compared with traditional surgery.",
    },
    {
      question: "Who leads uro-oncology care at OncoXpert?",
      answer: `Dr. Sunil Navalgund, a Tata Memorial trained surgical oncologist, leads uro-oncology at OncoXpert in Bengaluru. He brings over ${years.value} years of surgical excellence, specialising in high-complexity robotic cases, and every case is reviewed by an integrated tumour board of oncologists, radiologists and surgeons before treatment is planned.`,
    },
  ],
  // No dates are stated on the urology page: shown nowhere until they are (PENDING DOCTOR).
  stats: [
    {
      sentence: `OncoXpert's 5-year survival rate in uro-oncology is ${fig(survival)}.`,
      source: "OncoXpert patient outcomes",
      date: null,
    },
    {
      sentence: `OncoXpert reports ${fig(precision)} surgical precision in uro-oncology.`,
      source: "OncoXpert patient outcomes",
      date: null,
    },
    {
      sentence: `OncoXpert has performed ${fig(technology.stat)} successful robotic cases.`,
      source: "OncoXpert surgical records",
      date: null,
    },
    {
      sentence: `OncoXpert has treated ${fig(patients)} patients, with a ${fig(satisfaction)} satisfaction score and a ${fig(turnaround)} consult turnaround.`,
      source: "OncoXpert patient outcomes",
      date: null,
    },
  ],
  offers: pricing.plans.map((plan) => ({ name: plan.name, price: plan.price, from: true })),
  purpose:
    "Uro-oncology: kidney, prostate, bladder, testicular, penile and adrenal cancers; robotic and keyhole surgery, organ preservation (partial nephrectomy, bladder sparing), the tumour board, outcomes and starting prices.",
} as const satisfies CancerPageSeo;
