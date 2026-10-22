import Link from "next/link";
import { ArrowRight, Bot, Radiation, ScanSearch, ShieldPlus, Slice, Syringe, type LucideIcon } from "lucide-react";
import { services, type ServiceIcon } from "@/content/pages/home";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import "@/components/pages/home/icon-draw.css";

const icons: Record<ServiceIcon, LucideIcon> = {
  scalpel: Slice,
  robot: Bot,
  syringe: Syringe,
  radiation: Radiation,
  immune: ShieldPlus,
  screening: ScanSearch,
};

/** The card's action: a text link whose hit area (::after) covers the whole card. */
const action = {
  className:
    "mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-[15px] font-semibold text-accent after:absolute after:inset-0 after:rounded-2xl after:content-[''] hover:text-accent-hover",
  arrowClassName: "size-4 transition-transform duration-300 ease-out-expo group-hover/card:translate-x-1",
};

/**
 * 5 · #services: the 6 services as icon cards (3×2 desktop, 2 columns on tablets, stacked on
 * phones). The cards stagger in and each icon's line art draws itself (icon-draw.css). Surgical
 * Oncology and Robotic Surgery link to the robotic page; the others open the appointment form
 * with "Consultation" preselected and the service's name as the note.
 */
export function ServicesSection() {
  return (
    <Section id="services" tone="surface" aria-labelledby="services-title">
      <Reveal>
        <SectionHeading id="services-title" title={services.title} emphasis={services.emphasis} />
      </Reveal>
      <Reveal
        as="ul"
        stagger
        className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6"
        itemClassName="icon-draw-in"
      >
        {services.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <div
              key={item.name}
              className="group/card relative flex h-full flex-col rounded-2xl bg-surface-alt p-6 ring-1 ring-line hover:ring-accent/30 md:p-7"
            >
              <span
                aria-hidden="true"
                className="grid size-14 place-items-center rounded-2xl bg-surface text-accent ring-1 shadow-soft-sm ring-line"
              >
                <Icon className="icon-draw size-7" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 font-display text-xl leading-snug font-bold text-ink">{item.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.body}</p>
              {item.action.kind === "link" ? (
                <Link href={item.action.href} prefetch={false} className={action.className}>
                  {item.action.label}
                  <ArrowRight className={action.arrowClassName} strokeWidth={1.75} aria-hidden="true" />
                </Link>
              ) : (
                <AppointmentButton
                  label={item.action.label}
                  service={item.action.service}
                  note={item.action.note}
                  look={action}
                  arrow
                />
              )}
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
