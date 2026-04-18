import type { Metadata } from "next";

import { documentationMedia, siteConfig } from "@/lib/site";

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
  const toAbsoluteUrl = (value: string) =>
    new URL(value, siteConfig.siteUrl).toString();
  const defaultImage = documentationMedia.find((item) => item.type === "image");
  const defaultVideo = documentationMedia.find((item) => item.type === "video");

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
          url: defaultImage?.src ?? "/images/hero-kanopi-modern.jpg",
          width: 1200,
          height: 900,
          alt: defaultImage?.alt ?? "Bengkel Las Al-Ihsan Bekasi",
        },
      ],
      videos: defaultVideo
        ? [
            {
              url: toAbsoluteUrl(defaultVideo.src),
              width: 478,
              height: 850,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage?.src ?? "/images/hero-kanopi-modern.jpg"],
    },
  };
}
