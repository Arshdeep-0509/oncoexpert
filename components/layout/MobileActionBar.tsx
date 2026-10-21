"use client";

import * as React from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { useInViewById } from "@/lib/hooks/use-element-by-id";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { useAppointment, APPOINTMENT_ID } from "@/components/layout/AppointmentProvider";

/** A viewport this much shorter than the window means the on-screen keyboard is open. */
const KEYBOARD_PX = 150;

const iconAction =
  "flex w-14 shrink-0 flex-col items-center justify-center gap-1 rounded-xl py-1 text-[11px] leading-none font-semibold text-ink/80 transition-colors active:bg-surface-alt";
const iconChip = "grid size-9 place-items-center rounded-full transition-transform active:scale-95";

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
 * Phones only (under 768px): a floating dock with Call · WhatsApp · Book Appointment.
 * It slides up once the hero has left the screen and then stays visible while scrolling in
 * either direction; it only steps away while #appointment is on screen (the form is right
 * there) or the keyboard is open. The Book pill sizes to its label, so it fits from 320px up.
 */
export function MobileActionBar() {
  const { openAppointment } = useAppointment();
  const heroInView = useInViewById("hero");
  const appointmentInView = useInViewById(APPOINTMENT_ID);
  const keyboardOpen = useKeyboardOpen();

  // null = no such element on the page. The hero counts as "in view" until measured,
  // so the dock never flashes in over the hero on first paint.
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
        "on-light fixed inset-x-2 bottom-[calc(8px+env(safe-area-inset-bottom))] z-40 transition-[translate,opacity] duration-300 ease-out-expo motion-reduce:transition-none md:hidden",
        visible ? "translate-y-0 opacity-100" : "translate-y-[calc(100%+24px)] opacity-0",
      )}
    >
      <div className="mx-auto flex h-[60px] max-w-[460px] items-center gap-1 rounded-[22px] bg-white/90 pr-2 pl-1.5 shadow-[0_12px_32px_-12px_rgb(var(--shadow-rgb)/0.4),0_2px_6px_rgb(var(--shadow-rgb)/0.08)] ring-1 ring-line backdrop-blur-md backdrop-saturate-150">
        <a href={site.contact.phoneHref} className={iconAction}>
          <span className={cn(iconChip, "bg-accent-soft text-accent")}>
            <Phone className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
          </span>
          {site.actionBar.call}
        </a>
        <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className={iconAction}>
          <span className={cn(iconChip, "bg-whatsapp text-white")}>
            <WhatsappIcon size={18} />
          </span>
          {site.actionBar.whatsapp}
          <span className="sr-only">{site.a11y.newTab}</span>
        </a>
        <button
          type="button"
          onClick={() => openAppointment()}
          data-cta="action-bar-appointment"
          className="cta-shine ml-auto flex h-11 items-center gap-1.5 rounded-pill bg-(image:--grad-cta) px-3.5 text-[12px] font-semibold whitespace-nowrap text-white shadow-(--cta-glow) transition-transform active:scale-[0.97] min-[360px]:px-4 min-[360px]:text-[13px]"
        >
          <CalendarCheck className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          {site.actionBar.book}
        </button>
      </div>
    </nav>
  );
}
