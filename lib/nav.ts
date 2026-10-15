const normalize = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** True when `href` is the current page. Home only matches exactly. */
export function isActivePath(pathname: string | null, href: string) {
  if (!pathname || href.startsWith("#") || /^[a-z]+:/i.test(href)) return false;
  const current = normalize(pathname);
  const target = normalize(href);
  return target === "/" ? current === "/" : current.startsWith(target);
}
