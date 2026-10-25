import {
  Award,
  Building2,
  CalendarSync,
  Clock,
  FileSearch,
  Hospital,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { ReassuranceIcon, ServiceIcon } from "@/content/pages/book-appointment";

/** The icon keys of content/pages/book-appointment.ts, as lucide icons (stroke 1.75 in CSS). */
export const reassuranceIcons: Record<ReassuranceIcon, LucideIcon> = {
  clock: Clock,
  award: Award,
  building: Building2,
};

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  stethoscope: Stethoscope,
  "second-opinion": FileSearch,
  surgery: Hospital,
  "follow-up": CalendarSync,
};
