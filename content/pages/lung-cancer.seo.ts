/**
 * Search and answer-engine facts for /lung-cancer-in-bangalore/: the condition (structured data),
 * the definition under the H1, the "Quick answers", the figure sentences and llms.txt's line.
 * Built only from facts already on the page (content/pages/lung-cancer.ts); figures are imported,
 * never retyped.
 *
 * SOURCE: NEW (every sentence here). PENDING DOCTOR: the definition, every quick answer and the
 * figure sentences; each is shown only once approved (content/shared/approvals.ts).
 */
import type { CancerPageSeo } from "@/content/types";
import { stageIV, survival, volume } from "@/content/pages/lung-cancer";

const [stageI, stageIVResponse] = stageIV.stats;

export const lungSeo = {
  name: "Lung Cancer",
  definition:
    "Dr. Sunil Navalgund, a surgical oncologist in Bengaluru trained at Tata Memorial Hospital, treats lung cancer at OncoXpert with robotic surgery, VATS keyhole surgery and immunotherapy.",
  condition: {
    name: "Lung cancer",
    alternateName: [],
    possibleTreatment: [
      "Robotic surgery",
      "VATS (Video-Assisted Thoracic Surgery)",
      "Lobectomy",
      "Pneumonectomy",
      "Immunotherapy",
      "Targeted therapy",
    ],
    signOrSymptom: ["Chronic cough", "Coughing blood", "Persistent chest pain"],
  },
  quickAnswers: [
    {
      question: "What are the early signs of lung cancer?",
      answer:
        "The signs to watch are a chronic cough, coughing blood and persistent chest pain. See a doctor if a cough lasts more than three weeks or a long-standing cough changes, and promptly if you cough up any blood, even a small streak. Timely evaluation creates more treatment options.",
    },
    {
      question: "How is lung cancer diagnosed?",
      answer:
        "Lung cancer is diagnosed with a bronchoscopy, where a thin, flexible camera looks inside the airways and can take small samples, or a CT-guided biopsy, where a CT scan guides a fine needle to take a tiny sample. A PET-CT whole-body scan then shows where the disease is active, for precise staging.",
    },
    {
      question: "What is the difference between a lobectomy and a pneumonectomy?",
      answer:
        "A lobectomy removes only the affected lobe of the lung; a pneumonectomy removes the full lung. OncoXpert prioritizes organ preservation, so a lobectomy is used instead of a pneumonectomy whenever possible, to keep the highest possible breathing capacity after treatment, with less pain and a faster recovery.",
    },
    {
      question: "What is VATS surgery for lung cancer?",
      answer:
        "VATS (Video-Assisted Thoracic Surgery) is a proven keyhole approach for standard lung cancer resections: a camera and fine instruments are used instead of a large opening. It means small incisions, reduced recovery time and a lower risk of complications. Robotic surgery with the DaVinci system is used for complex thoracic procedures.",
    },
    {
      question: "Can stage IV lung cancer be treated?",
      answer:
        "Yes. Stage IV lung cancer care has evolved: modern immunotherapy and detailed genetic analysis target specific mutations to provide long-term survival and excellent quality of life even in advanced cases. At OncoXpert, immunotherapy and targeted options are offered for advanced disease, and a second opinion can be booked online.",
    },
    {
      question: "What are the steps of lung cancer care at OncoXpert?",
      answer:
        "The OncoXpert care pathway has six steps: identifying a persistent cough or discomfort, a bronchoscopy or CT-guided sample, PET-CT staging to map the cancer's spread, a multidisciplinary tumor board review, treatment with surgery, immunotherapy or combination care, and post-op care with long-term surveillance.",
    },
    {
      question: "Who treats lung cancer at OncoXpert in Bengaluru?",
      answer:
        "Dr. Sunil Navalgund, a surgical oncologist in Bengaluru trained at Tata Memorial Hospital, Mumbai, leads lung cancer care at OncoXpert. He specializes in thoracic oncology and robotic-assisted surgery, including robotic and VATS thoracic surgery, with a focus on organ preservation and the patient's long-term quality of life.",
    },
  ],
  // No date is stated on the lung page for these figures: shown nowhere until one is (PENDING DOCTOR).
  stats: [
    {
      sentence: `Stage I lung cancer survival at OncoXpert is ${stageI.value}${stageI.suffix}.`,
      source: "OncoXpert practice figures",
      date: null,
    },
    {
      sentence: `The Stage IV lung cancer response rate at OncoXpert is ${stageIVResponse.value}${stageIVResponse.suffix}.`,
      source: "OncoXpert practice figures",
      date: null,
    },
    ...survival.rows.map((row) => ({
      sentence: `The ${row.label} lung cancer survival benchmark at OncoXpert is ${row.value}${survival.unit}.`,
      source: "OncoXpert survival benchmarks",
      date: null,
    })),
    ...volume.counts.map((count) => ({
      sentence: `OncoXpert's lung cancer volume includes ${count.value} ${count.label.toLowerCase()}.`,
      source: "OncoXpert clinical volume",
      date: null,
    })),
  ],
  offers: [],
  purpose:
    "Lung cancer diagnosis and treatment: symptoms to watch, bronchoscopy, CT-guided biopsy and PET-CT, lobectomy, robotic surgery and VATS, immunotherapy for stage IV, survival benchmarks and clinical volume.",
} as const satisfies CancerPageSeo;
