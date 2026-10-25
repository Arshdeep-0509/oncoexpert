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

/**
 * Bento order: a checkerboard. Row 1: Robotic (wide) + Breast; row 2: GI + Uro (wide).
 * Tablet: Robotic across, Breast and GI side by side, Uro across. Phones: a swipe row.
 */
const ORDER = ["robotic", "breast", "gi", "uro"] as const satisfies readonly ExpertiseIcon[];
const cards: readonly Card[] = ORDER.map((icon) => expertise.cards.find((card) => card.icon === icon)!);
const WIDE: ReadonlySet<ExpertiseIcon> = new Set(["robotic", "uro"]);

function TileIcon({ icon }: { icon: ExpertiseIcon }) {
  const Icon = icons[icon];
  return (
    <span
      aria-hidden="true"
      className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/20"
    >
      <Icon className="size-[22px]" strokeWidth={1.75} />
    </span>
  );
}

/**
 * A photo card: the photo on top (it grows to fill the tile, so the whole subject stays in
 * view, never under the text), the text on the navy panel below. The robotic arms are a
 * black-background shot: they blend into the navy.
 */
function PhotoTile({ card }: { card: Card }) {
  const photo = aboutImages[card.image];
  const wide = WIDE.has(card.icon);
  return (
    <Link
      href={card.link.href}
      prefetch={false}
      data-cta={`${card.title}: ${card.link.label}`}
      className={cn(
        styles.tile,
        "group/tile flex h-full min-h-[30rem] flex-col overflow-hidden rounded-2xl bg-ink text-white shadow-soft md:min-h-[28rem]",
      )}
    >
      <span aria-hidden="true" className={styles.tileShadow} />
      <span aria-hidden="true" className="relative isolate block min-h-[12rem] flex-1 overflow-hidden bg-ink">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes={
            wide
              ? "(min-width: 1024px) 800px, (min-width: 768px) 700px, 82vw"
              : "(min-width: 1024px) 400px, (min-width: 768px) 350px, 82vw"
          }
          className={cn(styles.tilePhoto, "object-cover", card.icon === "robotic" && "blend-on-dark")}
          style={{ objectPosition: photo.focal }}
        />
        {/* A soft fade into the panel below */}
        <span className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-ink to-ink/0" />
      </span>
      <span className="relative block p-6 md:p-7">
        <span className="flex items-center gap-3">
          <TileIcon icon={card.icon} />
          <span className="font-display text-xl leading-tight font-bold md:text-2xl">{card.title}</span>
        </span>
        <span
          className={cn("mt-3 block text-[15px] leading-relaxed text-white/80 md:text-base", wide && "max-w-[56ch]")}
        >
          {card.body}
        </span>
        <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-white">
          {card.link.label}
          <ArrowRight className={cn(styles.tileArrow, "size-[18px]")} strokeWidth={1.75} aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}

/**
 * #expertise "Surgical Expertise": the four cards as photo cards in a checkerboard bento (see
 * ORDER), each with its own photo: the robotic arms, the breast ribbon, the digestive organs,
 * the kidneys. Hover / focus: the tile lifts, its photo zooms a little, the arrow slides.
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
          gridClassName="md:grid-cols-2 lg:grid-cols-3"
          itemClassName={cards.map((card) => (WIDE.has(card.icon) ? "md:col-span-2" : undefined))}
        >
          {cards.map((card) => (
            <PhotoTile key={card.icon} card={card} />
          ))}
        </SwipeRow>
      </Reveal>
    </Section>
  );
}
