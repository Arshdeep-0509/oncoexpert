import { Mail, Phone } from "lucide-react";
import type { SectionLook, SectionTone } from "@/content/types";
import { site } from "@/content/site";
import { appointmentSection as copy } from "@/content/shared/sections";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { textStyles } from "@/components/ui/text-styles";
import { LazyAppointmentForm } from "@/components/shared/appointment/LazyAppointmentForm";
import type { FormStyles } from "@/components/shared/appointment/form";

/*
 * Mobile form rules: inputs 16px+ (no iOS zoom), 52px tall, labels above,
 * a big full-width submit, and nothing beside the form on phones.
 */
const softFormStyles: FormStyles = {
  input:
    "h-[52px] w-full rounded-[14px] border border-line bg-surface px-4 text-base text-ink transition-colors placeholder:text-muted/70 hover:border-accent/30 focus-visible:border-accent aria-[invalid=true]:border-destructive",
  select: "!h-[52px]",
  submit: buttonClasses({ className: "mt-1 min-h-14 w-full text-base disabled:opacity-70" }),
};

const looks = {
  soft: {
    grid: "gap-10",
    list: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4",
    card: "min-h-16 rounded-lg border-line bg-surface p-4 shadow-soft-sm duration-300 hover:border-accent/40 hover:shadow-soft md:p-5",
    icon: "rounded-[14px] bg-accent-soft text-accent duration-300 group-hover:bg-accent",
    value: "text-lg leading-snug md:text-xl",
    formDelay: 0.08,
    panel: "rounded-xl border-line bg-surface p-5 shadow-soft-lg sm:p-8 md:p-10",
    formTitle: "font-display text-[1.5rem] leading-tight",
  },
  classic: {
    grid: "gap-12",
    list: "mt-9 grid gap-4",
    card: "rounded-[20px] border-border bg-white p-5 shadow-card duration-500 hover:border-primary/40 hover:shadow-card-hover",
    icon: "rounded-2xl bg-primary/[0.07] text-primary ring-1 ring-primary/10 duration-500 group-hover:bg-primary",
    value: "text-xl font-semibold sm:text-2xl",
    formDelay: 0.1,
    panel:
      "rounded-[24px] border-border bg-white p-6 shadow-[0_2px_4px_rgb(10_22_40/0.04),0_24px_60px_-24px_rgb(10_22_40/0.22)] sm:p-9",
    formTitle: "type-h3",
  },
} as const;

const contactCards = [
  { href: site.contact.phoneHref, value: site.contact.phoneDisplay, Icon: Phone, numeric: true },
  { href: site.contact.emailHref, value: site.contact.email, Icon: Mail, numeric: false },
];

type AppointmentSectionProps = {
  id?: string;
  tone?: SectionTone;
  look?: SectionLook;
  /** Page name for the hidden "page" field and the email subject, e.g. "Breast Cancer". */
  page: string;
  /** Field + submit styles; default: the soft look's. */
  formStyles?: FormStyles;
};

/**
 * #appointment: heading + phone/email cards + the appointment form (lazy-loaded).
 * Phones: heading, the phone and email cards ABOVE the form, then the form full width.
 */
export function AppointmentSection({
  id = "appointment",
  tone = "alt",
  look = "soft",
  page,
  formStyles = softFormStyles,
}: AppointmentSectionProps) {
  const s = looks[look];
  const titleId = `${id}-title`;

  const cards = (
    <ul className={s.list}>
      {contactCards.map(({ href, value, Icon, numeric }) => (
        <li key={href}>
          <a
            href={href}
            className={cn("group flex items-center gap-4 border transition-[border-color,box-shadow]", s.card)}
          >
            <span
              className={cn(
                "grid size-12 shrink-0 place-items-center transition-colors group-hover:text-white",
                s.icon,
              )}
            >
              <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className={cn("min-w-0 font-display break-words text-ink", s.value, numeric && "tabular-nums")}>
              {value}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <Section id={id} tone={tone} aria-labelledby={titleId}>
      <div className={cn("grid lg:grid-cols-12 lg:gap-16", s.grid)}>
        {look === "classic" ? (
          <Reveal stagger className="lg:col-span-5">
            <Eyebrow variant="classic">{copy.eyebrow}</Eyebrow>
            <h2 id={titleId} className={textStyles.title.classic}>
              {copy.heading}
            </h2>
            <p className="mt-6 max-w-[46ch] type-body text-muted">{copy.body}</p>
            {cards}
          </Reveal>
        ) : (
          <Reveal className="lg:col-span-5">
            <SectionHeading id={titleId} eyebrow={copy.eyebrow} title={copy.heading} intro={copy.body} />
            {cards}
          </Reveal>
        )}

        <Reveal className="lg:col-span-7" delay={s.formDelay}>
          <div className={cn("border", s.panel)}>
            <h3 className={cn("mb-6 text-ink", s.formTitle)}>{copy.form.title}</h3>
            <LazyAppointmentForm page={page} styles={formStyles} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
