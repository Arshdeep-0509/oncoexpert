import { site } from "@/content/site";

/** First focusable element: jumps keyboard users past the header to <main id="main">. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
    >
      {site.a11y.skipToContent}
    </a>
  );
}
