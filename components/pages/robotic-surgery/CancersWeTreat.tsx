import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cancers, surgeryCount } from "@/content/pages/robotic-surgery";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { pillLook } from "@/components/pages/robotic-surgery/pills";
import { ContentIconView } from "@/components/pages/robotic-surgery/ContentIconView";
import { prefetchFor } from "@/lib/nav";
import "@/components/pages/robotic-surgery/cancers.css";

type Item = (typeof cancers.items)[number];

function Panel({ item }: { item: Item }) {
  return (
    <>
      <Image
        src={item.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
        className="rkc-img"
      />
      <span aria-hidden="true" className="rkc-shade" />
      {item.href ? <ArrowUpRight className="rkc-arrow size-6" strokeWidth={1.75} aria-hidden="true" /> : null}
      <div className="rkc-text">
        <span className="grid size-11 place-items-center rounded-2xl bg-white/12 ring-1 ring-white/20">
          <ContentIconView name={item.icon} className="size-[22px]" />
        </span>
        <h3 className="rkc-title">{item.title}</h3>
        <div className="rkc-more">
          <span className="block text-[15px] leading-relaxed text-white/80">{item.body}</span>
          <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-[13px] font-semibold tabular-nums ring-1 ring-white/20">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-glow" />
            {cancers.countBadge(surgeryCount(item.countKey))}
          </span>
        </div>
      </div>
    </>
  );
}

/**
 * 9 · #cancers: the five cancers as tall image panels (cancers.css). Desktop with a mouse: a row;
 * the panel under the pointer or focus opens to show its text, the first when none is. Touch
 * screens and smaller windows: image cards with all their text. Then the "Other Indications?" band.
 */
export function CancersWeTreat() {
  const { other } = cancers;
  return (
    <Section id="cancers" tone="surface">
      <Reveal>
        <SectionHeading variant="classic" title={cancers.heading} intro={cancers.intro} />
      </Reveal>

      <Reveal className="mt-12">
        <ul className="rkc-row">
          {cancers.items.map((item) => (
            <li key={item.title} className="rkc-item">
              {item.href ? (
                <Link href={item.href} prefetch={prefetchFor(item.href)} className="rkc-panel">
                  <Panel item={item} />
                </Link>
              ) : (
                <article className="rkc-panel">
                  <Panel item={item} />
                </article>
              )}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-5">
        <article
          data-tone="ink"
          className="relative flex flex-col gap-6 overflow-hidden rounded-[22px] bg-ink p-7 text-white md:flex-row md:items-center md:justify-between md:px-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-glow/15 blur-[80px]"
          />
          <div className="relative">
            <h3 className="type-h3 text-white">{other.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/70">{other.body}</p>
          </div>
          <div className="relative shrink-0">
            <AppointmentButton {...other.cta} look={pillLook.glow} arrow />
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
