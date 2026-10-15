"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn, focusRing } from "@/lib/utils";
import { isActivePath } from "@/lib/nav";
import { Container } from "@/components/ui/container";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ActiveDot, navLinkClass } from "@/components/layout/nav-link";

const BAR_HEIGHT = 80;
const COMPACT_AFTER = 40;

type NavbarProps = {
  /** Where "For Appointment" points. On the Robotic Surgery page: "#appointment". */
  appointmentHref?: string;
  /**
   * Id of a dark hero the bar floats over (transparent mode).
   * Pass null on pages without one: the bar is then solid and reserves its own space.
   */
  heroId?: string | null;
};

export function Navbar({ appointmentHref = site.appointmentCta.href, heroId = "hero" }: NavbarProps) {
  const pathname = usePathname();
  const overlay = heroId !== null;
  const [overHero, setOverHero] = React.useState(overlay);
  const [compact, setCompact] = React.useState(false);

  // Shrink 80 → 68px after 40px of scroll.
  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCompact(window.scrollY > COMPACT_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // One IntersectionObserver on the hero switches transparent ↔ solid.
  React.useEffect(() => {
    if (!heroId) return;
    const hero = document.getElementById(heroId);
    if (!hero) {
      const id = requestAnimationFrame(() => setOverHero(false));
      return () => cancelAnimationFrame(id);
    }
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: `-${BAR_HEIGHT}px 0px 0px 0px`,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  const onDark = overHero;

  return (
    // The header box never changes size (0 when floating, 80px when solid), so
    // neither the mode switch nor the shrink can shift the page.
    <header className={cn("pointer-events-none sticky top-0 z-50", overlay ? "h-0" : "h-20")}>
      <div
        data-compact={compact}
        className={cn(
          "group/nav pointer-events-auto relative border-b transition-[height,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out-expo",
          compact ? "h-[68px]" : "h-20",
          onDark
            ? "on-dark border-transparent bg-transparent shadow-none"
            : "border-border bg-white/85 shadow-[0_1px_2px_rgb(10_22_40/0.04),0_12px_32px_-16px_rgb(10_22_40/0.18)] backdrop-blur-[14px] backdrop-saturate-150",
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
                className="blend-on-light h-9 w-auto transition-[height] duration-500 ease-out-expo group-data-[compact=true]/nav:h-8"
              />
            </span>
          </Link>

          {/* Desktop links */}
          <NavigationMenu viewport={false} aria-label={site.a11y.mainNav} className="hidden lg:flex">
            <NavigationMenuList className="gap-0.5">
              {site.nav.map((item) =>
                item.children ? (
                  <MegaMenu
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    items={item.children}
                    onDark={onDark}
                    pathname={pathname}
                  />
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      data-active={isActivePath(pathname, item.href)}
                      aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                      className={navLinkClass(onDark)}
                    >
                      {isActivePath(pathname, item.href) ? <ActiveDot onDark={onDark} /> : null}
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center gap-2 justify-self-end lg:gap-3">
            <a
              href={site.contact.phoneHref}
              aria-label={`${site.a11y.call} ${site.contact.phoneDisplay}`}
              className={cn(
                "grid size-11 place-items-center rounded-full border transition-colors duration-300",
                onDark
                  ? "border-white/25 text-white hover:border-white/50 hover:bg-white/10"
                  : "border-border text-ink hover:border-primary/40 hover:text-primary",
              )}
            >
              <Phone className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
            </a>
            <Link
              href={appointmentHref}
              prefetch={false}
              className="group/cta hidden h-11 items-center gap-2 rounded-full bg-primary pr-4 pl-5 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgb(0_61_174/0.2),0_8px_20px_-8px_rgb(0_61_174/0.5)] transition-colors duration-300 hover:bg-primary-hover md:inline-flex"
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
              pathname={pathname}
              appointmentHref={appointmentHref}
              className={cn("lg:hidden", focusRing)}
            />
          </div>
        </Container>

        <ScrollProgress />
      </div>
    </header>
  );
}
