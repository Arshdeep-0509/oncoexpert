import type * as React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { TechniquesContent } from "@/content/pages/colorectal-cancer";
import { cn } from "@/lib/utils";
import { styles } from "@/components/pages/colorectal-cancer/techniques-styles";

type Technique = TechniquesContent["robotic"];

type TechniqueDetailsProps = {
  technique: Technique;
  idealForLabel: string;
  /** Under the features (the robotic side): to the robotic page. */
  link?: { label: string; href: string };
  onDark?: boolean;
  /** Re-entering content (the switch): badge, title, features one by one, then the pill. */
  animate?: boolean;
  headingId?: string;
};

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/** Badge, title, the four features, the "Ideal for" pill and the optional link. No state. */
export function TechniqueDetails({
  technique,
  idealForLabel,
  link,
  onDark = false,
  animate = false,
  headingId,
}: TechniqueDetailsProps) {
  const enter = animate ? styles.in : undefined;
  return (
    <>
      <p
        className={cn(
          enter,
          "inline-flex min-h-7 self-start rounded-pill px-3 py-1 text-xs leading-tight font-semibold tracking-[0.14em] uppercase",
          onDark ? "bg-white/10 text-accent-glow ring-1 ring-white/15" : "bg-accent-soft text-accent",
        )}
        style={step(0)}
      >
        {technique.badge}
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
        {technique.title}
      </h3>
      <ul className="mt-5 grid gap-3">
        {technique.features.map((feature, i) => (
          <li
            key={feature}
            className={cn(
              enter,
              "flex items-start gap-3 text-[15px] leading-snug md:text-base",
              onDark ? "text-white/85" : "text-text",
            )}
            style={step(2 + i)}
          >
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                onDark ? "bg-accent-glow/20 text-accent-glow" : "bg-accent-soft text-accent",
              )}
            >
              <Check className="size-3.5" strokeWidth={2.25} />
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <p
        className={cn(
          animate && styles.pop,
          "mt-6 self-start rounded-lg px-4 py-3 text-[15px] leading-snug",
          onDark ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-surface-alt text-text ring-1 ring-line",
        )}
      >
        <span className={cn("font-semibold", onDark ? "text-accent-glow" : "text-accent")}>{idealForLabel}</span>{" "}
        {technique.idealFor}
      </p>
      {link ? (
        <Link
          href={link.href}
          data-cta={link.label}
          className={cn(
            "group/link mt-6 inline-flex min-h-12 items-center gap-2 self-start text-[15px] font-semibold underline-offset-4 hover:underline",
            onDark ? "text-white" : "text-accent",
          )}
        >
          {link.label}
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </>
  );
}
