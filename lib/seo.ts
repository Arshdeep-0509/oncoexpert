import type { Metadata, Viewport } from "next";
import type { PageEntry } from "@/content/types";

/** Page metadata from a registry entry: absolute title, canonical, Open Graph, Twitter card. */
export function pageMetadata({ meta }: PageEntry, ogType: "article" | "website" = "article"): Metadata {
  const image = { url: meta.ogImage.src, width: meta.ogImage.width, height: meta.ogImage.height };
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: {
      type: ogType,
      locale: "en_US",
      url: meta.canonical,
      title: meta.title,
      description: meta.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage.src],
    },
  };
}

/** Mobile browser bar colour for a page. */
export function pageViewport({ themeColor }: PageEntry): Viewport {
  return { themeColor };
}
