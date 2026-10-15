"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn, focusRing } from "@/lib/utils";
import { isActivePath } from "@/lib/nav";
import { getLenis } from "@/lib/lenis";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { BurgerIcon } from "@/components/layout/burger-icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { socialIcons } from "@/components/ui/brand-icons";
import { serviceIcons, ICON_STROKE } from "@/components/layout/nav-icons";
import { EASE_OUT_EXPO } from "@/components/ui/reveal";

export type MobileMenuSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string | null;
  appointmentHref: string;
  /** Focus returns here when the sheet closes. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const item: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.12 + i * 0.05 },
  }),
};

type StaggerItemProps = { i: number; reduce: boolean | null; children: React.ReactNode };

/** Menu rows slide in 0.05s apart; no motion with prefers-reduced-motion. */
function StaggerItem({ i, reduce, children }: StaggerItemProps) {
  if (reduce) return <li>{children}</li>;
  return (
    <motion.li custom={i} variants={item} initial="hidden" animate="visible">
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
export default function MobileMenuSheet({ open, onOpenChange: setOpen, pathname, appointmentHref, triggerRef }: MobileMenuSheetProps) {
  const pendingHash = React.useRef<string | null>(null);
  const reduce = useReducedMotion();

  // In-page targets (#appointment) scroll after the sheet has closed and unlocked scrolling.
  const onHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    pendingHash.current = href;
    setOpen(false);
  };

  const onCloseAutoFocus = (e: Event) => {
    const hash = pendingHash.current;
    if (!hash) {
      e.preventDefault();
      triggerRef.current?.focus();
      return;
    }
    pendingHash.current = null;
    e.preventDefault();
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target); // Lenis honours scroll-margin-top (96px, globals.css)
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", hash);
    });
  };

  const rowLink = cn(
    "flex min-h-14 items-center justify-between gap-3 rounded-lg text-xl font-semibold text-ink transition-colors hover:text-primary",
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        showCloseButton={false}
        aria-describedby={undefined}
        onCloseAutoFocus={onCloseAutoFocus}
        className="on-light w-[88vw] max-w-[400px] gap-0 border-l-0 bg-white p-0 sm:max-w-[400px] data-[state=open]:duration-500"
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-border pr-3 pl-5">
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
            className={cn("grid size-11 place-items-center rounded-full text-ink hover:bg-surface", focusRing)}
          >
            <MorphingX />
          </SheetClose>
        </div>

        <nav
          aria-label={site.a11y.mobileNav}
          data-lenis-prevent
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pt-3 pb-[max(24px,env(safe-area-inset-bottom))]"
        >
          <ul className="divide-y divide-border border-b border-border">
            {site.nav.map((navItem, i) => {
              if (navItem.children) {
                return (
                  <StaggerItem key={navItem.href} i={i} reduce={reduce}>
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
                                      className="flex min-h-12 items-center gap-3 rounded-xl px-1.5 text-base font-medium text-ink transition-colors hover:bg-surface"
                                    >
                                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/[0.07] ring-1 ring-primary/10">
                                        <Icon className="size-[17px] text-primary" strokeWidth={ICON_STROKE} aria-hidden="true" />
                                      </span>
                                      {child.label}
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
                                  className="flex min-h-12 items-center justify-between rounded-xl px-1.5 text-base font-semibold text-primary transition-colors hover:bg-surface"
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
                <StaggerItem key={navItem.href} i={i} reduce={reduce}>
                  <SheetClose asChild>
                    <Link
                      href={navItem.href}
                      prefetch={false}
                      aria-current={current ? "page" : undefined}
                      className={cn(rowLink, current && "text-primary")}
                    >
                      {navItem.label}
                      {current ? <span aria-hidden="true" className="size-2 rounded-full bg-primary" /> : null}
                    </Link>
                  </SheetClose>
                </StaggerItem>
              );
            })}
          </ul>

          <ul className="mt-6 grid gap-3">
            <StaggerItem i={site.nav.length + 0} reduce={reduce}>
              <Link
                href={appointmentHref}
                prefetch={false}
                onClick={(e) => (appointmentHref.startsWith("#") ? onHashClick(e, appointmentHref) : setOpen(false))}
                className="flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                {site.appointmentCta.label}
                <ArrowRight className="size-[18px]" strokeWidth={ICON_STROKE} aria-hidden="true" />
              </Link>
            </StaggerItem>
            <StaggerItem i={site.nav.length + 1} reduce={reduce}>
              <a
                href={site.contact.phoneHref}
                className="flex h-14 items-center justify-center gap-2 rounded-full border border-border px-6 text-base font-semibold text-ink tabular-nums transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Phone className="size-[18px]" strokeWidth={ICON_STROKE} aria-hidden="true" />
                {site.contact.phoneDisplay}
              </a>
            </StaggerItem>
          </ul>

          <ul className="mt-6 flex gap-2" aria-label={site.socials.label}>
            {site.socials.links.map((s, i) => {
              const Icon = socialIcons[s.key];
              return (
                <StaggerItem key={s.key} i={site.nav.length + 2 + i} reduce={reduce}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} ${site.a11y.newTab}`}
                    className="grid size-11 place-items-center rounded-full border border-border text-ink transition-colors hover:border-primary/40 hover:text-primary"
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
