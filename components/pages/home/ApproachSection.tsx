import { approach } from "@/content/pages/home";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { ApproachPillars } from "@/components/pages/home/ApproachPillars";

/** The heading's last line with its emphasis word in the serif italic. */
function Line({ text, emphasis }: { text: string; emphasis: string }) {
  const at = text.indexOf(emphasis);
  if (at === -1) return <span className="block">{text}</span>;
  return (
    <span className="block">
      {text.slice(0, at)}
      <em className="font-serif font-normal text-accent-glow italic">{emphasis}</em>
      {text.slice(at + emphasis.length)}
    </span>
  );
}

/**
 * 8 · #approach "Fight Cancer with Clarity. Reclaim Life with Confidence." (navy band), after
 * #value and the reviews.
 * Desktop: sticky-scroll storytelling, the heading, body and button held on the left while the
 * 5 pillars scroll on the right (the one crossing the middle of the screen is active).
 * Phones: the heading block, then the pillars as a stacked list.
 */
export function ApproachSection() {
  const last = approach.title.length - 1;
  return (
    <Section id="approach" tone="plum" aria-labelledby="approach-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+56px)] lg:col-span-5 lg:self-start">
          <Reveal>
            <h2 id="approach-title" className="heading-2 text-white">
              {approach.title.map((line, i) =>
                i === last ? (
                  <Line key={line} text={line} emphasis={approach.emphasis} />
                ) : (
                  <span key={line} className="block">
                    {line}
                  </span>
                ),
              )}
            </h2>
            <p className="mt-5 measure text-white/75 md:mt-6 md:text-lg">{approach.body}</p>
            <AppointmentButton
              {...approach.cta}
              variant="onDark"
              arrow
              fullWidthOnMobile
              className="mt-8 max-md:min-h-[52px]"
            />
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <ApproachPillars pillars={approach.pillars} />
        </div>
      </div>
    </Section>
  );
}
