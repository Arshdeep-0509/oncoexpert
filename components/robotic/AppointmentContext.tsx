"use client";

import * as React from "react";
import type { AppointmentService } from "@/content/robotic-surgery";
import { getLenis } from "@/lib/lenis";

export const APPOINTMENT_ID = "appointment";

type AppointmentContextValue = {
  /** Service to preselect in the appointment form (step 5 reads this). */
  service: AppointmentService | null;
  /** Increments on every request, so the form can react even when the service is unchanged. */
  requestId: number;
  /** Smooth-scrolls to #appointment and preselects `service`. */
  openAppointment: (service?: AppointmentService) => void;
};

function scrollToAppointment() {
  const target = document.getElementById(APPOINTMENT_ID);
  if (!target) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target); // Lenis honours scroll-margin-top (96px, globals.css)
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
  history.replaceState(null, "", `#${APPOINTMENT_ID}`);
}

const AppointmentContext = React.createContext<AppointmentContextValue>({
  service: null,
  requestId: 0,
  openAppointment: () => scrollToAppointment(),
});

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<{ service: AppointmentService | null; requestId: number }>({
    service: null,
    requestId: 0,
  });

  const openAppointment = React.useCallback((service?: AppointmentService) => {
    setState((s) => ({ service: service ?? s.service, requestId: s.requestId + 1 }));
    scrollToAppointment();
  }, []);

  const value = React.useMemo(() => ({ ...state, openAppointment }), [state, openAppointment]);
  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}

export const useAppointment = () => React.useContext(AppointmentContext);
