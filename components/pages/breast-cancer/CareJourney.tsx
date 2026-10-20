import Image from "next/image";
import { journey } from "@/content/pages/breast-cancer";
import { breastImages } from "@/content/pages/breast-cancer.images";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ScrollFillLine } from "@/components/ui/scroll-fill-line";
import { JourneyPath } from "./JourneyPath";

const pick = (key: keyof typeof breastImages) => {
  const img = breastImages[key];
  return { src: img.src, alt: img.alt, focal: img.focal };
};

/** 6 · #journey */
export function CareJourney() {
  const main = pick(journey.images.main);
  const inset = pick(journey.images.inset);
  const last = journey.steps.length - 1;

  return (
    <Section id="journey" tone="surface" aria-labelledby="journey-title">
      <Reveal>
        <SectionHeading id="journey-title" title={journey.title} align="center" />
      </Reveal>

      {/* Desktop: the horizontal path */}
      <div className="mt-16 hidden lg:block">
        <JourneyPath steps={journey.steps} main={main} inset={inset} label={journey.a11y.steps} />
      </div>

      {/* Phones / tablets: vertical timeline */}
      <div className="relative mx-auto mt-10 max-w-xl lg:hidden">
        <ScrollFillLine className="absolute top-5 bottom-5 left-[19px]" />
        <ol aria-label={journey.a11y.steps} className="relative grid gap-5">
          {journey.steps.map((step, i) => (
            <li key={step.title} className="relative pl-14">
              <span
                aria-hidden="true"
                className="absolute top-4 left-0 grid size-10 place-items-center rounded-full bg-accent font-display text-base font-semibold text-white shadow-(--accent-shadow) ring-4 ring-surface"
              >
                {i + 1}
              </span>
              <Reveal>
                <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-soft-sm">
                  {i === last ? (
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={main.src}
                        alt={main.alt}
                        fill
                        sizes="(max-width: 1023px) 90vw, 1px"
                        className="object-cover"
                        style={{ objectPosition: main.focal }}
                      />
                    </div>
                  ) : null}
                  <div className={i === last ? "bg-linear-to-br from-surface-alt to-accent-soft p-5" : "p-5"}>
                    <h3 className="font-display text-xl leading-snug text-ink">{step.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
