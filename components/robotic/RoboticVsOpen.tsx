"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { outcomes, type OutcomeItem } from "@/content/robotic-surgery";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, EASE_OUT_EXPO } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { ScarCompare } from "@/components/robotic/ScarCompare";
import { bleedFade } from "@/lib/image-fade";

const glass = "rounded-[22px] border border-white/10 bg-white/[0.05] p-6 sm:p-7";
const pct = (item: OutcomeItem) => Math.round((item.robotic / item.open) * 100);

function Bar({ fill, value, label, delay, gradient }: { fill: number; value: number; label: string; delay: number; gradient: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-[13px] text-white/60">
        <span>{label}</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className={
            gradient
              ? "h-full origin-left rounded-full bg-linear-to-r from-teal to-glow shadow-[0_0_14px_rgb(45_212_191/0.55)]"
              : "h-full origin-left rounded-full bg-slate/80"
          }
          style={{ width: `${fill * 100}%` }}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay }}
        />
      </div>
    </div>
  );
}

function BarCard({ item, index }: { item: OutcomeItem; index: number }) {
  const { barLabels } = outcomes;
  const delay = index * 0.15;
  return (
    <article className={`${glass} flex h-full flex-col`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="type-h3 text-white">{item.label}</h3>
        <p aria-hidden="true" className="font-display text-5xl leading-none font-bold tracking-[-0.03em] text-glow sm:text-6xl">
          <Counter value={pct(item)} suffix="%" />
        </p>
      </div>
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
              fill
              sizes="(min-width: 1304px) 460px, (min-width: 768px) 45vw, 90vw"
              className="blend-on-dark object-cover object-top"
              style={bleedFade(item.image)}
            />
          </div>
        </div>
      ) : null}
      <div aria-hidden="true" className="mt-auto grid gap-4 pt-8">
        <Bar fill={1} value={item.open} label={barLabels.open} delay={delay} gradient={false} />
        <Bar fill={item.robotic / item.open} value={item.robotic} label={barLabels.robotic} delay={delay + 0.15} gradient />
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
        <Eyebrow onDark>{outcomes.eyebrow}</Eyebrow>
        <h2 className="type-h2 mt-4 text-white">{outcomes.heading}</h2>
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
