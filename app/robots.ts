import type { MetadataRoute } from "next";

import { getPublicSiteSnapshot } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const snapshot = await getPublicSiteSnapshot();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin"],
      },
    ],
    sitemap: `${snapshot.business.siteUrl}/sitemap.xml`,
    host: new URL(snapshot.business.siteUrl).host,
  };
}
