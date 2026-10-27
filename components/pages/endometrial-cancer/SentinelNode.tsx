import { CircleCheck, Layers, ShieldPlus, type LucideIcon } from "lucide-react";
import { sentinel, type SentinelIcon } from "@/content/pages/endometrial-cancer";
import { keepLastWords } from "@/lib/format";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SentinelDiagram } from "@/components/pages/endometrial-cancer/SentinelDiagram";
import "@/components/pages/endometrial-cancer/sentinel.css";

const icons: Record<SentinelIcon, LucideIcon> = {
  lymphedema: ShieldPlus,
  staging: Layers,
  preservation: CircleCheck,
};

/**
 * 5 · #sentinel-node "Sentinel Lymph Node Biopsy": the ICG explainer beside the text and the three
 * benefits, which stagger in. Phones: the diagram on top, then the text and benefits.
 */
export function SentinelNode() {
  return (
    <Section id="sentinel-node" aria-labelledby="sentinel-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SentinelDiagram labels={sentinel.diagram} />
        </Reveal>
        <div className="lg:col-span-6">
          <Reveal>
            <h2 id="sentinel-title" className="heading-2 text-ink">
              {keepLastWords(sentinel.title)}
            </h2>
            <p className="mt-4 measure text-base text-text md:text-lg">{sentinel.body}</p>
          </Reveal>
          <Reveal stagger as="ul" className="mt-8 grid gap-4" delay={0.1}>
            {sentinel.benefits.map((b) => {
              const Icon = icons[b.icon];
              return (
                <div key={b.title} className="flex items-start gap-4 rounded-lg bg-surface-alt p-5 ring-1 ring-line">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-ink">{b.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{b.body}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
