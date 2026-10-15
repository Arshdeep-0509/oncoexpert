import type Lenis from "lenis";

// The single Lenis instance (null on touch devices / reduced motion), so
// overlays like the mobile menu can pause smooth scrolling while open.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
