import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Radiation,
  ScanSearch,
  ShieldPlus,
  Slice,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import { services, type ServiceIcon } from "@/content/pages/home";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { prefetchFor } from "@/lib/nav";
import "@/components/pages/home/icon-draw.css";

const icons: Record<ServiceIcon, LucideIcon> = {
  scalpel: Slice,
  robot: Bot,
  syringe: Syringe,
  radiation: Radiation,
  immune: ShieldPlus,
  screening: ScanSearch,
};

/**
 * The card's action: a text link whose hit area (::after) covers the whole card. Phones: the
 * label is read by screen readers only (the corner arrow shows the card is a link) and the link
 * takes no room.
 */
const action = {
  className:
    "mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-[15px] font-semibold text-accent after:absolute after:inset-0 after:rounded-2xl after:content-[''] hover:text-accent-hover max-md:min-h-0 max-md:pt-0",
  arrowClassName: "size-4 transition-transform duration-300 ease-out-expo group-hover/card:translate-x-1 max-md:hidden",
  labelClassName: "max-md:sr-only",
};

/**
 * 5 · #services: the 6 services as icon cards (3×2 desktop, 2 columns on tablets and phones). The
 * cards stagger in and each icon's line art draws itself (icon-draw.css). Surgical Oncology and
 * Robotic Surgery link to the robotic page; the others open the appointment form with
 * "Consultation" preselected and the service's name as the note.
 * Phones: compact tiles (icon and name; the one-liners from md), so all six fit on one screen.
 */
export function ServicesSection() {
  return (
    <Section id="services" tone="surface" aria-labelledby="services-title" className="max-md:py-12">
      <Reveal>
        <SectionHeading id="services-title" title={services.title} emphasis={services.emphasis} />
      </Reveal>
      <Reveal
        as="ul"
        stagger
        className="mt-7 grid grid-cols-2 gap-3 md:mt-12 md:gap-5 lg:grid-cols-3 lg:gap-6"
        itemClassName="icon-draw-in"
      >
        {services.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <div
              key={item.name}
              className="group/card relative flex h-full flex-col rounded-2xl bg-surface-alt p-4 ring-1 ring-line hover:ring-accent/30 max-md:has-focus-visible:ring-2 max-md:has-focus-visible:ring-accent md:p-7"
            >
              <span
                aria-hidden="true"
                className="grid size-11 place-items-center rounded-xl bg-surface text-accent ring-1 shadow-soft-sm ring-line md:size-14 md:rounded-2xl"
              >
                <Icon className="icon-draw size-6 md:size-7" strokeWidth={1.75} />
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="absolute top-4 right-4 size-4 text-accent md:hidden"
                strokeWidth={1.75}
              />
              <h3 className="mt-3.5 font-display text-base leading-snug font-bold text-ink md:mt-6 md:text-xl">
                {item.name}
              </h3>
              <p className="mt-2 hidden text-[15px] leading-relaxed text-muted md:block">{item.body}</p>
              {/* Analytics: the action labels repeat across cards, so the label names the service. */}
              {item.action.kind === "link" ? (
                <Link
                  href={item.action.href}
                  prefetch={prefetchFor(item.action.href)}
                  data-cta={`${item.name}: ${item.action.label}`}
                  className={action.className}
                >
                  <span className={action.labelClassName}>{item.action.label}</span>
                  <ArrowRight className={action.arrowClassName} strokeWidth={1.75} aria-hidden="true" />
                </Link>
              ) : (
                <AppointmentButton
                  label={item.action.label}
                  service={item.action.service}
                  note={item.action.note}
                  cta={`${item.name}: ${item.action.label}`}
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
