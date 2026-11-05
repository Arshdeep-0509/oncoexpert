/**
 * Search and answer-engine facts for /colon-cancer-hospital-bangalore/ (see lung-cancer.seo.ts).
 * Built only from facts already on the page (content/pages/colorectal-cancer.ts); figures imported.
 * The page names no symptoms, so the condition lists none.
 *
 * SOURCE: NEW (every sentence here). PENDING DOCTOR: the definition, every quick answer and the
 * figure sentences; each is shown only once approved (content/shared/approvals.ts).
 */
import type { CancerPageSeo } from "@/content/types";
import { advancedCases, outcomes, qualityOfLife } from "@/content/pages/colorectal-cancer";

const [noStoma, temporary, permanent] = qualityOfLife.stoma;
const [stageI, stageII, stageIV] = outcomes.survival.items;

export const colorectalSeo = {
  name: "Colorectal Cancer",
  definition:
    "Dr. Sunil Navalgund, a surgical oncologist in Bengaluru, treats colon and rectal cancer at OncoXpert with robotic and laparoscopic surgery focused on organ preservation.",
  condition: {
    name: "Colorectal cancer",
    alternateName: ["Colon cancer", "Rectal cancer"],
    possibleTreatment: [
      "Robotic surgery",
      "Laparoscopic surgery",
      "Inter-Sphincteric Resection (ISR)",
      "Chemotherapy",
      "Targeted immunotherapy",
      "Liver-first or synchronous resection",
    ],
    signOrSymptom: [],
  },
  quickAnswers: [
    {
      question: "Can rectal cancer surgery avoid a permanent stoma?",
      answer: `Often, yes. Most ultra-low rectal cancers used to require a permanent bag (stoma). Inter-Sphincteric Resection (ISR) techniques and robotic platforms significantly reduce that need: in OncoXpert's figures, ${noStoma.value}${noStoma.suffix} of patients never had a stoma, ${temporary.value}${temporary.suffix} had a temporary stoma and ${permanent.value}${permanent.suffix} a permanent one.`,
    },
    {
      question: "What is robotic surgery for colorectal cancer?",
      answer:
        "Robotic colorectal surgery uses the Da Vinci system: 3D high-definition visualization, Endowrist instruments with extreme dexterity and tremor filtration for millimeter precision. It gives unmatched precision in narrow pelvic spaces, leading to better nerve preservation of sexual and bladder function and faster recovery, and suits ultra-low rectal tumors and a narrow pelvis.",
    },
    {
      question: "Robotic or laparoscopic surgery: which is used for colon cancer?",
      answer:
        "Laparoscopic surgery is the proven standard for most colon and upper rectal cancers: keyhole incisions with smaller scars, reduced pain, a shorter hospital stay of 2-3 days and a faster return to a normal diet. Robotic surgery is used for ultra-low rectal tumors and a narrow pelvis, where its precision best preserves the nerves.",
    },
    {
      question: "Is stage IV colorectal cancer curable?",
      answer: `For selected cases, yes. Stage IV is no longer a terminal diagnosis: with modern chemo-immunotherapy and synchronous resections of primary and metastatic lesions, OncoXpert offers a ${advancedCases.stat.value}${advancedCases.stat.suffix} survival chance for selected cases, with curative intent through liver-first or synchronous resection strategies.`,
    },
    {
      question: "What are the steps of colorectal cancer treatment at OncoXpert?",
      answer:
        "OncoXpert follows a structured 6-step journey from diagnosis to long-term health: a colonoscopy for the initial biopsy and imaging, a PET-CT scan for full body mapping, staging with a multidisciplinary (MDT) review and plan, pre-op optimization, robotic or laparoscopic surgery, and recovery with ERAS protocol support.",
    },
    {
      question: "What are colorectal cancer survival rates at OncoXpert?",
      answer: `In OncoXpert's own patient records, 5-year survival is ${stageI.rate}% for ${stageI.stage} with primary surgery, ${stageII.rate}% for ${stageII.stage} with a multimodal treatment approach, and ${stageIV.rate}% for ${stageIV.stage} with an aggressive resection strategy for liver or lung metastases. Individual outcomes vary with stage, tumour biology and overall health.`,
    },
  ],
  // No dates are stated on the colorectal page: shown nowhere until they are (PENDING DOCTOR).
  stats: [
    ...outcomes.survival.items.map((item) => ({
      sentence: `The 5-year survival rate for ${item.stage} colorectal cancer at OncoXpert is ${item.rate}%.`,
      source: "OncoXpert patient records",
      date: null,
    })),
    ...qualityOfLife.stoma.map((s) => ({
      sentence: `After rectal cancer surgery at OncoXpert, ${s.value}${s.suffix} of patients had: ${s.label.toLowerCase()}.`,
      source: "OncoXpert patient records",
      date: null,
    })),
  ],
  offers: [],
  purpose:
    "Colon and rectal cancer surgery: robotic (Da Vinci) and laparoscopic surgery, Inter-Sphincteric Resection to avoid a permanent stoma, the 6-step recovery path, stage IV options and 5-year survival rates.",
} as const satisfies CancerPageSeo;
