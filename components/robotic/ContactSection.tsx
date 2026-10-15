import { Mail, Phone } from "lucide-react";
import { appointment } from "@/content/robotic-surgery";
import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { LazyAppointmentForm } from "@/components/robotic/LazyAppointmentForm";

const contactCards = [
  { href: site.contact.phoneHref, value: site.contact.phoneDisplay, Icon: Phone, numeric: true },
  { href: site.contact.emailHref, value: site.contact.email, Icon: Mail, numeric: false },
];

export function ContactSection() {
  return (
    <Section id="appointment" tone="white">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal stagger className="lg:col-span-5">
          <Eyebrow>{appointment.eyebrow}</Eyebrow>
          <h2 className="type-h2 mt-4 text-ink">{appointment.heading}</h2>
          <p className="type-body mt-6 max-w-[46ch] text-muted">{appointment.body}</p>
          <ul className="mt-9 grid gap-4">
            {contactCards.map(({ href, value, Icon, numeric }) => (
              <li key={href}>
                <a
                  href={href}
                  className="group flex items-center gap-4 rounded-[20px] border border-border bg-white p-5 shadow-card transition-[border-color,box-shadow] duration-500 hover:border-primary/40 hover:shadow-card-hover"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/[0.07] text-primary ring-1 ring-primary/10 transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className={`min-w-0 font-display text-xl font-semibold break-words text-ink sm:text-2xl ${numeric ? "tabular-nums" : ""}`}>
                    {value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="rounded-[24px] border border-border bg-white p-6 shadow-[0_2px_4px_rgb(10_22_40/0.04),0_24px_60px_-24px_rgb(10_22_40/0.22)] sm:p-9">
            <h3 className="type-h3 mb-6 text-ink">{appointment.form.title}</h3>
            <LazyAppointmentForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
