"use client";

import { AppointmentForm as SharedAppointmentForm } from "@/components/shared/appointment/AppointmentForm";
import { roboticFormStyles } from "@/components/robotic/appointment-form-ui";

/** The shared appointment form with the robotic page's styles. */
export function AppointmentForm() {
  return <SharedAppointmentForm page="Robotic Surgery" styles={roboticFormStyles} />;
}
