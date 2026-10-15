import {
  BedDouble,
  CalendarCheck,
  Cpu,
  Crosshair,
  DropletOff,
  HeartPulse,
  House,
  GraduationCap,
  Ruler,
  Stethoscope,
  Smile,
  Soup,
  Sparkles,
  Spline,
  Timer,
  Venus,
  Waves,
  Wind,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import { createElement } from "react";

/** Icon keys used in content/robotic-surgery.ts. */
export const contentIcons = {
  "droplet-off": DropletOff,
  "heart-pulse": HeartPulse,
  sparkles: Sparkles,
  house: House,
  timer: Timer,
  smile: Smile,
  cpu: Cpu,
  crosshair: Crosshair,
  ruler: Ruler,
  "bed-double": BedDouble,
  "calendar-check": CalendarCheck,
  waves: Waves,
  soup: Soup,
  spline: Spline,
  venus: Venus,
  wind: Wind,
  "graduation-cap": GraduationCap,
  stethoscope: Stethoscope,
} satisfies Record<string, LucideIcon>;

export type ContentIcon = keyof typeof contentIcons;

/** Renders the lucide icon for a content key (stroke width 1.75, decorative by default). */
export function ContentIconView({ name, ...props }: { name: string } & LucideProps) {
  return createElement(contentIcons[name as ContentIcon] ?? Sparkles, { strokeWidth: 1.75, "aria-hidden": true, ...props });
}
