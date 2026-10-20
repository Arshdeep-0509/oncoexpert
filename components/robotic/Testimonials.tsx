"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews, type Review } from "@/content/pages/robotic-surgery";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Section } from "@/components/robotic/ui/section";
import { Reveal } from "@/components/robotic/ui/reveal";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={reviews.a11y.rating(rating)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn("size-4", i < rating ? "fill-star text-star" : "fill-border text-border")}
          strokeWidth={1.75}
        />
      ))}
    </span>
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
    <article className="flex h-full flex-col rounded-[22px] border border-border bg-white p-6 shadow-card sm:p-7">
      <header className="flex items-center gap-3">
        <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
          {initials(review.author)}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug break-words text-ink">{review.author}</h3>
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
          className="mt-2 inline-flex min-h-11 items-center self-start text-sm font-semibold text-primary hover:text-primary-hover"
        >
          {expanded ? reviews.readLess : reviews.readMore}
        </button>
      ) : null}

      <p className="mt-auto flex items-center gap-2 pt-5 text-[13px] text-muted">
        <GoogleMark />
        {reviews.postedOn}
      </p>
    </article>
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

export function Testimonials() {
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
    return () => {
      embla.off("select", onSelect).off("reInit", onInit);
    };
  }, [embla]);

  // Autoplay only when motion is allowed.
  React.useEffect(() => {
    if (!embla) return;
    if (reduce) autoplay.stop();
    else autoplay.play();
  }, [embla, reduce, autoplay]);

  const arrow =
    "grid size-11 place-items-center rounded-full border border-border bg-white text-ink transition-colors hover:border-primary/40 hover:text-primary";

  return (
    <Section id="reviews" tone="surface" className="overflow-hidden">
      <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="type-h2 max-w-[22ch] text-ink">{reviews.heading}</h2>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label={reviews.a11y.previous} onClick={() => embla?.scrollPrev()} className={arrow}>
            <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button type="button" aria-label={reviews.a11y.next} onClick={() => embla?.scrollNext()} className={arrow}>
            <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </Reveal>

      <div
        role="region"
        aria-roledescription={site.a11y.carousel}
        aria-label={reviews.a11y.region}
        // pb/-mb leave room for card shadows, which overflow-hidden would otherwise clip
        className="mt-10 -mr-5 -mb-12 overflow-hidden pb-12 sm:mr-0"
        ref={emblaRef}
      >
        <div className="-ml-5 flex touch-pan-y">
          {reviews.items.map((r, i) => (
            <div
              key={r.author}
              role="group"
              aria-roledescription={site.a11y.slide}
              aria-label={reviews.a11y.goTo(i + 1, reviews.items.length)}
              className="min-w-0 flex-[0_0_90%] pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <ReviewCard review={r} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-1">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={reviews.a11y.goTo(i + 1, snaps.length)}
            aria-current={i === selected ? "true" : undefined}
            onClick={() => embla?.scrollTo(i)}
            className="grid h-11 w-6 place-items-center"
          >
            <span
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === selected ? "w-6 bg-primary" : "w-1.5 bg-muted/40",
              )}
            />
          </button>
        ))}
      </div>
    </Section>
  );
}
