import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// AI crawlers, named so the policy is explicit and easy to change: OpenAI (GPTBot), Google's AI
// training (Google-Extended), Perplexity (PerplexityBot) and Anthropic (ClaudeBot).
// PENDING DOCTOR: the AI-crawler policy for GPTBot, Google-Extended, PerplexityBot and ClaudeBot:
// allow them (the default here: the practice's pages can be cited by AI answers) or block them
// (change `allow: "/"` to `disallow: "/"` for those agents).
const aiCrawlers = ["GPTBot", "Google-Extended", "PerplexityBot", "ClaudeBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
