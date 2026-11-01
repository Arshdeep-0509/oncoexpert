import { Clock3, Crosshair, Eye, Hand, ScanLine, ShieldCheck, type LucideIcon } from "lucide-react";
import type { TechniqueIcon } from "@/content/types";

/** TechniqueCompare's point icons (lucide, stroke 1.75). */
export const techniqueIcons: Record<TechniqueIcon, LucideIcon> = {
  view: Eye,
  instruments: Hand,
  access: Crosshair,
  incisions: ScanLine,
  recovery: Clock3,
  complications: ShieldCheck,
};
