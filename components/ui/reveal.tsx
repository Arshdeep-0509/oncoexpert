"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

/** The site's easing curve, for motion transitions. */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

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

/**
 * Fades in and rises 24px (16px under 768px) over 0.7s with the site easing,
 * once, when 15% visible. CSS transitions on opacity + translate only (globals.css
 * `.reveal`); with prefers-reduced-motion the content is simply shown.
 */
export function Reveal({ children, className, delay = 0, stagger = false, itemClassName, as: Tag = "div" }: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const revealed = inView ? "" : undefined;

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
