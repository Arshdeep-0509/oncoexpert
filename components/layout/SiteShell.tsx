import * as React from "react";
import type { HeaderVariant, HeroTone, ThemeName } from "@/content/types";
import type { AppointmentService } from "@/content/site";
import { bookingHref } from "@/lib/booking";
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
  /** Bar sizes and layout: "dark" = the robotic page's original header, "light" = the shared one. */
  headerVariant: HeaderVariant;
  /** Tone of the hero under the transparent header (white text over "dark"). Defaults to headerVariant. */
  heroTone?: HeroTone;
  /** Nav item to mark as current, e.g. "/breast-cancer-treatment-bangalore/". Defaults to the URL. */
  activeHref?: string;
  /**
   * Where "For Appointment" points. Default: the booking page, with `defaultService` preselected. The
   * booking page passes "#appointment": its form is on the page, so the buttons scroll to it.
   */
  appointmentHref?: string;
  /** Service the booking form preselects for buttons that name none (menu, action bar). Default: none. */
  defaultService?: AppointmentService;
  /** Optional faint art in the footer corner. */
  footerArt?: FooterArt;
  /** Fixed Call · WhatsApp · Book bar on phones (the floating WhatsApp button then shows from md). */
  mobileActionBar?: boolean;
  /**
   * Hide the floating WhatsApp button under 768px. Default: when the action bar is on (it has its
   * own WhatsApp action). The booking page turns both off: its form's sticky step buttons sit there.
   */
  hideWhatsAppOnMobile?: boolean;
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
  heroTone = headerVariant,
  activeHref,
  appointmentHref,
  defaultService,
  footerArt,
  mobileActionBar = true,
  hideWhatsAppOnMobile = mobileActionBar,
  children,
}: SiteShellProps) {
  return (
    <div data-theme={theme} className="min-h-svh overflow-x-clip bg-surface text-text">
      <ThemeSync theme={theme} />
      <SkipLink />
      <AppointmentProvider defaultService={defaultService}>
        <TopBar variant={headerVariant} />
        <SiteHeader
          variant={headerVariant}
          heroTone={heroTone}
          appointmentHref={appointmentHref ?? bookingHref(defaultService)}
          activeHref={activeHref}
        />
        <main id="main">{children}</main>
        <SiteFooter
          art={footerArt}
          mobileLayout={headerVariant === "light" ? "accordion" : "stacked"}
          reserveActionBar={mobileActionBar}
        />
        {mobileActionBar ? <MobileActionBar /> : null}
        <WhatsAppButton hideOnMobile={hideWhatsAppOnMobile} />
      </AppointmentProvider>
    </div>
  );
}
