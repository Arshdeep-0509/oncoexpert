import { INTRO_EXIT_START_MS } from "@/lib/intro";

// Shared values of the intro preloader: the exit time, the CSS animation shorthand
// (keyframes `pl-*` in globals.css), and the logo mark's geometry.

export const EXIT = INTRO_EXIT_START_MS / 1000;
const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

export const MARK = {
  src: "/images/brand/oncoxpert-mark.png",
  width: 437,
  height: 397,
  // Centre and radius of the white inner circle, measured on the artwork.
  cx: "44.85%",
  cy: "58.44%",
  /** Inner circle radius as % of the mark's width (used with cqw units). */
  r: 29.06,
  /** Same radius for clip-path circle(), which measures % against √((w²+h²)/2). */
  clipR: "31%",
};

// The logo's own colours (styles/tokens.css), the same on every page.
export const BLUE = "var(--logo-blue)";
export const ORANGE = "var(--logo-orange)";

export const anim = (name: string, duration: number, delay: number, timing = ease) =>
  `${name} ${duration}s ${timing} ${delay}s both`;
