import { HeartHandshake, Ribbon, ScanSearch, type LucideIcon } from "lucide-react";
import type { HeroHighlight } from "@/content/pages/breast-cancer";

/** One icon per hero highlight (the floating cards around the arch). */
export const highlightIcons: Record<HeroHighlight, LucideIcon> = {
  awareness: Ribbon,
  screening: ScanSearch,
  support: HeartHandshake,
};
