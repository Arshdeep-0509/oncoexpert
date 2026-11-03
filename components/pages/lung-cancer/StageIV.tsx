import type * as React from "react";
import { stageIV } from "@/content/pages/lung-cancer";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { InView } from "@/components/ui/InView";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { ImmuneCells } from "@/components/pages/lung-cancer/ImmuneCells";
import "@/components/pages/lung-cancer/stage-iv.css";

/**
 * 7 · #stage-iv: the dark plum band. The live heading rises line by line; the 86% and 50% fill as
 * ProgressRings while they count up (a screen-reader table carries both); the one-time immune-cell
 * sequence; a NEW disclaimer and the onDark "Get Second Opinion" (note "Stage IV").
 */
export function StageIV() {
  return (
    <section
      id="stage-iv"
      aria-labelledby="stage-iv-title"
      className="on-dark relative isolate bg-ink bg-(image:--grad-plum) py-(--section-y) text-white"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-14">
        <div className="lg:col-span-6">
          <InView threshold={0.6}>
            <h2 id="stage-iv-title" className="lu-iv-head heading-2 text-white">
              {stageIV.lines.map((line, i) => (
                <span key={line} className="lu-iv-mask">
                  <span className="lu-iv-line" style={{ "--i": i } as React.CSSProperties}>
                    {line}
                  </span>
                  {i < stageIV.lines.length - 1 ? " " : null}
                </span>
              ))}
            </h2>
          </InView>
          <p className="mt-5 measure text-base leading-relaxed text-white/80 md:text-lg">{stageIV.body}</p>

          <table className="sr-only">
            <caption>{stageIV.a11y.table}</caption>
            <thead>
              <tr>
                <th scope="col">{stageIV.a11y.figure}</th>
                <th scope="col">{stageIV.a11y.value}</th>
              </tr>
            </thead>
            <tbody>
              {stageIV.stats.map((s) => (
                <tr key={s.label}>
                  <th scope="row">{s.label}</th>
                  <td>
                    {s.value}
                    {s.suffix}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul aria-hidden="true" className="mt-8 grid grid-cols-2 gap-4 sm:max-w-md">
            {stageIV.stats.map((s, i) => (
              <li
                key={s.label}
                className="flex flex-col items-center gap-3 rounded-xl bg-white/6 p-5 text-center ring-1 ring-white/12"
              >
                <ProgressRing
                  value={s.value}
                  size={112}
                  thickness={9}
                  sizeMd={132}
                  onDark
                  delay={0.15 + i * 0.25}
                  label={`${s.label}: ${s.value}${s.suffix}`}
                >
                  <span className="font-display text-[1.75rem] leading-none font-semibold text-white md:text-[2rem]">
                    <Counter value={s.value} suffix={s.suffix} delay={0.15 + i * 0.25} duration={1.4} reserveWidth />
                  </span>
                </ProgressRing>
                <span className="text-[13px] leading-snug font-bold tracking-[0.08em] text-white/80">{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 measure text-sm leading-relaxed text-white/70">{stageIV.disclaimer}</p>
          <div className="mt-8">
            <AppointmentButton {...stageIV.cta} variant="onDark" arrow fullWidthOnMobile />
          </div>
        </div>
        <div className="lg:col-span-6">
          <ImmuneCells label={stageIV.a11y.cells} />
        </div>
      </Container>
    </section>
  );
}
