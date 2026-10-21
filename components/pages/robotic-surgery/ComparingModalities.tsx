"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { compare } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { pillLook } from "@/components/pages/robotic-surgery/pills";
import { HEAD, ROW } from "@/components/pages/robotic-surgery/comparing-modalities/table-rows";
import { RowLabel } from "@/components/pages/robotic-surgery/comparing-modalities/RowLabel";
import { ColumnCard } from "@/components/pages/robotic-surgery/comparing-modalities/ColumnCard";

export function ComparingModalities() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = React.useState(0);
  const mobile = compare.modalities[mobileIndex];

  return (
    <Section id="compare" tone="white">
      <Reveal>
        <SectionHeading
          variant="classic"
          eyebrow={compare.eyebrow}
          title={compare.heading}
          intro={compare.intro}
          align="center"
        />
      </Reveal>

      {/* Desktop / tablet: label column + two aligned column cards */}
      <Reveal className="mx-auto mt-16 hidden max-w-[1000px] md:block">
        <table className="sr-only">
          <caption>{compare.heading}</caption>
          <thead>
            <tr>
              <td />
              {compare.modalities.map((mod) => (
                <th key={mod.name} scope="col">
                  {mod.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compare.rows.map((row, i) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {compare.modalities.map((mod) => (
                  <td key={mod.name}>{mod.values[i]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div aria-hidden="true" className="grid grid-cols-[minmax(170px,0.8fr)_1fr_1fr] gap-x-5">
          <div>
            <div className={HEAD} />
            <ul>
              {compare.rows.map((row, i) => (
                <li
                  key={row.label}
                  onPointerEnter={() => setHovered(i)}
                  onPointerLeave={() => setHovered(null)}
                  className={cn(
                    ROW,
                    "flex items-center rounded-l-2xl pl-2 transition-colors duration-300",
                    hovered === i && "bg-surface",
                  )}
                >
                  <RowLabel label={row.label} icon={row.icon} />
                </li>
              ))}
            </ul>
          </div>
          {compare.modalities.map((mod) => (
            <ColumnCard key={mod.name} modality={mod} hovered={hovered} onHover={setHovered} />
          ))}
        </div>
      </Reveal>

      {/* Mobile: segmented switch, one column at a time */}
      <div className="mt-10 md:hidden">
        <div
          role="tablist"
          aria-label={compare.heading}
          className="flex rounded-full border border-border bg-surface p-1"
        >
          {compare.modalities.map((mod, i) => (
            <button
              key={mod.name}
              type="button"
              role="tab"
              id={`compare-tab-${i}`}
              aria-selected={mobileIndex === i}
              aria-controls="compare-panel"
              onClick={() => setMobileIndex(i)}
              className={cn(
                "relative h-11 flex-1 rounded-full px-3 text-[15px] font-semibold transition-colors duration-300",
                mobileIndex === i ? "text-white" : "text-muted",
              )}
            >
              {mobileIndex === i ? (
                <motion.span
                  layoutId="compare-switch"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ duration: reduce ? 0 : 0.45, ease: EASE_OUT_EXPO }}
                />
              ) : null}
              <span className="relative">{mod.name}</span>
            </button>
          ))}
        </div>

        <div
          id="compare-panel"
          role="tabpanel"
          aria-labelledby={`compare-tab-${mobileIndex}`}
          className={cn(
            "relative mt-8 rounded-[22px] bg-white",
            mobile.featured ? "border-2 border-primary shadow-card" : "border border-border shadow-card",
          )}
        >
          {mobile.badge ? (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold tracking-[0.14em] whitespace-nowrap text-white">
              {mobile.badge}
            </span>
          ) : null}
          <dl>
            {compare.rows.map((row, i) => (
              <div
                key={row.label}
                className={cn(
                  "flex flex-col gap-2 px-5 py-4",
                  i < compare.rows.length - 1 && "border-b border-border/70",
                )}
              >
                <dt>
                  <RowLabel label={row.label} icon={row.icon} />
                </dt>
                <dd className={cn("pl-12 text-[15px]", mobile.featured ? "font-semibold text-ink" : "text-muted")}>
                  {mobile.values[i]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-14 flex justify-center">
        <AppointmentButton {...compare.cta} look={pillLook.primary} arrow />
      </div>
    </Section>
  );
}
