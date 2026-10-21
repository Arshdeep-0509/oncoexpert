import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/content/site";
import { Providers } from "@/components/layout/Providers";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AnalyticsListener } from "@/components/layout/AnalyticsListener";
import { DeferredGTM } from "@/components/layout/DeferredGTM";
import { Preloader } from "@/components/layout/Preloader";
import "@/app/globals.css";

// Header, footer and the "Skip to content" link come from each page's SiteShell.
// Fonts are loaded once, here. styles/tokens.css maps them to --font-sans / --font-serif /
// --font-display, and each theme picks its own (styles/themes/*.css).

/**
 * Plus Jakarta Sans: the site-wide UI and body font, 400–800.
 * Loaded as two non-overlapping weight sets of the same family. The browser merges them
 * by family name, and the 600–800 set stays byte-identical to the files the robotic page
 * was built with (a single 400–800 request returns a differently instanced variable font
 * that renders the robotic headings slightly differently).
 */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const jakartaText = Plus_Jakarta_Sans({
  variable: "--font-jakarta-text",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/** Display serif (variable, with italic): breast page headings and emphasised words. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Body font of the robotic page. Not preloaded: no other page uses it. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
};

// Each page overrides this with generateViewport (content/pages/index.ts -> themeColor).
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${jakartaText.variable} ${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-white font-sans text-text antialiased">
        <Preloader />
        <SmoothScroll />
        <AnalyticsListener />
        <DeferredGTM gtmId={site.analytics.gtmId} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
