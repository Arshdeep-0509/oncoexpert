"use client";

import { doctor } from "@/content/pages/robotic-surgery";
import { Section } from "@/components/robotic/ui/section";
import { Eyebrow } from "@/components/robotic/ui/eyebrow";
import { Reveal } from "@/components/robotic/ui/reveal";
import { pillPrimary } from "@/components/robotic/ui/buttons";
import { AppointmentButton } from "@/components/robotic/AppointmentButton";
import { ContentIconView } from "@/components/robotic/icons";
import { DoctorPortrait } from "@/components/shared/DoctorPortrait";

export function MeetTheDoctor() {
  const [lead, rest] = doctor.paragraphs;
  const img = doctor.image;

  return (
    <Section id="doctor" tone="surface" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <DoctorPortrait image={img} glowClassName="bg-teal/30" />
        </Reveal>

        <Reveal stagger className="lg:col-span-7">
          <Eyebrow>{doctor.eyebrow}</Eyebrow>
          <h2 className="type-h2 mt-4 text-ink">{doctor.heading}</h2>
          <p className="mt-6 text-[1.375rem] leading-[1.5] font-medium text-ink">{lead}</p>
          <p className="type-body mt-4 max-w-[60ch] text-muted">{rest}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {doctor.credentials.map((c) => (
              <div key={c.label} className="rounded-[20px] border border-border bg-white p-5 shadow-card">
                <dt className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/[0.07] text-primary ring-1 ring-primary/10">
                    <ContentIconView name={c.icon} className="size-5" />
                  </span>
                  <span className="type-eyebrow text-[11.5px] text-muted">{c.label}</span>
                </dt>
                <dd className="mt-2 pl-14 font-semibold text-ink">{c.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9">
            <AppointmentButton {...doctor.cta} className={pillPrimary} arrow />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
