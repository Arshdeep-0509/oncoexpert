"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { images, surgeryNumbers, type SurgeryKey } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

import {
  a11y,
  colorFor,
  counts,
  linkHandlers,
  max,
  total,
} from "@/components/pages/robotic-surgery/surgery-numbers/chart-data";
import { Donut } from "@/components/pages/robotic-surgery/surgery-numbers/Donut";

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
        className="pointer-events-none absolute right-0 bottom-0 -z-10 w-[80vw] max-w-[820px] opacity-10 blend-on-dark"
        style={{ y: reduce ? 0 : drift }}
      >
        <Image
          src={images.armsBlack.src}
          alt=""
          aria-hidden="true"
          width={images.armsBlack.width}
          height={images.armsBlack.height}
          sizes="(min-width: 1024px) 820px, 80vw"
        />
      </motion.div>

      <div ref={wrapRef}>
        <Reveal>
          <Eyebrow variant="classic" onDark>
            {surgeryNumbers.eyebrow}
          </Eyebrow>
          <h2 className="mt-4 type-h2 text-white">{surgeryNumbers.heading}</h2>
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

        <div
          aria-hidden="true"
          className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16"
        >
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
