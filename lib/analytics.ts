/** dataLayer events for Google Tag Manager. */
export type AnalyticsEvent =
  | { event: "phone_click"; location: string }
  | { event: "whatsapp_click"; location: string }
  // label: <page>:<section>:<action>; text: the data-cta value as set on the element.
  | { event: "cta_click"; label: string; text: string; location: string; section: string }
  | { event: "form_submit"; status: "success" | "error" | "invalid"; service?: string; page?: string }
  // The visitor left a booking-form field with a value in it (once per field and page load).
  | { event: "form_step"; step: number; field: string; page?: string }
  // Lung page: a symptom card opened, a test chosen in the diagnostic lens, a pathway step jumped to.
  | { event: "lung_symptom_open"; label: string }
  | { event: "lung_test_select"; label: string }
  | { event: "lung_pathway_step"; label: string; step: number }
  | { event: "lung_surgery_toggle"; label: string }
  // Shared TechniqueCompare: a tab chosen below lg (`page`: the page's analytics prefix, e.g. "lung").
  | { event: "technique_switch"; label: string; page: string }
  // Colorectal path steps (the lung page has lung_pathway_step) and endometrial symptom cards.
  | { event: "pathway_step"; label: string; step: number; page: string }
  | { event: "symptom_open"; label: string; page: string }
  // Shared SymptomGrid ("check"): how many signs are ticked (never which ones).
  | { event: "symptom_check"; page: string; count: number }
  // Ovarian #diagnostics: a test's drawer opened.
  | { event: "ovarian_test_open"; label: string }
  | { event: "ovarian_treatment_select"; label: string }
  // Shared PackageCards: a package's button, the estimator at rest (debounced).
  | { event: "package_select"; label: string; page: string }
  | { event: "estimator_change"; cycles: number; page: string }
  // Thyroid page: the early / late switch, the modalities filter.
  | { event: "thyroid_detection_toggle"; label: string }
  | { event: "thyroid_modality_filter"; label: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Pushes straight to window.dataLayer (rather than sendGTMEvent) so events fired
 * before the deferred GTM script loads are queued, not dropped; GTM replays them.
 */
export function track(payload: AnalyticsEvent) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch {
    // Analytics must never break the page.
  }
}

// Short page names for analytics labels, by path.
const PAGE_KEYS: Record<string, string> = {
  "/": "home",
  "/robotic-surgery/": "robotic",
  "/breast-cancer-treatment-bangalore/": "breast",
  "/book-your-appoinment-page/": "book",
  "/about-us/": "about",
  "/colon-cancer-treatment-bangalore/": "colorectal",
  "/endometrial-cancer-treatment-bangalore/": "endometrial",
  "/lung-cancer-in-bangalore/": "lung",
  "/ovarian-cancer-treatment/": "ovarian",
  "/thyroid-cancer/": "thyroid",
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * The cta_click label <page>:<section>:<action>. A data-cta that is already in that form
 * ("lung:hero:book-consultation") is kept; any other ("Book Consultation") becomes
 * "<page>:<section>:book-consultation".
 */
export function ctaLabel(pathname: string, section: string, cta: string) {
  if (/^[a-z-]+:[a-z0-9-]+:[a-z0-9-]+$/.test(cta)) return cta;
  const page = PAGE_KEYS[pathname] ?? (slug(pathname) || "home");
  return `${page}:${slug(section)}:${slug(cta)}`;
}
