import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://808starrecords.com",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
