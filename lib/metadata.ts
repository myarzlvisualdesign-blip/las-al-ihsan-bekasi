import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

type BuildMetadataArgs = {
  title: string;
  description: string;
  path?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
}: BuildMetadataArgs): Metadata {
  const canonical = new URL(path, siteConfig.siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: "/images/hero-kanopi-modern.jpg",
          width: 1600,
          height: 1200,
          alt: "Bengkel Las Al-Ihsan Bekasi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero-kanopi-modern.jpg"],
    },
  };
}
