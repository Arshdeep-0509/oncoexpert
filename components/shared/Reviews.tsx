import type { Review, SectionLook, SectionTone } from "@/content/types";
import { averageRating, reviewLabels } from "@/content/shared/reviews";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewsCarousel } from "@/components/shared/reviews/ReviewsCarousel";
import { Stars } from "@/components/shared/reviews/Stars";

type ReviewsProps = {
  id?: string;
  tone?: SectionTone;
  look?: SectionLook;
  title: string;
  /** This page's reviews, already ordered / filtered (reviewsFor). */
  reviews: readonly Review[];
};

/**
 * #reviews: Google reviews (exact text) in a carousel. Shared by every page.
 * soft: heading with a summary chip (count + computed average). classic: heading + arrows.
 */
export function Reviews({ id = "reviews", tone = "surface", look = "soft", title, reviews }: ReviewsProps) {
  const titleId = `${id}-title`;

  if (look === "classic") {
    return (
      <Section id={id} tone={tone} aria-labelledby={titleId} className="overflow-hidden">
        <ReviewsCarousel
          reviews={reviews}
          look="classic"
          heading={
            <h2 id={titleId} className="max-w-[22ch] type-h2 text-ink">
              {title}
            </h2>
          }
        />
      </Section>
    );
  }

  const avg = averageRating(reviews);
  return (
    <Section id={id} tone={tone} aria-labelledby={titleId}>
      <Reveal>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading id={titleId} title={title} className="max-w-[26ch]" />
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
