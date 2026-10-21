import type { HeaderVariant } from "@/content/types";

/**
 * Mobile menu styles per header variant. "dark" is the robotic page's original drawer;
 * "light" is the full-screen blush sheet (420px max on tablets) with 22px / 56px rows
 * and a contact card.
 */
export const menuStyles = {
  dark: {
    content: "w-[88vw] max-w-[400px] bg-white sm:max-w-[400px]",
    row: "min-h-14 text-xl",
    stagger: 0.05,
    serviceTile: "rounded-lg bg-accent/[0.07] ring-1 ring-accent/10",
    actions: "mt-6 grid gap-3",
    action: "h-14",
  },
  light: {
    content: "w-screen max-w-none bg-surface-alt sm:w-[420px] sm:max-w-[420px]",
    row: "min-h-14 text-[22px] leading-tight",
    stagger: 0.04,
    serviceTile: "rounded-[10px] bg-accent-soft",
    actions: "mt-6 grid gap-3 rounded-lg bg-surface p-4 shadow-soft-sm ring-1 ring-line",
    action: "min-h-14",
  },
} as const satisfies Record<HeaderVariant, Record<string, string | number>>;
