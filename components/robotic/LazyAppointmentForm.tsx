"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { APPOINTMENT_ID, useAppointment } from "@/components/robotic/AppointmentContext";
import { AppointmentFormPlaceholder } from "@/components/robotic/appointment-form-ui";

// The interactive form (react-hook-form + zod + Radix Select) is ~100 KB of JS the
// first screen doesn't need, so it loads as the visitor approaches #appointment.
const AppointmentForm = dynamic(() => import("@/components/robotic/AppointmentForm").then((m) => m.AppointmentForm), {
  ssr: false,
  loading: () => <AppointmentFormPlaceholder />,
});

export function LazyAppointmentForm() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const { requestId } = useAppointment();
  const ready = visible || requestId > 0;

  React.useEffect(() => {
    const el = ref.current;
    if (!el || ready) return;
    if (window.location.hash === `#${APPOINTMENT_ID}`) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: "1000px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  return <div ref={ref}>{ready ? <AppointmentForm /> : <AppointmentFormPlaceholder />}</div>;
}
