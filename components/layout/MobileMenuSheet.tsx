"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/content/site";
import type { HeaderVariant } from "@/content/types";
import { cn, focusRing } from "@/lib/utils";
import { isActivePath, prefetchFor } from "@/lib/nav";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { socialIcons } from "@/components/ui/brand-icons";
import { ICON_STROKE } from "@/components/layout/nav-icons";
import { useAppointment } from "@/components/layout/AppointmentProvider";
import { menuStyles } from "@/components/layout/mobile-menu/menu-styles";
import { StaggerItem } from "@/components/layout/mobile-menu/StaggerItem";
import { MorphingX } from "@/components/layout/mobile-menu/MorphingX";
import { ServicesAccordion } from "@/components/layout/mobile-menu/ServicesAccordion";

export type MobileMenuSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string | null;
  appointmentHref: string;
  variant: HeaderVariant;
  /** Focus returns here when the sheet closes. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

/** The drawer itself; loaded on demand by MobileMenu (first tap / hover / focus). */
export function MobileMenuSheet({
  open,
  onOpenChange: setOpen,
  pathname,
  appointmentHref,
  variant,
  triggerRef,
}: MobileMenuSheetProps) {
  const pendingAppointment = React.useRef(false);
  const reduce = useReducedMotion();
  const { openAppointment } = useAppointment();
  const s = menuStyles[variant];

  // "For Appointment": close first (Radix then unlocks scrolling), then openAppointment from
  // onCloseAutoFocus (the booking page, or on the booking page a scroll to its form).
  const onAppointmentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    pendingAppointment.current = true;
    setOpen(false);
  };

  const onCloseAutoFocus = (e: Event) => {
    e.preventDefault();
    if (!pendingAppointment.current) {
      triggerRef.current?.focus();
      return;
    }
    pendingAppointment.current = false;
    requestAnimationFrame(() => openAppointment());
  };

  const rowLink = cn(
    "flex items-center justify-between gap-3 rounded-lg font-semibold text-ink transition-colors hover:text-accent",
    s.row,
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        showCloseButton={false}
        aria-describedby={undefined}
        onCloseAutoFocus={onCloseAutoFocus}
        className={cn("on-light gap-0 border-l-0 p-0 data-[state=open]:duration-500", s.content)}
      >
        <div
          className="flex h-16 shrink-0 items-center justify-between border-b border-line pr-3 pl-5 data-[variant=dark]:h-[68px]"
          data-variant={variant}
        >
          <SheetTitle className="sr-only">{site.a11y.menuTitle}</SheetTitle>
          <SheetClose asChild>
            <Link href="/" aria-label={site.a11y.home} className="rounded-lg">
              <Image
                src={site.logo.src}
                alt={site.logo.alt}
                width={site.logo.width}
                height={site.logo.height}
                sizes="140px"
                className="h-8 w-auto blend-on-light"
              />
            </Link>
          </SheetClose>
          <SheetClose
            aria-label={site.a11y.closeMenu}
            className={cn(
              "grid place-items-center rounded-full text-ink hover:bg-surface-alt",
              variant === "dark" ? "size-11" : "size-12 hover:bg-accent-soft",
              focusRing,
            )}
          >
            <MorphingX />
          </SheetClose>
        </div>

        <nav
          aria-label={site.a11y.mobileNav}
          data-lenis-prevent
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pt-3 pb-[max(24px,env(safe-area-inset-bottom))]"
        >
          <ul className="divide-y divide-line border-b border-line">
            {site.nav.map((navItem, i) => {
              if (navItem.children) {
                return (
                  <StaggerItem key={navItem.href} i={i} step={s.stagger} reduce={reduce}>
                    <ServicesAccordion navItem={navItem} pathname={pathname} variant={variant} rowLink={rowLink} />
                  </StaggerItem>
                );
              }
              const current = isActivePath(pathname, navItem.href);
              return (
                <StaggerItem key={navItem.href} i={i} step={s.stagger} reduce={reduce}>
                  <SheetClose asChild>
                    <Link
                      href={navItem.href}
                      prefetch={prefetchFor(navItem.href)}
                      aria-current={current ? "page" : undefined}
                      className={cn(rowLink, current && "text-accent")}
                    >
                      {navItem.label}
                      {current ? <span aria-hidden="true" className="size-2 rounded-full bg-accent" /> : null}
                    </Link>
                  </SheetClose>
                </StaggerItem>
              );
            })}
          </ul>

          <ul className={s.actions}>
            <StaggerItem i={site.nav.length + 0} step={s.stagger} reduce={reduce}>
              <Link
                href={appointmentHref}
                prefetch={prefetchFor(appointmentHref)}
                onClick={onAppointmentClick}
                data-cta="menu-appointment"
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-white transition-colors hover:bg-accent-hover",
                  s.action,
                )}
              >
                {site.appointmentCta.label}
                <ArrowRight className="size-[18px]" strokeWidth={ICON_STROKE} aria-hidden="true" />
              </Link>
            </StaggerItem>
            <StaggerItem i={site.nav.length + 1} step={s.stagger} reduce={reduce}>
              <a
                href={site.contact.phoneHref}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full border border-line px-6 text-base font-semibold text-ink tabular-nums transition-colors hover:border-accent/40 hover:text-accent",
                  s.action,
                )}
              >
                <Phone className="size-[18px]" strokeWidth={ICON_STROKE} aria-hidden="true" />
                {site.contact.phoneDisplay}
              </a>
            </StaggerItem>
          </ul>

          <ul className="mt-6 flex gap-2" aria-label={site.socials.label}>
            {site.socials.links.map((social, i) => {
              const Icon = socialIcons[social.key];
              return (
                <StaggerItem key={social.key} i={site.nav.length + 2 + i} step={s.stagger} reduce={reduce}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} ${site.a11y.newTab}`}
                    className={cn(
                      "grid place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent/40 hover:text-accent",
                      variant === "dark" ? "size-11" : "size-12 bg-surface",
                    )}
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </StaggerItem>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
