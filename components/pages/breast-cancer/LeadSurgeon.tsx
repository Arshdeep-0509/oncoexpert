import { surgeon } from "@/content/pages/breast-cancer";
import { DoctorCard } from "@/components/shared/DoctorCard";

/** 11 · #surgeon: the shared DoctorCard in the breast theme. */
export function LeadSurgeon() {
  return <DoctorCard id="surgeon" tone="warm" {...surgeon} />;
}
