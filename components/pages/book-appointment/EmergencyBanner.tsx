import { PhoneCall } from "lucide-react";
import { emergency } from "@/content/pages/book-appointment";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { at, styles } from "@/components/pages/book-appointment/booking-styles";

/**
 * #emergency: a high-visibility band inside the hero (phones: right after the form; desktop:
 * along the bottom of the hero). The hotline line verbatim and one big call button. The orange
 * ring on its phone icon pulses three times per 8s cycle; it stops with the hero's pause
 * button, off screen and while the button is hovered or focused.
 */
export function EmergencyBanner({ className }: { className?: string }) {
  return (
    <section
      id="emergency"
      aria-labelledby="emergency-title"
      className={cn(
        styles.step,
        styles.fadeUp,
        "relative overflow-hidden rounded-xl border border-highlight/30 bg-surface-warm p-5 shadow-soft-sm md:p-6 lg:px-8",
        className,
      )}
      style={at(2)}
    >
      {/* A logo-orange edge: decoration only */}
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-highlight" />
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="min-w-0">
          <h2
            id="emergency-title"
            className="flex items-center gap-2.5 text-sm font-bold tracking-[0.16em] text-ink uppercase"
          >
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-highlight" />
            {emergency.label}
          </h2>
          <p className="mt-2 text-base text-text md:text-lg">
            {emergency.lead}{" "}
            <a
              href={emergency.phone.href}
              className="font-semibold whitespace-nowrap text-ink tabular-nums underline-offset-4 hover:underline"
            >
              {emergency.phone.display}
            </a>
          </p>
        </div>
        <a
          href={emergency.phone.href}
          data-cta={emergency.button}
          className={cn(
            styles.call,
            buttonClasses({ className: "min-h-14 w-full shrink-0 gap-3 px-7 text-base md:w-auto" }),
          )}
        >
          <span className={cn(styles.ring, "grid size-8 place-items-center rounded-full bg-white/15")}>
            <PhoneCall className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="tabular-nums">{emergency.button}</span>
        </a>
      </div>
    </section>
  );
}
