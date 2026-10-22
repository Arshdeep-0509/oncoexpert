"use client";

import * as React from "react";
import { Award, Cpu, HeartHandshake, Scale, Target, type LucideIcon } from "lucide-react";
import type { ApproachIcon } from "@/content/pages/home";
import { cn } from "@/lib/utils";
import { useMedia } from "@/lib/hooks/use-media";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<ApproachIcon, LucideIcon> = {
  award: Award,
  scale: Scale,
  "heart-handshake": HeartHandshake,
  target: Target,
  cpu: Cpu,
};

/**
 * Focus mode: desktop, motion allowed and no request for more contrast (dimmed text at 40%
 * falls below 4.5:1, so it is a desktop-only, opt-out-able effect).
 */
const FOCUS_MODE =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (prefers-contrast: no-preference)";

type Pillar = { title: string; body: string; icon: ApproachIcon };

/**
 * The 5 pillars. In focus mode the pillar crossing the middle of the screen is active (accent
 * icon, full opacity) and the others dim to 40%: one IntersectionObserver whose root is a
 * zero-height band at mid-screen, as in the breast page's PlanningSteps. Otherwise (phones,
 * reduced motion, more contrast) a plain list, every pillar at full strength, each revealed.
 */
export function ApproachPillars({ pillars }: { pillars: readonly Pillar[] }) {
  const focusMode = useMedia(FOCUS_MODE);
  const [active, setActive] = React.useState(0);
  const listRef = React.useRef<HTMLOListElement>(null);

  React.useEffect(() => {
    if (!focusMode) return;
    const items = Array.from(listRef.current?.children ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, [focusMode]);

  return (
    <ol ref={listRef}>
      {pillars.map((pillar, i) => {
        const on = !focusMode || i === active;
        const Icon = icons[pillar.icon];
        return (
          <li
            key={pillar.title}
            data-active={on ? "" : undefined}
            className={cn(
              "border-t border-white/10 py-8 transition-opacity duration-500 ease-out first:border-t-0 first:pt-0 md:py-10 lg:py-14",
              !on && "opacity-40",
            )}
          >
            <Reveal className="grid grid-cols-[auto_1fr] gap-x-5 md:gap-x-6">
              <span
                aria-hidden="true"
                className="relative grid size-12 place-items-center rounded-xl bg-white/[0.06] ring-1 ring-white/10 md:size-14"
              >
                <Icon className="size-6 text-white/55" strokeWidth={1.75} />
                <Icon
                  className={cn(
                    "absolute size-6 text-accent-glow transition-opacity duration-500",
                    on ? "opacity-100" : "opacity-0",
                  )}
                  strokeWidth={1.75}
                />
              </span>
              <span>
                <span
                  aria-hidden="true"
                  className="block text-xs font-semibold tracking-[0.16em] text-white/50 tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-display text-xl leading-snug font-bold text-white md:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-white/75 md:text-lg">{pillar.body}</p>
              </span>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
