import { surgeon } from "@/content/pages/home";
import { homeImages } from "@/content/pages/home.images";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { DoctorRing } from "@/components/shared/DoctorRing";
import { JourneyTimeline } from "@/components/pages/home/JourneyTimeline";

/**
 * 2 · #surgeon "Meet Dr. Sunil Navalgund" (warm band). Desktop: the portrait in the gradient ring
 * with the four stat chips around it, on a navy panel (sticky while the right column scrolls) |
 * tagline, the Apex training text, the training-journey timeline and the booking button.
 * Phones: the panel first (stats 2×2 under the ring), then the same column.
 */
export function SurgeonSection() {
  return (
    <Section id="surgeon" tone="warm" aria-labelledby="surgeon-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
        <div className="lg:col-span-6">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <DoctorRing
              stats={surgeon.stats}
              label={surgeon.a11y.stats}
              photo={homeImages[surgeon.image]}
              head={homeImages.doctorHead}
            />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:pt-4">
          <Reveal>
            <SectionHeading id="surgeon-title" title={surgeon.heading.title} emphasis={surgeon.heading.emphasis} />
          </Reveal>

          {/* The tagline, in display type with an accent bar */}
          <Reveal className="mt-7 flex gap-4 md:mt-8 md:gap-5">
            <span aria-hidden="true" className="w-1 shrink-0 rounded-pill bg-(image:--grad-accent)" />
            <p className="font-display text-[clamp(1.35rem,2.6vw,1.9rem)] leading-snug font-semibold tracking-[-0.02em] text-ink">
              {surgeon.tagline}
            </p>
          </Reveal>

          <Reveal className="mt-10 md:mt-12">
            <h3 className="heading-3 text-ink">{surgeon.training.title}</h3>
            <p className="mt-3 measure text-muted">{surgeon.training.body}</p>
          </Reveal>

          <JourneyTimeline label={surgeon.journey.label} stops={surgeon.journey.stops} className="mt-8 md:mt-10" />

          <Reveal className="mt-10">
            <AppointmentButton {...surgeon.cta} arrow fullWidthOnMobile className="max-md:min-h-[52px]" />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
