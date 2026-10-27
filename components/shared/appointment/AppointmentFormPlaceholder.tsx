import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formCopy as f, type FormStyles } from "@/components/shared/appointment/form";
import { Field } from "@/components/shared/appointment/Field";

/**
 * Static stand-in shown until the interactive form's code has loaded
 * (it loads as the visitor approaches #appointment, or on any CTA click).
 * Same fields and sizes as the real form, so nothing shifts when it swaps.
 */
export function AppointmentFormPlaceholder({ styles }: { styles: FormStyles }) {
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
      <Field id="appt-date" label={f.date}>
        <input id="appt-date" type="date" className={styles.input} readOnly />
      </Field>
      <button type="button" disabled className={styles.submit}>
        {f.submit}
      </button>
    </div>
  );
}
