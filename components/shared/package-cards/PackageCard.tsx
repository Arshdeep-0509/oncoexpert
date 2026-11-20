import type * as React from "react";
import { Check } from "lucide-react";
import type { PackageItem } from "@/content/types";
import { formatLakh } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/Counter";
import { InView } from "@/components/ui/InView";
import { PackageCta } from "@/components/shared/package-cards/PackageCta";
import { packageIcons } from "@/components/shared/package-cards/icons";

/**
 * One package (package-cards.css, pkc-): name, lead, a price that counts up (en-IN grouping),
 * inclusions whose checks draw once in view, and the booking button. The featured card sits in a
 * gradient border box with its ribbon and a light that sweeps it every 8s (stops on hover / focus
 * and off-screen). Optional (Urology): a tier label above the name, a tagline under the price, an
 * icon per inclusion, and the lakh price ("From ₹1.6L +", static); without them the card is as before.
 */
export function PackageCard({
  item,
  page,
  priceFormat = "rupees",
}: {
  item: PackageItem;
  page: string;
  priceFormat?: "rupees" | "lakh";
}) {
  const card = (
    <div
      className={cn(
        "pkc-card relative flex h-full flex-col overflow-hidden rounded-xl bg-surface p-6 md:p-8",
        !item.featured && "ring-1 shadow-soft ring-line",
      )}
    >
      {item.featured ? <span aria-hidden="true" className="pkc-sweep pointer-events-none absolute inset-0" /> : null}
      {item.featured && item.ribbon ? (
        <p className="mb-4 inline-flex self-start rounded-pill bg-(image:--grad-accent) px-3 py-1 text-xs font-bold tracking-[0.1em] text-white uppercase">
          {item.ribbon}
        </p>
      ) : null}
      {item.tier ? <p className="mb-2 text-xs font-bold tracking-[0.14em] text-accent">{item.tier}</p> : null}
      <h3 className="text-sm font-bold tracking-[0.12em] text-ink">{item.name}</h3>
      {item.lead ? <p className="mt-4 text-base text-muted">{item.lead}</p> : null}
      <p className="font-display text-[2.4rem] leading-tight font-semibold text-ink md:text-[2.75rem]">
        {priceFormat === "lakh" ? (
          <span className="tabular-nums">
            {item.prefix}
            {formatLakh(item.price)}
            {item.suffix ? <span className="ml-1 text-accent">{item.suffix}</span> : null}
          </span>
        ) : (
          <Counter value={item.price} prefix={item.prefix} suffix={item.suffix} duration={1.4} reserveWidth />
        )}
        {item.asterisk ? <span className="text-accent">{item.asterisk}</span> : null}
      </p>
      {item.tagline ? <p className="mt-1 text-base text-muted">{item.tagline}</p> : null}
      <InView threshold={0.5} className="pkc-list mt-6">
        <ul className="grid gap-3">
          {item.inclusions.map((inc, k) => {
            const icon = item.inclusionIcons?.[k];
            const Icon = icon ? packageIcons[icon] : null;
            return (
              <li key={inc} className="flex items-center gap-3 text-base text-text">
                {Icon ? (
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                ) : (
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check
                      className="pkc-check size-3.5"
                      strokeWidth={3}
                      aria-hidden="true"
                      style={{ "--k": k } as React.CSSProperties}
                    />
                  </span>
                )}
                {inc}
              </li>
            );
          })}
        </ul>
      </InView>
      <div className="mt-auto pt-8">
        <PackageCta {...item.cta} name={item.name} page={page} featured={item.featured} />
      </div>
    </div>
  );

  return item.featured ? (
    <div className="pkc-featured h-full rounded-xl bg-(image:--grad-accent) p-[2px] shadow-soft-lg">{card}</div>
  ) : (
    card
  );
}
