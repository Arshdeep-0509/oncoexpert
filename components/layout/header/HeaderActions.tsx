"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/content/site";
import type { HeaderVariant } from "@/content/types";
import { cn, focusRing } from "@/lib/utils";
import { useAppointment } from "@/components/layout/AppointmentProvider";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { headerVariants } from "@/components/layout/header/header-variants";

type HeaderActionsProps = {
  current: string | null;
  onDark: boolean;
  variant: HeaderVariant;
  /** Where "For Appointment" points: "#appointment" on pages with the form. */
  appointmentHref: string;
};

/** Right side of the bar: call button, "For Appointment" (desktop) and the mobile menu. */
export function HeaderActions({ current, onDark, variant, appointmentHref }: HeaderActionsProps) {
  const v = headerVariants[variant];
  const { openAppointment } = useAppointment();

  const onAppointmentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!appointmentHref.startsWith("#")) return;
    e.preventDefault();
    openAppointment();
  };

  return (
    <div className="flex items-center gap-2 justify-self-end lg:gap-3">
      <a
        href={site.contact.phoneHref}
        aria-label={`${site.a11y.call} ${site.contact.phoneDisplay}`}
        className={cn(
          "grid place-items-center rounded-full border transition-colors duration-300",
          v.phone,
          onDark
            ? "border-white/25 text-white hover:border-white/50 hover:bg-white/10"
            : "border-line text-ink hover:border-accent/40 hover:text-accent",
        )}
      >
        <Phone className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
      </a>
      <Link
        href={appointmentHref}
        prefetch={false}
        onClick={onAppointmentClick}
        data-cta="header-appointment"
        className={cn(
          "group/cta hidden h-11 items-center gap-2 rounded-full bg-accent pr-4 pl-5 text-[15px] font-semibold text-white shadow-(--accent-shadow) transition-colors duration-300 hover:bg-accent-hover",
          v.cta,
        )}
      >
        {site.appointmentCta.label}
        <ArrowRight
          className="size-4 transition-transform duration-300 ease-out-expo group-hover/cta:translate-x-1"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </Link>
      <MobileMenu
        onDark={onDark}
        pathname={current}
        appointmentHref={appointmentHref}
        variant={variant}
        className={cn("lg:hidden", focusRing)}
      />
    </div>
  );
}
