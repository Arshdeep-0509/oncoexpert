import { MessageCircleHeart } from "lucide-react";
import { survivors } from "@/content/pages/breast-cancer";
import { breastImages } from "@/content/pages/breast-cancer.images";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HeroPetals } from "./HeroPetals";
import { SurvivorsCollage } from "./SurvivorsCollage";
import "./hero.css"; // petal styles (bloom-petal*)

const pick = (key: keyof typeof breastImages) => {
  const img = breastImages[key];
  return { src: img.src, alt: img.alt, focal: img.focal };
};

/** 7 · #survivors: plum, white text. The emotional heart of the page. */
export function SurvivorsCircle() {
  const { details, detailLabels } = survivors;
  // PENDING DOCTOR details render only once filled in.
  const filled = (Object.keys(details) as (keyof typeof details)[]).filter((k) => details[k].trim() !== "");

  return (
    <Section id="survivors" tone="plum" aria-labelledby="survivors-title" className="overflow-hidden">
      {/* Faint petals drifting across (desktop, paused off-screen) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <HeroPetals />
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="lg:order-last">
          <SurvivorsCollage main={pick(survivors.images.main)} secondary={pick(survivors.images.secondary)} />
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            id="survivors-title"
            eyebrow={survivors.eyebrow}
            title={survivors.title}
            emphasis={survivors.emphasis}
            onDark
          />
          <p className="measure mt-6 font-display text-[1.3rem] leading-relaxed text-white/90 md:text-[1.5rem]">
            {survivors.body}
          </p>

          {filled.length ? (
            <dl className="mt-6 grid gap-2 text-white/85">
              {filled.map((k) => (
                <div key={k} className="flex gap-2">
                  <dt className="font-semibold text-accent-glow">{detailLabels[k]}:</dt>
                  <dd>{details[k]}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-9">
            <Button
              href={survivors.cta.href}
              variant="onDark"
              leadingIcon={MessageCircleHeart}
              fullWidthOnMobile
              cta="survivors-whatsapp"
            >
              {survivors.cta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
