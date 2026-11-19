"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Activity, BedDouble, Droplets, type LucideIcon } from "lucide-react";
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

const icons: Record<OutcomeItem["icon"], LucideIcon> = { blood: Droplets, stay: BedDouble, pain: Activity };

/**
 * One column of the comparison: a label over it (the value), the bar growing up from the base, the
 * name under it. The robotic column also shows the part it saves, as a dashed box up to the open
 * surgery level with "−75%" in it.
 */
function Column({
  share,
  value,
  label,
  delay,
  robotic,
}: {
  share: number;
  value: number;
  label: string;
  delay: number;
  robotic: boolean;
}) {
  const reduce = useReducedMotion();
  const saved = 100 - value;
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-40 w-full max-w-[112px] sm:h-44">
        {robotic && saved > 0 ? (
          <div
            className="absolute inset-x-0 top-0 flex items-center justify-center rounded-t-xl border border-dashed border-glow/45 bg-glow/[0.04]"
            style={{ height: `${(1 - share) * 100}%` }}
          >
            <span className="text-sm font-semibold text-glow tabular-nums">−{saved}%</span>
          </div>
        ) : null}
        <motion.div
          className={
            robotic
              ? "absolute inset-x-0 bottom-0 flex origin-bottom items-start justify-center rounded-xl bg-linear-to-t from-teal to-glow pt-2 shadow-[0_0_18px_rgb(45_212_191/0.45)]"
              : "absolute inset-x-0 bottom-0 flex origin-bottom items-start justify-center rounded-xl bg-slate/70 pt-2"
          }
          style={{ height: `${share * 100}%` }}
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay }}
        >
          <span className={`text-sm font-bold tabular-nums ${robotic ? "text-ink" : "text-white"}`}>{value}%</span>
        </motion.div>
      </div>
      <p className="mt-3 text-center text-[13px] leading-snug text-white/70">{label}</p>
    </div>
  );
}

function BarCard({ item, index }: { item: OutcomeItem; index: number }) {
  const { barLabels } = outcomes;
  const delay = index * 0.15;
  const Icon = icons[item.icon];
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
      <div
        aria-hidden="true"
        className="mt-auto grid grid-cols-2 items-end gap-4 border-b border-white/10 pt-8 sm:gap-6"
      >
        <Column share={1} value={item.open} label={barLabels.open} delay={delay} robotic={false} />
        <Column
          share={item.robotic / item.open}
          value={pct(item)}
          label={barLabels.robotic}
          delay={delay + 0.2}
          robotic
        />
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
