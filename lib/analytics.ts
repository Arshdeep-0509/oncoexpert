/** dataLayer events for Google Tag Manager. */
export type AnalyticsEvent =
  | { event: "phone_click"; location: string }
  | { event: "whatsapp_click"; location: string }
  | { event: "cta_click"; label: string; location: string; section: string }
  | { event: "form_submit"; status: "success" | "error" | "invalid"; service?: string; page?: string }
  // Lung page: a symptom card opened, a test chosen in the diagnostic lens, a pathway step jumped to.
  | { event: "lung_symptom_open"; label: string }
  | { event: "lung_test_select"; label: string }
  | { event: "lung_pathway_step"; label: string; step: number }
  | { event: "lung_surgery_toggle"; label: string }
  // Shared TechniqueCompare: a tab chosen below lg (`page`: the page's analytics prefix, e.g. "lung").
  | { event: "technique_switch"; label: string; page: string }
  // Shared SymptomGrid ("check"): how many signs are ticked (never which ones).
  | { event: "symptom_check"; page: string; count: number }
  // Ovarian #diagnostics: a test's drawer opened.
  | { event: "ovarian_test_open"; label: string };

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
