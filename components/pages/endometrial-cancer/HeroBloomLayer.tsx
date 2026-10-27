import { cn } from "@/lib/utils";
import { styles } from "@/components/pages/endometrial-cancer/hero-styles";

/** Ten soft petals round a centre, alternating sizes (degrees, length). */
const PETALS = Array.from({ length: 10 }, (_, i) => ({ angle: i * 36, long: i % 2 === 0 }));

/**
 * The bloom: petals in a ring behind the line art, fading in, then turning once every 90s
 * (hero.css; paused with the hero's pause button and off-screen).
 */
export function HeroBloomLayer() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-[-6%] -z-10 animate-in duration-1000 fade-in">
      <svg viewBox="-200 -200 400 400" className={cn(styles.bloom, "size-full")}>
        {PETALS.map(({ angle, long }) => (
          <path
            key={angle}
            transform={`rotate(${angle})`}
            d={
              long
                ? "M0 -40 C 34 -80, 30 -150, 0 -190 C -30 -150, -34 -80, 0 -40Z"
                : "M0 -50 C 26 -80, 24 -130, 0 -160 C -24 -130, -26 -80, 0 -50Z"
            }
            style={{ fill: long ? "var(--petal)" : "var(--accent-soft)" }}
            fillOpacity={long ? 0.55 : 0.7}
          />
        ))}
      </svg>
    </div>
  );
}
