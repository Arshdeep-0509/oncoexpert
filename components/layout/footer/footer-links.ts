import { site } from "@/content/site";

// Columns 2 and 3 reuse the nav data.
export const services = site.nav.find((item) => item.children)!;
export const quickLinks = site.nav.filter((item) => !item.children);

export const footerLinkClass =
  "inline-flex min-h-11 items-center text-[15px] text-white/70 transition-colors duration-300 hover:text-accent-glow";
export const footerHeadingClass = "type-eyebrow mb-3 text-accent-glow";
