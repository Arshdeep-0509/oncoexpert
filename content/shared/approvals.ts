/**
 * Switches for NEW content that waits for the doctor's approval (PENDING DOCTOR). Each one stays
 * false until Dr. Sunil approves that content; then set it to true (and fill the dates below).
 *
 * Preview: build with NEXT_PUBLIC_SHOW_PENDING=1 to render everything behind these switches, to
 * check layout and structured data before approval. Never set it on the live site.
 */
const preview = process.env.NEXT_PUBLIC_SHOW_PENDING === "1";

export const approvals = {
  // PENDING DOCTOR: the one-sentence definitions under each page's H1 (`definition` in the
  // pages' .seo.ts files: who, what, where).
  definitions: preview || false,
  // PENDING DOCTOR: the "Quick answers" Q&As on the five cancer pages. When shown, the page also
  // emits FAQPage structured data.
  quickAnswers: preview || false,
  // PENDING DOCTOR: the "Medically reviewed by Dr. Sunil Navalgund · Last reviewed <date>" line and
  // the matching reviewedBy / lastReviewed structured data. Only true once he has actually reviewed
  // the pages; `lastReviewed` is the date of that review (YYYY-MM-DD).
  medicalReview: preview || false,
  lastReviewed: (preview ? "2026-11-02" : null) as string | null,
  // PENDING DOCTOR: package prices as schema.org Offers (prices on the pages are still pending).
  packageOffers: preview || false,
  // PENDING DOCTOR: the figure sentences with their source and date ("OncoXpert data, updated
  // Dec 2023"), shown in the quick answers and llms.txt only where a date exists.
  citableStats: preview || false,
} as const;
