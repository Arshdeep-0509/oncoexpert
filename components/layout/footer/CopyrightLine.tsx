import { cacheLife } from "next/cache";
import { site } from "@/content/site";

// The static shell is prerendered, so "now" is read inside a cached scope
// that refreshes daily (Cache Components forbids bare new Date() in prerender).
export async function CopyrightLine() {
  "use cache";
  cacheLife("days");
  return <>{site.footer.copyright(new Date().getFullYear())}</>;
}
