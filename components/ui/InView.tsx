"use client";

import * as React from "react";

type InViewProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Visible fraction that sets it. Default 0.33. */
  threshold?: number;
  children: React.ReactNode;
};

/**
 * Sets data-inview on itself once `threshold` of it is on screen (never removed). Page CSS keys
 * one-time entrances off it (the booking how-it-works line, the about quote and timeline cards).
 * Transform and opacity only, in that CSS; reduced motion shows the final state.
 */
export function InView({ className, style, threshold = 0.33, children }: InViewProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className} style={style} data-inview={inView ? "" : undefined}>
      {children}
    </div>
  );
}
