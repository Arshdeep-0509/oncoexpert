import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { appointment } from "@/content/robotic-surgery";
import { cn } from "@/lib/utils";
import { pillPrimary } from "@/components/ui/buttons";

// Presentational pieces shared by the interactive form and its lightweight
// placeholder, so both render with identical size (no layout shift on swap).

export const formCopy = appointment.form;

export const inputClass =
  "h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-ink transition-colors placeholder:text-muted/70 hover:border-muted/50 focus-visible:border-primary aria-[invalid=true]:border-destructive";

export const submitClass = cn(pillPrimary, "mt-1 h-14 w-full disabled:opacity-70");

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
export function AppointmentFormPlaceholder() {
  const f = formCopy;
  return (
    <div className="grid gap-5" aria-busy="true">
      <Field id="appt-name" label={f.name}>
        <input id="appt-name" type="text" className={inputClass} readOnly />
      </Field>
      <Field id="appt-phone" label={f.phone}>
        <input id="appt-phone" type="tel" className={inputClass} readOnly />
      </Field>
      <Field id="appt-service" label={f.service}>
        <div id="appt-service" className={cn(inputClass, "flex items-center justify-between text-muted")}>
          {f.servicePlaceholder}
          <ChevronDownIcon className="size-4 opacity-50" aria-hidden="true" />
        </div>
      </Field>
      <Field id="appt-datetime" label={f.dateTime}>
        <input id="appt-datetime" type="datetime-local" className={inputClass} readOnly />
      </Field>
      <button type="button" disabled className={submitClass}>
        {f.submit}
      </button>
    </div>
  );
}
