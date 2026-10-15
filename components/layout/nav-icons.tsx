import { Activity, Droplets, Flower2, Ribbon, Soup, Venus, Waves, Wind, type LucideIcon } from "lucide-react";
import type { ServiceIcon } from "@/content/site";

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  breast: Ribbon,
  colorectal: Waves,
  endometrial: Venus,
  lung: Wind,
  urology: Droplets,
  stomach: Soup,
  ovarian: Flower2,
  thyroid: Activity,
};

export const ICON_STROKE = 1.75;
