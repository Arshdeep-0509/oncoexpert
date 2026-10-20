import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { appointmentSection } from "@/content/shared/sections";
import { cn } from "@/lib/utils";

// Presentational pieces shared by the interactive form and its lightweight
// placeholder, so both render with identical size (no layout shift on swap).

export const formCopy = appointmentSection.form;

/** Per-page field styling (the robotic page keeps its original classes). */
export type FormStyles = {
  input: string;
  /** Extra classes for the service <Select> trigger (height override). */
  select: string;
  submit: string;
};

export function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Static stand-in shown until the interactive form's code has loaded
 * (it loads as the visitor approaches #appointment, or on any CTA click).
 */
export function AppointmentFormPlaceholder({ styles }: { styles: FormStyles }) {
  const f = formCopy;
  return (
    <div className="grid gap-5" aria-busy="true">
      <Field id="appt-name" label={f.name}>
        <input id="appt-name" type="text" className={styles.input} readOnly />
      </Field>
      <Field id="appt-phone" label={f.phone}>
        <input id="appt-phone" type="tel" className={styles.input} readOnly />
      </Field>
      <Field id="appt-service" label={f.service}>
        <div id="appt-service" className={cn(styles.input, "flex items-center justify-between text-muted")}>
          {f.servicePlaceholder}
          <ChevronDownIcon className="size-4 opacity-50" aria-hidden="true" />
        </div>
      </Field>
      <Field id="appt-datetime" label={f.dateTime}>
        <input id="appt-datetime" type="datetime-local" className={styles.input} readOnly />
      </Field>
      <button type="button" disabled className={styles.submit}>
        {f.submit}
      </button>
    </div>
  );
}
