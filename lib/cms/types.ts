export type CmsImageValue = {
  assetId?: string | null;
  url: string;
  alt: string;
};

export type CmsBlockValue =
  | string
  | boolean
  | CmsImageValue
  | Record<string, unknown>
  | unknown[]
  | null;

export type CmsSectionBlockType =
  | "TEXT"
  | "TEXTAREA"
  | "URL"
  | "IMAGE"
  | "BOOLEAN"
  | "JSON";

export type CmsSectionBlock = {
  id: string;
  key: string;
  label: string;
  type: CmsSectionBlockType;
  value: CmsBlockValue;
  sortOrder: number;
};

export type CmsSectionBlockMap = Record<string, CmsSectionBlock>;

export type CmsSection = {
  id: string;
  key: string;
  name: string;
  isVisible: boolean;
  sortOrder: number;
  blocks: CmsSectionBlockMap | CmsSectionBlock[];
};

export type CmsStructuredSection = Omit<CmsSection, "blocks"> & {
  blocks: CmsSectionBlockMap;
};

export type CmsEditableSection = Omit<CmsSection, "blocks"> & {
  blocks: CmsSectionBlock[];
};

export type CmsOgImage = {
  url: string;
  altText?: string | null;
};

export type CmsPage = {
  id: string;
  name: string;
  slug: string;
  route: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  canonicalPath: string | null;
  ogImageId?: string | null;
  ogImage?: CmsOgImage | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
  sections: CmsSection[];
};

export type CmsStructuredPage = Omit<CmsPage, "sections"> & {
  sections: CmsStructuredSection[];
};

export type CmsEditablePage = Omit<CmsPage, "sections"> & {
  sections: CmsEditableSection[];
};

export type CmsNavigationItem = {
  id?: string;
  href: string;
  label: string;
  isVisible?: boolean;
  isExternal?: boolean;
  sortOrder?: number;
};

export type CmsSocialLink = {
  id?: string;
  platform: "WHATSAPP" | "INSTAGRAM" | "TIKTOK" | "MAPS" | "OTHER";
  label: string;
  url: string;
  isVisible?: boolean;
  sortOrder?: number;
};

export type CmsOperatingHour = {
  id?: string;
  dayLabel: string;
  opensAt?: string | null;
  closesAt?: string | null;
  isClosed: boolean;
  sortOrder: number;
};

export type CmsBusinessProfile = {
  businessName: string;
  shortName: string;
  tagline?: string | null;
  siteUrl: string;
  supportEmail?: string | null;
  primaryPhone: string;
  secondaryPhone?: string | null;
  whatsappPrimary: string;
  whatsappSecondary?: string | null;
  whatsappMessage: string;
  whatsappSecondaryMessage?: string | null;
  whatsappPrimaryUrl: string;
  whatsappSecondaryUrl?: string | null;
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
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultKeywords: string[];
  defaultOgImage?: CmsOgImage | null;
  defaultOgImageId?: string | null;
  logoUrl: string;
  faviconUrl: string;
  googleAnalyticsId?: string | null;
  googleTagManagerId?: string | null;
  googleSearchConsoleVerification?: string | null;
  fullAddress: string;
  socialLinks: CmsSocialLink[];
  operatingHours: CmsOperatingHour[];
};

export type CmsMediaAsset = {
  id: string;
  title: string;
  altText: string;
  url: string;
  kind?: string;
  imageId?: string | null;
};

export type CmsServiceItem = {
  id: string;
  title: string;
  slug: string;
  badge?: string | null;
  summary: string;
  description: string;
  bullets: string[];
  imageId?: string | null;
  imageUrl: string;
  altText: string;
  sortOrder: number;
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED";
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords: string[];
};

export type CmsPortfolioItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  location?: string | null;
  shortDescription: string;
  description: string;
  coverImageId?: string | null;
  coverImageUrl: string;
  altText: string;
  sortOrder: number;
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED";
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords: string[];
  updatedAt?: Date;
};

export type CmsTestimonial = {
  id: string;
  customerName: string;
  customerRole?: string | null;
  quote: string;
  rating: number;
  sourceLabel: string;
  sourceUrl?: string | null;
  avatarImageId?: string | null;
  avatarUrl?: string | null;
  sortOrder: number;
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED";
};

export type CmsFaq = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  status: "DRAFT" | "PUBLISHED";
};

export type CmsPageSeoEditorItem = {
  pageId: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  canonicalPath: string | null;
  ogImageId?: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
};

export type CmsHomeEditorPayload = {
  page: CmsPageSeoEditorItem;
  sections: CmsEditableSection[];
  globalSections: CmsEditableSection[];
};

export type CmsSiteSnapshot = {
  business: CmsBusinessProfile;
  navigation: CmsNavigationItem[];
  services: CmsServiceItem[];
  portfolio: CmsPortfolioItem[];
  testimonials: CmsTestimonial[];
  faqs: CmsFaq[];
  pages: CmsStructuredPage[];
};

export type CmsSnapshot = CmsSiteSnapshot & {
  page: CmsStructuredPage;
  globalPage: CmsStructuredPage;
};

export type CmsAdminDashboardData = {
  portfolioCount: number;
  serviceCount: number;
  faqCount: number;
  testimonialCount: number;
  mediaCount: number;
  pageCount: number;
};

export type CmsHomeEditorData = {
  homePage: CmsEditablePage;
  globalPage: CmsEditablePage;
  mediaAssets: CmsMediaAsset[];
};

export type CmsSettingsData = {
  business: CmsBusinessProfile | null;
  navigationItems: CmsNavigationItem[];
  pages: CmsPage[];
  mediaAssets: CmsMediaAsset[];
};
