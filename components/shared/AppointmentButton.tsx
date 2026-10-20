"use client";

import { ArrowRight } from "lucide-react";
import type { AppointmentService } from "@/content/site";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { APPOINTMENT_ID, useAppointment } from "@/components/layout/AppointmentProvider";

type AppointmentButtonProps = {
  label: string;
  service?: AppointmentService;
  /** Stored with the request, e.g. "Package request". */
  note?: string;
  variant?: ButtonVariant;
  /** Arrow after the label (nudges right on hover). */
  arrow?: boolean;
  fullWidthOnMobile?: boolean;
  className?: string;
};

/**
 * Opens the appointment form (scroll + preselected service + Name focused).
 * A real link to #appointment, so it still works before JS has loaded.
 */
export function AppointmentButton({ label, service, note, arrow = false, ...props }: AppointmentButtonProps) {
  const { openAppointment } = useAppointment();
  return (
    <Button
      href={`#${APPOINTMENT_ID}`}
      cta={label}
      icon={arrow ? ArrowRight : undefined}
      onClick={(e) => {
        e.preventDefault();
        openAppointment(service, note);
      }}
      {...props}
    >
      {label}
    </Button>
  );
}
