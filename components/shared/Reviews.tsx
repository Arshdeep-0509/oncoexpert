import type { Review, SectionTone } from "@/content/types";
import { averageRating, reviewLabels } from "@/content/shared/reviews";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ReviewsCarousel, Stars } from "./ReviewsCarousel";

type ReviewsProps = {
  id?: string;
  tone?: SectionTone;
  title: string;
  /** This page's reviews, already ordered / filtered (reviewsFor). */
  reviews: readonly Review[];
};

/** #reviews: Google reviews (exact text) with a summary chip and the carousel. Shared by every page. */
export function Reviews({ id = "reviews", tone = "surface", title, reviews }: ReviewsProps) {
  const avg = averageRating(reviews);

  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <Reveal>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading id={`${id}-title`} title={title} className="max-w-[26ch]" />
          {/* Summary chip: count + computed average */}
          <p className="inline-flex min-h-11 items-center gap-2.5 self-start rounded-pill border border-line bg-surface px-4 py-2 shadow-soft-sm md:self-auto">
            <span className="font-display text-xl leading-none font-semibold text-ink tabular-nums">
              <span className="sr-only">{reviewLabels.a11y.average(avg)}</span>
              <span aria-hidden="true">{avg.toFixed(1)}</span>
            </span>
            <Stars rating={avg} />
            <span className="text-sm font-semibold text-muted">{reviewLabels.summary(reviews.length)}</span>
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-8 md:mt-6" delay={0.05}>
        <ReviewsCarousel reviews={reviews} />
      </Reveal>
    </Section>
  );
}
