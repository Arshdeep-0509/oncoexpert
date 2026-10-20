"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/content/site";
import type { HeaderVariant } from "@/content/types";
import { cn, focusRing } from "@/lib/utils";
import { isActivePath } from "@/lib/nav";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { BurgerIcon } from "@/components/layout/burger-icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { socialIcons } from "@/components/ui/brand-icons";
import { serviceIcons, ICON_STROKE } from "@/components/layout/nav-icons";
import { useAppointment } from "@/components/layout/AppointmentProvider";
import { EASE_OUT_EXPO } from "@/components/ui/reveal";

export type MobileMenuSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string | null;
  appointmentHref: string;
  variant: HeaderVariant;
  /** Focus returns here when the sheet closes. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * Per-variant styles. "dark" is the robotic page's original drawer; "light" is the
 * full-screen blush sheet (420px max on tablets) with 22px / 56px rows and a contact card.
 */
const STYLE = {
  dark: {
    content: "w-[88vw] max-w-[400px] bg-white sm:max-w-[400px]",
    row: "min-h-14 text-xl",
    stagger: 0.05,
    serviceTile: "rounded-lg bg-accent/[0.07] ring-1 ring-accent/10",
    actions: "mt-6 grid gap-3",
    action: "h-14",
  },
  light: {
    content: "w-screen max-w-none bg-surface-alt sm:w-[420px] sm:max-w-[420px]",
    row: "min-h-14 text-[22px] leading-tight",
    stagger: 0.04,
    serviceTile: "rounded-[10px] bg-accent-soft",
    actions: "mt-6 grid gap-3 rounded-lg bg-surface p-4 shadow-soft-sm ring-1 ring-line",
    action: "min-h-14",
  },
} as const;

type StaggerItemProps = { i: number; step: number; reduce: boolean | null; children: React.ReactNode };

/** Menu rows slide in `step` seconds apart; no motion with prefers-reduced-motion. */
function StaggerItem({ i, step, reduce, children }: StaggerItemProps) {
  if (reduce) return <li>{children}</li>;
  const item: Variants = {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.12 + i * step } },
  };
  return (
    <motion.li variants={item} initial="hidden" animate="visible">
      {children}
    </motion.li>
  );
}

/** Close button glyph: mounts as a burger, then morphs into an X. */
function MorphingX() {
  const [morphed, setMorphed] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMorphed(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return <BurgerIcon open={morphed} />;
}

/** The drawer itself; loaded on demand by MobileMenu (first tap / hover / focus). */
export default function MobileMenuSheet({
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
  const s = STYLE[variant];

  // "For Appointment" on a page with the form: close first (Radix then unlocks scrolling),
  // then scroll to the form from onCloseAutoFocus.
  const onAppointmentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!appointmentHref.startsWith("#")) {
      setOpen(false);
      return;
    }
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
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line pr-3 pl-5 data-[variant=dark]:h-[68px]" data-variant={variant}>
          <SheetTitle className="sr-only">{site.a11y.menuTitle}</SheetTitle>
          <SheetClose asChild>
            <Link href="/" aria-label={site.a11y.home} className="rounded-lg">
              <Image
                src={site.logo.src}
                alt={site.logo.alt}
                width={site.logo.width}
                height={site.logo.height}
                sizes="140px"
                className="blend-on-light h-8 w-auto"
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
                    <Accordion type="single" collapsible>
                      <AccordionItem value="services" className="border-b-0">
                        <AccordionTrigger
                          className={cn(
                            rowLink,
                            "items-center py-0 hover:no-underline [&>svg]:size-5 [&>svg]:translate-y-0 [&>svg]:text-muted",
                            focusRing,
                          )}
                        >
                          {navItem.label}
                        </AccordionTrigger>
                        <AccordionContent className="pb-3">
                          <ul className="grid gap-0.5">
                            {navItem.children.map((child) => {
                              const Icon = serviceIcons[child.icon];
                              const current = isActivePath(pathname, child.href);
                              return (
                                <li key={child.href}>
                                  <SheetClose asChild>
                                    <Link
                                      href={child.href}
                                      prefetch={false}
                                      aria-current={current ? "page" : undefined}
                                      className="flex min-h-12 items-center gap-3 rounded-xl px-1.5 text-base font-medium text-ink transition-colors hover:bg-surface-alt"
                                    >
                                      <span className={cn("grid size-9 shrink-0 place-items-center", s.serviceTile)}>
                                        <Icon className="size-[17px] text-accent" strokeWidth={ICON_STROKE} aria-hidden="true" />
                                      </span>
                                      {child.label}
                                      {current && variant === "light" ? (
                                        <>
                                          <span aria-hidden="true" className="ml-auto size-2 shrink-0 rounded-full bg-accent" />
                                          <span className="sr-only">({site.a11y.youAreHere})</span>
                                        </>
                                      ) : null}
                                    </Link>
                                  </SheetClose>
                                </li>
                              );
                            })}
                            <li>
                              <SheetClose asChild>
                                <Link
                                  href={navItem.href}
                                  prefetch={false}
                                  className="flex min-h-12 items-center justify-between rounded-xl px-1.5 text-base font-semibold text-accent transition-colors hover:bg-surface-alt"
                                >
                                  {navItem.label}
                                  <ArrowRight className="size-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
                                </Link>
                              </SheetClose>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </StaggerItem>
                );
              }
              const current = isActivePath(pathname, navItem.href);
              return (
                <StaggerItem key={navItem.href} i={i} step={s.stagger} reduce={reduce}>
                  <SheetClose asChild>
                    <Link
                      href={navItem.href}
                      prefetch={false}
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
                prefetch={false}
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
