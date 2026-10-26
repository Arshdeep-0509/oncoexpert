import { approach } from "@/content/pages/colorectal-cancer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { ApproachCard } from "@/components/pages/colorectal-cancer/ApproachCard";
import { ApproachTap } from "@/components/pages/colorectal-cancer/ApproachTap";
import "@/components/pages/colorectal-cancer/approach.css";

/**
 * Bento placement. Desktop (4 columns): Robotic Surgery and Organ Preservation are the two tall
 * tiles in the middle, the four others at the corners (auto-placement in content order).
 * Tablet (2 columns): the two large ones span the row (dense flow pulls the next small card up).
 * Phones: a swipe row with peek and dots.
 */
const span = (large: boolean) => (large ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : undefined);

/** 2 · #approach "Precision Surgery, Compassionate Care": six cards, staggered in on reveal. */
export function Approach() {
  return (
    <Section id="approach" tone="alt" aria-labelledby="approach-title">
      <Reveal>
        <SectionHeading
          id="approach-title"
          title={approach.title}
          emphasis={approach.emphasis}
          intro={approach.intro}
          align="center"
        />
      </Reveal>

      <SwipeRow
        label={approach.a11y.cards}
        hint={approach.a11y.swipeHint}
        className="mt-10 md:mt-14"
        gridClassName="md:grid-flow-dense md:grid-cols-2 lg:grid-cols-4"
        itemClassName={approach.cards.map((card) => span("image" in card))}
      >
        {approach.cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.08} className="h-full">
            <ApproachCard card={card} />
          </Reveal>
        ))}
      </SwipeRow>
      <ApproachTap />
    </Section>
  );
}
