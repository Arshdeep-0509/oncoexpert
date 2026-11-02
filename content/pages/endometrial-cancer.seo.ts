/**
 * Search and answer-engine facts for /endometrial-cancer-treatment-bangalore/ (see
 * lung-cancer.seo.ts). Built only from facts already on the page (content/pages/endometrial-cancer.ts);
 * figures and prices imported.
 *
 * SOURCE: NEW (every sentence here). PENDING DOCTOR: the definition, every quick answer and the
 * figure sentences; each is shown only once approved (content/shared/approvals.ts).
 */
import type { CancerPageSeo } from "@/content/types";
import { clinical, packages } from "@/content/pages/endometrial-cancer";
import { formatRupees } from "@/lib/format";

const [open, lap, robotic] = packages.packages;
const [stageI, minimal] = clinical.stats;

export const endometrialSeo = {
  name: "Endometrial Cancer",
  definition:
    "Dr. Sunil Navalgund, a surgical oncologist in Bengaluru, treats endometrial (uterine) cancer at OncoXpert with robotic and laparoscopic surgery and sentinel lymph node biopsy.",
  condition: {
    name: "Endometrial cancer",
    alternateName: ["Uterine cancer"],
    possibleTreatment: [
      "Robotic surgery",
      "Laparoscopic surgery",
      "Sentinel lymph node biopsy",
      "Radical hysterectomy (open surgery)",
    ],
    signOrSymptom: ["Post-menopausal bleeding", "Heavy periods", "Abnormal bleeding", "Pelvic discomfort"],
  },
  quickAnswers: [
    {
      question: "What are the warning signs of endometrial cancer?",
      answer:
        "The key signs are bleeding after menopause, heavy periods, abnormal bleeding between cycles or a prolonged watery discharge, and persistent pelvic pain, pressure or cramping. Any spotting or bleeding after menopause should be investigated immediately. Noticing one of these signs is a reason to get checked, not a diagnosis.",
    },
    {
      question: "What is a sentinel lymph node biopsy?",
      answer:
        "Instead of removing all pelvic lymph nodes, a sentinel lymph node biopsy uses advanced mapping (ICG fluorescence) to identify only the nodes most likely to be affected by cancer. It gives accurate staging for planning further treatment without over-treatment, and reduces long-term problems such as lymphedema and chronic discomfort.",
    },
    {
      question: "How long is the hospital stay after minimally invasive endometrial cancer surgery?",
      answer:
        "Most patients return home within 24-48 hours after minimally invasive surgery. Keyhole access reduces physical trauma and scarring, and precision tools mean significantly less bleeding during the operation. Robotic surgery adds wristed instruments, a 3D high-definition view with 10x magnification and tremor filtration for complex lymph node dissections.",
    },
    {
      question: "How much does endometrial cancer surgery cost in Bangalore?",
      answer: `At OncoXpert, starting prices are ${formatRupees(open.amount)} for open surgery (a conventional radical hysterectomy), ${formatRupees(lap.amount)} for laparoscopic surgery and ${formatRupees(robotic.amount)} for robotic surgery. The final cost depends on the diagnosis, the hospital and the length of stay, and you receive a clear estimate before treatment.`,
    },
    {
      question: "What is the survival rate for stage I endometrial cancer?",
      answer: `At OncoXpert, 5-year survival for Stage I endometrial cancer is ${stageI.value}${stageI.suffix}, and ${minimal.value}${minimal.suffix} of cases are treated with minimally invasive surgery. Early detection of uterine cancer significantly improves treatment outcomes, which is why any bleeding after menopause should be investigated immediately by a specialist.`,
    },
    {
      question: "Is robotic surgery used for endometrial cancer?",
      answer:
        "Yes. Robotic surgery is the gold standard among OncoXpert's minimally invasive approaches. Its wristed instruments allow movements beyond human hand capacity, the 3D high-definition view gives 10x magnification for superior nerve and vessel identification, and tremor filtration gives enhanced control during complex lymph node dissections.",
    },
  ],
  // No dates are stated on the endometrial page: shown nowhere until they are (PENDING DOCTOR).
  stats: [
    {
      sentence: `Stage I endometrial cancer 5-year survival at OncoXpert is ${stageI.value}${stageI.suffix}.`,
      source: "OncoXpert clinical figures",
      date: null,
    },
    {
      sentence: `${minimal.value}${minimal.suffix} of endometrial cancer cases at OncoXpert are treated with minimally invasive surgery.`,
      source: "OncoXpert clinical figures",
      date: null,
    },
  ],
  offers: packages.packages.map((item) => ({ name: item.name, price: item.amount, from: true })),
  purpose:
    "Endometrial (uterine) cancer: warning signs, robotic and laparoscopic surgery, sentinel lymph node biopsy, stage I survival and starting prices for open, laparoscopic and robotic surgery.",
} as const satisfies CancerPageSeo;
