import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL || "https://tarayainstitut.be";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Crawlers classiques
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // OpenAI (ChatGPT)
      { userAgent: "GPTBot",         allow: "/" },
      { userAgent: "ChatGPT-User",   allow: "/" },
      // Anthropic (Claude)
      { userAgent: "anthropic-ai",   allow: "/" },
      { userAgent: "ClaudeBot",      allow: "/" },
      // Google AI (Gemini, AI Overviews)
      { userAgent: "Google-Extended", allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot",  allow: "/" },
      // Meta AI
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      // Microsoft Copilot
      { userAgent: "Bingbot",        allow: "/" },
      // Common Crawl (utilisé pour l'entraînement de nombreux LLMs)
      { userAgent: "CCBot",          allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
