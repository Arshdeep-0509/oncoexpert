import { whyRobotic } from "@/content/pages/robotic-surgery";
import { Section } from "@/components/robotic/ui/section";
import { Eyebrow } from "@/components/robotic/ui/eyebrow";
import { Reveal } from "@/components/robotic/ui/reveal";

export function RoboticsInOncology() {
  const [p1, p2, p3] = whyRobotic.paragraphs;

  return (
    <Section id="why-robotic" tone="surface">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{whyRobotic.eyebrow}</Eyebrow>
          <h2 className="type-h2 mt-4 text-ink">{whyRobotic.heading}</h2>
        </Reveal>

        <Reveal stagger className="lg:col-span-7">
          <p className="text-[1.375rem] leading-[1.55] font-medium tracking-[-0.005em] text-ink">{p1}</p>
          <p className="type-body mt-6 text-text">{p2}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {whyRobotic.specialties.map((s) => (
              <li
                key={s}
                className="rounded-full border border-primary/15 bg-white px-3.5 py-1.5 text-sm font-medium text-ink shadow-[0_1px_2px_rgb(10_22_40/0.04)]"
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="type-body mt-6 text-muted">{p3}</p>
        </Reveal>
      </div>
    </Section>
  );
}
