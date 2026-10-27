import type * as React from "react";
import Image from "next/image";
import { Crosshair, Droplets, Eye, Hand, House, Scissors, type LucideIcon } from "lucide-react";
import type { PrecisionContent, PrecisionIcon } from "@/content/pages/endometrial-cancer";
import { cn } from "@/lib/utils";
import { styles } from "@/components/pages/endometrial-cancer/precision-styles";

const icons: Record<PrecisionIcon, LucideIcon> = {
  precision: Crosshair,
  view: Eye,
  tremor: Hand,
  incision: Scissors,
  blood: Droplets,
  discharge: House,
};

type Approach = PrecisionContent["robotic"];

type PrecisionDetailsProps = {
  approach: Approach;
  image?: { src: string; focal: string };
  /** The robotic card: the lens zooms slowly (the "10x magnification" idea). */
  zoom?: boolean;
  onDark?: boolean;
  /** Re-entering content (the switch): badge, title, then the features one by one. */
  animate?: boolean;
  headingId?: string;
};

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/** Badge, title, the round photo "lens" and the three features (icon, title, text). No state. */
export function PrecisionDetails({
  approach,
  image,
  zoom = false,
  onDark = false,
  animate = false,
  headingId,
}: PrecisionDetailsProps) {
  const enter = animate ? styles.in : undefined;
  return (
    <>
      <div className="flex items-start justify-between gap-6">
        <div>
          <p
            className={cn(
              enter,
              "inline-flex min-h-7 items-center rounded-pill px-3 py-1 text-xs leading-tight font-semibold tracking-[0.14em] uppercase",
              onDark ? "bg-white/10 text-accent-glow ring-1 ring-white/15" : "bg-accent-soft text-accent",
            )}
            style={step(0)}
          >
            {approach.badge}
          </p>
          <h3
            id={headingId}
            className={cn(
              enter,
              "mt-4 font-display text-2xl leading-tight md:text-[1.75rem]",
              onDark ? "text-white" : "text-ink",
            )}
            style={step(1)}
          >
            {approach.title}
          </h3>
        </div>
        {image ? (
          <span
            aria-hidden="true"
            className={cn(
              "relative size-24 shrink-0 overflow-hidden rounded-full ring-4 md:size-28",
              onDark ? "ring-white/15" : "ring-accent-soft",
            )}
          >
            <span className={cn(zoom && styles.zoom, "absolute inset-0")}>
              <Image
                src={image.src}
                alt=""
                fill
                sizes="112px"
                className="object-cover"
                style={{ objectPosition: image.focal }}
              />
            </span>
            {/* lens glare */}
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,color-mix(in_srgb,var(--white)_35%,transparent),transparent_45%)]" />
          </span>
        ) : null}
      </div>
      <ul className="mt-7 grid gap-5">
        {approach.features.map((f, i) => {
          const Icon = icons[f.icon];
          return (
            <li key={f.title} className={cn(enter, "flex items-start gap-4")} style={step(2 + i)}>
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-xl",
                  onDark ? "bg-white/10 text-accent-glow" : "bg-accent-soft text-accent",
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className={cn("block font-semibold", onDark ? "text-white" : "text-ink")}>{f.title}</span>
                <span className={cn("mt-1 block text-[15px] leading-relaxed", onDark ? "text-white/75" : "text-muted")}>
                  {f.body}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
