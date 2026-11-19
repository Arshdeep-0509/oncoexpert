/**
 * Search and answer-engine facts for /stomach-cancer/ (see lung-cancer.seo.ts). Built only from
 * facts already on the page (content/pages/stomach-cancer.ts).
 *
 * Foundation: the condition facts and llms.txt purpose feed the page's one @graph and /llms.txt now.
 * The quick answers and figure sentences come with the page's sections. The page has no prices.
 *
 * SOURCE: NEW (every sentence here). PENDING DOCTOR: the definition (shown only once approved,
 * content/shared/approvals.ts).
 */
import type { CancerPageSeo } from "@/content/types";
import { pageName, treatments, warningSigns } from "@/content/pages/stomach-cancer";

export const stomachSeo = {
  name: pageName,
  definition:
    "Dr. Sunil Navalgund, a surgical oncologist in Bengaluru, treats stomach (gastric) cancer at OncoXpert with robotic and laparoscopic D2 gastrectomy, FLOT chemotherapy and immunotherapy.",
  condition: {
    name: "Stomach cancer",
    alternateName: ["Gastric cancer"],
    possibleTreatment: treatments.items.map((item) => item.title),
    signOrSymptom: warningSigns.items.map((item) => item.title),
  },
  quickAnswers: [],
  stats: [],
  offers: [],
  purpose:
    "Stomach (gastric) cancer: warning signs, D2 gastrectomy, robotic and laparoscopic surgery, FLOT chemotherapy, immunotherapy and the surgeon.",
} as const satisfies CancerPageSeo;
