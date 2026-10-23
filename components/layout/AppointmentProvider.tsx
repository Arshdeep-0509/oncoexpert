"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { site, type AppointmentService } from "@/content/site";
import { getLenis } from "@/lib/lenis";

/** Every page's appointment section uses this id. */
export const APPOINTMENT_ID = "appointment";

/** The appointment form gives its Name input this name attribute. */
const NAME_FIELD = 'input[name="name"]';

/** Gap left between the sticky header and the section when scrolling to it. */
const SCROLL_GAP = 16;

type AppointmentState = {
  /** Service to preselect in the appointment form. */
  service: AppointmentService | null;
  /** Optional note for the request, e.g. "Package request". */
  note: string | null;
  /** Increments on every request, so the form can react even when nothing else changed. */
  requestId: number;
};

type AppointmentContextValue = AppointmentState & {
  /**
   * Smooth-scrolls to #appointment (below the sticky header), preselects `service`,
   * stores `note` and focuses the Name field. Without #appointment on the page it
   * navigates to the booking page instead.
   */
  openAppointment: (service?: AppointmentService, note?: string) => void;
};

function headerOffset() {
  const bar = document.querySelector<HTMLElement>("[data-header-bar]");
  return (bar?.offsetHeight ?? 0) + SCROLL_GAP;
}

function scrollToTarget(target: HTMLElement) {
  const offset = headerOffset();
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: -offset });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }
  history.replaceState(null, "", `#${APPOINTMENT_ID}`);
}

/** The form may still be loading (it is code-split): wait up to ~2s for the Name field. */
function focusNameField(target: HTMLElement) {
  let frames = 0;
  const tick = () => {
    const input = target.querySelector<HTMLInputElement>(NAME_FIELD);
    if (input) input.focus({ preventScroll: true });
    else if (frames++ < 120) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const AppointmentContext = React.createContext<AppointmentContextValue>({
  service: null,
  note: null,
  requestId: 0,
  openAppointment: () => {
    const target = document.getElementById(APPOINTMENT_ID);
    if (target) scrollToTarget(target);
    else window.location.assign(site.appointmentCta.href);
  },
});

type AppointmentProviderProps = {
  /**
   * Preselected when a button names no service (header, menu, action bar) and none was chosen
   * before. Default: none, so the form keeps its "- Select -" placeholder.
   */
  defaultService?: AppointmentService;
  children: React.ReactNode;
};

/** Wraps every page (SiteShell). Header, action bar and page buttons all call openAppointment. */
export function AppointmentProvider({ defaultService, children }: AppointmentProviderProps) {
  const router = useRouter();
  const [state, setState] = React.useState<AppointmentState>({ service: null, note: null, requestId: 0 });

  const openAppointment = React.useCallback(
    (service?: AppointmentService, note?: string) => {
      const target = document.getElementById(APPOINTMENT_ID);
      if (!target) {
        router.push(site.appointmentCta.href);
        return;
      }
      setState((s) => ({
        service: service ?? s.service ?? defaultService ?? null,
        note: note ?? null,
        requestId: s.requestId + 1,
      }));
      scrollToTarget(target);
      focusNameField(target);
    },
    [router, defaultService],
  );

  const value = React.useMemo(() => ({ ...state, openAppointment }), [state, openAppointment]);
  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}

export const useAppointment = () => React.useContext(AppointmentContext);
