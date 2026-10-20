"use client";

import { ArrowRight } from "lucide-react";
import type { AppointmentService } from "@/content/pages/robotic-surgery";
import { APPOINTMENT_ID, useAppointment } from "@/components/robotic/AppointmentContext";
import { pillArrow } from "@/components/robotic/ui/buttons";

type AppointmentButtonProps = {
  label: string;
  service: AppointmentService;
  className: string;
  arrow?: boolean;
};

/** Scrolls to #appointment and preselects `service`. Plain anchor without JS. */
export function AppointmentButton({ label, service, className, arrow = false }: AppointmentButtonProps) {
  const { openAppointment } = useAppointment();
  return (
    <a
      href={`#${APPOINTMENT_ID}`}
      data-cta={label}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openAppointment(service);
      }}
    >
      {label}
      {arrow ? <ArrowRight className={pillArrow} strokeWidth={1.75} aria-hidden="true" /> : null}
    </a>
  );
}
