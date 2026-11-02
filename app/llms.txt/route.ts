import { llmsTxt } from "@/lib/llms";

/** /llms.txt (llmstxt.org), generated at build time from the registry and content (lib/llms.ts). */
export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
