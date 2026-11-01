/** dataLayer events for Google Tag Manager. */
export type AnalyticsEvent =
  | { event: "phone_click"; location: string }
  | { event: "whatsapp_click"; location: string }
  | { event: "cta_click"; label: string; location: string; section: string }
  | { event: "form_submit"; status: "success" | "error" | "invalid"; service?: string; page?: string }
  // Lung page: a symptom card opened, a test chosen in the diagnostic lens, a pathway step jumped to.
  | { event: "lung_symptom_open"; label: string }
  | { event: "lung_test_select"; label: string }
  | { event: "lung_pathway_step"; label: string; step: number };

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
