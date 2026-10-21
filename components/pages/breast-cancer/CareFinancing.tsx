import Image from "next/image";
import { pricing } from "@/content/pages/breast-cancer";
import { breastImages } from "@/content/pages/breast-cancer.images";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { PriceCards } from "@/components/pages/breast-cancer/PriceCards";

/** 10 · #pricing */
export function CareFinancing() {
  const img = breastImages[pricing.plan.image];
  // A single setting picks the unit set: the doctor's document or the live site.
  const cards = pricing.cards.map((c) => ({ ...c, unit: pricing.unitSet === "live" ? c.unitLive : c.unit }));
  const { plan } = pricing;

  return (
    <Section id="pricing" tone="surface" aria-labelledby="pricing-title">
      <Reveal>
        <SectionHeading id="pricing-title" title={pricing.title} intro={pricing.intro} />
        <p className="mt-3 measure text-base font-semibold text-accent md:text-[1.0625rem]">{pricing.doctorLine}</p>
      </Reveal>

      <Reveal className="mt-10 md:mt-12" delay={0.05}>
        <PriceCards cards={cards} />
      </Reveal>

      {/* Plan CTA: ribbon-minimal as a soft background, white overlay on the text side */}
      <Reveal className="mt-10 md:mt-14" delay={0.05}>
        <div className="relative isolate overflow-hidden rounded-xl shadow-soft">
          <Image
            src={img.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 767px) 100vw, 1240px"
            className="-z-20 object-cover"
            style={{ objectPosition: img.focal }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-white/85 md:bg-transparent md:bg-linear-to-l md:from-white md:from-45% md:via-white/85 md:to-white/0"
          />
          <div className="flex flex-col items-start gap-5 p-7 md:ml-auto md:w-[58%] md:p-12">
            <h3 className="font-display text-[1.6rem] leading-tight text-ink md:text-[2rem]">{plan.title}</h3>
            <p className="text-base leading-relaxed text-text">{plan.body}</p>
            <AppointmentButton
              label={plan.cta.label}
              service={plan.cta.service}
              note={plan.cta.note}
              arrow
              fullWidthOnMobile
            />
            <p className="text-[15px] text-muted">
              {plan.contactLine}{" "}
              <a
                href={plan.contactLink.href}
                className="-my-3 inline-block py-3 font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-hover"
              >
                {plan.contactLink.label}
              </a>
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
