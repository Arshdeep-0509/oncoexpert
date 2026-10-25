"use client";

import * as React from "react";
import { Globe2, MessagesSquare, ShieldCheck, type LucideIcon } from "lucide-react";
import type { TrustPointIcon } from "@/content/pages/about-us";
import { cn } from "@/lib/utils";
import { useMedia } from "@/lib/hooks/use-media";
import { Reveal } from "@/components/ui/Reveal";
import { styles } from "@/components/pages/about-us/about-styles";

const icons: Record<TrustPointIcon, LucideIcon> = {
  shield: ShieldCheck,
  globe: Globe2,
  message: MessagesSquare,
};

/** Desktop with motion allowed: the card crossing the middle of the screen is active. */
const FOCUS_MODE = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

type Point = { icon: TrustPointIcon; title: string; body: string };

/**
 * The three trust points as large icon cards. In focus mode the card crossing the middle of the
 * screen is active (accent border, filled icon, a small lift): one IntersectionObserver whose
 * root is a zero-height band at mid-screen, as in Home's ApproachPillars and the breast page's
 * PlanningSteps. Inactive cards keep full-strength text (no dimming, so contrast never drops).
 * Elsewhere: a plain list, each card revealed.
 */
export function TrustPoints({ points }: { points: readonly Point[] }) {
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
    <ol ref={listRef} className="grid gap-5 lg:gap-0">
      {points.map((point, i) => {
        const Icon = icons[point.icon];
        return (
          <li key={point.title} data-active={focusMode && i === active ? "" : undefined} className="lg:py-[10vh]">
            <Reveal
              className={cn(styles.point, "rounded-2xl border border-line bg-surface p-7 shadow-soft-sm md:p-10")}
            >
              <span
                aria-hidden="true"
                className={cn(
                  styles.pointIcon,
                  "grid size-16 place-items-center rounded-2xl bg-accent-soft text-accent md:size-20",
                )}
              >
                <Icon className="size-8 md:size-9" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-2xl leading-snug font-bold text-ink md:text-[1.75rem]">
                {point.title}
              </h3>
              <p className="mt-3 measure text-base text-muted md:text-lg">{point.body}</p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
