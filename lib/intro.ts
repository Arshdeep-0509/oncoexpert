/**
 * Timing of the intro preloader (components/layout/Preloader.tsx).
 * It plays on every full page load / refresh (not on in-site navigation, because the
 * root layout stays mounted). `intro-seen` on <html> hides it; nothing sets that class
 * today, but it is kept as the switch if the intro should ever play once per session.
 */
export const INTRO_EXIT_START_MS = 3300; // the overlay starts fading out
export const INTRO_TOTAL_MS = 3900; // fully gone

const INTRO_SEEN_CLASS = "intro-seen";

/** True when the intro does not play on this page load. */
export function introDisabled(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains(INTRO_SEEN_CLASS);
}

/**
 * Seconds until the page is revealed (0 if the intro is hidden or already over).
 * Client-only; use it for animation delays, never for rendered markup.
 */
export function introRemainingSeconds(): number {
  if (typeof document === "undefined") return 0;
  if (introDisabled()) return 0;
  // Prefer the real clock: the overlay's CSS exit animation (it starts at first paint).
  const exit = document
    .querySelector(".preloader")
    ?.getAnimations()
    .find((a) => (a as CSSAnimation).animationName === "pl-exit");
  if (exit && exit.currentTime !== null) {
    const delay = Number(exit.effect?.getTiming().delay ?? 0);
    return Math.max(0, (delay - Number(exit.currentTime)) / 1000);
  }
  if (!document.querySelector(".preloader")) return 0;
  return Math.max(0, (INTRO_EXIT_START_MS - performance.now()) / 1000);
}
