import Image from "next/image";
import { cn } from "@/lib/utils";

export type JourneyStep = {
  title: string;
  body: string;
  image: { src: string; alt: string; focal: string };
};

type StepCardProps = { step: JourneyStep; index: number; state: "past" | "active" | "future"; stepLabel: string };

/**
 * One step of the airway journey: its number, title, text and photo. Phones: a card on the
 * vertical timeline; tablets: a card in the snap row; desktop: the deck's card (photo left, text
 * right) that slides out to the left and in from the right as the scroll moves on (pathway.css).
 */
export function StepCard({ step, index, state, stepLabel }: StepCardProps) {
  return (
    <article
      data-state={state}
      className={cn(
        "lup-card relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-soft-sm lg:flex-row",
      )}
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden lg:aspect-[4/3] lg:w-[44%]">
        <Image
          src={step.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 420px, (min-width: 768px) 340px, 86vw"
          className="object-cover"
          style={{ objectPosition: step.image.focal }}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-5 md:p-6 lg:p-10">
        <p className="font-display text-sm font-semibold text-accent tabular-nums lg:text-base">
          <span className="sr-only">{stepLabel} </span>
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-1 font-display text-xl leading-snug text-ink lg:text-[2rem] lg:leading-tight">
          {step.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-muted lg:text-lg">{step.body}</p>
      </div>
    </article>
  );
}
