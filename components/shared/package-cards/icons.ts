import {
  Activity,
  Clock,
  Gauge,
  Microscope,
  ScanEye,
  Sparkles,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { PackageIcon } from "@/content/types";

/** PackageCards' optional inclusion icons (content: `inclusionIcons`). */
export const packageIcons: Record<PackageIcon, LucideIcon> = {
  efficacy: Stethoscope,
  team: Users,
  recovery: Clock,
  scarring: Sparkles,
  visualization: ScanEye,
  precision: Microscope,
  cosmetic: Activity,
  discharge: Gauge,
};
