"use client";

import * as React from "react";

/**
 * Calls `onChange` with the element that currently has `id` (or null), now and whenever it
 * appears, disappears or is replaced. Layout components outlive the page below them, so a
 * page element can mount after them or be re-created (route change, hydration recovery).
 */
export function useElementById(
  id: string | null,
  onChange: (el: HTMLElement | null) => void,
  deps: React.DependencyList = [],
) {
  const callback = React.useRef(onChange);
  React.useEffect(() => {
    callback.current = onChange;
  });

  React.useEffect(() => {
    if (!id) return;
    let current: HTMLElement | null | undefined;
    const sync = () => {
      const el = document.getElementById(id);
      if (el === current) return;
      current = el;
      callback.current(el);
    };
    const frame = requestAnimationFrame(sync);
    const mutation = new MutationObserver(sync);
    mutation.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      mutation.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, ...deps]);
}

/**
 * true / false while the element with `id` is / is not intersecting the viewport;
 * null while there is no such element on the page.
 */
export function useInViewById(id: string, rootMargin = "0px"): boolean | null {
  const [inView, setInView] = React.useState<boolean | null>(null);
  const observer = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    return () => observer.current?.disconnect();
  }, [rootMargin]);

  useElementById(
    id,
    (el) => {
      observer.current?.disconnect();
      if (el) observer.current?.observe(el);
      else setInView(null);
    },
    [rootMargin],
  );

  return inView;
}
