import { cn } from "@/lib/utils";

const base =
  "group/btn inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-300";

/** Solid pill on light sections (brand primary). */
export const pillPrimary = cn(
  base,
  "bg-primary text-white shadow-[0_1px_2px_rgb(0_61_174/0.2),0_10px_24px_-10px_rgb(0_61_174/0.55)] hover:bg-primary-hover",
);

/** Solid teal pill for dark sections (glow is reserved for dark backgrounds). */
export const pillGlow = cn(
  base,
  "bg-glow text-ink shadow-[0_0_0_1px_rgb(45_212_191/0.3),0_12px_32px_-10px_rgb(45_212_191/0.55)] hover:bg-white",
);

/** Outline ghost pill on dark sections. */
export const pillGhostDark = cn(base, "border border-white/25 text-white hover:border-white/55 hover:bg-white/[0.06]");

/** Outline pill on light sections. */
export const pillOutline = cn(base, "border border-border bg-white text-ink hover:border-primary/40 hover:text-primary");

/** Arrow that nudges right when its pill is hovered. */
export const pillArrow = "size-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1";
