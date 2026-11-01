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
  // The live URL ("colon", while the page and the menu say "Colorectal"): kept for SEO.
  "colon-cancer-treatment-bangalore": {
    slug: "colon-cancer-treatment-bangalore",
    path: "/colon-cancer-treatment-bangalore/",
    title: colorectalMeta.title,
    theme: "colorectal",
    themeColor: "#F4F8FC",
    meta: colorectalMeta,
  },
  "endometrial-cancer-treatment-bangalore": {
    slug: "endometrial-cancer-treatment-bangalore",
    path: "/endometrial-cancer-treatment-bangalore/",
    title: endometrialMeta.title,
    theme: "endometrial",
    themeColor: "#FFF7F2",
    meta: endometrialMeta,
  },
  // The live URLs, kept for SEO (the menu already links them).
  "lung-cancer-in-bangalore": {
    slug: "lung-cancer-in-bangalore",
    path: "/lung-cancer-in-bangalore/",
    title: lungMeta.title,
    theme: "lung",
    themeColor: "#EAF4FB",
    meta: lungMeta,
  },
  "ovarian-cancer-treatment": {
    slug: "ovarian-cancer-treatment",
    path: "/ovarian-cancer-treatment/",
    title: ovarianMeta.title,
    theme: "ovarian",
    themeColor: "#FBF6EE",
    meta: ovarianMeta,
  },
  "thyroid-cancer": {
    slug: "thyroid-cancer",
    path: "/thyroid-cancer/",
    title: thyroidMeta.title,
    theme: "thyroid",
    themeColor: "#F7F5FE",
    meta: thyroidMeta,
  },
} as const satisfies Record<string, PageEntry>;

export const pageList: readonly PageEntry[] = Object.values(pages);
