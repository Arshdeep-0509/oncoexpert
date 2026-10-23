import type * as React from "react";
import { Ribbon } from "lucide-react";
import type { SpecialtyKey } from "@/content/pages/home";

/**
 * Line icons for the cancer specialties, drawn to match lucide: 24px grid, stroke 1.75
 * (currentColor), round caps and joins, no fill. An icon set, so (like brand-icons.tsx) several
 * small components share one file.
 */
type IconProps = React.SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Large intestine: ascending, transverse and descending colon, then down to the rectum. */
function ColorectalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.5 18.5V8c0-1.7 1.3-3 3-3h7c1.7 0 3 1.3 3 3v6.5c0 1.4-1.1 2.5-2.5 2.5h-1.5a2 2 0 0 0-2 2v2" />
      <path d="M5.5 10.5h2M5.5 14.5h2M10 5v2M14 5v2M18.5 10.5h-2" />
      <path d="M5.5 18.5c0 1-.7 1.7-1.6 1.7" />
    </Svg>
  );
}

/** Uterus with its lining (the endometrium) and the tubes. */
function EndometrialIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7.5 8c0-1.7 1.3-3 3-3h3c1.7 0 3 1.3 3 3 0 3.3-1.6 5.9-3.2 7.1V19a1 1 0 0 1-1 1h-1.6a1 1 0 0 1-1-1v-3.9C9.1 13.9 7.5 11.3 7.5 8Z" />
      <path d="M10.2 8.2c.5 1.7 1 2.7 1.8 3.4.8-.7 1.3-1.7 1.8-3.4" />
      <path d="M7.6 7.4C5.9 6.6 4.4 7.2 3.6 9M16.4 7.4c1.7-.8 3.2-.2 4 1.6" />
    </Svg>
  );
}

/** Two lungs and the trachea. */
function LungIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3v8.5" />
      <path d="m12 11.5-2.2 2.2M12 11.5l2.2 2.2" />
      <path d="M8.6 6.4C6.2 7.3 3.8 10.9 3.8 15.6c0 2 .9 3.4 2.6 3.4 2.4 0 3.6-1.6 3.6-4.4V9.3c0-1.6-.5-2.6-1.4-2.9Z" />
      <path d="M15.4 6.4c2.4.9 4.8 4.5 4.8 9.2 0 2-.9 3.4-2.6 3.4-2.4 0-3.6-1.6-3.6-4.4V9.3c0-1.6.5-2.6 1.4-2.9Z" />
    </Svg>
  );
}

/** The butterfly-shaped thyroid on the windpipe. */
function ThyroidIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10.6 2.5v5.2M13.4 2.5v5.2" />
      <path d="M10.6 9.2C9.6 7.5 8.2 6.5 6.8 6.5 5 6.5 4 8.3 4 11c0 4 2.3 7 5 7 1.4 0 2.4-1 2.9-2.4" />
      <path d="M13.4 9.2c1-1.7 2.4-2.7 3.8-2.7 1.8 0 2.8 1.8 2.8 4.5 0 4-2.3 7-5 7-1.4 0-2.4-1-2.9-2.4" />
      <path d="M10.4 12.6c1 .6 2.2.6 3.2 0" />
      <path d="M12 15.8v5.7" />
    </Svg>
  );
}

/** Uterus with the fallopian tubes and both ovaries. */
function OvarianIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 8.5h6c0 3.8-1.3 6-3 7-1.7-1-3-3.2-3-7Z" />
      <path d="M12 15.5V20.5" />
      <path d="M9 9C7.7 7.4 6.3 7 4.9 7.9M15 9c1.3-1.6 2.7-2 4.1-1.1" />
      <ellipse cx="4.3" cy="11.8" rx="2.1" ry="2.7" />
      <ellipse cx="19.7" cy="11.8" rx="2.1" ry="2.7" />
    </Svg>
  );
}

/** What callers pass: these icons and lucide's both take it. */
type SpecialtyIconProps = { className?: string; strokeWidth?: number };

export const specialtyIcons: Record<SpecialtyKey, React.ComponentType<SpecialtyIconProps>> = {
  // Breast keeps lucide's ribbon (it already matches this set's 24px grid and stroke)
  breast: Ribbon,
  colorectal: ColorectalIcon,
  endometrial: EndometrialIcon,
  lung: LungIcon,
  thyroid: ThyroidIcon,
  ovarian: OvarianIcon,
};
