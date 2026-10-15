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
import { useAppointment } from "@/components/robotic/AppointmentContext";
import { Field, formCopy as f, inputClass, submitClass } from "@/components/robotic/appointment-form-ui";

type Status = "idle" | "success" | "error";

/** "YYYY-MM-DDTHH:mm" in the visitor's local time, for datetime-local min. */
const localNow = () => {
  const d = new Date();
  d.setSeconds(0, 0);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
};

export function AppointmentForm() {
  const { service: requested, requestId } = useAppointment();
  const [status, setStatus] = React.useState<Status>("idle");
  const [minDate, setMinDate] = React.useState<string | undefined>(undefined);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { name: "", phone: "", dateTime: "", company: "" },
    mode: "onTouched",
  });

  // "Now" is only known in the browser (and must not be read during prerender).
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMinDate(localNow()));
    return () => cancelAnimationFrame(id);
  }, []);

  // A CTA anywhere on the page preselects its service here.
  React.useEffect(() => {
    if (requestId > 0 && requested) {
      setValue("service", requested, { shouldValidate: true, shouldDirty: true });
    }
  }, [requestId, requested, setValue]);

  const onSubmit = handleSubmit(
    async (values) => {
      setStatus("idle");
      try {
        const result = await submitAppointment(values);
        if (result.ok) {
          setStatus("success");
          track({ event: "form_submit", status: "success", service: values.service });
          reset({ name: "", phone: "", dateTime: "", company: "" });
        } else {
          setStatus("error");
          track({ event: "form_submit", status: "error", service: values.service });
        }
      } catch {
        setStatus("error");
        track({ event: "form_submit", status: "error", service: values.service });
      }
    },
    () => track({ event: "form_submit", status: "invalid" }),
  );

  const describedBy = (name: keyof AppointmentInput) => (errors[name] ? `appt-${name}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <Field id="appt-name" label={f.name} error={errors.name?.message}>
        <input
          id="appt-name"
          type="text"
          autoComplete="name"
          className={inputClass}
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
          className={cn(inputClass, "tabular-nums")}
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
                className={cn(inputClass, "!h-12 justify-between data-[placeholder]:text-muted")}
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
          className={cn(inputClass, "tabular-nums")}
          aria-invalid={!!errors.dateTime}
          aria-describedby={describedBy("dateTime")}
          {...register("dateTime")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="appt-company">{f.honeypot}</label>
        <input id="appt-company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <button type="submit" disabled={isSubmitting} data-cta={f.submit} className={submitClass}>
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
          <p className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/[0.05] p-4 text-ink">
            <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.75} aria-hidden="true" />
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
