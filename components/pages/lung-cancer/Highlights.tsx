import type * as React from "react";
import Link from "next/link";
import { Bot, Crosshair, HeartHandshake, ShieldPlus, type LucideIcon } from "lucide-react";
import { highlights, type HighlightIcon } from "@/content/pages/lung-cancer";
import { prefetchFor } from "@/lib/nav";
import { cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { SwipeRow } from "@/components/ui/SwipeRow";
import "@/components/pages/lung-cancer/highlights.css";

/** Class names from highlights.css (plain CSS, `lu-hl-` prefix). */
const styles = {
  band: "lu-hl-band",
  reveal: "lu-hl",
  rise: "lu-hl-rise",
  card: "lu-hl-card",
  icon: "lu-hl-icon",
  draw: "lu-hl-draw",
} as const;

const icons: Record<HighlightIcon, LucideIcon> = {
  care: HeartHandshake,
  robotic: Bot,
  keyhole: Crosshair,
  "stage-iv": ShieldPlus,
};

const cardClass = "flex h-full flex-col gap-4 rounded-xl bg-surface/92 p-6 ring-1 shadow-soft ring-line md:p-7";

/** The analytics label of a card link: lung:highlights:<label in kebab case>. */
const ctaOf = (label: string) => `lung:highlights:${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

function CardBody({ item }: { item: (typeof highlights.items)[number] }) {
  const Icon = icons[item.icon];
  return (
    <>
      <span
        className={cn(styles.icon, "grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent")}
      >
        <Icon className={cn(styles.draw, "size-6")} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="block">
        <span className="block text-sm leading-snug font-bold tracking-[0.08em] text-ink">{item.label}</span>
        <span className="mt-2 block text-base leading-relaxed text-muted">{item.detail}</span>
      </span>
    </>
  );
}

/**
 * 2 · #highlights: the four live labels as cards, each with an icon in a 48px circle and a NEW
 * detail line. Desktop: one row overlapping the hero by 40px. Tablet: 2 × 2. Phones: a swipe row.
 * "Robotic Surgery" links to /robotic-surgery/, "Stage IV" to #stage-iv. Cards are a solid 92%
 * surface (no backdrop blur). Server-rendered; InView only sets the reveal flag.
 */
export function Highlights() {
  return (
    <section
      id="highlights"
      aria-label={highlights.a11y.label}
      className={cn(styles.band, "relative z-10 bg-surface py-12 md:py-16 lg:pt-0")}
    >
      <Container>
        <InView className={styles.reveal} threshold={0.25}>
          <SwipeRow label={highlights.a11y.label} gridClassName="md:grid-cols-2 lg:grid-cols-4 md:gap-5">
            {highlights.items.map((item, i) => {
              const style = { "--i": i } as React.CSSProperties;
              const className = cn(styles.rise, styles.card, cardClass);
              if (!("href" in item)) {
                return (
                  <div key={item.label} className={className} style={style}>
                    <CardBody item={item} />
                  </div>
                );
              }
              return item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  data-cta={ctaOf(item.label)}
                  className={cn(className, focusRing)}
                  style={style}
                >
                  <CardBody item={item} />
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  prefetch={prefetchFor(item.href)}
                  data-cta={ctaOf(item.label)}
                  className={cn(className, focusRing)}
                  style={style}
                >
                  <CardBody item={item} />
                </Link>
              );
            })}
          </SwipeRow>
        </InView>
      </Container>
    </section>
  );
}
