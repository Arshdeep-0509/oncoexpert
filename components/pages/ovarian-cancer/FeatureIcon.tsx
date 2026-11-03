import type * as React from "react";
import type { FeatureIcon as FeatureIconKey } from "@/content/pages/ovarian-cancer";

/** The four #features icons: line art on a 24px grid, stroke 1.75, as lucide. */
const paths: Record<FeatureIconKey, React.ReactNode> = {
  // a plan (clipboard) with a heart on it
  plan: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" />
      <path d="M12 16.5c-1.6-1.1-3-2.2-3-3.7a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 1.5-1.4 2.6-3 3.7Z" />
    </>
  ),
  // a crosshair with a scalpel through it
  cytoreduction: (
    <>
      <circle cx="10" cy="14" r="6" />
      <path d="M10 6.5V9M10 19v2M2.5 14H5M15 14h2.5" />
      <path d="m13 11 7.5-7.5a1.4 1.4 0 0 1 2 2L15 13" />
      <path d="m13 11 2 2" />
    </>
  ),
  // heat (three waves) over a drop
  hipec: (
    <>
      <path d="M12 22a5 5 0 0 1-5-5c0-3 5-8 5-8s5 5 5 8a5 5 0 0 1-5 5Z" />
      <path d="M7 6c.8-.8.8-1.7 0-2.5M12 6c.8-.8.8-1.7 0-2.5M17 6c.8-.8.8-1.7 0-2.5" />
    </>
  ),
  // a seedling held in cupped hands
  fertility: (
    <>
      <path d="M12 14V9" />
      <path d="M12 10c0-2.5 1.8-4 4.5-4 0 2.5-1.8 4-4.5 4Z" />
      <path d="M12 11.5C12 9.5 10.6 8 8.5 8c0 2 1.4 3.5 3.5 3.5Z" />
      <path d="M3 14.5 6 17c1 .9 2.2 1.4 3.5 1.4H12" />
      <path d="M21 14.5 18 17c-1 .9-2.2 1.4-3.5 1.4H12" />
      <path d="M3 14.5c.8-.7 2-.6 2.7.2L8 17M21 14.5c-.8-.7-2-.6-2.7.2L16 17" />
    </>
  ),
};

/** One feature icon (decorative). */
export function FeatureIcon({ icon, className }: { icon: FeatureIconKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[icon]}
    </svg>
  );
}
