"use client";

import * as React from "react";
import { APPOINTMENT_ID, useAppointment } from "@/components/layout/AppointmentProvider";
import { AppointmentFormPlaceholder } from "@/components/shared/appointment/AppointmentFormPlaceholder";
import { type FormStyles } from "@/components/shared/appointment/form";

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
      {ready ? (
        <React.Suspense fallback={<AppointmentFormPlaceholder styles={styles} />}>
          <AppointmentForm page={page} styles={styles} />
        </React.Suspense>
      ) : (
        <AppointmentFormPlaceholder styles={styles} />
      )}
    </div>
  );
}
