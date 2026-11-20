/**
 * Search and answer-engine facts for /stomach-cancer/ (see lung-cancer.seo.ts). Built only from
 * facts already on the page (content/pages/stomach-cancer.ts); figures imported, never typed.
 * The page has no prices: no offers.
 *
 * SOURCE: NEW (every sentence here). PENDING DOCTOR: the definition, every quick answer and the
 * figure sentences; each is shown only once approved (content/shared/approvals.ts). The page's
 * figures are themselves PENDING DOCTOR (content/pages/stomach-cancer.ts).
 */
import type { CancerPageSeo } from "@/content/types";
import { figures, hero, pageName, warningSigns } from "@/content/pages/stomach-cancer";

const surgeries = `${figures.surgeriesPerformed.toLocaleString("en-IN")}${hero.card.suffix}`;
const cureRate = `${figures.cureRateIncrease}%`;
const signs = warningSigns.items.map((i) => i.title.toLowerCase());

export const stomachSeo = {
  name: pageName,
  definition:
    "Dr. Sunil Navalgund, a surgical oncologist in Bengaluru, treats stomach (gastric) cancer at OncoXpert with robotic and laparoscopic D2 gastrectomy, FLOT chemotherapy and immunotherapy.",
  condition: {
    name: "Stomach cancer",
    alternateName: ["Gastric cancer"],
    possibleTreatment: [
      "D2 gastrectomy",
      "Robotic gastrectomy",
      "Laparoscopic gastrectomy",
      "FLOT peri-operative chemotherapy",
      "Immunotherapy",
    ],
    signOrSymptom: warningSigns.items.map((i) => i.title),
  },
  quickAnswers: [
    {
      question: "What are the warning signs of stomach cancer?",
      answer: `The warning signs of stomach cancer include ${signs.slice(0, -1).join(", ")} and ${signs.at(-1)}: an ache or pain in the upper abdomen, unexplained weight loss, feeling full after a small amount, and nausea or vomiting after meals. Persistent digestive issues should always be evaluated by a specialist oncologist.`,
    },
    {
      question: "Is stomach cancer curable if found early?",
      answer: `Early diagnosis matters greatly: at OncoXpert, early diagnosis is reported to increase the cure rate by ${cureRate}. Stomach cancer is often a silent disease in its early stages, which is why expert evaluation is critical at the first sign of persistent symptoms. Every case is planned by a multi-disciplinary team.`,
    },
    {
      question: "What is a D2 gastrectomy?",
      answer:
        "A D2 gastrectomy is the removal of the stomach tumour with extensive lymph node clearance, the gold standard for gastric cancer surgery. Its strengths are superior nodal clearance and improved survival rates. At OncoXpert, Dr. Sunil Navalgund performs it robotically or laparoscopically, offering a minimally invasive path to recovery and healing.",
    },
    {
      question: "Robotic or laparoscopic gastrectomy: what is the difference?",
      answer:
        "Both are minimally invasive. Robotic surgery uses instruments that mimic the human wrist with 7 degrees of freedom and a 10x magnified view, allowing dissection in spaces too narrow for human hands. Laparoscopic surgery, the standard of care, uses long instruments through 5-10mm incisions to achieve radical cure with minimal trauma.",
    },
    {
      question: "What is FLOT chemotherapy?",
      answer:
        "FLOT is a modern peri-operative chemotherapy protocol for stomach cancer, given around surgery to shrink tumours and prevent recurrence. At OncoXpert it is part of a plan that can also include D2 gastrectomy, robotic surgery and, for advanced gastric cancers, immunotherapy with PD-L1 inhibitors, with attention to side-effect management throughout.",
    },
    {
      question: "How long is recovery after minimally invasive stomach cancer surgery?",
      answer:
        "After laparoscopic surgery at OncoXpert, patients typically walk within 24 hours, and the 5-10mm incisions replace a large abdominal cut, so scarring is minimal. Robotic-assisted gastrectomy aims for faster functional recovery as well. Dr. Sunil Navalgund's team offers constant support throughout the cancer journey, from diagnosis to recovery.",
    },
    {
      question: "Why choose OncoXpert for stomach cancer treatment in Bangalore?",
      answer: `OncoXpert is led by Dr. Sunil Navalgund, a surgical oncologist and GI cancer specialist with ${surgeries} surgeries performed. Care combines robotic and laparoscopic gastrectomy, a multi-disciplinary approach, evidence-based protocols and a compassionate care model, integrating pathology, genomics and clinical expertise to map a precise treatment plan for every patient.`,
    },
  ],
  // No dates are stated on the stomach page: shown nowhere until they are (PENDING DOCTOR).
  stats: [
    {
      sentence: `Dr. Sunil Navalgund has performed ${surgeries} surgeries at OncoXpert.`,
      source: "OncoXpert surgical records",
      date: null,
    },
    {
      sentence: `At OncoXpert, early diagnosis of stomach cancer is reported to increase the cure rate by ${cureRate}.`,
      source: "OncoXpert",
      date: null,
    },
  ],
  offers: [],
  purpose:
    "Stomach (gastric) cancer: warning signs, early diagnosis, D2 gastrectomy, robotic and laparoscopic surgery, FLOT chemotherapy, immunotherapy, recovery and the surgeon.",
} as const satisfies CancerPageSeo;
