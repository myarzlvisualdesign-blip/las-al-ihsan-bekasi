import { ContentStatus, Prisma } from "@prisma/client";

import { defaultCmsContent } from "@/lib/cms/default-content";
import { getLocalPublicSiteSnapshot } from "@/lib/cms/local-store";
import { ensureCmsSeeded } from "@/lib/cms/seed";
import type {
  CmsBlockValue,
  CmsImageValue,
  CmsSectionBlock,
  CmsSiteSnapshot,
  CmsSnapshot,
  CmsStructuredPage,
  CmsStructuredSection,
} from "@/lib/cms/types";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { buildWhatsAppUrl } from "@/lib/utils";

function serializeSection(section: {
  id: string;
  key: string;
  name: string;
  isVisible: boolean;
  sortOrder: number;
  blocks: Array<{
    id: string;
    key: string;
    label: string;
    type: string;
    value: Prisma.JsonValue;
    sortOrder: number;
  }>;
}): CmsStructuredSection {
  return {
    id: section.id,
    key: section.key,
    name: section.name,
    isVisible: section.isVisible,
    sortOrder: section.sortOrder,
    blocks: Object.fromEntries(
      section.blocks.map((block) => [
        block.key,
        {
          ...block,
          type: block.type as CmsSectionBlock["type"],
          value: block.value as CmsBlockValue,
        },
      ]),
    ),
  };
}

function fallbackPages(): CmsStructuredPage[] {
  return defaultCmsContent.pages.map((page) => ({
    id: page.slug,
    name: page.name,
    slug: page.slug,
    route: page.route,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    seoKeywords: page.seoKeywords,
    canonicalPath: page.canonicalPath ?? null,
    ogImageId: null,
    ogImage: null,
    robotsIndex: page.robotsIndex,
    robotsFollow: page.robotsFollow,
    sections: page.sections.map((section) => ({
      id: `${page.slug}-${section.key}`,
      key: section.key,
      name: section.name,
      isVisible: section.isVisible,
      sortOrder: section.sortOrder,
      blocks: Object.fromEntries(
        section.blocks.map((block) => [
          block.key,
          {
            id: `${page.slug}-${section.key}-${block.key}`,
            key: block.key,
            label: block.label,
            type: block.type as CmsSectionBlock["type"],
            value: block.value as CmsBlockValue,
            sortOrder: block.sortOrder,
          },
        ]),
      ),
    })),
  }));
}

function sectionByKey(sections: CmsStructuredSection[], key: string) {
  return sections.find((item) => item.key === key);
}

export function readTextBlock(
  section: CmsStructuredSection | undefined,
  key: string,
  fallback = "",
) {
  const value = section?.blocks[key]?.value;
  return typeof value === "string" ? value : fallback;
}

export function readBooleanBlock(
  section: CmsStructuredSection | undefined,
  key: string,
  fallback = false,
) {
  const value = section?.blocks[key]?.value;
  return typeof value === "boolean" ? value : fallback;
}

export function readImageBlock(
  section: CmsStructuredSection | undefined,
  key: string,
  fallback: CmsImageValue = { url: "", alt: "" },
): CmsImageValue {
  const value = section?.blocks[key]?.value;

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const candidate = value as { url?: unknown; alt?: unknown };
    return {
      url: typeof candidate.url === "string" ? candidate.url : fallback.url,
      alt: typeof candidate.alt === "string" ? candidate.alt : fallback.alt,
    };
  }

  return fallback;
}

function buildFallbackSnapshot(): CmsSiteSnapshot {
  const pages = fallbackPages();
  const business = defaultCmsContent.business;

  return {
    business: {
      ...business,
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
      socialLinks: defaultCmsContent.socialLinks,
      operatingHours: defaultCmsContent.operatingHours,
    },
    navigation: defaultCmsContent.navigation,
    services: defaultCmsContent.services.map((item) => ({
      id: item.slug,
      title: item.title,
      slug: item.slug,
      badge: item.badge ?? null,
      summary: item.summary,
      description: item.description,
      bullets: item.bullets,
      imageId: null,
      imageUrl: item.imageUrl,
      altText: item.altText,
      sortOrder: item.sortOrder,
      isFeatured: item.isFeatured,
      status: item.status,
      seoTitle: item.seoTitle ?? null,
      seoDescription: item.seoDescription ?? null,
      seoKeywords: item.seoKeywords,
    })),
    portfolio: defaultCmsContent.portfolio.map((item) => ({
      id: item.slug,
      title: item.title,
      slug: item.slug,
      category: item.category,
      location: item.location ?? null,
      shortDescription: item.shortDescription,
      description: item.description,
      coverImageId: null,
      coverImageUrl: item.coverImageUrl,
      altText: item.altText,
      sortOrder: item.sortOrder,
      isFeatured: item.isFeatured,
      status: item.status,
      seoTitle: item.seoTitle ?? null,
      seoDescription: item.seoDescription ?? null,
      seoKeywords: item.seoKeywords,
    })),
    testimonials: defaultCmsContent.testimonials.map((item, index) => ({
      id: `testimonial-${index}`,
      customerName: item.customerName,
      customerRole: item.customerRole ?? null,
      quote: item.quote,
      rating: item.rating,
      sourceLabel: item.sourceLabel,
      sourceUrl: item.sourceUrl ?? null,
      avatarImageId: null,
      avatarUrl: item.avatarUrl ?? null,
      sortOrder: item.sortOrder,
      isFeatured: item.isFeatured,
      status: item.status,
    })),
    faqs: defaultCmsContent.faqs.map((item, index) => ({
      id: `faq-${index}`,
      question: item.question,
      answer: item.answer,
      sortOrder: item.sortOrder,
      status: item.status,
    })),
    pages,
  };
}

async function buildDatabaseSnapshot(): Promise<CmsSiteSnapshot> {
  await ensureCmsSeeded(prisma);

  const [business, navigation, services, portfolio, testimonials, faqs, pages] =
    await Promise.all([
      prisma.businessProfile.findUnique({
        where: { id: "default" },
        include: {
          socialLinks: { orderBy: { sortOrder: "asc" } },
          operatingHours: { orderBy: { sortOrder: "asc" } },
          defaultOgImage: true,
        },
      }),
      prisma.navigationItem.findMany({
        orderBy: { sortOrder: "asc" },
      }),
      prisma.serviceItem.findMany({
        where: { status: ContentStatus.PUBLISHED },
        orderBy: { sortOrder: "asc" },
        include: { image: true },
      }),
      prisma.portfolioItem.findMany({
        where: { status: ContentStatus.PUBLISHED },
        orderBy: { sortOrder: "asc" },
        include: { coverImage: true },
      }),
      prisma.testimonial.findMany({
        where: { status: ContentStatus.PUBLISHED },
        orderBy: { sortOrder: "asc" },
        include: { avatarImage: true },
      }),
      prisma.faqItem.findMany({
        where: { status: ContentStatus.PUBLISHED },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.page.findMany({
        orderBy: { createdAt: "asc" },
        include: {
          sections: {
            orderBy: { sortOrder: "asc" },
            include: {
              blocks: {
                orderBy: { sortOrder: "asc" },
              },
            },
          },
          ogImage: true,
        },
      }),
    ]);

  if (!business) {
    return buildFallbackSnapshot();
  }

  return {
    business: {
      ...business,
      latitude: business.latitude ? Number(business.latitude) : null,
      longitude: business.longitude ? Number(business.longitude) : null,
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
    },
    navigation,
    services: services.map((item) => ({
      ...item,
      bullets: Array.isArray(item.bullets)
        ? item.bullets.filter((bullet): bullet is string => typeof bullet === "string")
        : [],
      imageUrl: item.image?.url ?? "",
      altText: item.altText ?? item.image?.altText ?? item.title,
    })),
    portfolio: portfolio.map((item) => ({
      ...item,
      coverImageUrl: item.coverImage?.url ?? "",
      altText: item.altText ?? item.coverImage?.altText ?? item.title,
    })),
    testimonials: testimonials.map((item) => ({
      ...item,
      avatarUrl: item.avatarImage?.url ?? null,
    })),
    faqs,
    pages: pages.map((page) => ({
      id: page.id,
      name: page.name,
      slug: page.slug,
      route: page.route,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      seoKeywords: page.seoKeywords,
      canonicalPath: page.canonicalPath,
      ogImageId: page.ogImageId,
      ogImage: page.ogImage
        ? {
            url: page.ogImage.url,
            altText: page.ogImage.altText,
          }
        : null,
      robotsIndex: page.robotsIndex,
      robotsFollow: page.robotsFollow,
      sections: page.sections.map(serializeSection),
    })),
  };
}

export async function getPublicSiteSnapshot(): Promise<CmsSiteSnapshot> {
  if (!hasDatabaseUrl) {
    try {
      return await getLocalPublicSiteSnapshot();
    } catch (error) {
      console.error("Falling back to default CMS content.", error);
      return buildFallbackSnapshot();
    }
  }

  try {
    return await buildDatabaseSnapshot();
  } catch (error) {
    console.error("Falling back to default CMS content.", error);
    return buildFallbackSnapshot();
  }
}

export async function getPagePayload(route: string): Promise<CmsSnapshot> {
  const snapshot = await getPublicSiteSnapshot();
  const page = snapshot.pages.find((item) => item.route === route);
  const globalPage = snapshot.pages.find((item) => item.slug === "global");

  return {
    ...snapshot,
    page: page ?? snapshot.pages.find((item) => item.route === "/") ?? snapshot.pages[0],
    globalPage:
      globalPage ??
      snapshot.pages.find((item) => item.slug === "global") ??
      snapshot.pages[0],
  };
}

export function getSection(
  page: { sections: CmsStructuredSection[] },
  key: string,
) {
  return sectionByKey(page.sections, key);
}
