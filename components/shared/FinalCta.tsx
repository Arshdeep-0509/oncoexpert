import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { finalCtaSection as copy } from "@/content/shared/sections";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type FinalCtaProps = { id?: string } & (
  | {
      look?: "soft";
      /** Background photo (decorative), with its focal point. */
      image: { src: string; focal: string };
    }
  | {
      look: "classic";
      /** Faint outline photo drifting top-right (decorative, black background). */
      image: { src: string; width: number; height: number };
    }
);

const looks = {
  soft: {
    section: "on-dark bg-ink",
    container: "py-16 md:py-24",
    link: "md:max-w-[62%] md:gap-8",
    icon: "ring-white/25 group-hover:bg-accent md:size-24",
    phone: "md:size-10",
    text: "text-[clamp(1.9rem,4.6vw,3.4rem)]",
  },
  classic: {
    section: "bg-linear-to-r from-ink via-navy to-teal py-[72px] lg:py-24",
    container: "",
    link: "sm:flex-row sm:items-center sm:gap-8",
    icon: "shrink-0 ring-white/20 group-hover:bg-glow group-hover:text-ink lg:size-24",
    phone: "lg:size-10",
    text: "text-[clamp(1.75rem,4vw,3.25rem)] font-bold tracking-[-0.02em]",
  },
} as const;

/**
 * Final call band: the whole card is one tel: link (tappable anywhere on a phone) with a
 * large phone icon and the line in the display face.
 * soft: photo with a plum gradient over the text side, plus a white phone pill.
 * classic: ink → teal gradient with a faint drifting outline photo.
 */
export function FinalCta({ id = "final-cta", ...props }: FinalCtaProps) {
  const look = props.look ?? "soft";
  const s = looks[look];

  return (
    <section
      id={id}
      data-tone={look === "soft" ? "plum" : "ink"}
      aria-label={copy.text}
      className={cn("relative isolate overflow-hidden text-white", s.section)}
    >
      {props.look === "classic" ? (
        // Screen blend drops the photo's black.
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-20 -z-10 w-[min(900px,110vw)] opacity-[0.08] blend-on-dark motion-safe:animate-drift"
        >
          <Image
            src={props.image.src}
            alt=""
            aria-hidden="true"
            width={props.image.width}
            height={props.image.height}
            sizes="900px"
          />
        </div>
      ) : (
        <>
          <Image
            src={props.image.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="-z-20 object-cover"
            style={{ objectPosition: props.image.focal }}
          />
          {/* Plum over the text side, so the line never sits on a busy part of the photo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-ink/80 md:bg-transparent md:bg-linear-to-r md:from-ink md:from-35% md:via-ink/85 md:to-ink/20"
          />
        </>
      )}

      <Container className={s.container || undefined}>
        <Reveal>
          <a href={copy.href} className={cn("group flex flex-col items-start gap-6", s.link)}>
            <span
              className={cn(
                "grid size-20 place-items-center rounded-full bg-white/10 ring-1 transition-colors duration-500",
                s.icon,
              )}
            >
              <Phone className={cn("size-9", s.phone)} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className={cn("font-display tabular-nums", s.text, "leading-[1.1]")}>{copy.text}</span>
            {look === "soft" ? (
              <span className="inline-flex min-h-14 items-center gap-2 rounded-pill bg-white px-7 text-base font-semibold text-ink shadow-soft-lg transition-colors group-hover:bg-accent-soft max-md:w-full max-md:justify-center">
                <Phone className="size-[18px] text-accent" strokeWidth={1.75} aria-hidden="true" />
                <span className="tabular-nums">{site.contact.phoneDisplay}</span>
              </span>
            ) : null}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
