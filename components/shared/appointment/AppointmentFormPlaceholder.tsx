"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceFromSlug } from "@/lib/booking";
import { formCopy as f, type FormStyles } from "@/components/shared/appointment/form";
import { Field } from "@/components/shared/appointment/Field";
import { appointmentDraft as draft } from "@/components/shared/appointment/draft";

/**
 * Stand-in shown until the interactive form's code has loaded (it loads as the visitor approaches
 * #appointment, or on any CTA click). Same fields and sizes as the real form, so nothing shifts when
 * it swaps. The text fields already take input: what is typed (and the field in focus) is kept in
 * `appointmentDraft` and carried into the real form. The service shows the one from ?service=.
 */
export function AppointmentFormPlaceholder({ styles }: { styles: FormStyles }) {
  const [service, setService] = React.useState<string | null>(null);
  React.useEffect(() => {
    const fromUrl = serviceFromSlug(new URLSearchParams(window.location.search).get("service"));
    const id = requestAnimationFrame(() => setService(fromUrl ?? null));
    return () => cancelAnimationFrame(id);
  }, []);

  const keep = (field: "name" | "phone" | "date") => ({
    defaultValue: draft[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      draft[field] = e.target.value;
    },
    onFocus: () => {
      draft.focus = `appt-${field}`;
    },
  });

  return (
    <div className="grid gap-5" aria-busy="true">
      <Field id="appt-name" label={f.name}>
        <input id="appt-name" type="text" autoComplete="name" className={styles.input} {...keep("name")} />
      </Field>
      <Field id="appt-phone" label={f.phone}>
        <input id="appt-phone" type="tel" autoComplete="tel" className={styles.input} {...keep("phone")} />
      </Field>
      <Field id="appt-service" label={f.service}>
        <div
          id="appt-service"
          className={cn(styles.input, "flex items-center justify-between", service ? "text-ink" : "text-muted")}
        >
          {service ?? f.servicePlaceholder}
          <ChevronDownIcon className="size-4 opacity-50" aria-hidden="true" />
        </div>
      </Field>
      <Field id="appt-date" label={f.date}>
        <input id="appt-date" type="date" className={styles.input} {...keep("date")} />
      </Field>
      <button type="button" disabled className={styles.submit}>
        {f.submit}
      </button>
    </div>
  );
}
