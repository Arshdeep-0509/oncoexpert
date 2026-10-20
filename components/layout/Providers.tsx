"use client";

import * as React from "react";
import { MotionConfig } from "motion/react";

/** Root client providers. Motion respects the visitor's reduced-motion setting everywhere. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
