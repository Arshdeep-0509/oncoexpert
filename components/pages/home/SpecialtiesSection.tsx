import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { specialties } from "@/content/pages/home";
import { homeImages } from "@/content/pages/home.images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { specialtyIcons } from "@/components/pages/home/specialty-icons";
import { prefetchFor } from "@/lib/nav";
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
        "relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg md:size-12 md:rounded-xl",
        onPhoto ? "bg-white/90 text-accent" : "bg-accent-soft text-accent",
      )}
    >
      <Icon className="size-5 md:size-6" strokeWidth={1.75} />
      <span className={cn(styles.iconFill, "absolute inset-0 rounded-lg bg-accent md:rounded-xl")} />
      <Icon className={cn(styles.iconWhite, "absolute size-5 text-white md:size-6")} strokeWidth={1.75} />
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
      prefetch={prefetchFor(item.href)}
      data-cta={item.name}
      className={cn(
        styles.tile,
        "group/tile flex h-full min-h-[9.5rem] flex-col justify-end overflow-hidden rounded-2xl bg-ink text-white shadow-soft md:min-h-[20rem] lg:min-h-[30rem]",
      )}
    >
      <Image
        src={photo.src}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 1024px) 820px, (min-width: 768px) 700px, 46vw"
        className={cn(styles.photo, "-z-10 object-cover")}
        style={{ objectPosition: photo.focal }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/70 to-ink/0 md:via-ink/55"
      />
      <TileChrome />
      <span className="relative flex flex-col gap-2.5 p-3.5 md:gap-4 md:p-8">
        <TileIcon item={item} onPhoto />
        <span className="flex items-end justify-between gap-2 md:gap-6">
          <span>
            <span className="block font-display text-[15px] leading-snug font-bold md:text-[1.75rem] md:leading-tight">
              {item.name}
            </span>
            <span className="mt-2 hidden max-w-[46ch] text-[15px] leading-relaxed text-white/80 md:block md:text-base">
              {item.body}
            </span>
          </span>
          <ArrowUpRight className={cn(arrow, "md:size-6")} strokeWidth={1.75} aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}

/**
 * The other five: the same photo treatment at tile size (each cancer's own photo, a navy fade
 * under the text), with the icon, name, one-liner and the arrow.
 */
function SmallPhotoTile({ item }: { item: Specialty }) {
  const photo = homeImages[item.image];
  return (
    <Link
      href={item.href}
      prefetch={prefetchFor(item.href)}
      data-cta={item.name}
      className={cn(
        styles.tile,
        "group/tile flex h-full min-h-[9.5rem] flex-col justify-end overflow-hidden rounded-2xl bg-ink text-white shadow-soft-sm md:min-h-[17rem]",
      )}
    >
      <Image
        src={photo.src}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 1024px) 400px, (min-width: 768px) 350px, 46vw"
        className={cn(styles.photo, "-z-10 object-cover")}
        style={{ objectPosition: photo.focal }}
      />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/75 to-ink/0" />
      <TileChrome />
      <span className="relative flex flex-col gap-2.5 p-3.5 md:gap-4 md:p-7">
        <TileIcon item={item} onPhoto />
        <span className="flex items-end justify-between gap-2 md:gap-4">
          <span>
            <span className="block font-display text-[15px] leading-snug font-bold md:text-xl">{item.name}</span>
            <span className="mt-2 hidden text-[15px] leading-relaxed text-white/85 md:block">{item.body}</span>
          </span>
          <ArrowUpRight className={arrow} strokeWidth={1.75} aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}

/**
 * 4 · #specialties. Desktop: a bento grid of photo tiles, each cancer with its own photo: Breast
 * large (2×2), the other five smaller. Tablet: Breast across the top, the rest two by two.
 * Phones: all six at a glance, 2×3 compact photo tiles (icon and name; the one-liners from md).
 * Every tile links to its page (Breast: ours; the others: the live site's, from site.nav).
 */
export function SpecialtiesSection() {
  const count = specialties.items.length;
  return (
    <Section id="specialties" tone="alt" aria-labelledby="specialties-title" className="max-md:py-12">
      <Reveal>
        <SectionHeading id="specialties-title" title={specialties.title} emphasis={specialties.emphasis} />
      </Reveal>
      <Reveal className="mt-7 md:mt-12">
        <ul aria-label={specialties.a11y.list} className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
          {specialties.items.map((item, i) => (
            <li
              key={item.key}
              className={cn(
                "flex flex-col",
                i === 0 ? "md:col-span-2 lg:row-span-2" : i === count - 1 ? "md:col-span-2 lg:col-span-1" : undefined,
              )}
            >
              {i === 0 ? <PhotoTile item={item} /> : <SmallPhotoTile item={item} />}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
