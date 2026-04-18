import { ContentStatus } from "@prisma/client";

import { defaultCmsContent } from "@/lib/cms/default-content";
import {
  getLocalAdminDashboardData,
  getLocalContactData,
  getLocalFaqData,
  getLocalHomeEditorData,
  getLocalMediaData,
  getLocalPortfolioData,
  getLocalPublishedPortfolioBySlug,
  getLocalServicesData,
  getLocalSettingsData,
  getLocalTestimonialsData,
} from "@/lib/cms/local-store";
import { ensureCmsSeeded } from "@/lib/cms/seed";
import type { CmsBusinessProfile } from "@/lib/cms/types";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { buildWhatsAppUrl } from "@/lib/utils";

function serializeBusinessProfile(
  business: {
    businessName: string;
    shortName: string;
    tagline: string | null;
    siteUrl: string;
    supportEmail: string | null;
    primaryPhone: string;
    secondaryPhone: string | null;
    whatsappPrimary: string;
    whatsappSecondary: string | null;
    whatsappMessage: string;
    whatsappSecondaryMessage: string | null;
    addressLine1: string;
    addressLine2: string | null;
    district: string | null;
    city: string;
    region: string;
    postalCode: string;
    countryCode: string;
    mapsUrl: string;
    mapsEmbedUrl: string;
    reviewUrl: string | null;
    instagramUrl: string | null;
    tiktokUrl: string | null;
    latitude: { toNumber(): number } | null;
    longitude: { toNumber(): number } | null;
    areasServed: string[];
    openingHoursNote: string | null;
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    defaultKeywords: string[];
    defaultOgImageId: string | null;
    defaultOgImage?: {
      url: string;
      altText: string;
    } | null;
    logoUrl: string;
    faviconUrl: string;
    googleAnalyticsId: string | null;
    googleTagManagerId: string | null;
    googleSearchConsoleVerification: string | null;
    socialLinks?: CmsBusinessProfile["socialLinks"];
    operatingHours?: CmsBusinessProfile["operatingHours"];
  },
): CmsBusinessProfile {
  return {
    ...business,
    latitude: business.latitude ? business.latitude.toNumber() : null,
    longitude: business.longitude ? business.longitude.toNumber() : null,
    fullAddress: [
      business.addressLine1,
      business.addressLine2,
      business.city,
      business.region,
      business.postalCode,
    ]
      .filter(Boolean)
      .join(", "),
    whatsappPrimaryUrl: buildWhatsAppUrl(
      business.whatsappPrimary,
      business.whatsappMessage,
    ),
    whatsappSecondaryUrl: business.whatsappSecondary
      ? buildWhatsAppUrl(
          business.whatsappSecondary,
          business.whatsappSecondaryMessage ?? undefined,
        )
      : null,
    defaultOgImage: business.defaultOgImage
      ? {
          url: business.defaultOgImage.url,
          altText: business.defaultOgImage.altText,
        }
      : null,
    socialLinks: business.socialLinks ?? [],
    operatingHours: business.operatingHours ?? [],
  };
}

export async function getAdminDashboardData() {
  if (!hasDatabaseUrl) {
    return getLocalAdminDashboardData();
  }

  await ensureCmsSeeded(prisma);

  const [portfolioCount, serviceCount, faqCount, testimonialCount, mediaCount, pageCount] =
    await Promise.all([
      prisma.portfolioItem.count(),
      prisma.serviceItem.count(),
      prisma.faqItem.count(),
      prisma.testimonial.count(),
      prisma.mediaAsset.count(),
      prisma.page.count(),
    ]);

  return {
    portfolioCount,
    serviceCount,
    faqCount,
    testimonialCount,
    mediaCount,
    pageCount,
  };
}

export async function getAdminHomeEditorData() {
  if (!hasDatabaseUrl) {
    return getLocalHomeEditorData();
  }

  await ensureCmsSeeded(prisma);

  const [homePage, globalPage, mediaAssets] = await Promise.all([
    prisma.page.findUnique({
      where: { slug: "home" },
      include: {
        sections: {
          orderBy: { sortOrder: "asc" },
          include: {
            blocks: {
              orderBy: { sortOrder: "asc" },
            },
          },
        },
      },
    }),
    prisma.page.findUnique({
      where: { slug: "global" },
      include: {
        sections: {
          orderBy: { sortOrder: "asc" },
          include: {
            blocks: {
              orderBy: { sortOrder: "asc" },
            },
          },
        },
      },
    }),
    prisma.mediaAsset.findMany({
      where: { kind: "IMAGE" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    homePage,
    globalPage,
    mediaAssets,
  };
}

export async function getAdminServicesData() {
  if (!hasDatabaseUrl) {
    return getLocalServicesData();
  }

  await ensureCmsSeeded(prisma);

  const [services, mediaAssets] = await Promise.all([
    prisma.serviceItem.findMany({
      orderBy: { sortOrder: "asc" },
      include: { image: true },
    }),
    prisma.mediaAsset.findMany({
      where: { kind: "IMAGE" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    services: services.map((item) => ({
      ...item,
      bullets: Array.isArray(item.bullets)
        ? item.bullets.filter((bullet): bullet is string => typeof bullet === "string")
        : [],
      imageUrl: item.image?.url ?? "",
      altText: item.altText ?? item.image?.altText ?? item.title,
    })),
    mediaAssets,
  };
}

export async function getAdminPortfolioData() {
  if (!hasDatabaseUrl) {
    return getLocalPortfolioData();
  }

  await ensureCmsSeeded(prisma);

  const [portfolioItems, mediaAssets] = await Promise.all([
    prisma.portfolioItem.findMany({
      orderBy: { sortOrder: "asc" },
      include: { coverImage: true },
    }),
    prisma.mediaAsset.findMany({
      where: { kind: "IMAGE" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    portfolioItems: portfolioItems.map((item) => ({
      ...item,
      coverImageUrl: item.coverImage?.url ?? "",
      altText: item.altText ?? item.coverImage?.altText ?? item.title,
    })),
    mediaAssets,
  };
}

export async function getAdminFaqData() {
  if (!hasDatabaseUrl) {
    return getLocalFaqData();
  }

  await ensureCmsSeeded(prisma);

  return prisma.faqItem.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAdminTestimonialsData() {
  if (!hasDatabaseUrl) {
    return getLocalTestimonialsData();
  }

  await ensureCmsSeeded(prisma);

  const [testimonials, mediaAssets] = await Promise.all([
    prisma.testimonial.findMany({
      orderBy: { sortOrder: "asc" },
      include: { avatarImage: true },
    }),
    prisma.mediaAsset.findMany({
      where: { kind: "IMAGE" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    testimonials: testimonials.map((item) => ({
      ...item,
      avatarUrl: item.avatarImage?.url ?? null,
    })),
    mediaAssets,
  };
}

export async function getAdminContactData() {
  if (!hasDatabaseUrl) {
    return getLocalContactData();
  }

  await ensureCmsSeeded(prisma);

  const business = await prisma.businessProfile.findUnique({
    where: { id: "default" },
    include: {
      socialLinks: { orderBy: { sortOrder: "asc" } },
      operatingHours: { orderBy: { sortOrder: "asc" } },
      defaultOgImage: true,
    },
  });

  return business ? serializeBusinessProfile(business) : null;
}

export async function getAdminSettingsData() {
  if (!hasDatabaseUrl) {
    return getLocalSettingsData();
  }

  await ensureCmsSeeded(prisma);

  const [business, navigationItems, pages, mediaAssets] = await Promise.all([
    prisma.businessProfile.findUnique({
      where: { id: "default" },
      include: {
        defaultOgImage: true,
        socialLinks: { orderBy: { sortOrder: "asc" } },
        operatingHours: { orderBy: { sortOrder: "asc" } },
      },
    }),
    prisma.navigationItem.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.page.findMany({
      orderBy: { route: "asc" },
    }),
    prisma.mediaAsset.findMany({
      where: { kind: "IMAGE" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    business: business ? serializeBusinessProfile(business) : null,
    navigationItems,
    pages,
    mediaAssets,
  };
}

export async function getAdminMediaData() {
  if (!hasDatabaseUrl) {
    return getLocalMediaData();
  }

  await ensureCmsSeeded(prisma);

  return prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublishedPortfolioBySlug(slug: string) {
  if (!hasDatabaseUrl) {
    return getLocalPublishedPortfolioBySlug(slug);
  }

  await ensureCmsSeeded(prisma);

  try {
    return await prisma.portfolioItem.findFirst({
      where: {
        slug,
        status: ContentStatus.PUBLISHED,
      },
      include: {
        coverImage: true,
      },
    });
  } catch {
    const fallback = defaultCmsContent.portfolio.find((item) => item.slug === slug);

    if (!fallback) {
      return null;
    }

    return {
      ...fallback,
      id: fallback.slug,
      updatedAt: new Date(),
      coverImage: fallback.coverImageUrl
        ? {
            url: fallback.coverImageUrl,
          }
        : null,
    };
  }
}
