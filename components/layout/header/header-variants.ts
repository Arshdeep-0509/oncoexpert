import type { HeaderVariant } from "@/content/types";

/**
 * Per-variant sizes. "dark" is the robotic page's original bar (80 → 68px after 40px of
 * scroll, CTA from md); "light" is 64px on phones/tablets and 76 → 64px on desktop after
 * 24px of scroll, CTA on desktop only.
 */
export const headerVariants = {
  dark: {
    barPx: 80,
    compactAfter: 40,
    bar: "h-20",
    barCompact: "h-[68px]",
    logo: "h-9 group-data-[compact=true]/nav:h-8",
    cta: "md:inline-flex",
    phone: "size-11",
    activeDot: true,
  },
  light: {
    barPx: 76,
    compactAfter: 24,
    bar: "h-16 lg:h-[76px]",
    barCompact: "h-16",
    logo: "h-8 lg:h-9 lg:group-data-[compact=true]/nav:h-8",
    cta: "lg:inline-flex",
    phone: "size-12 lg:size-11",
    activeDot: false,
  },
} as const satisfies Record<HeaderVariant, Record<string, string | number | boolean>>;
