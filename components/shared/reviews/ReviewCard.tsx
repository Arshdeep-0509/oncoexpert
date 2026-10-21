"use client";

import * as React from "react";
import type { Review } from "@/content/types";
import { reviewLabels } from "@/content/shared/reviews";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/shared/reviews/Stars";
import { GoogleMark } from "@/components/shared/reviews/GoogleMark";

/** Per-page card styling (the robotic page keeps its original card). */
export type ReviewCardStyles = { card: string; avatar: string };

export const softReviewCard: ReviewCardStyles = {
  card: "rounded-lg border border-line bg-surface shadow-soft-sm",
  avatar: "bg-accent-soft text-accent",
};

/** One Google review: initials avatar, stars, text clamped to 6 lines with Read more / less. */
export function ReviewCard({ review, styles = softReviewCard }: { review: Review; styles?: ReviewCardStyles }) {
  const [expanded, setExpanded] = React.useState(false);
  const [clamped, setClamped] = React.useState(false);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  // Only show "Read more" when the text actually overflows 6 lines.
  React.useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const check = () => setClamped(el.scrollHeight > el.clientHeight + 1);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <article className={cn("flex h-full flex-col p-6 sm:p-7", styles.card)}>
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn("grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold", styles.avatar)}
        >
          {initials(review.author)}
        </span>
        <div className="min-w-0">
          <h3 className="leading-snug font-semibold break-words text-ink">{review.author}</h3>
          <Stars rating={review.rating} />
        </div>
      </header>

      <div
        id={id}
        ref={bodyRef}
        className={cn("mt-5 space-y-3 text-[15px] leading-relaxed text-text", !expanded && "line-clamp-6")}
      >
        {review.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {clamped || expanded ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 inline-flex min-h-11 items-center self-start text-sm font-semibold text-accent hover:text-accent-hover"
        >
          {expanded ? reviewLabels.readLess : reviewLabels.readMore}
        </button>
      ) : null}

      <p className="mt-auto flex items-center gap-2 pt-5 text-[13px] text-muted">
        <GoogleMark />
        {reviewLabels.postedOn}
      </p>
    </article>
  );
}
