import type { Prisma, PrismaClient } from "@prisma/client";
import {
  ContentStatus,
  MediaKind,
  PageKind,
  SectionBlockType,
  SocialPlatform,
} from "@prisma/client";
import bcrypt from "bcryptjs";

import { defaultCmsContent } from "@/lib/cms/default-content";
import { prisma } from "@/lib/prisma";

function resolveMediaKind(url: string) {
  if (url.endsWith(".mp4")) {
    return MediaKind.VIDEO;
  }

  return MediaKind.IMAGE;
}

function resolveSocialPlatform(platform: string) {
  return SocialPlatform[platform as keyof typeof SocialPlatform] ?? SocialPlatform.OTHER;
}

function resolvePageKind(kind: string) {
  return PageKind[kind as keyof typeof PageKind];
}

function resolveBlockType(type: string) {
  return SectionBlockType[type as keyof typeof SectionBlockType];
}

export async function seedCms(client: PrismaClient = prisma) {
  const existingBusiness = await client.businessProfile.findUnique({
    where: { id: "default" },
    select: { id: true },
  });

  if (existingBusiness) {
    return;
  }

  const mediaMap = new Map<string, string>();

  for (const asset of defaultCmsContent.mediaAssets) {
    const created = await client.mediaAsset.create({
      data: {
        kind: resolveMediaKind(asset.url),
        title: asset.title,
        altText: asset.altText,
        fileName: asset.url.split("/").pop() ?? asset.title,
        storageKey: asset.url.replace(/^\//, ""),
        url: asset.url,
        mimeType: asset.url.endsWith(".png")
          ? "image/png"
          : asset.url.endsWith(".webp")
            ? "image/webp"
            : asset.url.endsWith(".jpg") || asset.url.endsWith(".jpeg")
              ? "image/jpeg"
              : asset.url.endsWith(".svg")
                ? "image/svg+xml"
                : asset.url.endsWith(".mp4")
                  ? "video/mp4"
                  : "image/jpeg",
        extension: asset.url.split(".").pop(),
        sizeBytes: 0,
      },
    });

    mediaMap.set(asset.url, created.id);
  }

  await client.businessProfile.create({
    data: {
      ...defaultCmsContent.business,
      defaultOgImageId: mediaMap.get(defaultCmsContent.business.logoUrl) ?? null,
      operatingHours: {
        create: defaultCmsContent.operatingHours,
      },
      socialLinks: {
        create: defaultCmsContent.socialLinks.map((item) => ({
          ...item,
          platform: resolveSocialPlatform(item.platform),
        })),
      },
    },
  });

  await client.navigationItem.createMany({
    data: defaultCmsContent.navigation,
  });

  for (const page of defaultCmsContent.pages) {
    await client.page.create({
      data: {
        kind: resolvePageKind(page.kind),
        name: page.name,
        slug: page.slug,
        route: page.route,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        seoKeywords: page.seoKeywords,
        canonicalPath: page.canonicalPath,
        robotsIndex: page.robotsIndex,
        robotsFollow: page.robotsFollow,
        status: ContentStatus.PUBLISHED,
        sections: {
          create: page.sections.map((section) => ({
            key: section.key,
            name: section.name,
            isVisible: section.isVisible,
            sortOrder: section.sortOrder,
            blocks: {
              create: section.blocks.map((block) => {
                let value = block.value;

                if (
                  block.type === "IMAGE" &&
                  typeof value === "object" &&
                  value &&
                  "url" in value
                ) {
                  const imageValue = value as { url: string; alt: string };
                  value = {
                    assetId: mediaMap.get(imageValue.url) ?? null,
                    url: imageValue.url,
                    alt: imageValue.alt,
                  };
                }

                return {
                  key: block.key,
                  label: block.label,
                  type: resolveBlockType(block.type),
                  value: value as Prisma.InputJsonValue,
                  sortOrder: block.sortOrder,
                };
              }),
            },
          })),
        },
      },
    });
  }

  for (const service of defaultCmsContent.services) {
    await client.serviceItem.create({
      data: {
        title: service.title,
        slug: service.slug,
        badge: service.badge,
        summary: service.summary,
        description: service.description,
        bullets: service.bullets,
        imageId: mediaMap.get(service.imageUrl) ?? null,
        altText: service.altText,
        sortOrder: service.sortOrder,
        isFeatured: service.isFeatured,
        status: ContentStatus[service.status],
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
        seoKeywords: service.seoKeywords,
      },
    });
  }

  for (const item of defaultCmsContent.portfolio) {
    await client.portfolioItem.create({
      data: {
        title: item.title,
        slug: item.slug,
        category: item.category,
        location: item.location,
        shortDescription: item.shortDescription,
        description: item.description,
        coverImageId: mediaMap.get(item.coverImageUrl) ?? null,
        altText: item.altText,
        sortOrder: item.sortOrder,
        isFeatured: item.isFeatured,
        status: ContentStatus[item.status],
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
        seoKeywords: item.seoKeywords,
      },
    });
  }

  for (const item of defaultCmsContent.testimonials) {
    await client.testimonial.create({
      data: {
        customerName: item.customerName,
        customerRole: item.customerRole,
        quote: item.quote,
        rating: item.rating,
        sourceLabel: item.sourceLabel,
        sourceUrl: item.sourceUrl,
        avatarImageId: item.avatarUrl ? mediaMap.get(item.avatarUrl) ?? null : null,
        sortOrder: item.sortOrder,
        isFeatured: item.isFeatured,
        status: ContentStatus[item.status],
      },
    });
  }

  await client.faqItem.createMany({
    data: defaultCmsContent.faqs.map((item) => ({
      question: item.question,
      answer: item.answer,
      sortOrder: item.sortOrder,
      status: ContentStatus[item.status],
    })),
  });

  await client.adminUser.create({
    data: {
      email: defaultCmsContent.adminUser.email,
      name: defaultCmsContent.adminUser.name,
      passwordHash: await bcrypt.hash(defaultCmsContent.adminUser.password, 12),
      role: "admin",
    },
  });
}

export async function ensureCmsSeeded(client: PrismaClient = prisma) {
  try {
    await seedCms(client);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("CMS seed skipped or failed.", error);
    }
  }
}
