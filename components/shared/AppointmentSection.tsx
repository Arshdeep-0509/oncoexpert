import { Mail, Phone } from "lucide-react";
import type { SectionTone } from "@/content/types";
import { site } from "@/content/site";
import { appointmentSection as copy } from "@/content/shared/sections";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { buttonClasses } from "@/components/ui/button";
import { LazyAppointmentForm } from "@/components/shared/appointment/LazyAppointmentForm";
import type { FormStyles } from "@/components/shared/appointment/form-ui";

/*
 * Mobile form rules: inputs 16px+ (no iOS zoom), 52px tall, labels above,
 * a big full-width submit, and nothing beside the form on phones.
 */
const formStyles: FormStyles = {
  input:
    "h-[52px] w-full rounded-[14px] border border-line bg-surface px-4 text-base text-ink transition-colors placeholder:text-muted/70 hover:border-accent/30 focus-visible:border-accent aria-[invalid=true]:border-destructive",
  select: "!h-[52px]",
  submit: buttonClasses({ className: "mt-1 min-h-14 w-full text-base disabled:opacity-70" }),
};

const contactCards = [
  { href: site.contact.phoneHref, value: site.contact.phoneDisplay, Icon: Phone, numeric: true },
  { href: site.contact.emailHref, value: site.contact.email, Icon: Mail, numeric: false },
];

type AppointmentSectionProps = {
  id?: string;
  tone?: SectionTone;
  /** Page name for the hidden "page" field and the email subject, e.g. "Breast Cancer". */
  page: string;
};

/**
 * #appointment: heading + phone/email cards + the appointment form (lazy-loaded).
 * Phones: heading, the phone and email cards ABOVE the form, then the form full width.
 */
export function AppointmentSection({ id = "appointment", tone = "alt", page }: AppointmentSectionProps) {
  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading id={`${id}-title`} eyebrow={copy.eyebrow} title={copy.heading} intro={copy.body} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
            {contactCards.map(({ href, value, Icon, numeric }) => (
              <li key={href}>
                <a
                  href={href}
                  className="group flex min-h-16 items-center gap-4 rounded-lg border border-line bg-surface p-4 shadow-soft-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-soft md:p-5"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      "min-w-0 font-display text-lg leading-snug break-words text-ink md:text-xl",
                      numeric && "tabular-nums",
                    )}
                  >
                    {value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <div className="rounded-xl border border-line bg-surface p-5 shadow-soft-lg sm:p-8 md:p-10">
            <h3 className="mb-6 font-display text-[1.5rem] leading-tight text-ink">{copy.form.title}</h3>
            <LazyAppointmentForm page={page} styles={formStyles} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
