"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/Counter";

type PriceCardsProps = {
  cards: readonly { name: string; amount: number; unit: string; body: string }[];
};

/**
 * Price cards: the amount counts up (₹, en-IN grouping), the unit sits in a small pill,
 * and an accent top border draws in (scaleX). 2×2 on phones, 4 in a row on desktop.
 */
export function PriceCards({ cards }: PriceCardsProps) {
  const ref = React.useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <ul ref={ref} className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
      {cards.map((card, i) => (
        <li
          key={card.name}
          className="relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface p-4 pt-5 shadow-soft-sm md:p-6 md:pt-7"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 origin-left bg-(image:--grad-accent) transition-transform duration-1000 ease-out-expo"
            style={{ transform: `scaleX(${inView ? 1 : 0})`, transitionDelay: inView ? `${i * 0.12}s` : "0s" }}
          />
          <h3 className="font-sans text-[11px] font-semibold tracking-[0.14em] text-muted md:text-xs">{card.name}</h3>
          <p className="mt-2 font-display text-[1.6rem] leading-none font-semibold text-ink md:text-[2.1rem]">
            <Counter value={card.amount} prefix="₹" delay={i * 0.12} reserveWidth />
          </p>
          <span className="mt-3 inline-flex self-start rounded-pill bg-accent-soft px-2.5 py-1 text-[11px] leading-none font-semibold text-accent md:text-xs">
            {card.unit}
          </span>
          <p className={cn("mt-3 text-[13px] leading-relaxed text-muted md:mt-4 md:text-[15px]")}>{card.body}</p>
        </li>
      ))}
    </ul>
  );
}
