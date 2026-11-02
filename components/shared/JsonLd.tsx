import { jsonLdHtml } from "@/lib/jsonld";

/** One structured-data @graph for the page (build it with lib/jsonld.ts). */
export function JsonLd({ graph }: { graph: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(graph) }} />;
}
