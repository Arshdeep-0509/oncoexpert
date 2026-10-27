"use client";

import * as React from "react";
import Image from "next/image";
import { CalendarDays, ChevronDown, Droplet, TriangleAlert, Waves, type LucideIcon } from "lucide-react";
import type { SymptomIcon } from "@/content/pages/endometrial-cancer";
import type { PageImage } from "@/content/types";
import { useMedia } from "@/lib/hooks/use-media";
import { cn } from "@/lib/utils";

const icons: Record<SymptomIcon, LucideIcon> = {
  drop: Droplet,
  calendar: CalendarDays,
  alert: TriangleAlert,
  pelvic: Waves,
};

/** Phones: every card open, always (symptoms.css). */
const PHONE = "(max-width: 767px)";

type SymptomCardProps = { icon: SymptomIcon; title: string; body: string; image: PageImage; id: string };

/**
 * One warning sign: a photo on top (the icon badge on its lower edge), then the title and the
 * description. From 768px a disclosure: the title is a button (aria-expanded) that opens or closes
 * the description; a mouse hovering opens it too. On phones the description is always shown (and
 * the button reports it as expanded). The whole card is the button's target.
 */
export function SymptomCard({ icon, title, body, image, id }: SymptomCardProps) {
  const [open, setOpen] = React.useState(false);
  const phone = useMedia(PHONE);
  const Icon = icons[icon];
  const bodyId = `${id}-body`;

  return (
    <article
      data-open={open ? "" : undefined}
      className="exs-card relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-soft-sm"
    >
      <div className="relative aspect-[16/9] md:aspect-[4/3]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 768px) 46vw, 92vw"
            className="exs-photo object-cover"
            style={{ objectPosition: image.focal }}
          />
        </div>
        <span className="exs-chev-wrap absolute top-3 right-3 hidden size-9 place-items-center rounded-full bg-surface/90 shadow-soft-sm md:grid">
          <ChevronDown aria-hidden="true" className="exs-chev size-5 text-ink" strokeWidth={1.75} />
        </span>
        <span className="exs-icon absolute -bottom-6 left-6 grid size-12 place-items-center rounded-2xl bg-surface text-accent shadow-soft md:left-7">
          <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-6 pt-10 pb-6 md:px-7 md:pb-7">
        <h3 className="exs-head font-display text-xl leading-snug text-ink md:text-[1.375rem]">
          <button
            type="button"
            aria-expanded={open || phone}
            aria-controls={bodyId}
            onClick={() => setOpen((o) => !o)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {title}
          </button>
        </h3>
        <span aria-hidden="true" className="exs-rule mt-4 block h-0.5 w-12 rounded-full bg-(image:--grad-accent)" />
        <p id={bodyId} className={cn("exs-body mt-3 text-[15px] leading-relaxed text-muted md:text-base")}>
          {body}
        </p>
      </div>
    </article>
  );
}
