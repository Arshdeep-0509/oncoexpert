/**
 * Search and answer-engine facts for /urology/ (see lung-cancer.seo.ts). Built only from facts
 * already on the page (content/pages/urology.ts); prices imported.
 *
 * Foundation: the condition facts, offers and llms.txt purpose feed the page's one @graph and
 * /llms.txt now. The quick answers and figure sentences come with the page's sections.
 *
 * SOURCE: NEW (every sentence here). PENDING DOCTOR: the definition (shown only once approved,
 * content/shared/approvals.ts).
 */
import type { CancerPageSeo } from "@/content/types";
import { pageName, pricing, specialties } from "@/content/pages/urology";

export const urologySeo = {
  name: pageName,
  definition:
    "Dr. Sunil Navalgund, a surgical oncologist in Bengaluru, treats kidney, prostate, bladder, testicular and penile cancers at OncoXpert with robotic, keyhole and open surgery that preserves organ function.",
  condition: {
    name: "Urological cancers",
    alternateName: specialties.items.map((item) => item.title),
    possibleTreatment: [
      "Robotic Partial Nephrectomy",
      "Radical Nephrectomy",
      "Robotic Prostatectomy",
      "TURBT",
      "Robotic Radical Cystectomy",
      "Retroperitoneal Lymph Node Dissection (RPLND)",
      "Trimodal therapy (bladder sparing)",
    ],
    signOrSymptom: [],
  },
  quickAnswers: [],
  stats: [],
  offers: pricing.plans.map((plan) => ({ name: plan.name, price: plan.price, from: true })),
  purpose:
    "Uro-oncology: kidney, prostate, bladder, testicular, penile and adrenal cancers; robotic and keyhole surgery, organ preservation, the tumour board, outcomes and indicative prices.",
} as const satisfies CancerPageSeo;
