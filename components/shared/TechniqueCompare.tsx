import type { SectionTone, TechniqueSideContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CompareCard } from "@/components/shared/technique-compare/CompareCard";
import { CompareSwitch } from "@/components/shared/technique-compare/CompareSwitch";
import { OffscreenFlag } from "@/components/shared/technique-compare/OffscreenFlag";
import "@/components/shared/technique-compare/technique-compare.css";

type TechniqueCompareProps = {
  id: string;
  tone?: SectionTone;
  title: string;
  /** The two techniques, each with its image resolved to a PageImage. */
  sides: readonly [TechniqueSideContent, TechniqueSideContent];
  /** `vs`: the medallion's text; `tabs`: the switch's accessible name. */
  labels: { vs: string; tabs: string };
  /** Analytics prefix of the page, e.g. "lung" (technique_switch events). */
  page: string;
};

/**
 * Two techniques side by side (shared; first used on the lung page). Below lg: a tab switch with a
 * sliding pill and one panel that re-enters (CompareSwitch). Desktop: two tall cards with a "VS"
 * medallion between them that spins once; hovering one dims the other. A side with `drift` has a
 * slowly drifting photo (12s; stops on hover, off-screen and with reduced motion).
 * Server-rendered except the switch and the off-screen flag.
 */
export function TechniqueCompare({ id, tone = "surface", title, sides, labels, page }: TechniqueCompareProps) {
  return (
    <Section id={id} tone={tone} contained={false} aria-labelledby={`${id}-title`}>
      <OffscreenFlag />
      <Container>
        <SectionHeading id={`${id}-title`} title={title} align="center" />
        <div className="mt-10 lg:hidden">
          <CompareSwitch sides={sides} label={labels.tabs} page={page} />
        </div>
        <div className="tcx-duo relative mt-12 hidden grid-cols-2 gap-10 lg:grid">
          {sides.map((side) => (
            <CompareCard key={side.key} side={side} />
          ))}
          <InView
            threshold={1}
            className={cn("tcx-vs pointer-events-none absolute top-[calc(50%-36px)] left-1/2 z-10 -translate-x-1/2")}
          >
            <span
              aria-hidden="true"
              className="tcx-vsDisc grid size-[72px] place-items-center rounded-full bg-(image:--grad-accent) font-display text-xl font-semibold text-white ring-4 shadow-soft-lg ring-surface"
            >
              {labels.vs}
            </span>
          </InView>
        </div>
      </Container>
    </Section>
  );
}
