const normalize = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** True when `href` is the current page. Home only matches exactly. */
export function isActivePath(pathname: string | null, href: string) {
  if (!pathname || href.startsWith("#") || /^[a-z]+:/i.test(href)) return false;
  const current = normalize(pathname);
  const target = normalize(href);
  return target === "/" ? current === "/" : current.startsWith(target);
}

/** The pages this app serves (the registry's paths, content/pages/index.ts). Links to any other path go to
 *  the live site's pages, which aren't built here, so only these are prefetched. */
const builtPaths = new Set([
  "/",
  "/robotic-surgery/",
  "/breast-cancer-treatment-bangalore/",
  "/book-your-appoinment-page/",
  "/about-us/",
  "/colon-cancer-treatment-bangalore/",
  "/endometrial-cancer-treatment-bangalore/",
]);

/** next/link's `prefetch` for `href`: the default (the page loads in the background once the link is on
 *  screen, so a click shows it at once) for a built page, off for the rest. */
export function prefetchFor(href: string) {
  if (!href.startsWith("/")) return false;
  const path = normalize(href.split(/[?#]/)[0]);
  return builtPaths.has(path) ? undefined : false;
}
