"use client";

import * as React from "react";
import { BurgerIcon } from "@/components/layout/BurgerIcon";

/** Close button glyph: mounts as a burger, then morphs into an X. */
export function MorphingX() {
  const [morphed, setMorphed] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMorphed(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return <BurgerIcon open={morphed} />;
}
