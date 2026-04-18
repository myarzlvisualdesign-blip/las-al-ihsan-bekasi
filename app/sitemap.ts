import type { MetadataRoute } from "next";

import { getPublicSiteSnapshot } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const snapshot = await getPublicSiteSnapshot();
  const routes = snapshot.pages
    .filter((page) => page.route !== "/_global")
    .map((page) => ({
      url: new URL(page.route, snapshot.business.siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: page.route === "/" ? "weekly" : "monthly",
      priority: page.route === "/" ? 1 : 0.8,
    })) satisfies MetadataRoute.Sitemap;

  const portfolioRoutes = snapshot.portfolio.map((item) => ({
    url: new URL(`/portfolio/${item.slug}`, snapshot.business.siteUrl).toString(),
    lastModified: new Date(
      ("updatedAt" in item ? item.updatedAt : undefined) ?? Date.now(),
    ),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...portfolioRoutes];
}
