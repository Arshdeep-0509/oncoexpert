import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Flower2, Network, Sparkles, Users, type LucideIcon } from "lucide-react";
import { surgery, type SurgeryCardKey } from "@/content/pages/breast-cancer";
import { breastImages } from "@/content/pages/breast-cancer.images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Counter } from "@/components/ui/Counter";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { ReconstructionOptions } from "@/components/pages/breast-cancer/ReconstructionOptions";

const icons: Record<SurgeryCardKey, LucideIcon> = {
  conservation: Flower2,
  sentinel: Network,
  robotic: Bot,
  reconstruction: Sparkles,
  planning: Users,
};

/** Desktop: Conservation, Sentinel, Robotic in row 1; Reconstruction (2 cols) + Planning in row 2. */
const SPAN: Record<SurgeryCardKey, string> = {
  conservation: "",
  sentinel: "",
  robotic: "",
  reconstruction: "md:col-span-2",
  planning: "",
};

/**
 * 7 · #surgery. Phones fit it on far fewer screens: no photo (the 65% card stays, in the flow),
 * the five cards as a swipe row, the two buttons side by side. Tablet and desktop unchanged.
 */
export function SurgicalTechniques() {
  const img = breastImages[surgery.image];
  const { stat } = surgery;

  return (
    <Section id="surgery" tone="warm" aria-labelledby="surgery-title" className="max-md:py-12">
      <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        {/* Text (second on phones) */}
        <Reveal className="md:max-lg:order-last">
          <SectionHeading id="surgery-title" eyebrow={surgery.eyebrow} title={surgery.title} intro={surgery.intro} />
          <blockquote className="relative mt-7 rounded-lg border-l-4 border-accent bg-surface/80 p-5 font-display text-[1.1rem] leading-relaxed text-ink italic shadow-soft-sm md:p-6 md:text-[1.2rem]">
            {surgery.highlight}
          </blockquote>
        </Reveal>

        {/* Photo with the 65% card overlapping its bottom-left corner (bottom edge on phones) */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-[560px] md:max-lg:mb-14 lg:mb-8 lg:ml-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft max-md:hidden lg:aspect-[5/6]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 560px"
                className="object-cover"
                style={{ objectPosition: img.focal }}
              />
            </div>
            <div className="flex items-center gap-4 rounded-[20px] border border-line bg-surface p-4 pr-6 shadow-soft-lg md:absolute md:-bottom-12 md:left-6 lg:-bottom-8 lg:-left-8 lg:p-5 lg:pr-7">
              <ProgressRing
                value={stat.value}
                size={84}
                thickness={8}
                label={`${stat.value}${stat.suffix} ${stat.label}`}
              >
                <span className="font-display text-xl font-semibold text-ink">
                  <Counter value={stat.value} suffix={stat.suffix} reserveWidth />
                </span>
              </ProgressRing>
              <p aria-hidden="true" className="max-w-[15ch] text-[13px] leading-snug font-semibold text-muted">
                {stat.label}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Cards: a swipe row on phones, the grid from md */}
      <SwipeRow
        label={surgery.title}
        className="mt-10 md:mt-20"
        gridClassName="md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6"
        itemClassName={surgery.cards.map((card) => SPAN[card.key] || undefined)}
      >
        {surgery.cards.map((card, i) => {
          const Icon = icons[card.key];
          return (
            <Reveal key={card.key} className="h-full" delay={(i % 3) * 0.08}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-soft-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-soft md:p-7",
                  card.key === "reconstruction" && "bg-linear-to-br from-surface to-surface-alt",
                )}
              >
                <span className="grid size-12 place-items-center rounded-[14px] bg-accent-soft text-accent">
                  <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[1.3rem] leading-snug text-ink">{card.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted md:text-base">{card.body}</p>
                {"options" in card ? <ReconstructionOptions options={card.options} /> : null}
                {"link" in card ? (
                  <Link
                    href={card.link.href}
                    className="group/link mt-auto inline-flex min-h-12 items-center gap-2 pt-4 text-[15px] font-semibold text-accent hover:text-accent-hover"
                  >
                    {card.link.label}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </Link>
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </SwipeRow>

      <Reveal className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:flex md:justify-center">
        <AppointmentButton {...surgery.ctas.primary} arrow className="max-md:px-3 max-md:text-[14px]" />
        <AppointmentButton
          {...surgery.ctas.secondary}
          variant="secondary"
          className="bg-white max-md:px-3 max-md:text-[14px]"
        />
      </Reveal>
    </Section>
  );
}
