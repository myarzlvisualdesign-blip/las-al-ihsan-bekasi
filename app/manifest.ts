import type { MetadataRoute } from "next";

import { getPublicSiteSnapshot } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const snapshot = await getPublicSiteSnapshot();

  return {
    name: snapshot.business.businessName,
    short_name: snapshot.business.shortName,
    description: snapshot.business.defaultMetaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f3f0ea",
    theme_color: "#182433",
    lang: "id-ID",
    categories: ["business", "construction", "home services"],
    icons: [
      {
        src: snapshot.business.faviconUrl,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
