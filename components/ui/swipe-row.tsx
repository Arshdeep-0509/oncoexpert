"use client";

import * as React from "react";
import { ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SwipeRowProps = {
  children: React.ReactNode;
  /** Accessible name of the scroll region (from /content). */
  label: string;
  /** Grid columns from md up, e.g. "md:grid-cols-2 lg:grid-cols-3". */
  gridClassName?: string;
  /** Extra classes on the card wrappers (<li>): one string for all, or one per index (grid spans). */
  itemClassName?: string | readonly (string | undefined)[];
  /** Show the dot indicators under the row on phones. Default true. */
  dots?: boolean;
  /** Small "Swipe" hint shown on phones until the first swipe (text from /content). */
  hint?: string;
  className?: string;
};

/**
 * THE core mobile pattern.
 * Under 768px: a horizontal scroll-snap row. Cards are 82% wide so the next one
 * peeks, the edges fade, and dots show the position. The row bleeds to the screen
 * edges (it cancels the container gutter) while the first card stays aligned.
 * From md up: a normal grid (`gridClassName`).
 */
export function SwipeRow({ children, label, gridClassName, itemClassName, dots = true, hint, className }: SwipeRowProps) {
  const items = React.Children.toArray(children);
  const listRef = React.useRef<HTMLUListElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const [swiped, setSwiped] = React.useState(false);

  React.useEffect(() => {
    const scroller = scrollerRef.current;
    const list = listRef.current;
    if (!scroller || !list) return;
    const cards = Array.from(list.children);
    const observer = new IntersectionObserver(
      (entries) => {
        // Only meaningful while the row actually scrolls (phones).
        if (scroller.scrollWidth <= scroller.clientWidth) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(cards.indexOf(entry.target));
        }
      },
      { root: scroller, threshold: 0.6 },
    );
    cards.forEach((card) => observer.observe(card));
    // The hint fades out for good after the first real swipe.
    const onScroll = () => {
      if (scroller.scrollLeft > 12) {
        setSwiped(true);
        scroller.removeEventListener("scroll", onScroll);
      }
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [items.length]);

  const itemClass = (i: number) => (typeof itemClassName === "string" ? itemClassName : itemClassName?.[i]);

  return (
    <div className={className}>
      {hint ? (
        <p
          aria-hidden="true"
          className={cn(
            "mb-3 flex items-center justify-end gap-1 text-xs font-semibold tracking-wide text-muted uppercase transition-opacity duration-500 md:hidden",
            swiped && "opacity-0",
          )}
        >
          {hint}
          <ChevronsRight className="size-4 text-accent motion-safe:animate-swipe-nudge" strokeWidth={1.75} />
        </p>
      ) : null}

      <div
        ref={scrollerRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "no-scrollbar -mx-(--gutter) snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-px-(--gutter)",
          "[mask-image:linear-gradient(90deg,transparent,#000_14px,#000_calc(100%-28px),transparent)]",
          "md:mx-0 md:snap-none md:overflow-visible md:[mask-image:none]",
        )}
      >
        <ul ref={listRef} className={cn("flex gap-4 px-(--gutter) pt-1 pb-3 md:grid md:gap-6 md:p-0", gridClassName)}>
          {items.map((child, i) => (
            <li
              key={React.isValidElement(child) && child.key != null ? child.key : i}
              className={cn("flex w-[82%] shrink-0 snap-start flex-col md:w-auto", itemClass(i))}
            >
              {child}
            </li>
          ))}
        </ul>
      </div>

      {dots && items.length > 1 ? (
        <div aria-hidden="true" className="mt-4 flex justify-center gap-2 md:hidden">
          {items.map((_, i) => (
            <span
              key={i}
              className={cn(
                "size-2 rounded-full transition-[background-color,scale] duration-300",
                i === active ? "scale-125 bg-accent" : "bg-accent/25",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
