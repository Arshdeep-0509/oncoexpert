import { Check } from "lucide-react";
import { bookingForm } from "@/content/pages/book-appointment";
import { appointmentSection } from "@/content/shared/sections";
import { cn } from "@/lib/utils";
import { serviceIcons } from "@/components/pages/book-appointment/icons";
import { styles } from "@/components/pages/book-appointment/booking-styles";

const f = appointmentSection.form;

type ServiceStepProps = {
  /** The step's heading id (focused when the step opens). */
  titleId: string;
  /** Preselected service (a no-JS POST that came back with an error refills it). */
  defaultValue?: string;
  error?: string;
  inputClass: string;
};

/**
 * Step 1, "Which service?": the four "Service Required" options as big radio tiles (2×2).
 * Without JavaScript the tiles are hidden and the shared form's native <select> takes their
 * place (inside <noscript>, so it only exists then). Both post as `service`.
 */
export function ServiceStep({ titleId, defaultValue, error, inputClass }: ServiceStepProps) {
  const errorId = error ? "bk-service-error" : undefined;
  return (
    <>
      <fieldset className={styles.jsOnly} aria-describedby={errorId}>
        <legend
          id={titleId}
          tabIndex={-1}
          className="mb-4 font-display text-xl font-bold text-ink outline-none md:text-2xl"
        >
          {bookingForm.steps[0].title}
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {f.services.map((service) => {
            const Icon = serviceIcons[bookingForm.serviceIcons[service]];
            return (
              <label
                key={service}
                className={cn(
                  styles.tile,
                  "relative flex min-h-[116px] cursor-pointer flex-col justify-between gap-3 rounded-lg border border-line bg-surface p-3.5 transition-colors hover:border-accent/50 sm:min-h-[128px] sm:p-4",
                )}
              >
                <input
                  type="radio"
                  name="service"
                  value={service}
                  defaultChecked={defaultValue === service}
                  className="sr-only"
                />
                <span
                  className={cn(
                    styles.tileIcon,
                    "grid size-11 place-items-center rounded-[14px] bg-accent-soft text-accent transition-colors",
                  )}
                >
                  <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-[15px] leading-snug font-semibold text-ink sm:text-base">{service}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    styles.tileCheck,
                    "absolute top-3 right-3 grid size-6 place-items-center rounded-full bg-accent text-white",
                  )}
                >
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <noscript>
        <label htmlFor="bk-service" className="mb-2 block text-sm font-semibold text-ink">
          {f.service}
        </label>
        <select
          id="bk-service"
          name="service"
          defaultValue={defaultValue ?? ""}
          className={inputClass}
          aria-invalid={!!error}
          aria-describedby={errorId}
        >
          <option value="">{f.servicePlaceholder}</option>
          {f.services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </noscript>

      {error ? (
        <p id="bk-service-error" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </>
  );
}
