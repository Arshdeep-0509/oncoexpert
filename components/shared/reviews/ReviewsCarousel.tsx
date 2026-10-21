"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Review, SectionLook } from "@/content/types";
import { reviewLabels as L } from "@/content/shared/reviews";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { useAutoplayCarousel } from "@/lib/hooks/use-autoplay-carousel";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewCard, softReviewCard, type ReviewCardStyles } from "@/components/shared/reviews/ReviewCard";

const looks = {
  soft: {
    arrow:
      "grid size-12 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent/40 hover:text-accent",
    region: "-mx-(--gutter) overflow-hidden px-(--gutter) pb-2 md:mx-0 md:px-0",
    track: "-ml-4 flex touch-pan-y md:-ml-6",
    slide: "min-w-0 shrink-0 grow-0 basis-[92.6%] pl-4 md:basis-1/2 md:pl-6 lg:basis-1/3",
    dots: "mt-5 flex justify-center gap-1 md:hidden",
    dotButton: "grid size-8 place-items-center",
    dot: "size-2 rounded-full transition-[background-color,scale] duration-300",
    dotOn: "scale-125 bg-accent",
    dotOff: "bg-accent/25",
    card: softReviewCard,
  },
  classic: {
    arrow:
      "grid size-11 place-items-center rounded-full border border-border bg-white text-ink transition-colors hover:border-primary/40 hover:text-primary",
    // pb/-mb leave room for card shadows, which overflow-hidden would otherwise clip
    region: "mt-10 -mr-5 -mb-12 overflow-hidden pb-12 sm:mr-0",
    track: "-ml-5 flex touch-pan-y",
    slide: "min-w-0 flex-[0_0_90%] pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]",
    dots: "mt-8 flex justify-center gap-1",
    dotButton: "grid h-11 w-6 place-items-center",
    dot: "h-1.5 rounded-full transition-all duration-500",
    dotOn: "w-6 bg-primary",
    dotOff: "w-1.5 bg-muted/40",
    card: {
      card: "rounded-[22px] border border-border bg-white shadow-card",
      avatar: "bg-primary text-white",
    } satisfies ReviewCardStyles,
  },
} as const;

type ReviewsCarouselProps = {
  reviews: readonly Review[];
  look?: SectionLook;
  /** classic: the section heading, shown in one row with the arrows. */
  heading?: React.ReactNode;
};

/**
 * Embla carousel of review cards: 3 visible on desktop, 2 on tablets, ~1 on phones (the
 * next card peeks). Autoplay every 7s (never with reduced motion), pausing on hover or
 * focus (and touch, soft look).
 * soft: arrows above the cards from md, dots on phones. classic: arrows beside `heading`,
 * dots at every width.
 */
export function ReviewsCarousel({ reviews, look = "soft", heading }: ReviewsCarouselProps) {
  const s = looks[look];
  const { emblaRef, embla, selected, snaps } = useAutoplayCarousel({ pauseOnTouch: look === "soft" });

  const arrows = (
    <>
      <button type="button" aria-label={L.a11y.previous} onClick={() => embla?.scrollPrev()} className={s.arrow}>
        <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button type="button" aria-label={L.a11y.next} onClick={() => embla?.scrollNext()} className={s.arrow}>
        <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </>
  );

  const carousel = (
    <>
      <div
        ref={emblaRef}
        role="region"
        aria-roledescription={site.a11y.carousel}
        aria-label={L.a11y.region}
        className={s.region}
      >
        <div className={s.track}>
          {reviews.map((r, i) => (
            <div
              key={r.author}
              role="group"
              aria-roledescription={site.a11y.slide}
              aria-label={L.a11y.goTo(i + 1, reviews.length)}
              className={s.slide}
            >
              <ReviewCard review={r} styles={s.card} />
            </div>
          ))}
        </div>
      </div>

      <div className={s.dots}>
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={L.a11y.goTo(i + 1, snaps.length)}
            aria-current={i === selected ? "true" : undefined}
            onClick={() => embla?.scrollTo(i)}
            className={s.dotButton}
          >
            <span className={cn(s.dot, i === selected ? s.dotOn : s.dotOff)} />
          </button>
        ))}
      </div>
    </>
  );

  if (look === "classic") {
    return (
      <>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {heading}
          <div className="flex shrink-0 gap-2">{arrows}</div>
        </Reveal>
        {carousel}
      </>
    );
  }

  return (
    <div>
      <div className="mb-5 hidden justify-end gap-2 md:flex">{arrows}</div>
      {carousel}
    </div>
  );
}
