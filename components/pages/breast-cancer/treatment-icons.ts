import { Droplets, Radiation, Scissors, ShieldPlus, type LucideIcon } from "lucide-react";
import type { Treatment } from "@/content/pages/breast-cancer";

/** One icon per treatment (hero chips, overview diagram). */
export const treatmentIcons: Record<Treatment, LucideIcon> = {
  surgery: Scissors,
  chemotherapy: Droplets,
  immunotherapy: ShieldPlus,
  radiotherapy: Radiation,
};
