"use client";

import { ArrowRight } from "lucide-react";
import type { AppointmentService } from "@/content/site";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { bookingHref } from "@/lib/booking";
import { useAppointment } from "@/components/layout/AppointmentProvider";

/** A page's own link styling, used instead of the Button styles (e.g. the robotic pills). */
export type LinkLook = { className: string; arrowClassName: string };

type AppointmentButtonProps = {
  label: string;
  service?: AppointmentService;
  /** Stored with the request, e.g. "Package request". */
  note?: string;
  /** Analytics label (cta_click) when the visible label repeats within a section. Default: `label`. */
  cta?: string;
  variant?: ButtonVariant;
  /** Bare link with these classes instead of a Button (label + optional arrow). */
  look?: LinkLook;
  /** Arrow after the label (nudges right on hover). */
  arrow?: boolean;
  fullWidthOnMobile?: boolean;
  className?: string;
};

/**
 * Opens the booking page with this button's service preselected and its note (openAppointment;
 * on the booking page itself it scrolls to the form instead). A real link to the booking page URL,
 * so it also works before JavaScript has loaded or when opened in a new tab.
 */
export function AppointmentButton({
  label,
  service,
  note,
  cta = label,
  arrow = false,
  look,
  ...props
}: AppointmentButtonProps) {
  const { openAppointment } = useAppointment();
  const href = bookingHref(service, note);
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openAppointment(service, note);
  };

  if (look) {
    return (
      <a href={href} data-cta={cta} className={look.className} onClick={onClick}>
        {label}
        {arrow ? <ArrowRight className={look.arrowClassName} strokeWidth={1.75} aria-hidden="true" /> : null}
      </a>
    );
  }

  return (
    <Button href={href} cta={cta} icon={arrow ? ArrowRight : undefined} onClick={onClick} {...props}>
      {label}
    </Button>
  );
}
