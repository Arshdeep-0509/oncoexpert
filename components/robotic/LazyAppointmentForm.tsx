"use client";

import { LazyAppointmentForm as SharedLazyAppointmentForm } from "@/components/shared/appointment/LazyAppointmentForm";
import { roboticFormStyles } from "@/components/robotic/appointment-form-ui";

/** The shared (lazy-loaded) appointment form with the robotic page's styles. */
export function LazyAppointmentForm() {
  return <SharedLazyAppointmentForm page="Robotic Surgery" styles={roboticFormStyles} />;
}
