/**
 * Registry of every rebuilt page. Used by the page layouts (theme + browser bar
 * colour), and later by the sitemap and navigation.
 * Adding a page: see "Add a page" in docs/PROJECT.md.
 */
import type { PageEntry } from "@/content/types";
import { meta as breastMeta } from "@/content/pages/breast-cancer";
import { meta as roboticMeta } from "@/content/pages/robotic-surgery";

export const pages = {
  "robotic-surgery": {
    slug: "robotic-surgery",
    path: "/robotic-surgery/",
    title: roboticMeta.title,
    theme: "robotic",
    themeColor: "#000000",
    meta: roboticMeta,
  },
  "breast-cancer-treatment-bangalore": {
    slug: "breast-cancer-treatment-bangalore",
    path: "/breast-cancer-treatment-bangalore/",
    title: breastMeta.title,
    theme: "breast",
    themeColor: "#FFF5F7",
    meta: breastMeta,
  },
} as const satisfies Record<string, PageEntry>;

export const pageList: readonly PageEntry[] = Object.values(pages);
