import type { MetadataRoute } from "next";
import { pageList } from "@/content/pages";

/** Every rebuilt page, from the registry (content/pages/index.ts). Home first, at priority 1. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pageList.map((page) => ({
    url: page.meta.canonical,
    changeFrequency: "monthly",
    priority: page.sitemapPriority ?? 0.8,
  }));
}
