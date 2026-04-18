import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid."),
  password: z.string().min(8, "Password minimal 8 karakter."),
});

const keywordFieldSchema = z
  .union([z.array(z.string()), z.string()])
  .transform((value) =>
    Array.isArray(value)
      ? value
      : value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
  );

export const imageValueSchema = z.object({
  assetId: z.string().optional().nullable(),
  url: z.string().default(""),
  alt: z.string().default(""),
});

export const sectionBlockSchema = z.object({
  id: z.string(),
  key: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(["TEXT", "TEXTAREA", "URL", "IMAGE", "BOOLEAN", "JSON"]),
  sortOrder: z.number().int().nonnegative(),
  value: z.union([
    z.string(),
    z.boolean(),
    z.record(z.string(), z.unknown()),
    z.array(z.unknown()),
    z.null(),
  ]),
});

export const sectionEditorSchema = z.object({
  id: z.string(),
  key: z.string().min(1),
  name: z.string().min(1),
  isVisible: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
  blocks: z.array(sectionBlockSchema),
});

export const pageSeoSchema = z.object({
  pageId: z.string(),
  seoTitle: z.string().trim().max(160).optional().nullable(),
  seoDescription: z.string().trim().max(320).optional().nullable(),
  seoKeywords: keywordFieldSchema.default([]),
  canonicalPath: z.string().trim().max(255).optional().nullable(),
  ogImageId: z.string().optional().nullable(),
  robotsIndex: z.boolean().default(true),
  robotsFollow: z.boolean().default(true),
});

export const homeEditorSchema = z.object({
  page: pageSeoSchema,
  sections: z.array(sectionEditorSchema),
  globalSections: z.array(sectionEditorSchema),
});

export const portfolioSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Judul minimal 3 karakter."),
  slug: z.string().min(3, "Slug minimal 3 karakter."),
  category: z.string().min(2, "Kategori wajib diisi."),
  location: z.string().optional().nullable(),
  shortDescription: z.string().min(10, "Ringkasan terlalu pendek."),
  description: z.string().min(20, "Deskripsi terlalu pendek."),
  coverImageId: z.string().optional().nullable(),
  altText: z.string().optional().nullable(),
  sortOrder: z.number().int().nonnegative(),
  isFeatured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  seoKeywords: keywordFieldSchema.default([]),
});

export const faqSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(8, "Pertanyaan terlalu pendek."),
  answer: z.string().min(10, "Jawaban terlalu pendek."),
  sortOrder: z.number().int().nonnegative(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export const testimonialSchema = z.object({
  id: z.string().optional(),
  customerName: z.string().min(2, "Nama wajib diisi."),
  customerRole: z.string().optional().nullable(),
  quote: z.string().min(10, "Testimoni terlalu pendek."),
  rating: z.number().int().min(1).max(5),
  sourceLabel: z.string().min(2, "Sumber wajib diisi."),
  sourceUrl: z.string().url().optional().or(z.literal("")).nullable(),
  avatarImageId: z.string().optional().nullable(),
  sortOrder: z.number().int().nonnegative(),
  isFeatured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export const serviceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Judul wajib diisi."),
  slug: z.string().min(3, "Slug wajib diisi."),
  badge: z.string().optional().nullable(),
  summary: z.string().min(10, "Ringkasan terlalu pendek."),
  description: z.string().min(20, "Deskripsi terlalu pendek."),
  bullets: z
    .array(z.string())
    .transform((value) => value.map((item) => item.trim()).filter(Boolean))
    .pipe(z.array(z.string().min(2)).min(1, "Minimal satu poin layanan.")),
  imageId: z.string().optional().nullable(),
  altText: z.string().optional().nullable(),
  sortOrder: z.number().int().nonnegative(),
  isFeatured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  seoKeywords: keywordFieldSchema.default([]),
});

export const navigationItemSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1),
  href: z.string().min(1),
  isVisible: z.boolean().default(true),
  isExternal: z.boolean().default(false),
  sortOrder: z.number().int().nonnegative(),
});

export const socialLinkSchema = z.object({
  id: z.string().optional(),
  platform: z.enum(["WHATSAPP", "INSTAGRAM", "TIKTOK", "MAPS", "OTHER"]),
  label: z.string().min(1),
  url: z.string().url("URL sosial tidak valid."),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().int().nonnegative(),
});

export const operatingHourSchema = z.object({
  id: z.string().optional(),
  dayLabel: z.string().min(1),
  opensAt: z.string().optional().nullable(),
  closesAt: z.string().optional().nullable(),
  isClosed: z.boolean().default(false),
  sortOrder: z.number().int().nonnegative(),
});

export const contactSchema = z.object({
  businessName: z.string().min(2),
  shortName: z.string().min(2),
  tagline: z.string().optional().nullable(),
  supportEmail: z.string().email().optional().or(z.literal("")).nullable(),
  primaryPhone: z.string().min(8),
  secondaryPhone: z.string().optional().nullable(),
  whatsappPrimary: z.string().min(8),
  whatsappSecondary: z.string().optional().nullable(),
  whatsappMessage: z.string().min(8),
  whatsappSecondaryMessage: z.string().optional().nullable(),
  addressLine1: z.string().min(5),
  addressLine2: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  city: z.string().min(2),
  region: z.string().min(2),
  postalCode: z.string().min(4),
  countryCode: z.string().min(2).max(2),
  mapsUrl: z.string().url(),
  mapsEmbedUrl: z.string().url(),
  reviewUrl: z.string().url().optional().or(z.literal("")).nullable(),
  instagramUrl: z.string().url().optional().or(z.literal("")).nullable(),
  tiktokUrl: z.string().url().optional().or(z.literal("")).nullable(),
  latitude: z.coerce.number().optional().nullable(),
  longitude: z.coerce.number().optional().nullable(),
  areasServed: z
    .union([z.array(z.string().min(2)), z.string()])
    .transform((value) =>
      Array.isArray(value)
        ? value
        : value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
    ),
  openingHoursNote: z.string().optional().nullable(),
  socialLinks: z.array(socialLinkSchema),
  operatingHours: z.array(operatingHourSchema),
});

export const settingsSchema = z.object({
  siteUrl: z.string().url(),
  logoUrl: z.string().min(1),
  faviconUrl: z.string().min(1),
  defaultMetaTitle: z.string().min(10).max(160),
  defaultMetaDescription: z.string().min(20).max(320),
  defaultKeywords: keywordFieldSchema.default([]),
  defaultOgImageId: z.string().optional().nullable(),
  googleAnalyticsId: z.string().optional().nullable(),
  googleTagManagerId: z.string().optional().nullable(),
  googleSearchConsoleVerification: z.string().optional().nullable(),
  navigationItems: z.array(navigationItemSchema),
  pageSeo: z.array(pageSeoSchema),
});

export type HomeEditorFormInput = z.input<typeof homeEditorSchema>;
export type HomeEditorFormValues = z.output<typeof homeEditorSchema>;
export type SettingsFormInput = z.input<typeof settingsSchema>;
export type SettingsFormValues = z.output<typeof settingsSchema>;
