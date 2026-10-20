"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Review } from "@/content/types";
import { reviewLabels as L } from "@/content/shared/reviews";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} role="img" aria-label={L.a11y.rating(rating)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn("size-4", i < Math.round(rating) ? "fill-gold text-gold" : "fill-line text-line")}
          strokeWidth={1.75}
        />
      ))}
    </span>
  );
}

/** Small "G" glyph (inline SVG, no external request). */
function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8Z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10l3.7-2.9Z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4Z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
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
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-soft-sm sm:p-7">
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-bold text-accent"
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
          {expanded ? L.readLess : L.readMore}
        </button>
      ) : null}

      <p className="mt-auto flex items-center gap-2 pt-5 text-[13px] text-muted">
        <GoogleMark />
        {L.postedOn}
      </p>
    </article>
  );
}

/**
 * Embla carousel of review cards: 3 visible on desktop, 2 on tablets, 1.08 on phones (the
 * next card peeks). Autoplay every 7s (never with reduced motion), pausing on hover,
 * focus or touch. Arrows from md, dots on phones.
 */
export function ReviewsCarousel({ reviews }: { reviews: readonly Review[] }) {
  const reduce = useReducedMotion();
  const autoplay = React.useMemo(
    () => Autoplay({ delay: 7000, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true, playOnInit: false }),
    [],
  );
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay]);
  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    const onInit = () => {
      setSnaps(embla.scrollSnapList());
      onSelect();
    };
    onInit();
    embla.on("select", onSelect).on("reInit", onInit);
    // Touch: hold still while a finger is on the carousel; resume after.
    const root = embla.rootNode();
    const pause = () => autoplay.stop();
    const resume = () => {
      if (!reduce) autoplay.play();
    };
    root.addEventListener("touchstart", pause, { passive: true });
    root.addEventListener("touchend", resume, { passive: true });
    return () => {
      embla.off("select", onSelect).off("reInit", onInit);
      root.removeEventListener("touchstart", pause);
      root.removeEventListener("touchend", resume);
    };
  }, [embla, autoplay, reduce]);

  // Autoplay only when motion is allowed.
  React.useEffect(() => {
    if (!embla) return;
    if (reduce) autoplay.stop();
    else autoplay.play();
  }, [embla, reduce, autoplay]);

  const arrow =
    "grid size-12 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent/40 hover:text-accent";

  return (
    <div>
      <div className="mb-5 hidden justify-end gap-2 md:flex">
        <button type="button" aria-label={L.a11y.previous} onClick={() => embla?.scrollPrev()} className={arrow}>
          <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button type="button" aria-label={L.a11y.next} onClick={() => embla?.scrollNext()} className={arrow}>
          <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <div
        ref={emblaRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={L.a11y.region}
        className="-mx-(--gutter) overflow-hidden px-(--gutter) pb-2 md:mx-0 md:px-0"
      >
        <div className="-ml-4 flex touch-pan-y md:-ml-6">
          {reviews.map((r, i) => (
            <div
              key={r.author}
              role="group"
              aria-roledescription="slide"
              aria-label={L.a11y.goTo(i + 1, reviews.length)}
              className="min-w-0 shrink-0 grow-0 basis-[92.6%] pl-4 md:basis-1/2 md:pl-6 lg:basis-1/3"
            >
              <ReviewCard review={r} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-1 md:hidden">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={L.a11y.goTo(i + 1, snaps.length)}
            aria-current={i === selected ? "true" : undefined}
            onClick={() => embla?.scrollTo(i)}
            className="grid size-8 place-items-center"
          >
            <span
              className={cn(
                "size-2 rounded-full transition-[background-color,scale] duration-300",
                i === selected ? "scale-125 bg-accent" : "bg-accent/25",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
