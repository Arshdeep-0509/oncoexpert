"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const STAGGER_S = 0.08;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /**
   * Reveal each direct child in turn, 0.08s apart. Each child is wrapped in a
   * div (styled with `itemClassName`), so use it on grids and lists.
   */
  stagger?: boolean;
  itemClassName?: string;
  as?: "div" | "ul" | "ol";
};

/** True once `ref` is visible by the theme's --reveal-amount (a 0–1 fraction). */
function useRevealed(ref: React.RefObject<HTMLElement | null>) {
  const [revealed, setRevealed] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const amount = parseFloat(getComputedStyle(el).getPropertyValue("--reveal-amount")) || 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setRevealed(true);
        io.disconnect();
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return revealed;
}

/**
 * Fades in and rises by the theme's --reveal-y over 0.7s with the site easing,
 * once, when --reveal-amount of it is visible. CSS transitions on opacity +
 * translate only (globals.css `.reveal`); with prefers-reduced-motion the
 * content is simply shown.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  itemClassName,
  as: Tag = "div",
}: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const revealed = useRevealed(ref) ? "" : undefined;

  if (!stagger) {
    return (
      <Tag
        ref={ref as React.Ref<never>}
        className={cn("reveal", className)}
        data-revealed={revealed}
        style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
      >
        {children}
      </Tag>
    );
  }

  const ItemTag = Tag === "div" ? "div" : "li";
  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {React.Children.toArray(children).map((child, i) => (
        <ItemTag
          key={React.isValidElement(child) && child.key != null ? child.key : i}
          className={cn("reveal", itemClassName)}
          data-revealed={revealed}
          style={{ "--reveal-delay": `${delay + i * STAGGER_S}s` } as React.CSSProperties}
        >
          {child}
        </ItemTag>
      ))}
    </Tag>
  );
}
