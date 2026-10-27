import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cancers, surgeryCount } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { textStyles } from "@/components/ui/text-styles";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { pillLook } from "@/components/pages/robotic-surgery/pills";
import { ContentIconView } from "@/components/pages/robotic-surgery/ContentIconView";
import { prefetchFor } from "@/lib/nav";

type Item = (typeof cancers.items)[number];

const cardBase =
  "group relative flex h-full flex-col rounded-[22px] border border-border bg-white p-7 shadow-card transition-[translate,border-color,box-shadow] duration-500 ease-out-expo";
const cardHover = "hover:border-primary/50 hover:shadow-card-hover motion-safe:hover:-translate-y-1";

function CardBody({ item }: { item: Item }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl bg-primary/[0.07] text-primary ring-1 ring-primary/10 transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
          <ContentIconView name={item.icon} className="size-[22px]" />
        </span>
        {item.href ? (
          <ArrowUpRight
            className="size-5 text-muted transition-[translate,color] duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        ) : null}
      </div>
      <h3 className="mt-6 type-h3 text-ink">{item.title}</h3>
      <p className={textStyles.cardBody}>{item.body}</p>
      <p className="mt-auto pt-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-[13px] font-semibold text-ink tabular-nums">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
          {cancers.countBadge(surgeryCount(item.countKey))}
        </span>
      </p>
    </>
  );
}

export function CancersWeTreat() {
  const { other } = cancers;
  return (
    <Section id="cancers" tone="surface">
      <Reveal>
        <SectionHeading variant="classic" title={cancers.heading} intro={cancers.intro} />
      </Reveal>

      <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cancers.items.map((item) =>
          item.href ? (
            <Link
              key={item.title}
              href={item.href}
              prefetch={prefetchFor(item.href)}
              className={cn(cardBase, cardHover)}
            >
              <CardBody item={item} />
            </Link>
          ) : (
            <article key={item.title} className={cn(cardBase, cardHover)}>
              <CardBody item={item} />
            </article>
          ),
        )}

        {/* CTA card */}
        <article
          data-tone="ink"
          className="relative flex h-full flex-col overflow-hidden rounded-[22px] bg-ink p-7 text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-glow/15 blur-[80px]"
          />
          <h3 className="relative type-h3 text-white">{other.title}</h3>
          <p className="relative mt-2 text-[15px] leading-relaxed text-white/70">{other.body}</p>
          <div className="relative mt-auto pt-8">
            <AppointmentButton {...other.cta} look={pillLook.glow} arrow />
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
