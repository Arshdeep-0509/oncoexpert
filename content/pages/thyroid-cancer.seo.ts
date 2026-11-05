/**
 * Search and answer-engine facts for /thyroid-cancer/ (see lung-cancer.seo.ts). Built only from
 * facts already on the page (content/pages/thyroid-cancer.ts); figures and prices imported.
 *
 * SOURCE: NEW (every sentence here). PENDING DOCTOR: the definition, every quick answer and the
 * figure sentences; each is shown only once approved (content/shared/approvals.ts).
 */
import type { CancerPageSeo } from "@/content/types";
import { dashboard, outcomes, packages } from "@/content/pages/thyroid-cancer";
import { formatRupees } from "@/lib/format";

const [total, modified, neck] = packages.items;
const [removal, voice, calcium] = dashboard.stats;
const [early, stageIII, stageIV] = outcomes.stages;
const pct = (n: number) => `${n}${outcomes.unit}`;

export const thyroidSeo = {
  name: "Thyroid Cancer",
  definition:
    "Dr. Sunil Navalgund, a surgical oncologist in Bengaluru, treats thyroid cancer at OncoXpert with thyroidectomy and neck dissection under nerve monitoring, radioiodine therapy and long-term follow-up.",
  condition: {
    name: "Thyroid cancer",
    alternateName: [],
    possibleTreatment: ["Thyroidectomy", "Neck dissection", "Radioiodine (RAI) therapy", "Long-term surveillance"],
    signOrSymptom: ["Painless lumps in the neck", "Persistent cough", "Voice changes", "Difficulty swallowing"],
  },
  quickAnswers: [
    {
      question: "What are the symptoms of thyroid cancer?",
      answer:
        "Thyroid cancer can cause painless lumps in the neck, a persistent cough, voice changes or difficulty swallowing. Many patients remain asymptomatic in early stages, so a lump at the front of the neck, or hoarseness that does not settle within a few weeks, is worth a consultation with a specialist.",
    },
    {
      question: "Is thyroid cancer curable?",
      answer:
        "Yes, especially when it is found early: early-stage thyroid cancer has nearly a 100% cure rate. Delayed diagnosis may lead to local spread to lymph nodes or vital structures. Thyroid cancer is generally highly curable, and early diagnosis with precise surgery is key to preserving the voice and calcium balance.",
    },
    {
      question: "How much does thyroid surgery cost in Bangalore?",
      answer: `At OncoXpert, indicative package prices are ${formatRupees(total.price)} for a total thyroidectomy, ${formatRupees(modified.price)} for a modified neck dissection and ${formatRupees(neck.price)} for a neck dissection (levels 1–3). Prices are indicative and may vary based on co-morbidities and hospital choice. The thyroidectomy package includes nerve monitoring and a 2-day stay.`,
    },
    {
      question: "Will thyroid surgery affect my voice?",
      answer: `In OncoXpert's clinical record, no: zero permanent recurrent laryngeal nerve injuries, ${voice.value}${voice.suffix} permanent voice change after surgery. Nerve monitors ensure vocal cord safety during every thyroid operation. The recurrent laryngeal nerves run just behind the thyroid and move the vocal cords.`,
    },
    {
      question: "What is a thyroidectomy?",
      answer:
        "A thyroidectomy is the precise removal of part or all of the thyroid gland. At OncoXpert it is done with nerve monitoring to protect the voice, and may be combined with a neck dissection, the expert clearance of lymph nodes to prevent regional spread and recurrence. Targeted RAI therapy can then eliminate residual microscopic cancer cells.",
    },
    {
      question: "What happens after thyroid cancer treatment?",
      answer:
        "After surgery, and radioiodine therapy where it is given, OncoXpert follows each patient with rigorous long-term surveillance using Tg testing and neck ultrasounds. Follow-up is part of the same plan as diagnosis and surgery, led by Dr. Sunil Navalgund, a surgical oncologist in Bengaluru with an experienced, high-volume neck surgery team.",
    },
    {
      question: "What are thyroid cancer survival rates at OncoXpert?",
      answer: `OncoXpert reports ${pct(early.value)} survival for Stage I & II thyroid cancer, ${pct(stageIII.value)} for Stage III and ${pct(stageIV.value)} for Stage IV, with an overall 5-year survival of ${outcomes.overall.value}${outcomes.overall.suffix}, aggregated across all differentiated thyroid cancer types. Early-stage thyroid cancer has nearly a 100% cure rate.`,
    },
  ],
  // No dates are stated on the thyroid page: shown nowhere until they are (PENDING DOCTOR).
  stats: [
    {
      sentence: `OncoXpert's complete removal rate in planned total thyroidectomy cases is ${removal.value}${removal.suffix}.`,
      source: "OncoXpert surgical performance",
      date: null,
    },
    {
      sentence: `OncoXpert's permanent voice change rate after thyroid surgery is ${voice.value}${voice.suffix}.`,
      source: "OncoXpert surgical performance",
      date: null,
    },
    {
      sentence: `OncoXpert's hypocalcemia rate after thyroid surgery is ${calcium.value}${calcium.suffix}.`,
      source: "OncoXpert surgical performance",
      date: null,
    },
    {
      sentence: `Overall 5-year thyroid cancer survival at OncoXpert is ${outcomes.overall.value}${outcomes.overall.suffix}.`,
      source: "OncoXpert outcomes",
      date: null,
    },
  ],
  offers: packages.items.map((item) => ({ name: item.name, price: item.price, from: false })),
  purpose:
    "Thyroid cancer surgery: symptoms, early detection, thyroidectomy and neck dissection with nerve monitoring, radioiodine therapy, follow-up, surgical performance (voice, calcium), survival rates and package prices.",
} as const satisfies CancerPageSeo;
