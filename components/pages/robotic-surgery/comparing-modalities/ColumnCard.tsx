"use client";

import { compare } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { HEAD, ROW, type Modality } from "@/components/pages/robotic-surgery/comparing-modalities/table-rows";

/** One modality's column: name, then one value per row; the featured one is outlined. */
export function ColumnCard({
  modality,
  hovered,
  onHover,
}: {
  modality: Modality;
  hovered: number | null;
  onHover: (i: number | null) => void;
}) {
  const featured = modality.featured;
  return (
    <div
      className={cn(
        "relative rounded-[24px] bg-white",
        featured
          ? "border-2 border-primary shadow-[0_2px_4px_rgb(0_61_174/0.06),0_24px_48px_-20px_rgb(0_61_174/0.35)]"
          : "border border-border shadow-card",
      )}
    >
      {modality.badge ? (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-[11px] font-bold tracking-[0.14em] whitespace-nowrap text-white shadow-[0_6px_16px_-6px_rgb(0_61_174/0.6)]">
          {modality.badge}
        </span>
      ) : null}
      <div className={cn(HEAD, "flex items-center justify-center border-b border-border px-6")}>
        <h3 className={cn("text-center type-h3", featured ? "text-ink" : "text-text")}>{modality.name}</h3>
      </div>
      <ul>
        {modality.values.map((value, i) => (
          <li
            key={compare.rows[i].label}
            onPointerEnter={() => onHover(i)}
            onPointerLeave={() => onHover(null)}
            className={cn(
              ROW,
              "flex items-center justify-center px-5 text-center text-[15px] leading-snug transition-colors duration-300",
              i < modality.values.length - 1 && "border-b border-border/70",
              i === modality.values.length - 1 && "rounded-b-[22px]",
              featured ? "font-semibold text-ink" : "text-muted",
              hovered === i && (featured ? "bg-primary/[0.06]" : "bg-surface"),
            )}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
