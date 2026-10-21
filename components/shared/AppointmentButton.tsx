"use client";

import { ArrowRight } from "lucide-react";
import type { AppointmentService } from "@/content/site";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { APPOINTMENT_ID, useAppointment } from "@/components/layout/AppointmentProvider";

/** A page's own link styling, used instead of the Button styles (e.g. the robotic pills). */
export type LinkLook = { className: string; arrowClassName: string };

type AppointmentButtonProps = {
  label: string;
  service?: AppointmentService;
  /** Stored with the request, e.g. "Package request". */
  note?: string;
  variant?: ButtonVariant;
  /** Bare link with these classes instead of a Button (label + optional arrow). */
  look?: LinkLook;
  /** Arrow after the label (nudges right on hover). */
  arrow?: boolean;
  fullWidthOnMobile?: boolean;
  className?: string;
};

/**
 * Opens the appointment form (scroll + preselected service + Name focused).
 * A real link to #appointment, so it still works before JS has loaded.
 */
export function AppointmentButton({ label, service, note, arrow = false, look, ...props }: AppointmentButtonProps) {
  const { openAppointment } = useAppointment();
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openAppointment(service, note);
  };

  if (look) {
    return (
      <a href={`#${APPOINTMENT_ID}`} data-cta={label} className={look.className} onClick={onClick}>
        {label}
        {arrow ? <ArrowRight className={look.arrowClassName} strokeWidth={1.75} aria-hidden="true" /> : null}
      </a>
    );
  }

  return (
    <Button href={`#${APPOINTMENT_ID}`} cta={label} icon={arrow ? ArrowRight : undefined} onClick={onClick} {...props}>
      {label}
    </Button>
  );
}
