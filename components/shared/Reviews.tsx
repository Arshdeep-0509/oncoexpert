import { ArrowUpRight } from "lucide-react";
import type { Cta, Review, SectionLook, SectionTone } from "@/content/types";
import { averageRating, reviewLabels } from "@/content/shared/reviews";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewsCarousel } from "@/components/shared/reviews/ReviewsCarousel";
import { GoogleMark } from "@/components/shared/reviews/GoogleMark";
import { Stars } from "@/components/shared/reviews/Stars";

type ReviewsProps = {
  id?: string;
  tone?: SectionTone;
  look?: SectionLook;
  /** One string, or the heading's lines (each starts a new line; a long one still wraps on phones). */
  title: string | readonly string[];
  /** This page's reviews, already ordered / filtered (reviewsFor). */
  reviews: readonly Review[];
  /** soft only: a link to the reviews on Google, under the carousel (opens in a new tab). */
  link?: Cta;
};

/** The heading's content: the string, or one block per line. */
function headingOf(title: string | readonly string[]) {
  if (typeof title === "string") return title;
  return title.map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}

/**
 * #reviews: Google reviews (exact text) in a carousel. Shared by every page.
 * soft: heading with a summary chip (count + computed average), optional link to Google. A heading
 * given as lines takes the full width (its longest line fits on one line from md), with the chip
 * under it; a string heading keeps the chip beside it.
 * classic: heading + arrows.
 */
export function Reviews({ id = "reviews", tone = "surface", look = "soft", title, reviews, link }: ReviewsProps) {
  const titleId = `${id}-title`;
  const inLines = typeof title !== "string";

  if (look === "classic") {
    return (
      <Section id={id} tone={tone} aria-labelledby={titleId} className="overflow-hidden">
        <ReviewsCarousel
          reviews={reviews}
          look="classic"
          heading={
            <h2 id={titleId} className="max-w-[22ch] type-h2 text-ink">
              {headingOf(title)}
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
        <div className={cn("flex flex-col gap-5", !inLines && "md:flex-row md:items-end md:justify-between")}>
          <SectionHeading id={titleId} title={headingOf(title)} className={inLines ? "max-w-none" : "max-w-[26ch]"} />
          {/* Summary chip: count + computed average */}
          <p
            className={cn(
              "inline-flex min-h-11 items-center gap-2.5 self-start rounded-pill border border-line bg-surface px-4 py-2 shadow-soft-sm",
              !inLines && "md:self-auto",
            )}
          >
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

      {link ? (
        <Reveal className="mt-6 flex justify-center md:mt-8 md:justify-start">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={link.label}
            className="group/link inline-flex min-h-11 items-center gap-2.5 font-semibold text-accent hover:text-accent-hover"
          >
            <GoogleMark />
            {link.label}
            <ArrowUpRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span className="sr-only"> {site.a11y.newTab}</span>
          </a>
        </Reveal>
      ) : null}
    </Section>
  );
}
