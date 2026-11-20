import { ArrowRight, Crosshair, Timer, type LucideIcon } from "lucide-react";
import { technology, type FeatureIcon } from "@/content/pages/urology";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { InView } from "@/components/ui/InView";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArmArt } from "@/components/pages/urology/ArmArt";
import "@/components/pages/urology/robotic-edge.css";

const icons: Record<FeatureIcon, LucideIcon> = { recovery: Timer, precision: Crosshair };

/** The feature text, with its `emphasis` words (the "40% faster") set in the accent. */
function FeatureText({ text, emphasis }: { text: string; emphasis?: string }) {
  const at = emphasis ? text.indexOf(emphasis) : -1;
  if (!emphasis || at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong className="font-semibold text-accent-glow tabular-nums">{emphasis}</strong>
      {text.slice(at + emphasis.length)}
    </>
  );
}

/**
 * 3 · #robotic-edge "TECHNOLOGICAL EDGE" on the dark pine band. Desktop: the heading and text, then
 * the two feature cards and the link, left; the arm drawing with the large "500+" right, across both.
 * Tablets and phones: heading and text, the arm with the figure, then the cards (side by side from
 * 640px) and the button (full width on phones).
 */
export function RoboticEdge() {
  const { stat } = technology;
  return (
    <Section id="robotic-edge" tone="plum" aria-labelledby="robotic-edge-title" className="relative overflow-hidden">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
        <div className="lg:col-span-7 lg:row-start-1">
          <SectionHeading
            id="robotic-edge-title"
            onDark
            eyebrow={technology.eyebrow}
            title={technology.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            intro={technology.body}
          />
        </div>

        <InView
          threshold={0.4}
          className="relative lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <div className="relative mx-auto max-w-[460px] rounded-[2rem] bg-white/[0.03] px-6 pt-6 pb-6 ring-1 ring-white/10 md:px-10 md:pt-10">
            <ArmArt />
            <p className="mt-2 flex flex-col">
              <span
                aria-hidden="true"
                className="font-display text-[clamp(3.5rem,14vw,5.5rem)] leading-none font-(--display-weight) tracking-(--display-tracking) text-white"
              >
                <Counter value={stat.value} suffix={stat.suffix} reserveWidth />
              </span>
              <span
                aria-hidden="true"
                className="mt-2 text-xs font-semibold tracking-[0.18em] text-accent-glow md:text-sm"
              >
                {stat.label}
              </span>
              <span className="sr-only">{technology.a11y.stat}</span>
            </p>
          </div>
        </InView>

        <div className="lg:col-span-7 lg:row-start-2">
          <Reveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:mt-10">
            {technology.features.map((f) => {
              const Icon = icons[f.icon];
              return (
                <article key={f.title} className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/12 md:p-6">
                  <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-accent-glow">
                    <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-(--display-weight) tracking-(--display-tracking) text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-white/75">
                    <FeatureText text={f.body.join(" ")} emphasis={"emphasis" in f ? f.emphasis : undefined} />
                  </p>
                </article>
              );
            })}
          </Reveal>

          <Button
            href={technology.link.href}
            variant="onDark"
            icon={ArrowRight}
            cta={technology.link.cta}
            fullWidthOnMobile
            className="mt-8 md:mt-10"
          >
            {technology.link.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
