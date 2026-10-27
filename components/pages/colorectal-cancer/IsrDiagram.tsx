import { cn } from "@/lib/utils";
import { styles } from "@/components/pages/colorectal-cancer/approach-styles";

/**
 * Inter-Sphincteric Resection in three frames (approach.css): the tumour low in the rectum; the
 * low segment and the inner sphincter lifted out; the bowel brought down onto the outer
 * sphincter, which stays. Transform and opacity only. The markup is the last frame.
 */
export function IsrDiagram({ label, className }: { label: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 110" role="img" aria-label={label} className={cn("overflow-visible", className)}>
      {/* Outer sphincter: stays in every frame */}
      <g style={{ fill: "var(--muted)" }} fillOpacity="0.4">
        <rect x="35" y="78" width="8" height="26" rx="4" />
        <rect x="77" y="78" width="8" height="26" rx="4" />
      </g>
      {/* Low rectum with the tumour, and the inner sphincter */}
      <g className={styles.isrLower}>
        <path d="M60 64 V84" style={{ stroke: "var(--accent)" }} strokeWidth="16" strokeLinecap="round" />
        <circle cx="66" cy="76" r="5" style={{ fill: "var(--gold)" }} />
        <g style={{ fill: "var(--accent-bright)" }} fillOpacity="0.75">
          <rect x="46" y="80" width="5" height="18" rx="2.5" />
          <rect x="69" y="80" width="5" height="18" rx="2.5" />
        </g>
      </g>
      {/* The bowel above: comes down in frame 3 */}
      <g className={styles.isrBowel}>
        <path d="M60 4 V56" style={{ stroke: "var(--accent)" }} strokeWidth="16" strokeLinecap="round" />
        <path
          d="M60 8 V52"
          style={{ stroke: "var(--white)" }}
          strokeOpacity="0.35"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
      {/* Done: joined, no permanent bag */}
      <g className={styles.isrDone}>
        <circle cx="98" cy="30" r="11" style={{ fill: "var(--accent-bright)" }} />
        <path
          d="M93 30.5 l3.5 3.5 l6.5 -7"
          fill="none"
          style={{ stroke: "var(--white)" }}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
