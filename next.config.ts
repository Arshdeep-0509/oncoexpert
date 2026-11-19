import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Keep the live URL shape: /robotic-surgery/
  trailingSlash: true,
  // Every live WordPress URL with a replacement here. The "treatment" pages moved to "hospital" URLs
  // (indexed and linked: keep these). /urology/ and /stomach-cancer/ are rebuilt on their live URLs
  // (their temporary redirects are gone).
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
    return moved;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // YouTube thumbnails for the video facades
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  experimental: {
    // Hostinger's build hung at "Creating an optimized production build": keep the CSS loader in
    // worker threads (the default is a child-process pool over sockets) and limit the build workers.
    turbopackPluginRuntimeStrategy: "workerThreads",
    cpus: 2,
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
