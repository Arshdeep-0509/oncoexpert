"use client";

import * as React from "react";
import { APPOINTMENT_ID, useAppointment } from "@/components/layout/AppointmentProvider";
import { AppointmentFormPlaceholder } from "@/components/shared/appointment/AppointmentFormPlaceholder";
import { CircleCheck } from "lucide-react";
import { formCopy, type FormStyles } from "@/components/shared/appointment/form";
import { SENT_ATTR, hasSent } from "@/components/shared/appointment/sent";

// The interactive form (react-hook-form + zod + Radix Select) is ~100 KB of JS the
// first screen doesn't need, so it loads as the visitor approaches #appointment.
// React.lazy (not next/dynamic) so the per-page placeholder can be the loading fallback:
// the placeholder has the form's exact size, so nothing shifts when it swaps.
const AppointmentForm = React.lazy(() =>
  import("@/components/shared/appointment/AppointmentForm").then((m) => ({ default: m.AppointmentForm })),
);

export function LazyAppointmentForm({ page, styles }: { page: string; styles: FormStyles }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const { requestId } = useAppointment();
  const ready = visible || requestId > 0;

  // Sent before on this device: keep the form hidden (the inline script already did this on a full
  // load; this covers arriving by client-side navigation).
  React.useEffect(() => {
    if (hasSent()) document.documentElement.setAttribute(SENT_ATTR, "");
  }, []);

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

  return (
    <div ref={ref}>
      {/* Shown instead of the form once this device has sent it (globals.css, data-appt-sent). */}
      <p
        role="status"
        className="appt-sent flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/[0.05] p-4 text-ink"
      >
        <CircleCheck className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
        {formCopy.sent}
      </p>
      <div className="appt-form">
        {ready ? (
          <React.Suspense fallback={<AppointmentFormPlaceholder styles={styles} />}>
            <AppointmentForm page={page} styles={styles} />
          </React.Suspense>
        ) : (
          <AppointmentFormPlaceholder styles={styles} />
        )}
      </div>
    </div>
  );
}
