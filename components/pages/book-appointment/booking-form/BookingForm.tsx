"use client";

import * as React from "react";
import { ArrowRight, ChevronLeft, CircleAlert, Loader2 } from "lucide-react";
import { bookingForm as copy } from "@/content/pages/book-appointment";
import { appointmentSection } from "@/content/shared/sections";
import { appointmentSchema, type AppointmentInput } from "@/lib/appointment-schema";
import { submitAppointmentForm, type AppointmentFormState } from "@/lib/appointment";
import { track } from "@/lib/analytics";
import { localNow } from "@/lib/format";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { useAppointment } from "@/components/layout/AppointmentProvider";
import { Field } from "@/components/shared/appointment/Field";
import { styles } from "@/components/pages/book-appointment/booking-styles";
import { ServiceStep } from "@/components/pages/book-appointment/booking-form/ServiceStep";
import { SuccessPanel } from "@/components/pages/book-appointment/booking-form/SuccessPanel";
import { useKeyboardInset } from "@/components/pages/book-appointment/booking-form/use-keyboard-inset";

const f = appointmentSection.form;
const LAST = copy.steps.length - 1;

/** The fields each step owns, validated with the shared schema when leaving the step. */
const STEP_FIELDS = [["service"], ["dateTime"], ["name", "phone"]] as const;
type FieldName = (typeof STEP_FIELDS)[number][number];
type Errors = Partial<Record<FieldName, string>>;

const stepSchemas = [
  appointmentSchema.pick({ service: true }),
  appointmentSchema.pick({ dateTime: true }),
  appointmentSchema.pick({ name: true, phone: true }),
];

/** ?service=second-opinion → "Second Opinion" (also accepts the live site's "consulation"). */
const slug = (s: string) => s.toLowerCase().replace("consulation", "consultation").replace(/\s+/g, "-");
const serviceFromSlug = (value: string | null) => (value ? f.services.find((s) => slug(s) === slug(value)) : undefined);

const inputClass =
  "h-[52px] w-full rounded-[14px] border border-line bg-surface px-4 text-base text-ink transition-colors hover:border-accent/30 focus-visible:border-accent aria-[invalid=true]:border-destructive";

/** Keyframes of the invalid-step shake (transform only). */
const SHAKE: Keyframe[] = [0, -6, 6, -6, 6, -3, 0].map((x) => ({ transform: `translateX(${x}px)` }));

const initialState: AppointmentFormState = { result: null, values: {} };

/**
 * The booking page's form: the shared fields as three steps (service tiles → date/time → name
 * and phone), with a progress bar, Back without losing anything, inline errors with a shake,
 * and the same server action, email and analytics as every other page's form. The fields are
 * plain inputs inside one <form action>, so with JavaScript off it posts as a single step
 * (booking.css, scripting: none). `?service=<slug>` preselects a service.
 */
export function BookingForm({ page }: { page: string }) {
  const [state, formAction, pending] = React.useActionState(submitAppointmentForm, initialState);
  const [step, setStep] = React.useState(0);
  const [errors, setErrors] = React.useState<Errors>({});
  const [minDate, setMinDate] = React.useState<string | undefined>(undefined);
  /** True once the visitor has moved between steps (only then does a step's heading take focus). */
  const [interacted, setInteracted] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const keyboard = useKeyboardInset();
  const { service: requested, note, requestId } = useAppointment();

  const result = state.result;
  const serverErrors = result && !result.ok ? result.fieldErrors : undefined;
  const shownErrors: Errors = { ...firstOf(serverErrors), ...errors };
  const failed = result && !result.ok && result.reason !== "invalid";

  // Step changes driven by new inputs, adjusted while rendering (not in an effect):
  // a button elsewhere on the page (header, menu) opens step 1; a server-side field error
  // goes back to the first step that has one.
  const [seen, setSeen] = React.useState({ result, requestId });
  if (seen.result !== result || seen.requestId !== requestId) {
    setSeen({ result, requestId });
    let to: number | undefined;
    if (seen.requestId !== requestId && requestId > 0) to = 0;
    if (seen.result !== result && serverErrors) {
      const first = STEP_FIELDS.findIndex((fields) => fields.some((name) => serverErrors[name]));
      if (first >= 0) to = first;
    }
    if (to !== undefined) {
      setStep(to);
      setInteracted(true);
    }
  }

  const setService = React.useCallback((service: string | undefined) => {
    const radios = formRef.current?.elements.namedItem("service");
    if (service && radios instanceof RadioNodeList) radios.value = service;
  }, []);

  // "Now" is only known in the browser; a deep link (?service=…) preselects its service.
  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMinDate(localNow());
      setService(serviceFromSlug(new URLSearchParams(window.location.search).get("service")));
    });
    return () => cancelAnimationFrame(id);
  }, [setService]);

  // A button elsewhere on the page (header, menu) passes its service and note to the fields.
  React.useEffect(() => {
    if (requestId === 0) return;
    setService(requested ?? undefined);
    const noteInput = formRef.current?.elements.namedItem("note");
    if (noteInput instanceof HTMLInputElement) noteInput.value = note ?? "";
  }, [requestId, requested, note, setService]);

  // The server's answer, for analytics (the form itself may already be gone: success).
  const lastService = React.useRef("");
  React.useEffect(() => {
    if (result)
      track({ event: "form_submit", status: result.ok ? "success" : "error", service: lastService.current, page });
  }, [result, page]);

  // Each new step: its heading takes focus (screen readers read the question; Tab reaches the fields).
  React.useEffect(() => {
    if (interacted) document.getElementById(`bk-step-${step}`)?.focus({ preventScroll: true });
  }, [step, interacted]);

  const values = () => Object.fromEntries(new FormData(formRef.current!)) as Record<string, string>;

  /** Validates the step's fields; shows their errors and shakes the step if any. */
  const check = (index: number) => {
    const parsed = stepSchemas[index]!.safeParse(values());
    const next: Errors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const name = issue.path[0] as FieldName;
        next[name] ??= issue.message;
      }
    }
    // Every field of the step gets an entry (undefined = valid), so it also hides a server error.
    setErrors((e) => ({ ...e, ...Object.fromEntries(STEP_FIELDS[index]!.map((name) => [name, next[name]])) }));
    if (parsed.success) return true;
    shakeStep(index);
    track({ event: "form_submit", status: "invalid", page });
    const firstInvalid = STEP_FIELDS[index]!.find((name) => next[name]);
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
    requestAnimationFrame(() => el?.focus({ preventScroll: true }));
    return false;
  };

  /** A gentle shake of the step's content (transform only; none with reduced motion). */
  const shakeStep = (index: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    formRef.current
      ?.querySelector(`[data-step="${index}"] > div`)
      ?.animate(SHAKE, { duration: 420, easing: "cubic-bezier(0.36, 0.07, 0.19, 0.97)" });
  };

  const go = (to: number) => {
    setInteracted(true);
    setStep(to);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < LAST) {
      if (check(step)) go(step + 1);
      return;
    }
    const invalidStep = [0, 1, 2].find((i) => !stepSchemas[i]!.safeParse(values()).success);
    if (invalidStep !== undefined) {
      if (invalidStep !== step) go(invalidStep);
      check(invalidStep);
      return;
    }
    const data = new FormData(event.currentTarget);
    lastService.current = String(data.get("service") ?? "");
    React.startTransition(() => formAction(data));
  };

  // A typed-in fix clears that field's error.
  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const name = (event.target as HTMLInputElement).name as FieldName;
    if (shownErrors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  if (result?.ok) return <SuccessPanel />;

  const describedBy = (name: FieldName) => (shownErrors[name] ? `bk-${name}-error` : undefined);
  const v = state.values;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      onChange={onChange}
      noValidate
      aria-label={copy.a11y.form}
    >
      {/* Progress */}
      <div className={cn(styles.jsOnly, "mb-6")}>
        <p className="mb-2.5 text-sm font-semibold text-muted tabular-nums" aria-live="polite">
          {copy.progress(step + 1, copy.steps.length)}
        </p>
        <div className="h-1.5 overflow-hidden rounded-pill bg-accent-soft" aria-hidden="true">
          <div
            className={cn(styles.progressBar, "h-full rounded-pill bg-(image:--grad-cta)")}
            style={{ "--progress": (step + 1) / copy.steps.length } as React.CSSProperties}
          />
        </div>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track} style={{ "--step": step } as React.CSSProperties}>
          {/* 1 · Which service? */}
          <div className={styles.panel} data-step="0" data-active={step === 0 ? "" : undefined}>
            <div className="p-1">
              <ServiceStep
                titleId="bk-step-0"
                defaultValue={v.service}
                error={shownErrors.service}
                inputClass={inputClass}
              />
            </div>
          </div>

          {/* 2 · When? */}
          <div className={styles.panel} data-step="1" data-active={step === 1 ? "" : undefined}>
            <div className="p-1">
              <h3
                id="bk-step-1"
                tabIndex={-1}
                className={cn(styles.jsOnly, "mb-4 font-display text-xl font-bold text-ink outline-none md:text-2xl")}
              >
                {copy.steps[1].title}
              </h3>
              <Field id="bk-dateTime" label={f.dateTime} error={shownErrors.dateTime}>
                <input
                  id="bk-dateTime"
                  name="dateTime"
                  type="datetime-local"
                  min={minDate}
                  defaultValue={v.dateTime}
                  className={cn(inputClass, "tabular-nums")}
                  aria-invalid={!!shownErrors.dateTime}
                  aria-describedby={describedBy("dateTime") ?? "bk-dateTime-hint"}
                />
              </Field>
              <p id="bk-dateTime-hint" className={cn(styles.jsOnly, "mt-2 text-sm text-muted")}>
                {copy.steps[1].hint}
              </p>
            </div>
          </div>

          {/* 3 · Your details */}
          <div className={styles.panel} data-step="2" data-active={step === 2 ? "" : undefined}>
            <div className="grid gap-5 p-1">
              <h3
                id="bk-step-2"
                tabIndex={-1}
                className={cn(styles.jsOnly, "-mb-1 font-display text-xl font-bold text-ink outline-none md:text-2xl")}
              >
                {copy.steps[2].title}
              </h3>
              <Field id="bk-name" label={f.name} error={shownErrors.name}>
                <input
                  id="bk-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  defaultValue={v.name}
                  className={inputClass}
                  aria-invalid={!!shownErrors.name}
                  aria-describedby={describedBy("name")}
                />
              </Field>
              <Field id="bk-phone" label={f.phone} error={shownErrors.phone}>
                <input
                  id="bk-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  defaultValue={v.phone}
                  className={cn(inputClass, "tabular-nums")}
                  aria-invalid={!!shownErrors.phone}
                  aria-describedby={describedBy("phone")}
                />
              </Field>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden context for the email, and the honeypot (bots tend to fill it). */}
      <input type="hidden" name="page" defaultValue={page} />
      <input type="hidden" name="note" defaultValue="" />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="bk-company">{f.honeypot}</label>
        <input id="bk-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite" role="status" className="empty:hidden">
        {failed ? (
          <p className="mt-5 flex items-start gap-3 rounded-xl border border-destructive/25 bg-destructive/[0.05] p-4 text-ink">
            <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" strokeWidth={1.75} aria-hidden="true" />
            {f.error}
          </p>
        ) : null}
      </div>

      {/* Step buttons (sticky on phones, above the keyboard while it is open) */}
      <div className={cn(styles.navSlot, "mt-6")}>
        <div
          className={cn(
            styles.nav,
            "flex gap-3 rounded-pill max-md:bg-surface/95 max-md:p-1.5 max-md:ring-1 max-md:shadow-soft-lg max-md:ring-line",
          )}
          data-kb={keyboard > 0 ? "" : undefined}
          style={keyboard > 0 ? ({ "--kb": `${keyboard}px` } as React.CSSProperties) : undefined}
        >
          <button
            type="button"
            onClick={() => go(step - 1)}
            data-hidden={step === 0 ? "" : undefined}
            className={cn(
              styles.back,
              styles.jsOnly,
              buttonClasses({ variant: "secondary", className: "min-h-13 shrink-0 px-4" }),
            )}
          >
            <ChevronLeft className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
            {copy.back}
          </button>
          <button
            type="submit"
            data-hidden={step === LAST ? "" : undefined}
            className={cn(styles.next, styles.jsOnly, buttonClasses({ className: "min-h-13 flex-1 text-base" }))}
          >
            {copy.next}
            <ArrowRight className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="submit"
            disabled={pending}
            data-hidden={step === LAST ? undefined : ""}
            data-cta={f.submit}
            className={cn(styles.submit, buttonClasses({ className: "min-h-13 flex-1 text-base disabled:opacity-70" }))}
          >
            {pending ? (
              <>
                <Loader2 className="size-5 motion-safe:animate-spin" strokeWidth={1.75} aria-hidden="true" />
                {f.sending}
              </>
            ) : (
              f.submit
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

/** The server's field errors (lists) as one message per field. */
function firstOf(fieldErrors?: Partial<Record<keyof AppointmentInput, string[]>>): Errors {
  if (!fieldErrors) return {};
  const out: Errors = {};
  for (const [name, messages] of Object.entries(fieldErrors)) {
    if (messages?.[0]) out[name as FieldName] = messages[0];
  }
  return out;
}
