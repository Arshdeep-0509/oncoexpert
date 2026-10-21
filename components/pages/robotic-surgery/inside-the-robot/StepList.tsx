import Image from "next/image";
import { insideTheRobot, type ShowcaseStep } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { bleedFade } from "@/lib/image-fade";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  baseBox,
  edgeFade,
  frameFor,
  spotlightGradient,
  steps,
  type Size,
} from "@/components/pages/robotic-surgery/inside-the-robot/geometry";

/** Reduced-motion card image: the same framing as the scroll tour, in a fixed 4:3 card. */
const CARD: Size = { w: 400, h: 300 };

function StepCardImage({ step }: { step: ShowcaseStep }) {
  const f = frameFor(step, CARD);
  const box = baseBox(step.image, CARD);
  const boxStyle = {
    width: `${(box.w / CARD.w) * 100}%`,
    height: `${(box.h / CARD.h) * 100}%`,
    left: `${50 - (box.w / CARD.w) * 50}%`,
    top: `${50 - (box.h / CARD.h) * 50}%`,
  };
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden", edgeFade)}>
      <div
        className="absolute"
        style={{ ...boxStyle, ...bleedFade(step.image), transform: `translate(${f.x}, ${f.y}) scale(${f.scale})` }}
      >
        <Image
          src={step.image.src}
          alt={step.image.alt}
          fill
          sizes="(min-width: 768px) 100vw, 200vw"
          className="object-contain"
        />
      </div>
      {step.spotlight ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ ...boxStyle, background: spotlightGradient(f.spot), boxShadow: "0 0 0 100vmax black" }}
        />
      ) : null}
    </div>
  );
}

/** Reduced motion: the tour as a plain list of cards, each framed like its scroll step. */
export function StepList() {
  return (
    <Container className="py-[72px]">
      <Eyebrow variant="classic" onDark>
        {insideTheRobot.eyebrow}
      </Eyebrow>
      <Reveal stagger className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s) => (
          <article key={s.number} className="overflow-hidden rounded-[22px] border border-white/10 bg-black">
            <StepCardImage step={s} />

            <div className="p-6">
              <p className="type-eyebrow text-glow tabular-nums">{s.number}</p>
              <h3 className="mt-2 type-h3 text-white">{s.title}</h3>
              <p className="mt-2 text-white/65">{s.body}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </Container>
  );
}
