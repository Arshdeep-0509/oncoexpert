"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import { appointmentSchema, type AppointmentInput } from "@/lib/appointment-schema";
import { submitAppointment } from "@/lib/appointment";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppointment } from "@/components/layout/AppointmentProvider";
import { Field } from "@/components/shared/appointment/Field";
import { formCopy as f, type FormStyles } from "@/components/shared/appointment/form";

type Status = "idle" | "success" | "error";

/** "YYYY-MM-DDTHH:mm" in the visitor's local time, for datetime-local min. */
const localNow = () => {
  const d = new Date();
  d.setSeconds(0, 0);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
};

type AppointmentFormProps = {
  /** Sent as a hidden field and in the email subject, e.g. "Breast Cancer". */
  page: string;
  styles: FormStyles;
};

/**
 * The appointment form of every page. react-hook-form + zod (shared schema with the
 * server action). Buttons anywhere on the page preselect the service and pass a note
 * through useAppointment(). Never reports success unless the request was delivered.
 */
export function AppointmentForm({ page, styles }: AppointmentFormProps) {
  const { service: requested, note, requestId } = useAppointment();
  const [status, setStatus] = React.useState<Status>("idle");
  const [minDate, setMinDate] = React.useState<string | undefined>(undefined);

  const empty = { name: "", phone: "", dateTime: "", company: "", page, note: "" };
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: empty,
    mode: "onTouched",
  });

  // "Now" is only known in the browser (and must not be read during prerender).
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMinDate(localNow()));
    return () => cancelAnimationFrame(id);
  }, []);

  // A CTA anywhere on the page preselects its service (and passes its note) here.
  React.useEffect(() => {
    if (requestId === 0) return;
    if (requested) setValue("service", requested, { shouldValidate: true, shouldDirty: true });
    setValue("note", note ?? "");
  }, [requestId, requested, note, setValue]);

  const onSubmit = handleSubmit(
    async (values) => {
      setStatus("idle");
      try {
        const result = await submitAppointment(values);
        if (result.ok) {
          setStatus("success");
          track({ event: "form_submit", status: "success", service: values.service, page });
          reset(empty);
        } else {
          setStatus("error");
          track({ event: "form_submit", status: "error", service: values.service, page });
        }
      } catch {
        setStatus("error");
        track({ event: "form_submit", status: "error", service: values.service, page });
      }
    },
    () => track({ event: "form_submit", status: "invalid", page }),
  );

  const describedBy = (name: keyof AppointmentInput) => (errors[name] ? `appt-${name}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <Field id="appt-name" label={f.name} error={errors.name?.message}>
        <input
          id="appt-name"
          type="text"
          autoComplete="name"
          className={styles.input}
          aria-invalid={!!errors.name}
          aria-describedby={describedBy("name")}
          {...register("name")}
        />
      </Field>

      <Field id="appt-phone" label={f.phone} error={errors.phone?.message}>
        <input
          id="appt-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={cn(styles.input, "tabular-nums")}
          aria-invalid={!!errors.phone}
          aria-describedby={describedBy("phone")}
          {...register("phone")}
        />
      </Field>

      <Field id="appt-service" label={f.service} error={errors.service?.message}>
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <Select value={field.value ?? ""} onValueChange={(v) => field.onChange(v)}>
              <SelectTrigger
                id="appt-service"
                ref={field.ref}
                onBlur={field.onBlur}
                aria-invalid={!!errors.service}
                aria-describedby={describedBy("service")}
                className={cn(styles.input, styles.select, "justify-between data-[placeholder]:text-muted")}
              >
                <SelectValue placeholder={f.servicePlaceholder} />
              </SelectTrigger>
              <SelectContent className="on-light rounded-xl">
                {f.services.map((s) => (
                  <SelectItem key={s} value={s} className="min-h-11 text-base">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field id="appt-datetime" label={f.dateTime} error={errors.dateTime?.message}>
        <input
          id="appt-datetime"
          type="datetime-local"
          min={minDate}
          className={cn(styles.input, "tabular-nums")}
          aria-invalid={!!errors.dateTime}
          aria-describedby={describedBy("dateTime")}
          {...register("dateTime")}
        />
      </Field>

      {/* Hidden context for the email */}
      <input type="hidden" {...register("page")} />
      <input type="hidden" {...register("note")} />

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="appt-company">{f.honeypot}</label>
        <input id="appt-company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <button type="submit" disabled={isSubmitting} data-cta={f.submit} className={styles.submit}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 motion-safe:animate-spin" strokeWidth={1.75} aria-hidden="true" />
            {f.sending}
          </>
        ) : (
          f.submit
        )}
      </button>

      <div aria-live="polite" role="status" className="empty:hidden">
        {status === "success" ? (
          <p className="flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/[0.05] p-4 text-ink">
            <CircleCheck className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
            {f.success}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="flex items-start gap-3 rounded-xl border border-destructive/25 bg-destructive/[0.05] p-4 text-ink">
            <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" strokeWidth={1.75} aria-hidden="true" />
            {f.error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
