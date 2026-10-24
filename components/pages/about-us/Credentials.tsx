import { Crosshair, GraduationCap, Hospital, type LucideIcon } from "lucide-react";
import { credentials, type CredentialIcon } from "@/content/pages/about-us";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { styles } from "@/components/pages/about-us/about-styles";
import "@/components/pages/about-us/about.css";

const icons: Record<CredentialIcon, LucideIcon> = {
  graduation: GraduationCap,
  hospital: Hospital,
  robot: Crosshair,
};

/**
 * #credentials: "Dr. Sunil Navalgund · Surgical Oncologist & Founder", the title, and the three
 * training credentials as tall cards. On reveal each card's icon draws itself
 * and a thin gradient light runs once around its border; hover lifts it with a soft glow.
 */
export function Credentials() {
  return (
    <Section id="credentials" aria-labelledby="credentials-title">
      <Reveal className="max-w-[40rem]">
        <p className="text-sm font-semibold tracking-[0.04em] text-muted">
          <span className="text-ink">{credentials.byline.name}</span>
          <span aria-hidden="true" className="mx-2 text-highlight">
            ·
          </span>
          {credentials.byline.role}
        </p>
        <h2 id="credentials-title" className="mt-3 heading-2 text-ink">
          {credentials.title}
        </h2>
      </Reveal>

      <Reveal as="ul" stagger className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
        {credentials.items.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <div key={item.title} className={styles.cardWrap}>
              <span aria-hidden="true" className={styles.glow} />
              <article
                className={cn(
                  styles.card,
                  "flex h-full min-h-[300px] flex-col rounded-xl border border-line bg-surface p-7 shadow-soft md:min-h-[380px] md:p-8",
                )}
              >
                <span aria-hidden="true" className={styles.sweep} />
                <span className="grid size-16 place-items-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className={cn(styles.iconDraw, "size-8")} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span
                  aria-hidden="true"
                  className="mt-auto pt-10 font-display text-sm font-bold text-muted tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 heading-3 text-ink">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.body}</p>
              </article>
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
