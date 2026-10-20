"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/content/site";
import type { HeaderVariant } from "@/content/types";
import { cn, focusRing } from "@/lib/utils";
import { isActivePath } from "@/lib/nav";
import { useElementById } from "@/lib/use-element-by-id";
import { Container } from "@/components/ui/container";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useAppointment } from "@/components/layout/AppointmentProvider";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ActiveDot, navLinkClass } from "@/components/layout/nav-link";

/**
 * Per-variant sizes. "dark" is the robotic page's original bar (80 → 68px after 40px of
 * scroll, CTA from md); "light" is 64px on phones/tablets and 76 → 64px on desktop after
 * 24px of scroll, CTA on desktop only.
 */
const VARIANTS = {
  dark: {
    barPx: 80,
    compactAfter: 40,
    bar: "h-20",
    barCompact: "h-[68px]",
    logo: "h-9 group-data-[compact=true]/nav:h-8",
    cta: "md:inline-flex",
    phone: "size-11",
    activeDot: true,
  },
  light: {
    barPx: 76,
    compactAfter: 24,
    bar: "h-16 lg:h-[76px]",
    barCompact: "h-16",
    logo: "h-8 lg:h-9 lg:group-data-[compact=true]/nav:h-8",
    cta: "lg:inline-flex",
    phone: "size-12 lg:size-11",
    activeDot: false,
  },
} as const;

type SiteHeaderProps = {
  /**
   * "dark": floats over a dark hero with white text (robotic page).
   * "light": floats over a light hero with ink text (breast page).
   * Either way the bar turns solid once the hero has scrolled away.
   */
  variant?: HeaderVariant;
  /** Where "For Appointment" points: "#appointment" on pages with the form. */
  appointmentHref?: string;
  /** Nav item to mark as current. Defaults to the URL. */
  activeHref?: string;
  /**
   * Id of the hero the bar floats over (transparent mode).
   * Pass null on pages without one: the bar is then solid and reserves its own space.
   */
  heroId?: string | null;
};

export function SiteHeader({
  variant = "dark",
  appointmentHref = site.appointmentCta.href,
  activeHref,
  heroId = "hero",
}: SiteHeaderProps) {
  const pathname = usePathname();
  const current = activeHref ?? pathname;
  const v = VARIANTS[variant];
  const overlay = heroId !== null;
  const [overHero, setOverHero] = React.useState(overlay);
  const [compact, setCompact] = React.useState(false);
  const { openAppointment } = useAppointment();

  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const observer = React.useRef<IntersectionObserver | null>(null);

  // ONE IntersectionObserver, no scroll listeners. Its root starts below the bar, and it
  // watches (1) the hero: transparent ↔ solid, and (2) a sentinel spanning the first
  // `compactAfter` px of scroll just below the bar: once it has left, the bar is compact.
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === sentinelRef.current) setCompact(!entry.isIntersecting);
          else setOverHero(entry.isIntersecting);
        }
      },
      { rootMargin: `-${v.barPx}px 0px 0px 0px` },
    );
    observer.current = io;
    if (sentinelRef.current) io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [v.barPx]);

  // Track the hero element (it can mount after the header, or be replaced).
  const heroRef = React.useRef<HTMLElement | null>(null);
  useElementById(
    heroId,
    (hero) => {
      const io = observer.current;
      if (heroRef.current) io?.unobserve(heroRef.current);
      heroRef.current = hero;
      if (hero) io?.observe(hero);
      else setOverHero(false); // no hero on this page: solid bar
    },
    [pathname, v.barPx],
  );

  // Transparent while over the hero; white text only when that hero is dark.
  const transparent = overlay && overHero;
  const onDark = variant === "dark" && transparent;

  const onAppointmentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!appointmentHref.startsWith("#")) return;
    e.preventDefault();
    openAppointment();
  };

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 w-px"
        style={{ top: v.barPx, height: v.compactAfter }}
      />
      {/* The header box never changes size (0 when floating, the bar height when solid),
          so neither the mode switch nor the shrink can shift the page. */}
      <header className={cn("pointer-events-none sticky top-0 z-50", overlay ? "h-0" : v.bar)}>
        <div
          data-header-bar=""
          data-compact={compact}
          className={cn(
            "group/nav pointer-events-auto relative border-b transition-[height,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out-expo",
            compact ? v.barCompact : v.bar,
            transparent
              ? cn("border-transparent bg-transparent shadow-none", onDark && "on-dark")
              : "border-line bg-white/85 shadow-(--header-shadow) backdrop-blur-[14px] backdrop-saturate-150",
          )}
        >
          <Container className="flex h-full items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
            {/* Logo */}
            <Link href="/" aria-label={site.a11y.home} className="justify-self-start rounded-xl">
              <span
                className={cn(
                  "block rounded-xl px-2.5 py-1.5 transition-[background-color,box-shadow] duration-500",
                  onDark ? "bg-white shadow-[0_4px_16px_rgb(0_0_0/0.25)]" : "bg-transparent shadow-none",
                )}
              >
                <Image
                  src={site.logo.src}
                  alt={site.logo.alt}
                  width={site.logo.width}
                  height={site.logo.height}
                  sizes="150px"
                  loading="eager"
                  className={cn("blend-on-light w-auto transition-[height] duration-500 ease-out-expo", v.logo)}
                />
              </span>
            </Link>

            {/* Desktop links */}
            <NavigationMenu viewport={false} aria-label={site.a11y.mainNav} className="hidden lg:flex">
              <NavigationMenuList className="gap-0.5">
                {site.nav.map((item) => {
                  if (item.children) {
                    return (
                      <MegaMenu
                        key={item.href}
                        label={item.label}
                        href={item.href}
                        items={item.children}
                        onDark={onDark}
                        pathname={current}
                        variant={variant}
                      />
                    );
                  }
                  const active = isActivePath(current, item.href);
                  return (
                    <NavigationMenuItem key={item.href}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        data-active={active}
                        aria-current={active ? "page" : undefined}
                        className={navLinkClass(onDark)}
                      >
                        {active && v.activeDot ? <ActiveDot onDark={onDark} /> : null}
                        {item.label}
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Actions */}
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
          </Container>

          <ScrollProgress />
        </div>
      </header>
    </>
  );
}
