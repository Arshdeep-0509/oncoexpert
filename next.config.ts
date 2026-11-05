import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Keep the live URL shape: /robotic-surgery/
  trailingSlash: true,
  // Every live WordPress URL with a replacement here. The "treatment" pages moved to "hospital" URLs
  // (indexed and linked: keep these). Urology and Stomach Cancer are not rebuilt yet, so they redirect
  // temporarily to the nearest content; replace those two when the pages are built.
  redirects() {
    const moved = [
      ["/breast-cancer-treatment-bangalore", "/breast-cancer-hospital-bangalore/"],
      ["/colon-cancer-treatment-bangalore", "/colon-cancer-hospital-bangalore/"],
      ["/endometrial-cancer-treatment-bangalore", "/endometrial-cancer-hospital-bangalore/"],
      ["/ovarian-cancer-treatment", "/ovarian-cancer-hospital/"],
      ["/our-services", "/#services"],
      ["/about", "/about-us/"],
      ["/home-2", "/"],
      ["/contact", "/book-your-appoinment-page/"],
    ].map(([source, destination]) => ({ source, destination, permanent: true }));
    const temporary = [
      ["/urology", "/about-us/#expertise"],
      ["/stomach-cancer", "/robotic-surgery/#cancers"],
    ].map(([source, destination]) => ({ source, destination, permanent: false }));
    return [...moved, ...temporary];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // YouTube thumbnails for the video facades
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
