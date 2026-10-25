import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cpu, type LucideIcon } from "lucide-react";
import { expertise, type ExpertiseContent, type ExpertiseIcon } from "@/content/pages/about-us";
import { aboutImages } from "@/content/pages/about-us.images";
import { cn } from "@/lib/utils";
import { serviceIcons } from "@/components/layout/nav-icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { Reveal } from "@/components/ui/Reveal";
import { styles } from "@/components/pages/about-us/about-styles";
import "@/components/pages/about-us/about.css";

/** The menu's icons (so About matches the services menu); Robotic: the chip. */
const icons: Record<ExpertiseIcon, LucideIcon> = {
  breast: serviceIcons.breast,
  gi: serviceIcons.colorectal,
  uro: serviceIcons.urology,
  robotic: Cpu,
};

type Card = ExpertiseContent["cards"][number];

/** Bento order: Robotic (large photo), Breast (photo), then the two icon tiles. */
const ORDER = ["robotic", "breast", "gi", "uro"] as const satisfies readonly ExpertiseIcon[];
const cards: readonly Card[] = ORDER.map((icon) => expertise.cards.find((card) => card.icon === icon)!);

function LearnMore({ card, onPhoto }: { card: Card; onPhoto: boolean }) {
  return (
    <span
      className={cn(
        "mt-5 inline-flex items-center gap-2 text-[15px] font-semibold",
        onPhoto ? "text-white" : "text-accent",
      )}
    >
      {card.link.label}
      <ArrowRight className={cn(styles.tileArrow, "size-[18px]")} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

function TileIcon({ icon, onPhoto }: { icon: ExpertiseIcon; onPhoto: boolean }) {
  const Icon = icons[icon];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-xl",
        onPhoto ? "bg-white/90 text-accent" : "bg-accent-soft text-accent",
      )}
    >
      <Icon className="size-6" strokeWidth={1.75} />
    </span>
  );
}

/** A photo tile: Robotic (large; the black-background arms blend into the navy) and Breast. */
function PhotoTile({ card, large }: { card: Card; large: boolean }) {
  const photo = aboutImages[card.image!];
  return (
    <Link
      href={card.link.href}
      prefetch={false}
      data-cta={`${card.title}: ${card.link.label}`}
      className={cn(
        styles.tile,
        "group/tile flex h-full flex-col justify-end overflow-hidden rounded-2xl bg-ink text-white shadow-soft",
        large ? "min-h-[24rem] lg:min-h-[34rem]" : "min-h-[24rem]",
      )}
    >
      <span aria-hidden="true" className={styles.tileShadow} />
      <span aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes={
            large
              ? "(min-width: 1024px) 620px, (min-width: 768px) 700px, 82vw"
              : "(min-width: 1024px) 300px, (min-width: 768px) 350px, 82vw"
          }
          className={cn(styles.tilePhoto, "object-cover", large && "blend-on-dark")}
          style={{ objectPosition: photo.focal }}
        />
      </span>
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/70 to-ink/0" />
      <span className="relative p-6 md:p-8">
        <TileIcon icon={card.icon} onPhoto />
        <span
          className={cn("mt-5 block font-display leading-tight font-bold", large ? "text-3xl md:text-4xl" : "text-2xl")}
        >
          {card.title}
        </span>
        <span className="mt-2 block max-w-[44ch] text-[15px] leading-relaxed text-white/80 md:text-base">
          {card.body}
        </span>
        <LearnMore card={card} onPhoto />
      </span>
    </Link>
  );
}

function IconTile({ card }: { card: Card }) {
  return (
    <Link
      href={card.link.href}
      prefetch={false}
      data-cta={`${card.title}: ${card.link.label}`}
      className={cn(
        styles.tile,
        "group/tile flex h-full flex-col rounded-2xl bg-surface p-6 ring-1 shadow-soft-sm ring-line md:p-7",
      )}
    >
      <span aria-hidden="true" className={styles.tileShadow} />
      <TileIcon icon={card.icon} onPhoto={false} />
      <span className="mt-5 block font-display text-xl leading-snug font-bold text-ink">{card.title}</span>
      <span className="mt-2 block text-[15px] leading-relaxed text-muted">{card.body}</span>
      <span className="mt-auto">
        <LearnMore card={card} onPhoto={false} />
      </span>
    </Link>
  );
}

/**
 * #expertise "Surgical Expertise": the four cards as a bento grid. Desktop: Robotic large with
 * the arms photo (2×2), Breast tall with its photo, GI and Uro as icon tiles. Tablet: Robotic
 * across the top, Breast tall on the left, the two icon tiles stacked beside it. Phones: a swipe
 * row. Hover / focus: the tile lifts, its photo zooms a little, the arrow slides.
 */
export function Expertise() {
  return (
    <Section id="expertise" aria-labelledby="expertise-title">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="expertise-title" title={expertise.title} intro={expertise.intro} />
        <Link
          href={expertise.all.href}
          prefetch={false}
          data-cta={expertise.all.label}
          className="group/all inline-flex min-h-12 shrink-0 items-center gap-2 self-start font-semibold text-accent md:self-auto"
        >
          {expertise.all.label}
          <ArrowRight
            className="size-[18px] transition-transform duration-300 ease-out-expo group-hover/all:translate-x-1"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </Link>
      </Reveal>
      <Reveal className="mt-10 md:mt-12">
        <SwipeRow
          label={expertise.a11y.list}
          gridClassName="md:grid-cols-2 lg:grid-cols-4"
          itemClassName={["md:col-span-2 lg:row-span-2", "md:row-span-2 lg:col-span-1", undefined, undefined]}
        >
          {cards.map((card, i) =>
            card.image ? (
              <PhotoTile key={card.icon} card={card} large={i === 0} />
            ) : (
              <IconTile key={card.icon} card={card} />
            ),
          )}
        </SwipeRow>
      </Reveal>
    </Section>
  );
}
