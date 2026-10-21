import {
  BedDouble,
  CalendarCheck,
  Cpu,
  Crosshair,
  DropletOff,
  HeartPulse,
  House,
  Ruler,
  Smile,
  Soup,
  Sparkles,
  Spline,
  Timer,
  Venus,
  Waves,
  Wind,
  type LucideIcon,
} from "lucide-react";

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
} satisfies Record<string, LucideIcon>;

export type ContentIcon = keyof typeof contentIcons;
