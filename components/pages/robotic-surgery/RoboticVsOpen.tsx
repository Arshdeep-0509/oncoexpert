"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Activity, BedDouble, BedSingle, Droplet, Droplets, Zap, type LucideIcon } from "lucide-react";
import { outcomes, type OutcomeItem } from "@/content/pages/robotic-surgery";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { ScarCompare } from "@/components/pages/robotic-surgery/ScarCompare";
import { bleedFade } from "@/lib/image-fade";

const glass = "rounded-[22px] border border-white/10 bg-white/[0.05] p-6 sm:p-7";
const pct = (item: OutcomeItem) => Math.round((item.robotic / item.open) * 100);

/** The card's title icon and the unit each pictogram is built from. */
const icons: Record<OutcomeItem["icon"], { title: LucideIcon; unit: LucideIcon }> = {
  blood: { title: Droplets, unit: Droplet },
  stay: { title: BedDouble, unit: BedSingle },
  pain: { title: Activity, unit: Zap },
};

/** The fewest units that show `value`% exactly (25% → 1 of 4, 60% → 3 of 5, 30% → 3 of 10). */
function unitsFor(value: number) {
  const total = [4, 5, 10, 20].find((n) => Number.isInteger((value * n) / 100)) ?? 10;
  return { total, filled: Math.round((value * total) / 100) };
}

/**
 * One side of the comparison: its name, a row of the card's unit icon (open surgery: every unit;
 * robotic surgery: only its share lit, the units it saves left as faint outlines) and its figure.
 */
function Side({
  item,
  robotic,
  label,
  value,
  delay,
}: {
  item: OutcomeItem;
  robotic: boolean;
  label: string;
  value: number;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const Unit = icons[item.icon].unit;
  const { total, filled } = unitsFor(pct(item));
  return (
    <div
      className={
        robotic
          ? "flex flex-col rounded-2xl bg-glow/[0.07] p-4 ring-1 ring-glow/30 sm:p-5"
          : "flex flex-col rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/10 sm:p-5"
      }
    >
      <p
        className={`min-h-[2.6em] text-[13px] leading-tight font-semibold tracking-wide sm:min-h-0 ${robotic ? "text-glow" : "text-white/60"}`}
      >
        {label}
      </p>
      <ul
        className="mt-3 grid gap-1.5 sm:gap-2"
        style={{ gridTemplateColumns: `repeat(${Math.min(total, 5)}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: total }, (_, i) => {
          const lit = !robotic || i < filled;
          return (
            <motion.li
              key={i}
              className={
                robotic
                  ? lit
                    ? "text-glow drop-shadow-[0_0_8px_rgb(45_212_191/0.6)]"
                    : "text-white/15"
                  : "text-white/45"
              }
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: delay + i * 0.06 }}
            >
              <Unit
                className="aspect-square h-auto w-full max-w-8"
                strokeWidth={1.75}
                fill={lit ? "currentColor" : "none"}
                fillOpacity={lit ? 0.25 : 0}
              />
            </motion.li>
          );
        })}
      </ul>
      <p
        className={`mt-auto pt-4 font-display text-2xl font-bold tabular-nums ${robotic ? "text-white" : "text-white/70"}`}
      >
        {value}%
      </p>
    </div>
  );
}

function BarCard({ item, index }: { item: OutcomeItem; index: number }) {
  const { barLabels } = outcomes;
  const delay = index * 0.15;
  const Icon = icons[item.icon].title;
  const saved = 100 - pct(item);
  return (
    <article className={`${glass} flex h-full flex-col`}>
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-glow/10 text-glow">
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="type-h3 text-white">{item.label}</h3>
      </div>
      {/* The headline: what robotic surgery saves, in plain words */}
      <p aria-hidden="true" className="mt-6 flex flex-wrap items-baseline gap-x-2">
        <span className="font-display text-5xl leading-none font-bold tracking-[-0.03em] text-glow sm:text-6xl">
          <Counter value={saved} suffix="%" />
        </span>
        <span className="text-2xl font-semibold text-white">{outcomes.less}</span>
        <span className="w-full pt-1 text-[15px] text-white/60">{outcomes.thanOpen}</span>
      </p>
      {item.image ? (
        // Fills the card's spare height (it sits beside the taller scar card on tablet/desktop).
        // Screen blend drops the photo's black background on the dark glass card.
        <div aria-hidden="true" className="flex flex-1 items-center justify-center pt-6">
          <div
            className="relative w-full max-w-[460px]"
            // The arms fill only the top ~72% of this photo, so the box crops to that band.
            style={{ aspectRatio: `${item.image.width} / ${Math.round(item.image.height * 0.72)}` }}
          >
            <Image
              src={item.image.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1304px) 460px, (min-width: 768px) 45vw, 90vw"
              className="object-cover object-top blend-on-dark"
              style={bleedFade(item.image)}
            />
          </div>
        </div>
      ) : null}
      {/* Open surgery vs robotic surgery, in picture units */}
      <div aria-hidden="true" className="relative mt-auto grid grid-cols-2 gap-3 pt-8 sm:gap-4">
        <Side item={item} robotic={false} label={barLabels.open} value={item.open} delay={delay} />
        <Side item={item} robotic label={barLabels.robotic} value={pct(item)} delay={delay + 0.3} />
        <span className="absolute top-1/2 left-1/2 mt-4 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-[11px] font-bold tracking-wider text-white/80 uppercase ring-1 ring-white/15">
          {outcomes.vs}
        </span>
      </div>
      <p className="pt-6 text-[15px] leading-relaxed text-white/70">{item.caption}</p>
    </article>
  );
}

export function RoboticVsOpen() {
  const { items, scars, a11y, barLabels } = outcomes;

  return (
    <Section id="outcomes" tone="ink" className="overflow-hidden">
      {/* Soft teal haze so the glass cards have something to sit on */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-glow/[0.07] blur-[120px]"
      />

      <Reveal>
        <Eyebrow variant="classic" onDark>
          {outcomes.eyebrow}
        </Eyebrow>
        <h2 className="mt-4 type-h2 text-white">{outcomes.heading}</h2>
      </Reveal>

      {/* Screen readers: the bar charts as a table */}
      <table className="sr-only">
        <caption>{a11y.tableCaption}</caption>
        <thead>
          <tr>
            <th scope="col">{a11y.measure}</th>
            <th scope="col">{barLabels.robotic}</th>
            <th scope="col">{barLabels.open}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.label}>
              <th scope="row">{item.label}</th>
              <td>{item.robotic}%</td>
              <td>{item.open}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <BarCard key={item.label} item={item} index={i} />
        ))}
        <article className={`${glass} flex h-full flex-col`}>
          <ScarCompare />
          <p className="mt-6 text-[15px] leading-relaxed text-white/70">{scars.caption}</p>
        </article>
      </Reveal>

      <p className="mt-8 text-[13px] text-white/50">{outcomes.disclaimer}</p>
    </Section>
  );
}
