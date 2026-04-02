import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL || "https://tarayainstitut.be";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
