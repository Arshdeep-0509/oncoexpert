"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { images, surgeryNumbers, surgeryTotal, type SurgeryKey } from "@/content/robotic-surgery";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, EASE_OUT_EXPO } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";

const { counts, a11y } = surgeryNumbers;
const total = surgeryTotal(counts);
const max = Math.max(...counts.map((c) => c.count));

/** Shades from --primary to --glow in order; "Others" is slate. */
const colorFor = (key: SurgeryKey) => {
  if (key === "others") return "var(--slate)";
  const ranked = counts.filter((c) => c.key !== "others");
  const t = ranked.length > 1 ? ranked.findIndex((c) => c.key === key) / (ranked.length - 1) : 1;
  return `color-mix(in oklab, var(--primary) ${Math.round((1 - t) * 100)}%, var(--glow))`;
};

/**
 * Tile ↔ segment linking: hover with a mouse, tap on touch screens (tap again to clear).
 * Touch fires enter/leave around every tap, so those only count for mouse pointers.
 */
function linkHandlers(setActive: React.Dispatch<React.SetStateAction<SurgeryKey | null>>) {
  return (key: SurgeryKey) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive(key);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive(null);
    },
    onClick: () => setActive((a) => (a === key ? null : key)),
  });
}

// Donut geometry (units: % of circumference via pathLength=100).
const GAP = 0.7;
const segments = counts.reduce<{ key: SurgeryKey; start: number; length: number }[]>((acc, c) => {
  const start = acc.length ? acc[acc.length - 1].start + acc[acc.length - 1].length + GAP : 0;
  acc.push({ key: c.key, start, length: (c.count / total) * 100 - GAP });
  return acc;
}, []);

type Linker = ReturnType<typeof linkHandlers>;

function Donut({ active, link }: { active: SurgeryKey | null; link: Linker }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const current = counts.find((c) => c.key === active);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] lg:mx-0">
      <svg ref={ref} viewBox="0 0 240 240" className="size-full" aria-hidden="true">
        <circle cx="120" cy="120" r="96" fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="26" />
        <g transform="rotate(-90 120 120)">
          {segments.map((s, i) => (
            <motion.circle
              key={s.key}
              cx="120"
              cy="120"
              r="96"
              fill="none"
              pathLength={100}
              stroke={colorFor(s.key)}
              strokeDashoffset={-s.start}
              initial={reduce ? false : { strokeDasharray: "0 100" }}
              animate={
                inView || reduce
                  ? { strokeDasharray: `${s.length} ${100 - s.length}` }
                  : { strokeDasharray: "0 100" }
              }
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 + i * 0.12 }}
              strokeWidth={active === s.key ? 32 : 26}
              opacity={active && active !== s.key ? 0.45 : 1}
              className="cursor-pointer transition-[stroke-width,opacity] duration-300"
              {...link(s.key)}
            />
          ))}
        </g>
      </svg>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center text-center">
        <div className={cn("transition-opacity duration-300", current ? "opacity-100" : "opacity-0")}>
          <p className="font-display text-4xl font-bold text-white tabular-nums">{current?.count}</p>
          <p className="mt-1 max-w-[9rem] text-[13px] leading-snug text-white/60">{current?.label}</p>
        </div>
      </div>
    </div>
  );
}

export function SurgeryNumbers() {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<SurgeryKey | null>(null);
  const link = linkHandlers(setActive);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <Section id="numbers" tone="black" className="overflow-hidden">
      {/* Arms photo, bottom right: 10% opacity, screen blend, ~40px parallax drift */}
      <motion.div
        aria-hidden="true"
        className="blend-on-dark pointer-events-none absolute right-0 bottom-0 -z-10 w-[80vw] max-w-[820px] opacity-10"
        style={{ y: reduce ? 0 : drift }}
      >
        <Image src={images.armsBlack.src} alt="" width={images.armsBlack.width} height={images.armsBlack.height} sizes="(min-width: 1024px) 820px, 80vw" />
      </motion.div>

      <div ref={wrapRef}>
        <Reveal>
          <Eyebrow onDark>{surgeryNumbers.eyebrow}</Eyebrow>
          <h2 className="type-h2 mt-4 text-white">{surgeryNumbers.heading}</h2>
        </Reveal>

        {/* Screen readers: the full data as a table */}
        <table className="sr-only">
          <caption>{a11y.tableCaption}</caption>
          <thead>
            <tr>
              <th scope="col">{a11y.specialty}</th>
              <th scope="col">{a11y.surgeries}</th>
            </tr>
          </thead>
          <tbody>
            {counts.map((c) => (
              <tr key={c.key}>
                <th scope="row">{c.label}</th>
                <td>{c.count}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">{a11y.total}</th>
              <td>{total}</td>
            </tr>
          </tfoot>
        </table>

        <div aria-hidden="true" className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
          {/* Left: total + donut (side by side on tablets) */}
          <div className="md:grid md:grid-cols-2 md:items-center md:gap-10 lg:block">
            <div>
              <p className="font-display text-[clamp(5rem,12vw,9rem)] leading-[0.9] font-extrabold tracking-[-0.045em] text-white">
                <Counter value={total} />
              </p>
              <p className="mt-3 text-lg text-white/65">{surgeryNumbers.totalLabel}</p>
            </div>
            <div className="mt-10 md:mt-0 lg:mt-10">
              <Donut active={active} link={link} />
            </div>
          </div>

          {/* Right: 4×2 tiles */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {counts.map((c, i) => (
              <motion.li
                key={c.key}
                {...link(c.key)}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.06 }}
                className={cn(
                  "flex min-h-[132px] flex-col rounded-[18px] border p-4 transition-colors duration-300 sm:p-5",
                  active === c.key ? "border-glow/50 bg-white/[0.07]" : "border-white/10 bg-white/[0.03]",
                  active && active !== c.key && "opacity-60",
                )}
              >
                <span className="font-display text-[2rem] leading-none font-bold text-white">
                  <Counter value={c.count} />
                </span>
                <span className="mt-2 text-sm leading-snug text-white/65">
                  {/* allow a line break after "/" (e.g. Endometrium/uterine) without changing the text */}
                  {c.label.split("/").map((part, j) => (
                    <React.Fragment key={part}>
                      {j > 0 ? (
                        <>
                          /<wbr />
                        </>
                      ) : null}
                      {part}
                    </React.Fragment>
                  ))}
                </span>
                <span className="mt-auto block h-1 shrink-0 overflow-hidden rounded-full bg-white/10 pt-0">
                  <motion.span
                    className="block h-full origin-left rounded-full"
                    style={{ width: `${(c.count / max) * 100}%`, background: colorFor(c.key) }}
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 + i * 0.06 }}
                  />
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
