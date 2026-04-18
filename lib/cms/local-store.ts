import bcrypt from "bcryptjs";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { defaultCmsContent } from "@/lib/cms/default-content";
import type {
  CmsBusinessProfile,
  CmsEditablePage,
  CmsFaq,
  CmsMediaAsset,
  CmsNavigationItem,
  CmsOperatingHour,
  CmsPortfolioItem,
  CmsSectionBlock,
  CmsSectionBlockMap,
  CmsServiceItem,
  CmsSiteSnapshot,
  CmsSocialLink,
  CmsStructuredPage,
  CmsStructuredSection,
  CmsTestimonial,
} from "@/lib/cms/types";
import { slugify } from "@/lib/slug";
import { buildWhatsAppUrl, safeJsonParse } from "@/lib/utils";

type LocalMediaKind = "IMAGE" | "VIDEO" | "FILE";

type LocalAdminUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: string;
};

type LocalMediaAsset = CmsMediaAsset & {
  kind: LocalMediaKind;
  fileName: string;
  storageKey: string;
  mimeType: string;
  extension?: string | null;
  sizeBytes: number;
  createdAt: string;
  updatedAt: string;
};

type LocalPortfolioItem = Omit<CmsPortfolioItem, "updatedAt"> & {
  updatedAt: string;
};

export type LocalCmsState = {
  version: 1;
  adminUser: LocalAdminUser;
  business: CmsBusinessProfile;
  navigation: Array<CmsNavigationItem & { id: string }>;
  services: CmsServiceItem[];
  portfolio: LocalPortfolioItem[];
  testimonials: CmsTestimonial[];
  faqs: CmsFaq[];
  mediaAssets: LocalMediaAsset[];
  pages: CmsEditablePage[];
};

const dataDirectory = path.join(process.cwd(), "data");
const stateFilePath = path.join(dataDirectory, "cms-state.json");

function resolveMediaKind(url: string): LocalMediaKind {
  if (url.endsWith(".mp4")) {
    return "VIDEO";
  }

  return "IMAGE";
}

function fileNameFromUrl(url: string) {
  return url.split("/").pop() ?? "asset";
}

function extensionFromUrl(url: string) {
  const extension = fileNameFromUrl(url).split(".").pop();
  return extension ? `.${extension}` : null;
}

function mimeTypeFromUrl(url: string) {
  if (url.endsWith(".png")) return "image/png";
  if (url.endsWith(".webp")) return "image/webp";
  if (url.endsWith(".svg")) return "image/svg+xml";
  if (url.endsWith(".avif")) return "image/avif";
  if (url.endsWith(".mp4")) return "video/mp4";
  return "image/jpeg";
}

function buildStructuredSection(section: CmsEditablePage["sections"][number]): CmsStructuredSection {
  return {
    id: section.id,
    key: section.key,
    name: section.name,
    isVisible: section.isVisible,
    sortOrder: section.sortOrder,
    blocks: Object.fromEntries(
      section.blocks.map((block) => [block.key, block]),
    ) as CmsSectionBlockMap,
  };
}

function buildStructuredPage(page: CmsEditablePage): CmsStructuredPage {
  return {
    ...page,
    sections: page.sections.map(buildStructuredSection),
  };
}

function hydrateBusiness(
  business: CmsBusinessProfile,
  mediaAssets: LocalMediaAsset[],
): CmsBusinessProfile {
  const defaultOgAsset = business.defaultOgImageId
    ? mediaAssets.find((asset) => asset.id === business.defaultOgImageId)
    : null;

  return {
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
    defaultOgImage: defaultOgAsset
      ? {
          url: defaultOgAsset.url,
          altText: defaultOgAsset.altText,
        }
      : null,
  };
}

function withImageAsset(
  block: CmsSectionBlock,
  mediaIdByUrl: Map<string, string>,
): CmsSectionBlock {
  if (
    block.type === "IMAGE" &&
    block.value &&
    typeof block.value === "object" &&
    !Array.isArray(block.value)
  ) {
    const candidate = block.value as { url?: unknown; alt?: unknown };

    return {
      ...block,
      value: {
        assetId:
          typeof candidate.url === "string"
            ? mediaIdByUrl.get(candidate.url) ?? null
            : null,
        url: typeof candidate.url === "string" ? candidate.url : "",
        alt: typeof candidate.alt === "string" ? candidate.alt : "",
      },
    };
  }

  return block;
}

function sortByOrder<T extends { sortOrder?: number }>(items: T[]) {
  return [...items].sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0));
}

function normalizeState(state: LocalCmsState): LocalCmsState {
  const hydratedBusiness = hydrateBusiness(state.business, state.mediaAssets);

  return {
    ...state,
    business: hydratedBusiness,
    navigation: sortByOrder(state.navigation),
    services: sortByOrder(state.services),
    portfolio: sortByOrder(state.portfolio),
    testimonials: sortByOrder(state.testimonials),
    faqs: sortByOrder(state.faqs),
    mediaAssets: [...state.mediaAssets].sort((left, right) =>
      right.createdAt.localeCompare(left.createdAt),
    ),
    pages: [...state.pages].sort((left, right) =>
      left.route.localeCompare(right.route),
    ),
  };
}

async function buildInitialLocalState(): Promise<LocalCmsState> {
  const now = new Date().toISOString();
  const mediaAssets: LocalMediaAsset[] = defaultCmsContent.mediaAssets.map(
    (asset, index) => ({
      id: `media-${index + 1}-${slugify(asset.title)}`,
      title: asset.title,
      altText: asset.altText,
      url: asset.url,
      kind: resolveMediaKind(asset.url),
      fileName: fileNameFromUrl(asset.url),
      storageKey: asset.url.replace(/^\//, ""),
      mimeType: mimeTypeFromUrl(asset.url),
      extension: extensionFromUrl(asset.url),
      sizeBytes: 0,
      createdAt: now,
      updatedAt: now,
    }),
  );

  const mediaIdByUrl = new Map(mediaAssets.map((asset) => [asset.url, asset.id]));

  const business = hydrateBusiness(
    {
      ...defaultCmsContent.business,
      defaultOgImageId:
        mediaIdByUrl.get(defaultCmsContent.business.logoUrl) ?? null,
      defaultOgImage: null,
      fullAddress: "",
      whatsappPrimaryUrl: "",
      whatsappSecondaryUrl: null,
      socialLinks: defaultCmsContent.socialLinks.map((item, index) => ({
        ...item,
        id: `social-${index + 1}`,
      })),
      operatingHours: defaultCmsContent.operatingHours.map((item, index) => ({
        ...item,
        id: `hours-${index + 1}`,
      })),
    },
    mediaAssets,
  );

  const pages: CmsEditablePage[] = defaultCmsContent.pages.map((page) => ({
    id: `page-${page.slug}`,
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
      id: `section-${page.slug}-${section.key}`,
      key: section.key,
      name: section.name,
      isVisible: section.isVisible,
      sortOrder: section.sortOrder,
      blocks: section.blocks.map((block) =>
        withImageAsset(
          {
            id: `block-${page.slug}-${section.key}-${block.key}`,
            key: block.key,
            label: block.label,
            type: block.type,
            value: block.value,
            sortOrder: block.sortOrder,
          },
          mediaIdByUrl,
        ),
      ),
    })),
  }));

  return normalizeState({
    version: 1,
    adminUser: {
      id: "local-admin",
      email: defaultCmsContent.adminUser.email,
      name: defaultCmsContent.adminUser.name,
      passwordHash: await bcrypt.hash(defaultCmsContent.adminUser.password, 12),
      role: "admin",
    },
    business,
    navigation: defaultCmsContent.navigation.map((item, index) => ({
      ...item,
      id: `nav-${index + 1}`,
    })),
    services: defaultCmsContent.services.map((item) => ({
      id: `service-${item.slug}`,
      title: item.title,
      slug: item.slug,
      badge: item.badge ?? null,
      summary: item.summary,
      description: item.description,
      bullets: item.bullets,
      imageId: mediaIdByUrl.get(item.imageUrl) ?? null,
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
      id: `portfolio-${item.slug}`,
      title: item.title,
      slug: item.slug,
      category: item.category,
      location: item.location ?? null,
      shortDescription: item.shortDescription,
      description: item.description,
      coverImageId: mediaIdByUrl.get(item.coverImageUrl) ?? null,
      coverImageUrl: item.coverImageUrl,
      altText: item.altText,
      sortOrder: item.sortOrder,
      isFeatured: item.isFeatured,
      status: item.status,
      seoTitle: item.seoTitle ?? null,
      seoDescription: item.seoDescription ?? null,
      seoKeywords: item.seoKeywords,
      updatedAt: now,
    })),
    testimonials: defaultCmsContent.testimonials.map((item, index) => ({
      id: `testimonial-${index + 1}`,
      customerName: item.customerName,
      customerRole: item.customerRole ?? null,
      quote: item.quote,
      rating: item.rating,
      sourceLabel: item.sourceLabel,
      sourceUrl: item.sourceUrl ?? null,
      avatarImageId: item.avatarUrl ? mediaIdByUrl.get(item.avatarUrl) ?? null : null,
      avatarUrl: item.avatarUrl ?? null,
      sortOrder: item.sortOrder,
      isFeatured: item.isFeatured,
      status: item.status,
    })),
    faqs: defaultCmsContent.faqs.map((item, index) => ({
      id: `faq-${index + 1}`,
      question: item.question,
      answer: item.answer,
      sortOrder: item.sortOrder,
      status: item.status,
    })),
    mediaAssets,
    pages,
  });
}

async function writeLocalCmsState(state: LocalCmsState) {
  await mkdir(dataDirectory, { recursive: true });
  const tempFilePath = `${stateFilePath}.${randomUUID()}.tmp`;
  await writeFile(tempFilePath, JSON.stringify(state, null, 2), "utf8");
  await rename(tempFilePath, stateFilePath);
}

export async function ensureLocalCmsState(): Promise<LocalCmsState> {
  try {
    await stat(stateFilePath);
    const fileContents = await readFile(stateFilePath, "utf8");
    const parsed = safeJsonParse<LocalCmsState | null>(fileContents, null);

    if (parsed) {
      return normalizeState(parsed);
    }
  } catch {
    // Continue to initial seed.
  }

  const seededState = await buildInitialLocalState();
  await writeLocalCmsState(seededState);
  return seededState;
}

export async function updateLocalCmsState(
  mutator: (draft: LocalCmsState) => void | Promise<void>,
) {
  const draft = await ensureLocalCmsState();
  await mutator(draft);
  const normalized = normalizeState(draft);
  await writeLocalCmsState(normalized);
  return normalized;
}

export async function getLocalPublicSiteSnapshot(): Promise<CmsSiteSnapshot> {
  const state = await ensureLocalCmsState();

  return {
    business: state.business,
    navigation: state.navigation,
    services: sortByOrder(
      state.services.filter((item) => item.status === "PUBLISHED"),
    ),
    portfolio: sortByOrder(
      state.portfolio
        .filter((item) => item.status === "PUBLISHED")
        .map((item) => ({
          ...item,
          updatedAt: new Date(item.updatedAt),
        })),
    ),
    testimonials: sortByOrder(
      state.testimonials.filter((item) => item.status === "PUBLISHED"),
    ),
    faqs: sortByOrder(state.faqs.filter((item) => item.status === "PUBLISHED")),
    pages: state.pages.map(buildStructuredPage),
  };
}

export async function getLocalAdminDashboardData() {
  const state = await ensureLocalCmsState();

  return {
    portfolioCount: state.portfolio.length,
    serviceCount: state.services.length,
    faqCount: state.faqs.length,
    testimonialCount: state.testimonials.length,
    mediaCount: state.mediaAssets.length,
    pageCount: state.pages.length,
  };
}

export async function getLocalHomeEditorData() {
  const state = await ensureLocalCmsState();

  return {
    homePage: state.pages.find((page) => page.slug === "home") ?? null,
    globalPage: state.pages.find((page) => page.slug === "global") ?? null,
    mediaAssets: state.mediaAssets.filter((item) => item.kind === "IMAGE"),
  };
}

export async function getLocalServicesData() {
  const state = await ensureLocalCmsState();

  return {
    services: sortByOrder(state.services),
    mediaAssets: state.mediaAssets.filter((item) => item.kind === "IMAGE"),
  };
}

export async function getLocalPortfolioData() {
  const state = await ensureLocalCmsState();

  return {
    portfolioItems: sortByOrder(
      state.portfolio.map((item) => ({
        ...item,
        updatedAt: new Date(item.updatedAt),
      })),
    ),
    mediaAssets: state.mediaAssets.filter((item) => item.kind === "IMAGE"),
  };
}

export async function getLocalFaqData() {
  const state = await ensureLocalCmsState();
  return sortByOrder(state.faqs);
}

export async function getLocalTestimonialsData() {
  const state = await ensureLocalCmsState();

  return {
    testimonials: sortByOrder(state.testimonials),
    mediaAssets: state.mediaAssets.filter((item) => item.kind === "IMAGE"),
  };
}

export async function getLocalContactData() {
  const state = await ensureLocalCmsState();
  return state.business;
}

export async function getLocalSettingsData() {
  const state = await ensureLocalCmsState();

  return {
    business: state.business,
    navigationItems: sortByOrder(state.navigation),
    pages: [...state.pages].sort((left, right) =>
      left.route.localeCompare(right.route),
    ),
    mediaAssets: state.mediaAssets.filter((item) => item.kind === "IMAGE"),
  };
}

export async function getLocalMediaData() {
  const state = await ensureLocalCmsState();
  return state.mediaAssets;
}

export async function getLocalPublishedPortfolioBySlug(slug: string) {
  const state = await ensureLocalCmsState();
  const item = state.portfolio.find(
    (portfolioItem) =>
      portfolioItem.slug === slug && portfolioItem.status === "PUBLISHED",
  );

  if (!item) {
    return null;
  }

  const coverImage = item.coverImageId
    ? state.mediaAssets.find((asset) => asset.id === item.coverImageId)
    : null;

  return {
    ...item,
    updatedAt: new Date(item.updatedAt),
    coverImage: coverImage
      ? {
          url: coverImage.url,
          altText: coverImage.altText,
        }
      : item.coverImageUrl
        ? {
            url: item.coverImageUrl,
            altText: item.altText,
          }
        : null,
  };
}

export async function verifyLocalAdminCredentials(email: string, password: string) {
  const state = await ensureLocalCmsState();

  if (state.adminUser.email !== email) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, state.adminUser.passwordHash);

  if (!passwordMatches) {
    return null;
  }

  return {
    id: state.adminUser.id,
    email: state.adminUser.email,
    name: state.adminUser.name,
    role: state.adminUser.role,
  };
}

export async function saveLocalHomeEditor(payload: {
  page: {
    pageId: string;
    seoTitle?: string | null;
    seoDescription?: string | null;
    seoKeywords: string[];
    canonicalPath?: string | null;
    robotsIndex: boolean;
    robotsFollow: boolean;
  };
  sections: CmsEditablePage["sections"];
  globalSections: CmsEditablePage["sections"];
}) {
  await updateLocalCmsState((state) => {
    const homePage = state.pages.find((page) => page.id === payload.page.pageId);
    const globalPage = state.pages.find((page) => page.slug === "global");

    if (!homePage || !globalPage) {
      throw new Error("Homepage atau global page tidak ditemukan.");
    }

    homePage.seoTitle = payload.page.seoTitle || null;
    homePage.seoDescription = payload.page.seoDescription || null;
    homePage.seoKeywords = payload.page.seoKeywords;
    homePage.canonicalPath = payload.page.canonicalPath || null;
    homePage.robotsIndex = payload.page.robotsIndex;
    homePage.robotsFollow = payload.page.robotsFollow;
    homePage.sections = payload.sections;
    globalPage.sections = payload.globalSections;
  });
}

export async function upsertLocalService(
  payload: Omit<
    CmsServiceItem,
    "id" | "imageUrl" | "badge" | "altText" | "seoTitle" | "seoDescription"
  > & {
    id?: string;
    badge?: string | null;
    imageUrl?: string | null;
    altText?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
  },
) {
  return updateLocalCmsState((state) => {
    const image = payload.imageId
      ? state.mediaAssets.find((asset) => asset.id === payload.imageId)
      : null;

    const nextService: CmsServiceItem = {
      ...payload,
      id: payload.id || `service-${randomUUID()}`,
      badge: payload.badge ?? null,
      imageId: payload.imageId || null,
      imageUrl: image?.url ?? payload.imageUrl ?? "",
      altText: payload.altText?.trim() || image?.altText || payload.title,
      seoTitle: payload.seoTitle ?? null,
      seoDescription: payload.seoDescription ?? null,
      seoKeywords: payload.seoKeywords,
    };

    const index = state.services.findIndex((item) => item.id === payload.id);

    if (index >= 0) {
      state.services[index] = nextService;
      return;
    }

    state.services.push(nextService);
  });
}

export async function deleteLocalService(id: string) {
  return updateLocalCmsState((state) => {
    state.services = state.services.filter((item) => item.id !== id);
  });
}

export async function upsertLocalPortfolio(
  payload: Omit<
    CmsPortfolioItem,
    "id" | "coverImageUrl" | "updatedAt" | "location" | "altText" | "seoTitle" | "seoDescription"
  > & {
    id?: string;
    location?: string | null;
    coverImageUrl?: string | null;
    altText?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
  },
) {
  return updateLocalCmsState((state) => {
    const coverImage = payload.coverImageId
      ? state.mediaAssets.find((asset) => asset.id === payload.coverImageId)
      : null;

    const nextItem: LocalPortfolioItem = {
      ...payload,
      id: payload.id || `portfolio-${randomUUID()}`,
      location: payload.location ?? null,
      coverImageId: payload.coverImageId || null,
      coverImageUrl: coverImage?.url ?? payload.coverImageUrl ?? "",
      altText: payload.altText?.trim() || coverImage?.altText || payload.title,
      seoTitle: payload.seoTitle ?? null,
      seoDescription: payload.seoDescription ?? null,
      seoKeywords: payload.seoKeywords,
      updatedAt: new Date().toISOString(),
    };

    const index = state.portfolio.findIndex((item) => item.id === payload.id);

    if (index >= 0) {
      state.portfolio[index] = nextItem;
      return;
    }

    state.portfolio.push(nextItem);
  });
}

export async function deleteLocalPortfolio(id: string) {
  return updateLocalCmsState((state) => {
    state.portfolio = state.portfolio.filter((item) => item.id !== id);
  });
}

export async function upsertLocalFaq(payload: Omit<CmsFaq, "id"> & { id?: string }) {
  return updateLocalCmsState((state) => {
    const nextFaq: CmsFaq = {
      ...payload,
      id: payload.id || `faq-${randomUUID()}`,
    };
    const index = state.faqs.findIndex((item) => item.id === payload.id);

    if (index >= 0) {
      state.faqs[index] = nextFaq;
      return;
    }

    state.faqs.push(nextFaq);
  });
}

export async function deleteLocalFaq(id: string) {
  return updateLocalCmsState((state) => {
    state.faqs = state.faqs.filter((item) => item.id !== id);
  });
}

export async function upsertLocalTestimonial(
  payload: Omit<CmsTestimonial, "id"> & { id?: string },
) {
  return updateLocalCmsState((state) => {
    const avatar = payload.avatarImageId
      ? state.mediaAssets.find((asset) => asset.id === payload.avatarImageId)
      : null;

    const nextItem: CmsTestimonial = {
      ...payload,
      id: payload.id || `testimonial-${randomUUID()}`,
      customerRole: payload.customerRole ?? null,
      sourceUrl: payload.sourceUrl ?? null,
      avatarImageId: payload.avatarImageId || null,
      avatarUrl: avatar?.url ?? null,
    };
    const index = state.testimonials.findIndex((item) => item.id === payload.id);

    if (index >= 0) {
      state.testimonials[index] = nextItem;
      return;
    }

    state.testimonials.push(nextItem);
  });
}

export async function deleteLocalTestimonial(id: string) {
  return updateLocalCmsState((state) => {
    state.testimonials = state.testimonials.filter((item) => item.id !== id);
  });
}

export async function updateLocalContact(payload: {
  businessName: string;
  shortName: string;
  tagline?: string | null;
  supportEmail?: string | null;
  primaryPhone: string;
  secondaryPhone?: string | null;
  whatsappPrimary: string;
  whatsappSecondary?: string | null;
  whatsappMessage: string;
  whatsappSecondaryMessage?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  district?: string | null;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  reviewUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  areasServed: string[];
  openingHoursNote?: string | null;
  socialLinks: CmsSocialLink[];
  operatingHours: CmsOperatingHour[];
}) {
  return updateLocalCmsState((state) => {
    state.business = {
      ...state.business,
      ...payload,
      socialLinks: payload.socialLinks.map((item, index) => ({
        ...item,
        id: item.id ?? `social-${index + 1}`,
      })),
      operatingHours: payload.operatingHours.map((item, index) => ({
        ...item,
        id: item.id ?? `hours-${index + 1}`,
      })),
    };
  });
}

export async function updateLocalSettings(payload: {
  siteUrl: string;
  logoUrl: string;
  faviconUrl: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultKeywords: string[];
  defaultOgImageId?: string | null;
  googleAnalyticsId?: string | null;
  googleTagManagerId?: string | null;
  googleSearchConsoleVerification?: string | null;
  navigationItems: CmsNavigationItem[];
  pageSeo: Array<{
    pageId: string;
    seoTitle?: string | null;
    seoDescription?: string | null;
    seoKeywords: string[];
    canonicalPath?: string | null;
    ogImageId?: string | null;
    robotsIndex: boolean;
    robotsFollow: boolean;
  }>;
}) {
  return updateLocalCmsState((state) => {
    state.business = {
      ...state.business,
      siteUrl: payload.siteUrl,
      logoUrl: payload.logoUrl,
      faviconUrl: payload.faviconUrl,
      defaultMetaTitle: payload.defaultMetaTitle,
      defaultMetaDescription: payload.defaultMetaDescription,
      defaultKeywords: payload.defaultKeywords,
      defaultOgImageId: payload.defaultOgImageId ?? null,
      googleAnalyticsId: payload.googleAnalyticsId ?? null,
      googleTagManagerId: payload.googleTagManagerId ?? null,
      googleSearchConsoleVerification:
        payload.googleSearchConsoleVerification ?? null,
    };

    state.navigation = payload.navigationItems.map((item, index) => ({
      ...item,
      id: item.id ?? `nav-${index + 1}`,
    }));

    for (const page of payload.pageSeo) {
      const targetPage = state.pages.find((item) => item.id === page.pageId);

      if (!targetPage) {
        continue;
      }

      targetPage.seoTitle = page.seoTitle || null;
      targetPage.seoDescription = page.seoDescription || null;
      targetPage.seoKeywords = page.seoKeywords;
      targetPage.canonicalPath = page.canonicalPath || null;
      targetPage.ogImageId = page.ogImageId ?? null;
      targetPage.ogImage = page.ogImageId
        ? (() => {
            const asset = state.mediaAssets.find((item) => item.id === page.ogImageId);
            return asset
              ? {
                  url: asset.url,
                  altText: asset.altText,
                }
              : null;
          })()
        : null;
      targetPage.robotsIndex = page.robotsIndex;
      targetPage.robotsFollow = page.robotsFollow;
    }
  });
}

export async function insertLocalMediaAsset(asset: Omit<LocalMediaAsset, "createdAt" | "updatedAt">) {
  const now = new Date().toISOString();

  return updateLocalCmsState((state) => {
    state.mediaAssets.unshift({
      ...asset,
      createdAt: now,
      updatedAt: now,
    });
  });
}

export async function deleteLocalMediaAsset(id: string) {
  return updateLocalCmsState((state) => {
    const asset = state.mediaAssets.find((item) => item.id === id);

    if (!asset) {
      throw new Error("Media tidak ditemukan.");
    }

    state.mediaAssets = state.mediaAssets.filter((item) => item.id !== id);

    state.services = state.services.map((item) =>
      item.imageId === id
        ? {
            ...item,
            imageId: null,
            imageUrl: "",
          }
        : item,
    );
    state.portfolio = state.portfolio.map((item) =>
      item.coverImageId === id
        ? {
            ...item,
            coverImageId: null,
            coverImageUrl: "",
          }
        : item,
    );
    state.testimonials = state.testimonials.map((item) =>
      item.avatarImageId === id
        ? {
            ...item,
            avatarImageId: null,
            avatarUrl: null,
          }
        : item,
    );
    state.pages = state.pages.map((page) => ({
      ...page,
      ogImageId: page.ogImageId === id ? null : page.ogImageId,
      ogImage:
        page.ogImageId === id
          ? null
          : page.ogImage ?? null,
      sections: page.sections.map((section) => ({
        ...section,
        blocks: section.blocks.map((block) => {
          if (
            block.type !== "IMAGE" ||
            !block.value ||
            typeof block.value !== "object" ||
            Array.isArray(block.value)
          ) {
            return block;
          }

          const imageValue = block.value as {
            assetId?: string | null;
            url?: string;
            alt?: string;
          };

          if (imageValue.assetId !== id) {
            return block;
          }

          return {
            ...block,
            value: {
              assetId: null,
              url: "",
              alt: imageValue.alt ?? asset.altText,
            },
          };
        }),
      })),
    }));

    if (state.business.defaultOgImageId === id) {
      state.business.defaultOgImageId = null;
      state.business.defaultOgImage = null;
    }
    if (state.business.logoUrl === asset.url) {
      state.business.logoUrl = defaultCmsContent.business.logoUrl;
    }
    if (state.business.faviconUrl === asset.url) {
      state.business.faviconUrl = defaultCmsContent.business.faviconUrl;
    }
  });
}
