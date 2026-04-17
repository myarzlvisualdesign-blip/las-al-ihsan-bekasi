import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/layanan",
    "/portfolio",
    "/tentang",
    "/ulasan",
    "/faq",
    "/lokasi",
  ];

  return routes.map((route, index) => ({
    url: new URL(route, siteConfig.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
