import * as React from "react";
import type { HeaderVariant, ThemeName } from "@/content/types";
import { ThemeSync } from "@/components/layout/ThemeSync";
import { SkipLink } from "@/components/layout/SkipLink";
import { TopBar } from "@/components/layout/TopBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter, type FooterArt } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { AppointmentProvider } from "@/components/layout/AppointmentProvider";

type SiteShellProps = {
  /** styles/themes/<theme>.css decides what every semantic token means on this page. */
  theme: ThemeName;
  /** "dark" over a dark hero (robotic page's original header), "light" over a light one. */
  headerVariant: HeaderVariant;
  /** Nav item to mark as current, e.g. "/breast-cancer-treatment-bangalore/". Defaults to the URL. */
  activeHref?: string;
  /**
   * Where "For Appointment" points. "#appointment" (default) on pages with the form: the
   * buttons then scroll to it. Elsewhere pass site.appointmentCta.href.
   */
  appointmentHref?: string;
  /** Optional faint art in the footer corner. */
  footerArt?: FooterArt;
  /** Fixed Call · WhatsApp · Book bar on phones (the floating WhatsApp button then shows from md). */
  mobileActionBar?: boolean;
  children: React.ReactNode;
};

/**
 * Header, page and footer of every rebuilt page, wrapped in <div data-theme>.
 * Server-rendered, so the theme applies on first paint with no flash.
 * Used once per page, in app/<slug>/layout.tsx. Everything inside can call
 * useAppointment().openAppointment().
 */
export function SiteShell({
  theme,
  headerVariant,
  activeHref,
  appointmentHref = "#appointment",
  footerArt,
  mobileActionBar = true,
  children,
}: SiteShellProps) {
  return (
    <div data-theme={theme} className="min-h-svh overflow-x-clip bg-surface text-text">
      <ThemeSync theme={theme} />
      <SkipLink />
      <AppointmentProvider>
        <TopBar variant={headerVariant} />
        <SiteHeader variant={headerVariant} appointmentHref={appointmentHref} activeHref={activeHref} />
        <main id="main">{children}</main>
        <SiteFooter
          art={footerArt}
          mobileLayout={headerVariant === "light" ? "accordion" : "stacked"}
          reserveActionBar={mobileActionBar}
        />
        {mobileActionBar ? <MobileActionBar /> : null}
        <WhatsAppButton hideOnMobile={mobileActionBar} />
      </AppointmentProvider>
    </div>
  );
}
