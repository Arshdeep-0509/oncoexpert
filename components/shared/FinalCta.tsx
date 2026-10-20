import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { finalCtaSection as copy } from "@/content/shared/sections";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type FinalCtaProps = {
  id?: string;
  /** Background photo (decorative), with its focal point. */
  image: { src: string; focal: string };
};

/**
 * Final call band: photo with a plum gradient over the text side, a large phone icon,
 * the line in the display face and a white pill. The whole card is one tel: link
 * (so it is tappable anywhere on a phone).
 */
export function FinalCta({ id = "final-cta", image }: FinalCtaProps) {
  return (
    <section id={id} data-tone="plum" aria-label={copy.text} className="on-dark relative isolate overflow-hidden bg-ink text-white">
      <Image
        src={image.src}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: image.focal }}
      />
      {/* Plum over the text side, so the line never sits on a busy part of the photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink/80 md:bg-transparent md:bg-linear-to-r md:from-ink md:from-35% md:via-ink/85 md:to-ink/20"
      />

      <Container className="py-16 md:py-24">
        <Reveal>
          <a
            href={copy.href}
            className="group flex flex-col items-start gap-6 md:max-w-[62%] md:gap-8"
          >
            <span className="grid size-20 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 transition-colors duration-500 group-hover:bg-accent md:size-24">
              <Phone className="size-9 md:size-10" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="font-display text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.1] tabular-nums">{copy.text}</span>
            <span className="inline-flex min-h-14 items-center gap-2 rounded-pill bg-white px-7 text-base font-semibold text-ink shadow-soft-lg transition-colors group-hover:bg-accent-soft max-md:w-full max-md:justify-center">
              <Phone className="size-[18px] text-accent" strokeWidth={1.75} aria-hidden="true" />
              <span className="tabular-nums">{site.contact.phoneDisplay}</span>
            </span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
