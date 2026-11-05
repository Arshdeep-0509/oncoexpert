import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Keep the live URL shape: /robotic-surgery/
  trailingSlash: true,
  // The old live URLs of the pages renamed from "treatment" to "hospital". Indexed and linked: keep these.
  redirects() {
    return [
      ["/breast-cancer-treatment-bangalore", "/breast-cancer-hospital-bangalore/"],
      ["/colon-cancer-treatment-bangalore", "/colon-cancer-hospital-bangalore/"],
      ["/endometrial-cancer-treatment-bangalore", "/endometrial-cancer-hospital-bangalore/"],
      ["/ovarian-cancer-treatment", "/ovarian-cancer-hospital/"],
    ].map(([source, destination]) => ({ source, destination, permanent: true }));
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
