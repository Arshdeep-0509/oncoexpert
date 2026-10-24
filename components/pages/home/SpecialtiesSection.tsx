import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { specialties } from "@/content/pages/home";
import { homeImages } from "@/content/pages/home.images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { Reveal } from "@/components/ui/Reveal";
import { specialtyIcons } from "@/components/pages/home/specialty-icons";
import "@/components/pages/home/specialties.css";

type Specialty = (typeof specialties.items)[number];

/** Class names from specialties.css (plain CSS, `spec-` prefix). */
const styles = {
  tile: "spec-tile",
  shadow: "spec-shadow",
  iconFill: "spec-iconFill",
  iconWhite: "spec-iconWhite",
  ring: "spec-ring",
  sweep: "spec-sweep",
  photo: "spec-photo",
} as const;

/** Hover layers shared by every tile: a deeper shadow and the gradient border sweep. */
function TileChrome() {
  return (
    <>
      <span aria-hidden="true" className={styles.shadow} />
      <span aria-hidden="true" className={styles.ring}>
        <span className={styles.sweep} />
      </span>
    </>
  );
}

/** The specialty's line icon in its tile; on hover the tile fills with the accent and the icon turns white. */
function TileIcon({ item, onPhoto = false }: { item: Specialty; onPhoto?: boolean }) {
  const Icon = specialtyIcons[item.key];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl",
        onPhoto ? "bg-white/90 text-accent" : "bg-accent-soft text-accent",
      )}
    >
      <Icon className="size-6" strokeWidth={1.75} />
      <span className={cn(styles.iconFill, "absolute inset-0 rounded-xl bg-accent")} />
      <Icon className={cn(styles.iconWhite, "absolute size-6 text-white")} strokeWidth={1.75} />
    </span>
  );
}

const arrow =
  "size-5 shrink-0 transition-transform duration-300 ease-out-expo group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5";

/** Breast: the large tile, a photo with the name and one-liner over a navy fade. */
function PhotoTile({ item }: { item: Specialty }) {
  const photo = homeImages[item.image];
  return (
    <Link
      href={item.href}
      prefetch={false}
      data-cta={item.name}
      className={cn(
        styles.tile,
        "group/tile flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl bg-ink text-white shadow-soft md:min-h-[20rem] lg:min-h-[30rem]",
      )}
    >
      <Image
        src={photo.src}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 1024px) 820px, (min-width: 768px) 700px, 82vw"
        className={cn(styles.photo, "-z-10 object-cover")}
        style={{ objectPosition: photo.focal }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/70 to-ink/0 md:via-ink/55"
      />
      <TileChrome />
      <span className="relative flex flex-col gap-4 p-6 md:p-8">
        <TileIcon item={item} onPhoto />
        <span className="flex items-end justify-between gap-6">
          <span>
            <span className="block font-display text-2xl leading-tight font-bold md:text-[1.75rem]">{item.name}</span>
            <span className="mt-2 block max-w-[46ch] text-[15px] leading-relaxed text-white/80 md:text-base">
              {item.body}
            </span>
          </span>
          <ArrowUpRight className={cn(arrow, "size-6")} strokeWidth={1.75} aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}

/** The other five: icon, name, one-liner and an arrow. */
function IconTile({ item }: { item: Specialty }) {
  return (
    <Link
      href={item.href}
      prefetch={false}
      data-cta={item.name}
      className={cn(
        styles.tile,
        "group/tile flex h-full flex-col gap-5 rounded-2xl bg-surface p-6 ring-1 shadow-soft-sm ring-line md:p-7",
      )}
    >
      <TileChrome />
      <span className="flex items-start justify-between gap-4">
        <TileIcon item={item} />
        <ArrowUpRight
          className={cn(arrow, "text-muted group-hover/tile:text-accent")}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </span>
      <span>
        <span className="block font-display text-lg leading-snug font-bold text-ink md:text-xl">{item.name}</span>
        <span className="mt-2 block text-[15px] leading-relaxed text-muted">{item.body}</span>
      </span>
    </Link>
  );
}

/**
 * 4 · #specialties. Desktop: a bento grid, Breast as the large photo tile (2×2) and the other
 * five as icon tiles. Tablet: Breast across the top, the rest two by two. Phones: a swipe row.
 * Every tile links to its page (Breast: ours; the others: the live site's, from site.nav).
 */
export function SpecialtiesSection() {
  const count = specialties.items.length;
  return (
    <Section id="specialties" tone="alt" aria-labelledby="specialties-title">
      <Reveal>
        <SectionHeading id="specialties-title" title={specialties.title} emphasis={specialties.emphasis} />
      </Reveal>
      <Reveal className="mt-10 md:mt-12">
        <SwipeRow
          label={specialties.a11y.list}
          gridClassName="md:grid-cols-2 lg:grid-cols-3"
          itemClassName={specialties.items.map((_, i) =>
            i === 0 ? "md:col-span-2 lg:row-span-2" : i === count - 1 ? "md:col-span-2 lg:col-span-1" : undefined,
          )}
        >
          {specialties.items.map((item, i) =>
            i === 0 ? <PhotoTile key={item.key} item={item} /> : <IconTile key={item.key} item={item} />,
          )}
        </SwipeRow>
      </Reveal>
    </Section>
  );
}
