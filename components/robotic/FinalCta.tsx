import Image from "next/image";
import { Phone } from "lucide-react";
import { finalCta, images } from "@/content/robotic-surgery";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  const img = images.armsBlack;
  return (
    <section
      data-tone="ink"
      aria-label={finalCta.text}
      className="relative isolate overflow-hidden bg-linear-to-r from-ink via-navy to-teal py-[72px] text-white lg:py-24"
    >
      {/* Very faint arms outline drifting slowly (screen blend drops the photo's black). */}
      <div
        aria-hidden="true"
        className="blend-on-dark pointer-events-none absolute -top-10 -right-20 -z-10 w-[min(900px,110vw)] opacity-[0.08] motion-safe:animate-drift"
      >
        <Image src={img.src} alt="" width={img.width} height={img.height} sizes="900px" />
      </div>

      <Container>
        <Reveal>
          <a
            href={finalCta.href}
            className="group flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
          >
            <span className="grid size-20 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition-colors duration-500 group-hover:bg-glow group-hover:text-ink lg:size-24">
              <Phone className="size-9 lg:size-10" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.1] font-bold tracking-[-0.02em] tabular-nums">
              {finalCta.text}
            </span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
