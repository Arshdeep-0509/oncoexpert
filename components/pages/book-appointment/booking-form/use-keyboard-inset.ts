"use client";

import * as React from "react";

/** A visual viewport this much shorter than the window means the on-screen keyboard is open. */
const KEYBOARD_PX = 150;

/**
 * Height of the on-screen keyboard in px (0 when closed), from the visual viewport. Phones only
 * use it: the form's step buttons sit just above the keyboard while it is open.
 */
export function useKeyboardInset() {
  const [inset, setInset] = React.useState(0);
  React.useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      const covered = window.innerHeight - vv.height - vv.offsetTop;
      setInset(covered > KEYBOARD_PX ? Math.round(covered) : 0);
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);
  return inset;
}
