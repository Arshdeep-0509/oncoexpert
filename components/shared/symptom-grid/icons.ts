import { Activity, CircleDot, Droplets, Mic, Soup, UtensilsCrossed, Waves, Wind, type LucideIcon } from "lucide-react";
import type { SymptomIcon } from "@/content/types";

/** SymptomGrid's card icons (lucide, stroke 1.75). */
export const symptomIcons: Record<SymptomIcon, LucideIcon> = {
  bloating: CircleDot,
  pelvic: Activity,
  full: UtensilsCrossed,
  urination: Droplets,
  lump: Waves,
  cough: Wind,
  voice: Mic,
  swallow: Soup,
};
