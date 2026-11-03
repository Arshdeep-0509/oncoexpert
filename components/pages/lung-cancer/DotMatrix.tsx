import type * as React from "react";
import { InView } from "@/components/ui/InView";
import { GROUP_COLORS } from "@/components/pages/lung-cancer/volume-colors";

/**
 * A 10 × 10 matrix, one dot per case, coloured by group in order (volume.css, lu-vol-). Once in
 * view it fills group by group. Decorative: the counts and the table beside it carry the data.
 */
export function DotMatrix({ counts, label }: { counts: readonly number[]; label: string }) {
  const dots = counts.flatMap((n, group) => Array.from({ length: n }, (_, k) => ({ group, k })));
  return (
    <InView threshold={0.3} className="lu-vol-matrix mx-auto w-full max-w-[420px]">
      <div role="img" aria-label={label} className="grid grid-cols-10 gap-[6%] md:gap-2.5">
        {dots.map(({ group, k }, i) => (
          <span
            key={i}
            data-group={group}
            className="lu-vol-dot aspect-square rounded-full"
            style={
              { background: GROUP_COLORS[group % GROUP_COLORS.length], "--g": group, "--k": k } as React.CSSProperties
            }
          />
        ))}
      </div>
    </InView>
  );
}
