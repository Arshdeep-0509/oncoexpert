/**
 * Search and answer-engine facts for /ovarian-cancer-treatment/ (see lung-cancer.seo.ts). Built only
 * from facts already on the page (content/pages/ovarian-cancer.ts); figures and prices imported.
 *
 * SOURCE: NEW (every sentence here). PENDING DOCTOR: the definition, every quick answer and the
 * figure sentences; each is shown only once approved (content/shared/approvals.ts).
 */
import type { CancerPageSeo } from "@/content/types";
import { outcomes, packages } from "@/content/pages/ovarian-cancer";
import { formatRupees } from "@/lib/format";

const [cytoreduction, hipec, chemo] = packages.items;
const [ring, count] = outcomes.stats;
const rows = outcomes.survival.rows;
// The live footnote dates the outcomes: "*Clinical data updated Dec 2023."
const dataDate = "Dec 2023";

export const ovarianSeo = {
  name: "Ovarian Cancer",
  // Short: the hero paragraph above it already lists the treatments (and the phone hero must keep
  // both buttons on the first screen).
  definition: "Dr. Sunil Navalgund, a surgical oncologist in Bengaluru, treats ovarian cancer at OncoXpert.",
  condition: {
    name: "Ovarian cancer",
    alternateName: [],
    possibleTreatment: [
      "Cytoreductive surgery",
      "HIPEC (Heated Intraperitoneal Chemotherapy)",
      "Fertility preservation",
      "Chemotherapy",
      "Immunotherapy",
    ],
    signOrSymptom: ["Abdominal bloating", "Pelvic pain", "Feeling full quickly", "Frequent urination"],
  },
  quickAnswers: [
    {
      question: "What are the early signs of ovarian cancer?",
      answer:
        "The warning signs are persistent abdominal bloating, pelvic pain, feeling full quickly and frequent urination, and they should not be ignored. Noticing one or more of these for a few weeks is a reason for a short consultation, which can rule things out. Early diagnosis is the single most critical factor in successful treatment.",
    },
    {
      question: "What is HIPEC?",
      answer:
        "HIPEC (Heated Intraperitoneal Chemotherapy) is heated chemotherapy washed through the abdomen during surgery, delivered directly where it is needed to target microscopic cancer cells. It is given with cytoreductive surgery and aims for reduced systemic toxicity. Dr. Sunil Navalgund at OncoXpert in Bengaluru is a HIPEC specialist.",
    },
    {
      question: "What is cytoreductive surgery?",
      answer:
        "Cytoreductive surgery is the surgical removal of all visible tumor masses in ovarian cancer. Removing every visible tumor deposit is the step that most improves long-term outcomes, and the technique focuses on minimal residual disease. At OncoXpert it can be combined with HIPEC, heated chemotherapy given during the same operation.",
    },
    {
      question: "How is ovarian cancer diagnosed?",
      answer:
        "Ovarian cancer is diagnosed with CA-125 blood testing, high-resolution transvaginal ultrasound, CT imaging and genetic screening for BRCA1/2. The ultrasound shows the size and character of a mass, CT shows whether the disease has spread in the abdomen, and genetic screening finds inherited changes that can shape treatment choices.",
    },
    {
      question: "How much does ovarian cancer treatment cost in Bangalore?",
      answer: `At OncoXpert, indicative starting prices are ${formatRupees(cytoreduction.price)} for cytoreductive surgery, ${formatRupees(hipec.price)} for HIPEC treatment and ${formatRupees(chemo.price)} per chemotherapy cycle. Prices are indicative only: the final cost depends on the treatment plan and hospital. Packages include items such as pre-op evaluation, specialized ICU care or daycare infusion.`,
    },
    {
      question: "Can fertility be preserved during ovarian cancer treatment?",
      answer:
        "For some young patients, yes. OncoXpert offers fertility preservation: specialized techniques to protect ovarian function and reproductive potential, including ovarian-sparing approaches with multidisciplinary support. Whether it is possible depends on the scans, tumor biology and life goals that shape each patient's single treatment plan, reviewed by the whole team.",
    },
    {
      question: "What are ovarian cancer survival rates at OncoXpert?",
      answer: `OncoXpert's 5-year survival rates for ovarian cancer are ${rows.map((r) => `${r.value}${outcomes.survival.unit} at ${r.label}`).join(", ")}, from clinical data updated ${dataDate}. Individual results may vary based on tumor biology and staging, which is why early diagnosis is the most critical factor in successful outcomes.`,
    },
  ],
  stats: [
    ...rows.map((row) => ({
      sentence: `The 5-year survival rate for ${row.label} ovarian cancer at OncoXpert is ${row.value}${outcomes.survival.unit}.`,
      source: "OncoXpert clinical data",
      date: dataDate,
    })),
    {
      sentence: `OncoXpert's complete cytoreduction rate is ${ring.value}${ring.suffix}.`,
      source: "OncoXpert clinical data",
      date: null,
    },
    {
      sentence: `OncoXpert has performed ${count.value}${count.suffix} successful HIPEC procedures.`,
      source: "OncoXpert clinical data",
      date: null,
    },
  ],
  offers: packages.items.map((item) => ({ name: item.name, price: item.price, from: true })),
  purpose:
    "Ovarian cancer treatment: warning signs, CA-125, ultrasound, CT and BRCA screening, cytoreductive surgery, HIPEC, fertility preservation, chemotherapy and immunotherapy, survival rates and indicative package prices.",
} as const satisfies CancerPageSeo;
