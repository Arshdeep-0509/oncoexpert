import type * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TechniqueSideContent } from "@/content/types";
import { prefetchFor } from "@/lib/nav";
import { cn, focusRing } from "@/lib/utils";
import { techniqueIcons } from "@/components/shared/technique-compare/icons";

type CompareCardProps = {
  side: TechniqueSideContent;
  /** Heading level of the side's title. */
  as?: "h3" | "h4";
  /** Re-enter with a stagger (the switch's panel, technique-compare.css). */
  enter?: boolean;
  className?: string;
};

/**
 * One technique: photo (drifting when `side.drift`), title, text, points and an optional link. Used
 * by both TechniqueCompare layouts (desktop cards, the switch's panel). No hooks: renders on the
 * server and inside the switch island alike.
 */
export function CompareCard({ side, as: Heading = "h3", enter = false, className }: CompareCardProps) {
  const at = (i: number) => (enter ? ({ "--i": i } as React.CSSProperties) : undefined);
  return (
    <article
      className={cn(
        "tcx-card flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-soft",
        enter && "tcx-enter",
        className,
      )}
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-ink lg:aspect-[16/11]">
        <Image
          src={side.image.src}
          alt={side.image.alt}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 700px, 92vw"
          className={cn("object-cover", side.drift && "tcx-drift")}
          style={{ objectPosition: side.image.focal }}
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <Heading className="tcx-item font-display text-2xl leading-snug text-ink md:text-[1.75rem]" style={at(0)}>
          {side.title}
        </Heading>
        {side.body ? (
          <p className="tcx-item mt-3 measure text-base leading-relaxed text-muted md:text-lg" style={at(1)}>
            {side.body}
          </p>
        ) : null}
        <ul className="mt-6 grid gap-3">
          {side.points.map((point, i) => {
            const Icon = techniqueIcons[point.icon];
            return (
              <li key={point.title} className="tcx-item flex items-start gap-3.5" style={at(2 + i)}>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="pt-2.5">
                  <span className="block text-base leading-snug font-semibold text-ink">{point.title}</span>
                  {point.text ? <span className="mt-1 block text-base text-muted">{point.text}</span> : null}
                </span>
              </li>
            );
          })}
        </ul>
        {side.link ? (
          <Link
            href={side.link.href}
            prefetch={prefetchFor(side.link.href)}
            data-cta={side.link.cta ?? side.link.label}
            className={cn(
              "tcx-item group mt-auto inline-flex min-h-12 items-center gap-2 self-start pt-6 font-semibold text-accent hover:text-accent-hover",
              focusRing,
            )}
            style={at(2 + side.points.length)}
          >
            {side.link.label}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
