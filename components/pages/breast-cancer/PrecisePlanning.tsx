import { planning } from "@/content/pages/breast-cancer";
import { breastImages, type BreastImageKey } from "@/content/pages/breast-cancer.images";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { PlanningSteps, type PlanningImage } from "@/components/pages/breast-cancer/PlanningSteps";

const toImage = (key: BreastImageKey): PlanningImage => {
  const img = breastImages[key];
  return { src: img.src, alt: img.alt, focal: img.focal };
};

// The unique step images, in order of first use (desktop crossfade frame).
const stepImages = Object.fromEntries(planning.steps.map((s) => [s.image, toImage(s.image)]));

/** 4 · #planning */
export function PrecisePlanning() {
  const { staging } = planning;

  return (
    <Section id="planning" tone="surface" aria-labelledby="planning-title">
      <PlanningSteps
        label={planning.a11y.steps}
        steps={planning.steps}
        images={stepImages}
        mobileImage={toImage(planning.mobileImage)}
        heading={
          <Reveal>
            <SectionHeading
              id="planning-title"
              eyebrow={planning.eyebrow}
              title={planning.title}
              intro={planning.intro}
            />
          </Reveal>
        }
      />

      {/* Staging: plum card, doctor's words as a quote */}
      <Reveal className="mt-16 md:mt-24">
        <div
          data-tone="plum"
          className="on-dark grid gap-10 overflow-hidden rounded-xl bg-ink bg-(image:--grad-plum) p-7 text-white shadow-soft-lg md:p-12 lg:grid-cols-2 lg:gap-16 lg:p-14"
        >
          <div>
            <h3 className="font-display text-[1.6rem] leading-tight md:text-[2rem]">{staging.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-[1.0625rem]">{staging.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {staging.roles.map((role) => (
                <li key={role}>
                  <Chip variant="onDark">{role}</Chip>
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative lg:border-l lg:border-white/15 lg:pl-16">
            <span
              aria-hidden="true"
              className="block font-display text-[5rem] leading-[0.7] text-accent-bright md:text-[6.5rem]"
            >
              “
            </span>
            <blockquote className="mt-2 font-display text-[1.2rem] leading-relaxed text-white italic md:text-[1.35rem]">
              {staging.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 text-sm font-semibold tracking-wide text-accent-glow">
              <span aria-hidden="true" className="h-px w-8 bg-accent-glow/60" />
              {staging.quoteBy}
            </figcaption>
          </figure>
        </div>
      </Reveal>
    </Section>
  );
}
