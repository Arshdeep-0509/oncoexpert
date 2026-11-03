"use client";

import * as React from "react";
import { ArrowRight, RotateCw } from "lucide-react";
import type { FeatureIcon as FeatureIconKey } from "@/content/pages/ovarian-cancer";
import { cn, focusRing } from "@/lib/utils";
import { FeatureIcon } from "@/components/pages/ovarian-cancer/FeatureIcon";

type FeatureCardProps = {
  icon: FeatureIconKey;
  label: string;
  detail: string;
  href: string;
  learnMore: string;
  flipLabel: string;
};

/**
 * One #features card (features.css, ov-ft-). Front: the icon and the live label. Back: a NEW detail
 * and "Learn more", which jumps to the matching treatment. It flips (rotateY) on hover and focus
 * (CSS) and on tap (the button, aria-expanded). Reduced motion: no flip; the back sits under the
 * front, all visible. A tap on the back (outside the link) or Escape turns it back.
 */
export function FeatureCard({ icon, label, detail, href, learnMore, flipLabel }: FeatureCardProps) {
  const [flipped, setFlipped] = React.useState(false);
  const id = React.useId();
  return (
    <div
      data-flipped={flipped ? "" : undefined}
      onKeyDown={(e) => e.key === "Escape" && setFlipped(false)}
      className="ov-ft-card h-full"
    >
      <div className="ov-ft-inner grid h-full">
        <div className="ov-ft-face ov-ft-front flex flex-col items-start gap-5 rounded-xl bg-surface p-6 ring-1 shadow-soft ring-line md:p-7">
          <span className="grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent">
            <FeatureIcon icon={icon} className="size-7" />
          </span>
          <p className="font-display text-xl leading-snug text-ink md:text-[1.375rem]">{label}</p>
          <button
            type="button"
            aria-expanded={flipped}
            aria-controls={`${id}-back`}
            onClick={() => setFlipped((f) => !f)}
            className={cn(
              "ov-ft-flip mt-auto inline-flex min-h-12 items-center gap-2 text-[15px] font-semibold text-accent",
              focusRing,
            )}
          >
            <RotateCw className="size-4" strokeWidth={1.75} aria-hidden="true" />
            {flipLabel}
          </button>
        </div>
        <div
          id={`${id}-back`}
          onClick={(e) => {
            if (!(e.target as Element).closest("a")) setFlipped(false);
          }}
          className="ov-ft-face ov-ft-back flex flex-col items-start gap-4 rounded-xl bg-(image:--grad-plum) p-6 text-white shadow-soft md:p-7"
        >
          <p className="text-base leading-relaxed text-white/90">{detail}</p>
          <a
            href={href}
            data-cta={`ovarian:features:${href.replace("#", "")}`}
            className={cn(
              "mt-auto inline-flex min-h-12 items-center gap-2 font-semibold text-accent-glow hover:text-white",
              focusRing,
            )}
          >
            {learnMore}
            <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
