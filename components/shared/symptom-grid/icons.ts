import {
  Activity,
  CircleDot,
  Droplets,
  Frown,
  Mic,
  Scale,
  Soup,
  UtensilsCrossed,
  Waves,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
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
  pain: Zap,
  weight: Scale,
  nausea: Frown,
};
