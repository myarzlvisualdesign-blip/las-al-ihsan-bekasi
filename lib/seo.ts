import type { Metadata } from "next";

import { getPagePayload } from "@/lib/cms/public";

export async function buildMetadataForRoute(route: string): Promise<Metadata> {
  const { business, page, portfolio } = await getPagePayload(route);
  const ogImage =
    portfolio[0]?.coverImageUrl ||
    ("defaultOgImage" in business ? business.defaultOgImage?.url : undefined) ||
    business.logoUrl;
  const title = page.seoTitle || business.defaultMetaTitle;
  const description = page.seoDescription || business.defaultMetaDescription;
  const canonical = new URL(page.canonicalPath || page.route, business.siteUrl).toString();

  return {
    metadataBase: new URL(business.siteUrl),
    title,
    description,
    keywords: page.seoKeywords.length ? page.seoKeywords : business.defaultKeywords,
    alternates: {
      canonical,
    },
    robots: {
      index: page.robotsIndex,
      follow: page.robotsFollow,
      googleBot: {
        index: page.robotsIndex,
        follow: page.robotsFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: business.businessName,
      url: canonical,
      title,
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: business.businessName,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    other: business.googleSearchConsoleVerification
      ? {
          "google-site-verification": business.googleSearchConsoleVerification,
        }
      : undefined,
  };
}

export function buildBreadcrumbSchema(
  siteUrl: string,
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString(),
    })),
  };
}

export function buildLocalBusinessSchema(snapshot: Awaited<ReturnType<typeof getPagePayload>>) {
  const { business, services } = snapshot;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${business.siteUrl}#localbusiness`,
    name: business.businessName,
    url: business.siteUrl,
    image: [business.logoUrl, ...services.slice(0, 3).map((item) => item.imageUrl)].filter(Boolean),
    logo: business.logoUrl,
    telephone: business.primaryPhone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.addressLine1}${business.addressLine2 ? `, ${business.addressLine2}` : ""}`,
      addressLocality: business.city,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.countryCode,
    },
    geo:
      business.latitude && business.longitude
        ? {
            "@type": "GeoCoordinates",
            latitude: business.latitude,
            longitude: business.longitude,
          }
        : undefined,
    areaServed: business.areasServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    sameAs: [
      business.instagramUrl,
      business.tiktokUrl,
      business.mapsUrl,
      business.reviewUrl,
    ].filter(Boolean),
    hasMap: business.mapsUrl,
    openingHoursSpecification: business.operatingHours.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.dayLabel,
      opens: item.opensAt || undefined,
      closes: item.closesAt || undefined,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Bengkel Las Al-Ihsan",
      itemListElement: services.slice(0, 8).map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          serviceType: service.title,
          areaServed: business.areasServed,
        },
      })),
    },
  };
}

export function buildFaqSchema(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
