import Image from "next/image";
import { Bot, CircleSlash, ClipboardList, FlaskConical, Rocket, ShieldCheck, type LucideIcon } from "lucide-react";
import { approach, type ApproachContent, type ApproachIcon } from "@/content/pages/colorectal-cancer";
import { colorectalImages } from "@/content/pages/colorectal-cancer.images";
import { cn } from "@/lib/utils";
import { IsrDiagram } from "@/components/pages/colorectal-cancer/IsrDiagram";
import { styles } from "@/components/pages/colorectal-cancer/approach-styles";

const icons: Record<ApproachIcon, LucideIcon> = {
  plans: ClipboardList,
  robotic: Bot,
  preservation: ShieldCheck,
  stoma: CircleSlash,
  advanced: FlaskConical,
  "stage-four": Rocket,
};

type Card = ApproachContent["cards"][number];

/**
 * One #approach card. Large cards (those with a photo) are the tall bento tiles on desktop, wide
 * tiles on tablet (photo beside the text) and photo-topped cards on phones. "Low Stoma Rates"
 * carries the ISR diagram. Hover / tap states: approach.css.
 */
export function ApproachCard({ card }: { card: Card }) {
  const Icon = icons[card.icon];
  const photo = card.image ? colorectalImages[card.image] : null;
  return (
    <article
      data-card
      className={cn(
        styles.card,
        "flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-soft-sm",
        photo && "md:flex-row lg:flex-col",
      )}
    >
      <span aria-hidden="true" className={styles.lift} />
      <span aria-hidden="true" className={styles.sweep} />

      {photo ? (
        // Phones: no photo, so the six swipe cards stay even. Desktop: the photo takes whatever
        // height the small cards beside it leave.
        <div className="relative shrink-0 overflow-hidden bg-ink max-md:hidden md:order-2 md:w-[44%] lg:order-none lg:min-h-[150px] lg:w-full lg:flex-1">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 768px) 40vw, 82vw"
            className={cn(styles.photo, "object-cover")}
            style={{ objectPosition: photo.focal }}
          />
        </div>
      ) : null}

      <div className={cn("relative flex flex-1 flex-col p-6 md:p-7", photo && "md:justify-center lg:flex-none")}>
        {/* The ISR diagram sits in the free corner beside the icon, so it adds no height. */}
        {card.icon === "stoma" ? (
          <IsrDiagram
            label={approach.isrDiagram}
            className="absolute top-5 right-6 h-[76px] w-auto md:top-6 md:right-7"
          />
        ) : null}

        <span className={cn(styles.iconTile, "grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-soft")}>
          <span aria-hidden="true" className={styles.iconFill} />
          <Icon className={cn(styles.iconDraw, "size-7 text-accent")} strokeWidth={1.5} aria-hidden="true" />
          <Icon className={cn(styles.iconSolid, "size-7 text-white")} strokeWidth={1.75} aria-hidden="true" />
        </span>

        <h3 className="mt-5 heading-3 text-ink">{card.title}</h3>
        {card.tagline ? <p className="mt-1 text-sm font-semibold text-accent">{card.tagline}</p> : null}
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{card.body}</p>

        <p
          className={cn(
            styles.detail,
            "mt-auto flex items-center gap-2 pt-5 text-[13px] font-semibold tracking-[0.02em] text-accent",
          )}
        >
          <span aria-hidden="true" className="h-px w-5 shrink-0 bg-highlight" />
          {card.detail}
        </p>
      </div>
    </article>
  );
}
