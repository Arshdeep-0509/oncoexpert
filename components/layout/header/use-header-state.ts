"use client";

import * as React from "react";
import { useElementById } from "@/lib/hooks/use-element-by-id";

/**
 * Whether the bar is over the hero (transparent) and whether it is compact.
 * ONE IntersectionObserver, no scroll listeners. Its root starts below the bar, and it
 * watches (1) the hero: transparent ↔ solid, and (2) a sentinel spanning the first
 * `compactAfter` px of scroll just below the bar: once it has left, the bar is compact.
 */
export function useHeaderState({
  heroId,
  barPx,
  pathname,
}: {
  heroId: string | null;
  barPx: number;
  pathname: string | null;
}) {
  const [overHero, setOverHero] = React.useState(heroId !== null);
  const [compact, setCompact] = React.useState(false);
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const observer = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === sentinelRef.current) setCompact(!entry.isIntersecting);
          else setOverHero(entry.isIntersecting);
        }
      },
      { rootMargin: `-${barPx}px 0px 0px 0px` },
    );
    observer.current = io;
    if (sentinelRef.current) io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [barPx]);

  // Track the hero element (it can mount after the header, or be replaced).
  const heroRef = React.useRef<HTMLElement | null>(null);
  useElementById(
    heroId,
    (hero) => {
      const io = observer.current;
      if (heroRef.current) io?.unobserve(heroRef.current);
      heroRef.current = hero;
      if (hero) io?.observe(hero);
      else setOverHero(false); // no hero on this page: solid bar
    },
    [pathname, barPx],
  );

  return { sentinelRef, overHero, compact };
}
