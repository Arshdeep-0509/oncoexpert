import Image from "next/image";
import { benefits } from "@/content/pages/robotic-surgery";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { textStyles } from "@/components/ui/text-styles";
import { ContentIconView } from "@/components/pages/robotic-surgery/ContentIconView";

/** 10 · #benefits: the six benefits as photo cards, each with its icon on the photo's edge. */
export function Benefits() {
  return (
    <Section id="benefits" tone="white">
      <Reveal>
        <SectionHeading variant="classic" title={benefits.heading} />
      </Reveal>

      <Reveal as="ol" stagger itemClassName="h-full" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.items.map((item, i) => (
          <article
            key={item.title}
            className="group h-full overflow-hidden rounded-[22px] border border-border bg-white shadow-card transition-[translate,box-shadow,border-color] duration-500 ease-out-expo hover:border-primary/50 hover:shadow-card-hover motion-safe:hover:-translate-y-1"
          >
            <div className="relative">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-[scale] duration-700 ease-out-expo motion-safe:group-hover:scale-105"
                  style={{ objectPosition: item.focal }}
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute top-4 right-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold tracking-[0.15em] text-ink tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute -bottom-6 left-6 grid size-12 place-items-center rounded-2xl bg-primary text-white ring-4 ring-white">
                <ContentIconView name={item.icon} className="size-[22px]" />
              </span>
            </div>
            <div className="px-6 pt-10 pb-7">
              <h3 className="type-h3 text-ink">{item.title}</h3>
              <p className={textStyles.cardBody}>{item.body}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
