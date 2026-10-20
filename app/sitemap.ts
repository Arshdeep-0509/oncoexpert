import type { MetadataRoute } from "next";
import { pageList } from "@/content/pages";

/** Every rebuilt page, from the registry (content/pages/index.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  return pageList.map((page) => ({
    url: page.meta.canonical,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}
