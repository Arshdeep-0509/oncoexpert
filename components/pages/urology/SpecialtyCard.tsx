import type { specialties } from "@/content/pages/urology";
import { cn } from "@/lib/utils";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { spStyles as s } from "@/components/pages/urology/specialties-styles";

type Item = (typeof specialties)["items"][number];

const protocolLook = {
  className:
    "group/cta inline-flex min-h-12 items-center gap-2 rounded-md text-sm font-semibold tracking-[0.1em] text-accent outline-none hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  arrowClassName:
    "size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 motion-reduce:transition-none",
};

/**
 * One specialty card: the ICD-10 chip (the marigold "RARE" chip for Urethral & Adrenal), the title,
 * the live text and "VIEW PROTOCOL" (the booking page, Consultation, "Protocol: <cancer>" as the
 * note: PENDING DOCTOR). Hovering it or focusing inside it selects it on the dashboard.
 */
export function SpecialtyCard({
  id,
  item,
  scheme,
  action,
  note,
  active,
  onPreview,
}: {
  id: string;
  item: Item;
  scheme: string;
  action: string;
  note: string;
  active: boolean;
  onPreview: () => void;
}) {
  return (
    <article
      id={id}
      data-active={active ? "" : undefined}
      onMouseEnter={onPreview}
      onFocus={onPreview}
      className={cn(s.card, "flex w-full flex-col rounded-2xl bg-surface p-5 ring-1 ring-line md:p-6")}
    >
      <div className="flex items-center justify-between gap-3">
        {"code" in item ? (
          <span className="inline-flex min-h-8 items-center gap-1.5 rounded-lg bg-accent-soft px-2.5 text-xs text-accent-hover">
            <span className="font-medium tabular-nums">{scheme}</span>
            <span className="font-bold tracking-wide tabular-nums">{item.code}</span>
          </span>
        ) : (
          <span className="inline-flex min-h-8 items-center rounded-lg bg-surface-warm px-2.5 text-xs font-bold tracking-[0.14em] text-ink ring-1 ring-highlight">
            {item.tag}
          </span>
        )}
        <span
          aria-hidden="true"
          className={cn("size-2 rounded-full transition-colors duration-300", active ? "bg-highlight" : "bg-line")}
        />
      </div>
      <h3 className="mt-4 font-display text-xl leading-snug font-(--display-weight) tracking-(--display-tracking) text-ink">
        {item.title}
      </h3>
      <p className="mt-2 text-base leading-relaxed text-muted">{item.body.join(" ")}</p>
      <div className="mt-auto pt-3">
        <AppointmentButton
          label={action}
          service="Consultation"
          note={note}
          cta={`urology:specialties:protocol-${item.key}`}
          look={protocolLook}
          arrow
        />
      </div>
    </article>
  );
}
