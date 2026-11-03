import type * as React from "react";
import { Check } from "lucide-react";
import { surgery } from "@/content/pages/lung-cancer";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InView } from "@/components/ui/InView";
import { LobeExplorer } from "@/components/pages/lung-cancer/LobeExplorer";
import "@/components/pages/lung-cancer/surgery.css";

/**
 * 5 · #surgery "Less Pain. Better Breathing. Faster Recovery." Desktop: the live heading, copy and
 * the four benefit chips left (they pop in, their checks draw), the lobe explorer right. Tablets
 * and phones stack them, the explorer last. Server-rendered; the explorer is the island.
 */
export function Surgery() {
  const { explorer } = surgery;
  return (
    <section id="surgery" aria-labelledby="surgery-title" className="bg-surface-warm py-(--section-y)">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-14">
        <div className="lg:col-span-6">
          <Eyebrow>{surgery.eyebrow}</Eyebrow>
          <h2 id="surgery-title" className="mt-4 heading-2 text-ink">
            {surgery.lines.map((line, i) => (
              <span key={line}>
                {i > 0 ? " " : null}
                <span className="md:block">{line}</span>
              </span>
            ))}
          </h2>
          <p className="mt-5 measure text-base leading-relaxed text-text md:text-lg">{surgery.body}</p>
          <InView threshold={0.5} className="lu-sx-chips mt-8">
            <ul className="flex flex-wrap gap-2.5">
              {surgery.benefits.map((b, i) => (
                <li
                  key={b.label}
                  className="lu-sx-chip inline-flex min-h-11 items-center gap-2 rounded-pill bg-surface px-4 py-2 text-[15px] font-semibold text-ink ring-1 shadow-soft-sm ring-line"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="grid size-6 place-items-center rounded-full bg-accent text-white">
                    <Check className={cn("lu-sx-check size-3.5")} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {b.label}
                </li>
              ))}
            </ul>
          </InView>
        </div>
        <div className="lg:col-span-6">
          <LobeExplorer
            modes={explorer.modes}
            lobes={explorer.lobes}
            preserved={explorer.preserved}
            summary={explorer.summary}
            labels={explorer.a11y}
          />
        </div>
      </Container>
    </section>
  );
}
