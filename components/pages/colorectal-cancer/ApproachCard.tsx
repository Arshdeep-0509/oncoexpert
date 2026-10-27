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
 * One #approach card: its photo fills the card, a dark shade rises from the bottom, and the
 * text sits on the shade in white (the icon on frosted glass at the top). Large cards are the tall
 * bento tiles on desktop and full-width tiles on tablet. "Low Stoma Rates" carries the ISR diagram
 * on a light badge. Hover / tap states: approach.css.
 */
export function ApproachCard({ card }: { card: Card }) {
  const Icon = icons[card.icon];
  const photo = colorectalImages[card.image];
  const large = "large" in card && card.large;
  return (
    <article
      data-card
      className={cn(
        styles.card,
        "flex h-full min-h-[400px] flex-col overflow-hidden rounded-xl bg-ink text-white shadow-soft-sm md:min-h-[380px] lg:min-h-[340px]",
      )}
    >
      <span aria-hidden="true" className={styles.lift} />
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes={
            large
              ? "(min-width: 1024px) 300px, (min-width: 768px) 92vw, 82vw"
              : "(min-width: 1024px) 300px, (min-width: 768px) 46vw, 82vw"
          }
          className={cn(styles.photo, "object-cover")}
          style={{ objectPosition: photo.focal }}
        />
        <span className={styles.shade} />
      </div>
      <span aria-hidden="true" className={styles.sweep} />

      <div className={cn("relative flex flex-1 flex-col p-6 md:p-7", large && "md:max-lg:max-w-[34rem]")}>
        <div className="flex items-start justify-between gap-4">
          <span className={cn(styles.iconTile, "grid size-14 shrink-0 place-items-center rounded-2xl")}>
            <span aria-hidden="true" className={styles.iconFill} />
            <Icon className={cn(styles.iconDraw, "size-7 text-white")} strokeWidth={1.5} aria-hidden="true" />
            <Icon className={cn(styles.iconSolid, "size-7 text-white")} strokeWidth={1.75} aria-hidden="true" />
          </span>
          {card.icon === "stoma" ? (
            <span className="rounded-2xl bg-surface/90 p-2 shadow-soft-sm">
              <IsrDiagram label={approach.isrDiagram} className="h-[64px] w-auto" />
            </span>
          ) : null}
        </div>

        <div className="mt-auto pt-10">
          <h3 className={cn("heading-3 text-white", large && "lg:text-[1.75rem]")}>{card.title}</h3>
          {card.tagline ? <p className="mt-1 text-sm font-semibold text-accent-glow">{card.tagline}</p> : null}
          <p className="mt-3 text-[15px] leading-relaxed text-white/85">{card.body}</p>
          <p
            className={cn(
              styles.detail,
              "flex items-center gap-2 pt-5 text-[13px] font-semibold tracking-[0.02em] text-white",
            )}
          >
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-accent-glow" />
            {card.detail}
          </p>
        </div>
      </div>
    </article>
  );
}
