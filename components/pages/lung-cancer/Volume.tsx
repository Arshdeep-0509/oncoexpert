import { volume, volumeTotal } from "@/content/pages/lung-cancer";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DotMatrix } from "@/components/pages/lung-cancer/DotMatrix";
import { GROUP_COLORS } from "@/components/pages/lung-cancer/volume-colors";
import "@/components/pages/lung-cancer/volume.css";

/**
 * 9 · #volume "Clinical Volume & Experience": the four live counts as tiles that count up, each
 * with its colour; hovering a tile highlights its dots in the 10 × 10 matrix (one dot per case),
 * which fills group by group. The total band (computed, 100) stays hidden until the doctor
 * approves it (volume.total.show). A screen-reader table carries the counts.
 */
export function Volume() {
  return (
    <section id="volume" aria-labelledby="volume-title" className="lu-vol bg-surface py-(--section-y)">
      <Container>
        <SectionHeading id="volume-title" title={volume.title} />
        <table className="sr-only">
          <caption>{volume.a11y.table}</caption>
          <thead>
            <tr>
              <th scope="col">{volume.a11y.group}</th>
              <th scope="col">{volume.a11y.count}</th>
            </tr>
          </thead>
          <tbody>
            {volume.counts.map((c) => (
              <tr key={c.label}>
                <th scope="row">{c.label}</th>
                <td>{c.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-14">
          <div aria-hidden="true" className="lg:col-span-7">
            <ul className="grid grid-cols-2 gap-4 md:gap-5">
              {volume.counts.map((c, i) => (
                <li
                  key={c.label}
                  data-tile={i}
                  className="lu-vol-tile rounded-xl bg-surface-alt p-5 ring-1 ring-line md:p-7"
                >
                  <span className="block size-3 rounded-full" style={{ background: GROUP_COLORS[i] }} />
                  <span className="mt-4 block font-display text-[2.5rem] leading-none font-semibold text-ink md:text-[3.25rem]">
                    <Counter value={c.value} delay={0.1 + i * 0.12} reserveWidth />
                  </span>
                  <span className="mt-2 block text-[13px] leading-snug font-bold tracking-[0.08em] text-muted md:text-sm">
                    {c.label}
                  </span>
                </li>
              ))}
            </ul>
            {volume.total.show ? (
              <p className="mt-4 flex items-baseline justify-between rounded-xl bg-(image:--grad-plum) px-6 py-5 text-white">
                <span className="text-sm font-bold tracking-[0.08em] text-white/80">{volume.total.label}</span>
                <span className="font-display text-[2.5rem] leading-none font-semibold">
                  <Counter value={volumeTotal} reserveWidth />
                </span>
              </p>
            ) : null}
          </div>
          <div className="lg:col-span-5">
            <DotMatrix counts={volume.counts.map((c) => c.value)} label={volume.a11y.matrix} />
          </div>
        </div>
      </Container>
    </section>
  );
}
