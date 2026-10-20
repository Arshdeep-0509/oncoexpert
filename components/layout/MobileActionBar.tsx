"use client";

import * as React from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { useInViewById } from "@/lib/use-element-by-id";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { useAppointment, APPOINTMENT_ID } from "@/components/layout/AppointmentProvider";

/** A viewport this much shorter than the window means the on-screen keyboard is open. */
const KEYBOARD_PX = 150;

const iconAction =
  "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-xs leading-none font-semibold text-ink transition-colors active:bg-surface-alt";

function useKeyboardOpen() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setOpen(window.innerHeight - vv.height > KEYBOARD_PX);
    vv.addEventListener("resize", update);
    return () => vv.removeEventListener("resize", update);
  }, []);
  return open;
}

/**
 * Phones only (under 768px): Call · WhatsApp · Book Appointment, fixed to the bottom edge
 * (64px + the home-indicator inset). It slides up once the hero has left the screen and
 * slides away while #appointment is on screen or the keyboard is open.
 */
export function MobileActionBar() {
  const { openAppointment } = useAppointment();
  const heroInView = useInViewById("hero");
  const appointmentInView = useInViewById(APPOINTMENT_ID);
  const keyboardOpen = useKeyboardOpen();

  // null = no such element on the page. The hero counts as "in view" until measured,
  // so the bar never flashes in over the hero on first paint.
  const [measured, setMeasured] = React.useState(false);
  React.useEffect(() => {
    const id = window.setTimeout(() => setMeasured(true), 300);
    return () => window.clearTimeout(id);
  }, []);
  const overHero = heroInView ?? !measured;
  const visible = !overHero && !appointmentInView && !keyboardOpen;

  return (
    <nav
      aria-label={site.a11y.actionBar}
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "on-light fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md backdrop-saturate-150 transition-transform duration-500 ease-out-expo md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto grid h-16 max-w-[480px] grid-cols-[64px_76px_1fr] items-center gap-1.5 px-[max(12px,env(safe-area-inset-left))]">
        <a href={site.contact.phoneHref} className={iconAction}>
          <Phone className="size-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
          {site.actionBar.call}
        </a>
        <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className={iconAction}>
          <span className="text-whatsapp">
            <WhatsappIcon size={20} />
          </span>
          {site.actionBar.whatsapp}
          <span className="sr-only">{site.a11y.newTab}</span>
        </a>
        <button
          type="button"
          onClick={() => openAppointment()}
          data-cta="action-bar-appointment"
          className="flex min-h-12 items-center justify-center gap-1.5 rounded-pill bg-accent px-3 text-sm font-semibold min-[390px]:text-[15px] whitespace-nowrap text-white shadow-(--accent-shadow) transition-colors active:bg-accent-hover"
        >
          <CalendarCheck className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden="true" />
          {site.actionBar.book}
        </button>
      </div>
    </nav>
  );
}
