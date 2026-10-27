"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import { appointmentSchema, type AppointmentInput } from "@/lib/appointment-schema";
import { submitAppointment } from "@/lib/appointment";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { localToday } from "@/lib/format";
import { serviceFromSlug } from "@/lib/booking";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppointment } from "@/components/layout/AppointmentProvider";
import { Field } from "@/components/shared/appointment/Field";
import { formCopy as f, type FormStyles } from "@/components/shared/appointment/form";

type Status = "idle" | "success" | "error";

type AppointmentFormProps = {
  /** Sent as a hidden field and in the email subject, e.g. "Breast Cancer". */
  page: string;
  styles: FormStyles;
};

/**
 * The appointment form (the booking page's). react-hook-form + zod (shared schema with the
 * server action). Buttons on any page link here with ?service= and ?note=, which preselect the
 * service and carry the note. Never reports success unless the request was delivered.
 */
export function AppointmentForm({ page, styles }: AppointmentFormProps) {
  const { service: requested, note, requestId } = useAppointment();
  const [status, setStatus] = React.useState<Status>("idle");
  const [minDate, setMinDate] = React.useState<string | undefined>(undefined);

  const empty = { name: "", phone: "", date: "", company: "", page, note: "" };
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

  // "Today" is only known in the browser (and must not be read during prerender).
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMinDate(localToday()));
    return () => cancelAnimationFrame(id);
  }, []);

  // Arriving from another page's button: /book-your-appoinment-page/?service=…&note=… preselects
  // the service and carries the note (lib/booking.ts bookingHref).
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = serviceFromSlug(params.get("service"));
    if (fromUrl) setValue("service", fromUrl, { shouldDirty: true });
    const noteFromUrl = params.get("note");
    if (noteFromUrl) setValue("note", noteFromUrl.slice(0, 120));
    // The page the visitor came from, for the email ("Book Appointment via /colon-…/").
    const from = params.get("from");
    if (from?.startsWith("/")) setValue("page", `${page} via ${from.slice(0, 80)}`);
  }, [setValue, page]);

  // A CTA on the same page (the header's, on the booking page) preselects its service here.
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

      <Field id="appt-date" label={f.date} error={errors.date?.message}>
        <input
          id="appt-date"
          type="date"
          min={minDate}
          className={cn(styles.input, "tabular-nums")}
          aria-invalid={!!errors.date}
          aria-describedby={describedBy("date")}
          {...register("date")}
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
