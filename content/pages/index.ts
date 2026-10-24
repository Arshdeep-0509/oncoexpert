/**
 * Registry of every rebuilt page. Used by the page routes (metadata, browser bar colour) and by
 * app/sitemap.ts.
 * Adding a page: see "Add a page" in docs/PROJECT.md.
 */
import type { PageEntry } from "@/content/types";
import { meta as homeMeta } from "@/content/pages/home";
import { meta as breastMeta } from "@/content/pages/breast-cancer";
import { meta as roboticMeta } from "@/content/pages/robotic-surgery";
import { meta as bookMeta } from "@/content/pages/book-appointment";
import { meta as aboutMeta } from "@/content/pages/about-us";

export const pages = {
  home: {
    slug: "home",
    path: "/",
    title: homeMeta.title,
    theme: "home",
    themeColor: "#0A1633",
    sitemapPriority: 1,
    meta: homeMeta,
  },
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
  // The live URL, misspelling included ("appoinment"): it is indexed and linked site-wide.
  "book-your-appoinment-page": {
    slug: "book-your-appoinment-page",
    path: "/book-your-appoinment-page/",
    title: bookMeta.title,
    theme: "care",
    themeColor: "#FBF8F4",
    meta: bookMeta,
  },
  "about-us": {
    slug: "about-us",
    path: "/about-us/",
    title: aboutMeta.title,
    theme: "care",
    themeColor: "#FBF8F4",
    meta: aboutMeta,
  },
} as const satisfies Record<string, PageEntry>;

export const pageList: readonly PageEntry[] = Object.values(pages);
