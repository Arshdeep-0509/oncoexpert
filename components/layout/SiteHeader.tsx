"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import type { HeaderVariant } from "@/content/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { headerVariants } from "@/components/layout/header/header-variants";
import { useHeaderState } from "@/components/layout/header/use-header-state";
import { DesktopNav } from "@/components/layout/header/DesktopNav";
import { HeaderActions } from "@/components/layout/header/HeaderActions";

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
  const v = headerVariants[variant];
  const overlay = heroId !== null;
  const { sentinelRef, overHero, compact } = useHeaderState({ heroId, barPx: v.barPx, pathname });

  // Transparent while over the hero; white text only when that hero is dark.
  const transparent = overlay && overHero;
  const onDark = variant === "dark" && transparent;

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
                  className={cn("w-auto blend-on-light transition-[height] duration-500 ease-out-expo", v.logo)}
                />
              </span>
            </Link>

            <DesktopNav current={current} onDark={onDark} variant={variant} />

            <HeaderActions current={current} onDark={onDark} variant={variant} appointmentHref={appointmentHref} />
          </Container>

          <ScrollProgress />
        </div>
      </header>
    </>
  );
}
