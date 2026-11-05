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
import { meta as colorectalMeta } from "@/content/pages/colorectal-cancer";
import { meta as endometrialMeta } from "@/content/pages/endometrial-cancer";
import { meta as lungMeta } from "@/content/pages/lung-cancer";
import { meta as ovarianMeta } from "@/content/pages/ovarian-cancer";
import { meta as thyroidMeta } from "@/content/pages/thyroid-cancer";

export const pages = {
  home: {
    slug: "home",
    lastModified: "2026-11-01",
    path: "/",
    title: homeMeta.title,
    theme: "home",
    themeColor: "#0A1633",
    sitemapPriority: 1,
    meta: homeMeta,
  },
  "robotic-surgery": {
    slug: "robotic-surgery",
    lastModified: "2026-11-02",
    path: "/robotic-surgery/",
    title: roboticMeta.title,
    theme: "robotic",
    themeColor: "#000000",
    meta: roboticMeta,
  },
  "breast-cancer-hospital-bangalore": {
    slug: "breast-cancer-hospital-bangalore",
    lastModified: "2026-11-02",
    path: "/breast-cancer-hospital-bangalore/",
    title: breastMeta.title,
    theme: "breast",
    themeColor: "#FFF5F7",
    meta: breastMeta,
  },
  // The live URL, misspelling included ("appoinment"): it is indexed and linked site-wide.
  "book-your-appoinment-page": {
    slug: "book-your-appoinment-page",
    lastModified: "2026-11-03",
    path: "/book-your-appoinment-page/",
    title: bookMeta.title,
    theme: "care",
    themeColor: "#FBF8F4",
    meta: bookMeta,
  },
  "about-us": {
    slug: "about-us",
    lastModified: "2026-11-03",
    path: "/about-us/",
    title: aboutMeta.title,
    theme: "care",
    themeColor: "#FBF8F4",
    meta: aboutMeta,
  },
  // The live URL ("colon", while the page and the menu say "Colorectal"): kept for SEO.
  "colon-cancer-hospital-bangalore": {
    slug: "colon-cancer-hospital-bangalore",
    lastModified: "2026-11-03",
    path: "/colon-cancer-hospital-bangalore/",
    title: colorectalMeta.title,
    theme: "colorectal",
    themeColor: "#F4F8FC",
    meta: colorectalMeta,
  },
  "endometrial-cancer-hospital-bangalore": {
    slug: "endometrial-cancer-hospital-bangalore",
    lastModified: "2026-11-03",
    path: "/endometrial-cancer-hospital-bangalore/",
    title: endometrialMeta.title,
    theme: "endometrial",
    themeColor: "#FFF7F2",
    meta: endometrialMeta,
  },
  // The live URLs, kept for SEO (the menu already links them).
  "lung-cancer-in-bangalore": {
    slug: "lung-cancer-in-bangalore",
    lastModified: "2026-11-03",
    path: "/lung-cancer-in-bangalore/",
    title: lungMeta.title,
    theme: "lung",
    themeColor: "#EAF4FB",
    meta: lungMeta,
  },
  "ovarian-cancer-hospital": {
    slug: "ovarian-cancer-hospital",
    lastModified: "2026-11-03",
    path: "/ovarian-cancer-hospital/",
    title: ovarianMeta.title,
    theme: "ovarian",
    themeColor: "#FBF6EE",
    meta: ovarianMeta,
  },
  "thyroid-cancer": {
    slug: "thyroid-cancer",
    lastModified: "2026-11-03",
    path: "/thyroid-cancer/",
    title: thyroidMeta.title,
    theme: "thyroid",
    themeColor: "#F7F5FE",
    meta: thyroidMeta,
  },
} as const satisfies Record<string, PageEntry>;

export const pageList: readonly PageEntry[] = Object.values(pages);
