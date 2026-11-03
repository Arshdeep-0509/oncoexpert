"use client";

import type { AppointmentService } from "@/content/site";
import { track } from "@/lib/analytics";
import { AppointmentButton } from "@/components/shared/AppointmentButton";

type PackageCtaProps = {
  label: string;
  service: AppointmentService;
  name: string;
  note?: string;
  page: string;
  featured?: boolean;
};

/** A package card's button: opens booking with "Package: <name>" and sends package_select. */
export function PackageCta({ label, service, name, note, page, featured = false }: PackageCtaProps) {
  return (
    <span className="block" onClickCapture={() => track({ event: "package_select", label: name, page })}>
      <AppointmentButton
        label={label}
        service={service}
        note={note ?? `Package: ${name}`}
        cta={`${page}:packages:${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        variant={featured ? "primary" : "secondary"}
        arrow
        className="w-full justify-center"
      />
    </span>
  );
}
