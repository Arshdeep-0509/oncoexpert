"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/ui/Chip";
import { ScrollFillLine } from "@/components/ui/ScrollFillLine";

export type PlanningImage = { src: string; alt: string; focal: string };

type PlanningStepsProps = {
  /** Eyebrow, H2 and intro (server-rendered). */
  heading: React.ReactNode;
  steps: readonly { title: string; body: string; image: string; chips?: readonly string[] }[];
  /** Unique step images by key (desktop crossfade frame). */
  images: Record<string, PlanningImage>;
  /** Phones/tablets: one image under the heading. */
  mobileImage: PlanningImage;
  label: string;
};

/**
 * Desktop (lg): sticky left column whose photo crossfades to the active step's image;
 * right, the vertical timeline. The step crossing the middle of the viewport is active.
 * Below lg: heading, one image, then the same timeline (no sticky).
 */
export function PlanningSteps({ heading, steps, images, mobileImage, label }: PlanningStepsProps) {
  const [active, setActive] = React.useState(0);
  const listRef = React.useRef<HTMLOListElement>(null);

  React.useEffect(() => {
    const items = Array.from(listRef.current?.children ?? []);
    // A zero-height band at the middle of the screen: whichever step crosses it is active.
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
  }, []);

  const activeImage = steps[active]?.image;

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
      {/* Left: sticky on desktop */}
      <div className="lg:sticky lg:top-[120px] lg:self-start">
        {heading}

        {/* Desktop frame: crossfades between the step images */}
        <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-xl bg-surface-alt shadow-soft lg:block">
          {Object.entries(images).map(([key, img]) => (
            <Image
              key={key}
              src={img.src}
              alt={key === activeImage ? img.alt : ""}
              aria-hidden={key === activeImage ? undefined : true}
              fill
              sizes="560px"
              className={cn(
                "object-cover transition-opacity duration-700 ease-in-out",
                key === activeImage ? "opacity-100" : "opacity-0",
              )}
              style={{ objectPosition: img.focal }}
            />
          ))}
          <div aria-hidden="true" className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset" />
        </div>

        {/* Phones / tablets: one image */}
        <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-xl shadow-soft lg:hidden">
          <Image
            src={mobileImage.src}
            alt={mobileImage.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 1px"
            className="object-cover"
            style={{ objectPosition: mobileImage.focal }}
          />
        </div>
      </div>

      {/* Right: timeline */}
      <div className="relative">
        <ScrollFillLine className="absolute top-5 bottom-5 left-[19px] lg:top-[21svh] lg:bottom-[21svh] lg:left-[23px]" />
        {/* Desktop: each step gets a tall slot, so the sticky column has a scroll story to follow. */}
        <ol ref={listRef} aria-label={label} className="relative grid gap-4 lg:gap-0">
          {steps.map((step, i) => {
            const isActive = i === active;
            const done = i < active;
            return (
              <li key={step.title} className="relative pl-14 lg:flex lg:min-h-[42svh] lg:items-center lg:pl-[72px]">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-3 left-0 grid size-10 place-items-center rounded-full text-[15px] font-semibold tabular-nums transition-[background-color,color,box-shadow] duration-500 lg:top-1/2 lg:size-12 lg:-translate-y-1/2 lg:text-base",
                    isActive
                      ? "bg-accent text-white shadow-(--accent-shadow) ring-4 ring-accent-soft"
                      : done
                        ? "bg-accent-soft text-accent"
                        : "bg-surface text-muted ring-1 ring-line",
                  )}
                >
                  {i + 1}
                </span>
                <div
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "rounded-lg p-5 transition-[background-color,box-shadow] duration-500 lg:w-full lg:p-7",
                    isActive ? "bg-surface ring-1 shadow-soft-lg ring-line" : "bg-surface-alt/60 lg:bg-transparent",
                  )}
                >
                  <h3 className="font-display text-xl leading-snug text-ink lg:text-[1.5rem]">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted lg:text-base">{step.body}</p>
                  {step.chips ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {step.chips.map((chip) => (
                        <li key={chip}>
                          <Chip>{chip}</Chip>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
