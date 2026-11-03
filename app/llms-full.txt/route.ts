import { llmsFullTxt } from "@/lib/llms";

/** /llms-full.txt: llms.txt plus each cancer page's facts (lib/llms.ts). */
export function GET() {
  return new Response(llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
