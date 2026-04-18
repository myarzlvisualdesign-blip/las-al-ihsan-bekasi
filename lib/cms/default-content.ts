import { slugify } from "@/lib/slug";
import { buildWhatsAppUrl } from "@/lib/utils";
import {
  faqs,
  featuredServices,
  googleTestimonials,
  navigationLinks,
  portfolioItems,
  reviewSnapshot,
  serviceCategories,
  siteConfig,
} from "@/lib/site";

export type DefaultImageValue = {
  assetId?: string | null;
  url: string;
  alt: string;
};

export type DefaultSectionBlock = {
  key: string;
  label: string;
  type: "TEXT" | "TEXTAREA" | "URL" | "IMAGE" | "BOOLEAN" | "JSON";
  value: string | boolean | DefaultImageValue | Record<string, unknown> | unknown[];
  sortOrder: number;
};

export type DefaultSection = {
  key: string;
  name: string;
  isVisible: boolean;
  sortOrder: number;
  blocks: DefaultSectionBlock[];
};

export type DefaultPage = {
  kind: "HOME" | "SERVICES" | "PORTFOLIO" | "ABOUT" | "REVIEWS" | "FAQ" | "CONTACT" | "GLOBAL";
  name: string;
  slug: string;
  route: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  canonicalPath?: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  sections: DefaultSection[];
};

function imageValue(url: string, alt: string): DefaultImageValue {
  return { url, alt };
}

function heroPrimaryMessage() {
  return "Halo Bengkel Las Al-Ihsan, saya ingin konsultasi mengenai kebutuhan las untuk rumah atau usaha saya.";
}

function heroSecondaryMessage() {
  return "Halo Bengkel Las Al-Ihsan, saya ingin bertanya mengenai layanan dan survey lokasi.";
}

const commonKeywords = [
  "bengkel las bekasi",
  "bengkel las jakarta",
  "bengkel las",
  "jasa las terdekat",
  "jasa kanopi bekasi",
  "jasa pagar besi bekasi",
  "railing stainless bekasi",
];

const mediaCandidates = [
  {
    url: "/images/logo-al-ihsan.png",
    title: "Logo Bengkel Las Al-Ihsan",
    altText: "Logo Bengkel Las Al-Ihsan Bekasi",
  },
  {
    url: "/icon.png",
    title: "Icon Bengkel Las Al-Ihsan",
    altText: "Icon Bengkel Las Al-Ihsan Bekasi",
  },
  {
    url: "/images/lokasi-bengkel-las-al-ihsan.jpg",
    title: "Lokasi Bengkel Las Al-Ihsan",
    altText: "Lokasi Bengkel Las Al-Ihsan Bekasi",
  },
  ...featuredServices.map((service) => ({
    url: service.image,
    title: service.title,
    altText: service.alt,
  })),
  ...portfolioItems.slice(0, 16).map((item) => ({
    url: item.image,
    title: item.title,
    altText: item.alt,
  })),
  ...googleTestimonials
    .filter((item) => item.avatar)
    .map((item) => ({
      url: item.avatar!,
      title: item.name,
      altText: `${item.name} review avatar`,
    })),
];

const uniqueMedia = new Map<string, (typeof mediaCandidates)[number]>();

for (const item of mediaCandidates) {
  if (!uniqueMedia.has(item.url)) {
    uniqueMedia.set(item.url, item);
  }
}

export const defaultCmsContent = {
  adminUser: {
    email: "admin@alihsan.local",
    name: "Admin Al-Ihsan",
    password: "Admin123!",
  },
  mediaAssets: [...uniqueMedia.values()],
  business: {
    businessName: siteConfig.name,
    shortName: "Bengkel Las Al-Ihsan",
    tagline: "Bengkel las profesional untuk pagar, kanopi, stainless, dan custom project di Bekasi.",
    siteUrl: siteConfig.siteUrl,
    supportEmail: "halo@bengkellasal-ihsan.com",
    primaryPhone: siteConfig.primaryPhone,
    secondaryPhone: siteConfig.secondaryPhone,
    whatsappPrimary: siteConfig.primaryPhone,
    whatsappSecondary: siteConfig.secondaryPhone,
    whatsappMessage: heroPrimaryMessage(),
    whatsappSecondaryMessage: heroSecondaryMessage(),
    addressLine1: "Jl. Bengkong Raya, RT.001/RW.006",
    addressLine2: "Padurenan, Kec. Mustika Jaya",
    district: "Mustika Jaya",
    city: "Bekasi",
    region: "Jawa Barat",
    postalCode: "17156",
    countryCode: "ID",
    mapsUrl: siteConfig.mapsUrl,
    mapsEmbedUrl: siteConfig.mapsEmbedUrl,
    reviewUrl: siteConfig.reviewUrl,
    instagramUrl: siteConfig.instagramUrl,
    tiktokUrl: siteConfig.tiktokUrl,
    latitude: -6.3306013,
    longitude: 107.0236967,
    areasServed: ["Bekasi", "Jakarta", "Cikarang", "Depok"],
    openingHoursNote: "Hubungi WhatsApp untuk survey lokasi, estimasi, dan jadwal pengerjaan.",
    defaultMetaTitle:
      "Bengkel Las Bekasi | Jasa Pagar, Kanopi, Railing, Stainless, dan Las Panggilan",
    defaultMetaDescription:
      "Bengkel Las Al-Ihsan Bekasi melayani pagar besi, kanopi, railing, stainless, pintu besi, rolling door, dan jasa las panggilan untuk Bekasi, Jakarta, dan sekitarnya.",
    defaultKeywords: commonKeywords,
    logoUrl: "/images/logo-al-ihsan.png",
    faviconUrl: "/icon.png",
    googleAnalyticsId: "",
    googleTagManagerId: "",
    googleSearchConsoleVerification: "",
  },
  socialLinks: [
    {
      platform: "WHATSAPP" as const,
      label: "WhatsApp",
      url: buildWhatsAppUrl(siteConfig.primaryPhone, heroPrimaryMessage()),
      isVisible: true,
      sortOrder: 0,
    },
    {
      platform: "INSTAGRAM" as const,
      label: "Instagram",
      url: siteConfig.instagramUrl,
      isVisible: true,
      sortOrder: 1,
    },
    {
      platform: "TIKTOK" as const,
      label: "TikTok",
      url: siteConfig.tiktokUrl,
      isVisible: true,
      sortOrder: 2,
    },
    {
      platform: "MAPS" as const,
      label: "Google Maps",
      url: siteConfig.mapsUrl,
      isVisible: true,
      sortOrder: 3,
    },
  ],
  operatingHours: [
    { dayLabel: "Senin", opensAt: "08:00", closesAt: "17:00", isClosed: false, sortOrder: 0 },
    { dayLabel: "Selasa", opensAt: "08:00", closesAt: "17:00", isClosed: false, sortOrder: 1 },
    { dayLabel: "Rabu", opensAt: "08:00", closesAt: "17:00", isClosed: false, sortOrder: 2 },
    { dayLabel: "Kamis", opensAt: "08:00", closesAt: "17:00", isClosed: false, sortOrder: 3 },
    { dayLabel: "Jumat", opensAt: "08:00", closesAt: "17:00", isClosed: false, sortOrder: 4 },
    { dayLabel: "Sabtu", opensAt: "08:00", closesAt: "15:00", isClosed: false, sortOrder: 5 },
    { dayLabel: "Minggu", opensAt: null, closesAt: null, isClosed: true, sortOrder: 6 },
  ],
  navigation: navigationLinks.map((item, index) => ({
    label: item.label,
    href: item.href,
    isVisible: true,
    isExternal: false,
    sortOrder: index,
  })),
  services: serviceCategories.slice(0, 8).map((item, index) => {
    const preview = featuredServices[index % featuredServices.length];

    return {
      title: item.title,
      slug: slugify(item.title),
      badge: item.badge,
      summary: item.note,
      description: item.description,
      bullets: item.bullets,
      imageUrl: preview.image,
      altText: preview.alt,
      isFeatured: index < 6,
      sortOrder: index,
      status: "PUBLISHED" as const,
      seoTitle: `${item.title} | Bengkel Las Al-Ihsan Bekasi`,
      seoDescription: item.description,
      seoKeywords: [
        item.title.toLowerCase(),
        "jasa las bekasi",
        "bengkel las jakarta",
      ],
    };
  }),
  portfolio: portfolioItems.slice(0, 12).map((item, index) => ({
    title: item.title,
    slug: slugify(item.title),
    category: item.category,
    location: index % 2 === 0 ? "Bekasi" : "Jakarta",
    shortDescription: item.description,
    description: `${item.description} Konsultasi, survey, dan penyesuaian model bisa dibahas langsung melalui WhatsApp agar hasil sesuai kebutuhan lokasi Anda.`,
    coverImageUrl: item.image,
    altText: item.alt,
    isFeatured: index < 6,
    sortOrder: index,
    status: "PUBLISHED" as const,
    seoTitle: `${item.title} | Portfolio Bengkel Las Al-Ihsan`,
    seoDescription: item.description,
    seoKeywords: [
      item.category.toLowerCase(),
      "portfolio bengkel las bekasi",
      "jasa las bekasi",
    ],
  })),
  testimonials: googleTestimonials.map((item, index) => ({
    customerName: item.name,
    customerRole: item.headline,
    quote: item.quote,
    rating: item.rating,
    sourceLabel: item.source,
    sourceUrl: siteConfig.reviewUrl,
    avatarUrl: item.avatar ?? null,
    sortOrder: index,
    isFeatured: true,
    status: "PUBLISHED" as const,
  })),
  faqs: faqs.map((item, index) => ({
    question: item.question,
    answer: item.answer,
    sortOrder: index,
    status: "PUBLISHED" as const,
  })),
  pages: [
    {
      kind: "GLOBAL",
      name: "Global Site",
      slug: "global",
      route: "/_global",
      seoTitle: siteConfig.name,
      seoDescription: siteConfig.address,
      seoKeywords: commonKeywords,
      robotsIndex: false,
      robotsFollow: false,
      sections: [
        {
          key: "navbar",
          name: "Navbar",
          isVisible: true,
          sortOrder: 0,
          blocks: [
            { key: "ctaLabel", label: "Label Tombol", type: "TEXT", value: "Konsultasi WhatsApp", sortOrder: 0 },
            { key: "ctaHref", label: "Link Tombol", type: "URL", value: buildWhatsAppUrl(siteConfig.primaryPhone, heroPrimaryMessage()), sortOrder: 1 },
          ],
        },
        {
          key: "footer",
          name: "Footer",
          isVisible: true,
          sortOrder: 1,
          blocks: [
            {
              key: "description",
              label: "Deskripsi Footer",
              type: "TEXTAREA",
              value:
                "Bengkel Las Al-Ihsan Bekasi melayani pagar, kanopi, stainless, railing, pintu besi, rolling door, serta pekerjaan custom untuk rumah, ruko, dan area usaha.",
              sortOrder: 0,
            },
            {
              key: "copyright",
              label: "Copyright",
              type: "TEXT",
              value: "© {{year}} Bengkel Las Al-Ihsan Bekasi. Semua hak cipta dilindungi.",
              sortOrder: 1,
            },
          ],
        },
        {
          key: "floating_whatsapp",
          name: "Floating WhatsApp",
          isVisible: true,
          sortOrder: 2,
          blocks: [
            { key: "label", label: "Label Tombol", type: "TEXT", value: "Chat WhatsApp", sortOrder: 0 },
            { key: "ariaLabel", label: "Aria Label", type: "TEXT", value: "Chat WhatsApp Bengkel Las Al-Ihsan Bekasi", sortOrder: 1 },
            { key: "href", label: "Link Tombol", type: "URL", value: buildWhatsAppUrl(siteConfig.primaryPhone, heroPrimaryMessage()), sortOrder: 2 },
          ],
        },
        {
          key: "cta",
          name: "CTA Global",
          isVisible: true,
          sortOrder: 3,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "Konsultasi", sortOrder: 0 },
            {
              key: "heading",
              label: "Heading",
              type: "TEXTAREA",
              value: "Butuh bengkel las Bekasi untuk pagar, kanopi, stainless, atau pekerjaan custom yang rapi?",
              sortOrder: 1,
            },
            {
              key: "description",
              label: "Deskripsi",
              type: "TEXTAREA",
              value:
                "Kirim foto lokasi, ukuran, atau referensi desain melalui WhatsApp. Tim Bengkel Las Al-Ihsan akan bantu arahan awal dan estimasi yang lebih jelas.",
              sortOrder: 2,
            },
            { key: "primaryButtonLabel", label: "Label Tombol Utama", type: "TEXT", value: "WhatsApp Utama", sortOrder: 3 },
            { key: "primaryButtonHref", label: "Link Tombol Utama", type: "URL", value: buildWhatsAppUrl(siteConfig.primaryPhone, heroPrimaryMessage()), sortOrder: 4 },
            { key: "secondaryButtonLabel", label: "Label Tombol Kedua", type: "TEXT", value: "Buka Lokasi", sortOrder: 5 },
            { key: "secondaryButtonHref", label: "Link Tombol Kedua", type: "URL", value: "/lokasi", sortOrder: 6 },
          ],
        },
      ],
    },
    {
      kind: "HOME",
      name: "Homepage",
      slug: "home",
      route: "/",
      seoTitle:
        "Bengkel Las Bekasi | Jasa Pagar, Kanopi, Railing, Stainless, dan Las Panggilan",
      seoDescription:
        "Bengkel Las Al-Ihsan Bekasi melayani pagar, kanopi, railing, stainless, pintu besi, dan jasa las panggilan. Lihat portfolio proyek asli, FAQ, ulasan, dan kontak langsung WhatsApp.",
      seoKeywords: commonKeywords,
      canonicalPath: "/",
      robotsIndex: true,
      robotsFollow: true,
      sections: [
        {
          key: "hero",
          name: "Hero",
          isVisible: true,
          sortOrder: 0,
          blocks: [
            { key: "badge", label: "Badge", type: "TEXT", value: "Bekasi dan Jakarta", sortOrder: 0 },
            {
              key: "heading",
              label: "Judul Hero",
              type: "TEXTAREA",
              value: "Pagar, kanopi, stainless, dan pekerjaan custom yang rapi dilihat sejak depan rumah.",
              sortOrder: 1,
            },
            {
              key: "description",
              label: "Deskripsi Hero",
              type: "TEXTAREA",
              value:
                "Bengkel Las Al-Ihsan Bekasi melayani kebutuhan rumah, ruko, dan area usaha dengan hasil kerja yang rapi, proses konsultasi jelas, dan respon cepat melalui WhatsApp.",
              sortOrder: 2,
            },
            { key: "primaryButtonLabel", label: "Label Tombol Utama", type: "TEXT", value: "Hubungi via WhatsApp", sortOrder: 3 },
            { key: "primaryButtonHref", label: "Link Tombol Utama", type: "URL", value: buildWhatsAppUrl(siteConfig.primaryPhone, heroPrimaryMessage()), sortOrder: 4 },
            { key: "secondaryButtonLabel", label: "Label Tombol Kedua", type: "TEXT", value: "Lihat Hasil Pengerjaan", sortOrder: 5 },
            { key: "secondaryButtonHref", label: "Link Tombol Kedua", type: "URL", value: "/portfolio", sortOrder: 6 },
            { key: "trustOne", label: "Trust Label 1", type: "TEXT", value: `Google ${reviewSnapshot.rating} / ${reviewSnapshot.reviewCount} ulasan`, sortOrder: 7 },
            { key: "trustTwo", label: "Trust Label 2", type: "TEXT", value: "Survey & layanan panggilan", sortOrder: 8 },
            {
              key: "backgroundImage",
              label: "Gambar Hero",
              type: "IMAGE",
              value: imageValue("/images/dokumentasi/kanopi-carport-modern-bekasi.jpg", "Kanopi carport modern Bengkel Las Al-Ihsan Bekasi"),
              sortOrder: 9,
            },
          ],
        },
        {
          key: "services",
          name: "Highlight Layanan",
          isVisible: true,
          sortOrder: 1,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "Layanan", sortOrder: 0 },
            {
              key: "heading",
              label: "Judul Section",
              type: "TEXTAREA",
              value: "Layanan las untuk rumah, ruko, area usaha, dan proyek custom yang butuh hasil rapi dan kuat.",
              sortOrder: 1,
            },
            {
              key: "description",
              label: "Deskripsi Section",
              type: "TEXTAREA",
              value:
                "Mulai dari pagar besi, kanopi, railing, stainless, tangga, sampai pekerjaan custom dan perbaikan. Semua bisa dikelola dari satu jalur konsultasi yang jelas.",
              sortOrder: 2,
            },
            { key: "primaryButtonLabel", label: "Label Tombol Utama", type: "TEXT", value: "Lihat Semua Layanan", sortOrder: 3 },
            { key: "primaryButtonHref", label: "Link Tombol Utama", type: "URL", value: "/layanan", sortOrder: 4 },
          ],
        },
        {
          key: "portfolio",
          name: "Portfolio",
          isVisible: true,
          sortOrder: 2,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "Dokumentasi Proyek", sortOrder: 0 },
            {
              key: "heading",
              label: "Judul Section",
              type: "TEXTAREA",
              value: "Hasil pengerjaan nyata ditampilkan agar calon customer bisa menilai model, detail, dan finishing dengan lebih yakin.",
              sortOrder: 1,
            },
            {
              key: "description",
              label: "Deskripsi Section",
              type: "TEXTAREA",
              value:
                "Portfolio diambil dari pekerjaan lapangan Bengkel Las Al-Ihsan Bekasi, sehingga pengunjung bisa melihat variasi model dan kualitas hasil kerja secara langsung.",
              sortOrder: 2,
            },
            { key: "primaryButtonLabel", label: "Label Tombol Utama", type: "TEXT", value: "Lihat Semua Portfolio", sortOrder: 3 },
            { key: "primaryButtonHref", label: "Link Tombol Utama", type: "URL", value: "/portfolio", sortOrder: 4 },
            { key: "secondaryButtonLabel", label: "Label Tombol Kedua", type: "TEXT", value: "Tanya Proyek Serupa", sortOrder: 5 },
            { key: "secondaryButtonHref", label: "Link Tombol Kedua", type: "URL", value: buildWhatsAppUrl(siteConfig.primaryPhone, "Halo Bengkel Las Al-Ihsan, saya ingin tanya proyek serupa dengan yang ada di portfolio."), sortOrder: 6 },
          ],
        },
        {
          key: "about",
          name: "Tentang Kami",
          isVisible: true,
          sortOrder: 3,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "Tentang Kami", sortOrder: 0 },
            {
              key: "heading",
              label: "Judul Section",
              type: "TEXTAREA",
              value: "Profil bengkel yang mudah dicek sebelum Anda lanjut konsultasi atau booking survey.",
              sortOrder: 1,
            },
            {
              key: "description",
              label: "Deskripsi Section",
              type: "TEXTAREA",
              value:
                "Identitas usaha, lokasi, layanan, dan jalur kontak ditampilkan jelas agar calon customer bisa lebih percaya sebelum memesan.",
              sortOrder: 2,
            },
            {
              key: "image",
              label: "Gambar Section",
              type: "IMAGE",
              value: imageValue("/images/lokasi-bengkel-las-al-ihsan.jpg", "Lokasi Bengkel Las Al-Ihsan Bekasi"),
              sortOrder: 3,
            },
            { key: "featureOneTitle", label: "Judul Highlight 1", type: "TEXT", value: "Pekerjaan baru & custom", sortOrder: 4 },
            { key: "featureOneText", label: "Deskripsi Highlight 1", type: "TEXTAREA", value: "Pagar, teralis, stainless, tangga, kanopi, rolling door, dan konstruksi besi ringan sesuai kebutuhan proyek.", sortOrder: 5 },
            { key: "featureTwoTitle", label: "Judul Highlight 2", type: "TEXT", value: "Perbaikan & finishing", sortOrder: 6 },
            { key: "featureTwoText", label: "Deskripsi Highlight 2", type: "TEXTAREA", value: "Las ulang, penguatan struktur, pengecatan, dan pembenahan komponen besi yang sudah ada juga bisa ditangani.", sortOrder: 7 },
            { key: "featureThreeTitle", label: "Judul Highlight 3", type: "TEXT", value: "Survey & layanan panggilan", sortOrder: 8 },
            { key: "featureThreeText", label: "Deskripsi Highlight 3", type: "TEXTAREA", value: "Tim siap bantu survey lokasi, cek ukuran, dan memberi saran awal sebelum pengerjaan dimulai.", sortOrder: 9 },
          ],
        },
        {
          key: "testimonials",
          name: "Testimonials",
          isVisible: true,
          sortOrder: 4,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "Ulasan Pelanggan", sortOrder: 0 },
            { key: "heading", label: "Judul Section", type: "TEXTAREA", value: "Review pelanggan membantu calon customer melihat kualitas layanan sebelum order.", sortOrder: 1 },
            { key: "description", label: "Deskripsi Section", type: "TEXTAREA", value: "Cuplikan testimoni dipilih dari pengalaman pelanggan dan bisa diarahkan ke Google Maps untuk verifikasi reputasi usaha.", sortOrder: 2 },
          ],
        },
        {
          key: "faq",
          name: "FAQ",
          isVisible: true,
          sortOrder: 5,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "FAQ", sortOrder: 0 },
            { key: "heading", label: "Judul Section", type: "TEXTAREA", value: "Pertanyaan yang paling sering muncul sebelum order jasa las.", sortOrder: 1 },
            { key: "description", label: "Deskripsi Section", type: "TEXTAREA", value: "Jawaban singkat ini membantu calon customer memahami alur survey, desain custom, perbaikan, dan proses pemesanan.", sortOrder: 2 },
          ],
        },
        {
          key: "contact",
          name: "Lokasi & Kontak",
          isVisible: true,
          sortOrder: 6,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "Lokasi & Kontak", sortOrder: 0 },
            { key: "heading", label: "Judul Section", type: "TEXTAREA", value: "Alamat bengkel, jalur WhatsApp, dan Google Maps bisa dibuka tanpa pindah jalur.", sortOrder: 1 },
            { key: "description", label: "Deskripsi Section", type: "TEXTAREA", value: "Calon customer bisa cek lokasi lebih dulu, lalu lanjut konsultasi dan kirim foto area kerja langsung dari WhatsApp.", sortOrder: 2 },
            { key: "quickHeading", label: "Judul Box Kontak", type: "TEXT", value: "Konsultasi cepat", sortOrder: 3 },
            { key: "quickDescription", label: "Deskripsi Box Kontak", type: "TEXTAREA", value: "Kirim kebutuhan proyek, foto lokasi, atau referensi desain agar tim bisa memberi arahan awal yang lebih jelas.", sortOrder: 4 },
            { key: "mapsButtonLabel", label: "Label Tombol Maps", type: "TEXT", value: "Buka Google Maps", sortOrder: 5 },
            { key: "mapsButtonHref", label: "Link Tombol Maps", type: "URL", value: siteConfig.mapsUrl, sortOrder: 6 },
            { key: "reviewButtonLabel", label: "Label Tombol Review", type: "TEXT", value: "Lihat Ulasan", sortOrder: 7 },
            { key: "reviewButtonHref", label: "Link Tombol Review", type: "URL", value: siteConfig.reviewUrl, sortOrder: 8 },
          ],
        },
      ],
    },
    {
      kind: "SERVICES",
      name: "Layanan",
      slug: "layanan",
      route: "/layanan",
      seoTitle: "Layanan Bengkel Las Bekasi | Pagar, Kanopi, Stainless, Railing, dan Custom Project",
      seoDescription: "Lihat kategori layanan Bengkel Las Al-Ihsan Bekasi untuk pagar besi, kanopi, railing, stainless, tangga, pintu besi, rolling door, hingga perbaikan dan layanan panggilan.",
      seoKeywords: [...commonKeywords, "layanan bengkel las bekasi"],
      canonicalPath: "/layanan",
      robotsIndex: true,
      robotsFollow: true,
      sections: [
        {
          key: "intro",
          name: "Intro",
          isVisible: true,
          sortOrder: 0,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "Halaman Layanan", sortOrder: 0 },
            { key: "heading", label: "Judul Halaman", type: "TEXTAREA", value: "Kategori jasa las untuk rumah, ruko, area usaha, dan kebutuhan custom.", sortOrder: 1 },
            { key: "description", label: "Deskripsi Halaman", type: "TEXTAREA", value: "Pilih layanan yang paling sesuai, lalu lanjutkan konsultasi melalui WhatsApp dengan foto lokasi atau ukuran awal.", sortOrder: 2 },
            { key: "primaryButtonLabel", label: "Label Tombol Utama", type: "TEXT", value: "Hubungi via WhatsApp", sortOrder: 3 },
            { key: "primaryButtonHref", label: "Link Tombol Utama", type: "URL", value: buildWhatsAppUrl(siteConfig.primaryPhone, heroPrimaryMessage()), sortOrder: 4 },
            { key: "secondaryButtonLabel", label: "Label Tombol Kedua", type: "TEXT", value: "Lihat Portfolio", sortOrder: 5 },
            { key: "secondaryButtonHref", label: "Link Tombol Kedua", type: "URL", value: "/portfolio", sortOrder: 6 },
          ],
        },
      ],
    },
    {
      kind: "PORTFOLIO",
      name: "Portfolio",
      slug: "portfolio",
      route: "/portfolio",
      seoTitle: "Portfolio Bengkel Las Bekasi | Hasil Pengerjaan Pagar, Kanopi, Railing, dan Stainless",
      seoDescription: "Lihat portfolio proyek Bengkel Las Al-Ihsan Bekasi berupa foto pekerjaan asli untuk pagar, kanopi, railing, stainless, pintu besi, dan proyek custom.",
      seoKeywords: [...commonKeywords, "portfolio bengkel las bekasi"],
      canonicalPath: "/portfolio",
      robotsIndex: true,
      robotsFollow: true,
      sections: [
        {
          key: "intro",
          name: "Intro",
          isVisible: true,
          sortOrder: 0,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "Halaman Portfolio", sortOrder: 0 },
            { key: "heading", label: "Judul Halaman", type: "TEXTAREA", value: "Portfolio proyek asli untuk membantu Anda menilai model, detail, dan finishing sebelum konsultasi.", sortOrder: 1 },
            { key: "description", label: "Deskripsi Halaman", type: "TEXTAREA", value: "Setiap proyek menampilkan kategori kerja, foto hasil, dan deskripsi singkat agar calon customer bisa membandingkan referensi dengan lebih mudah.", sortOrder: 2 },
            { key: "primaryButtonLabel", label: "Label Tombol Utama", type: "TEXT", value: "Kirim Kebutuhan Proyek", sortOrder: 3 },
            { key: "primaryButtonHref", label: "Link Tombol Utama", type: "URL", value: buildWhatsAppUrl(siteConfig.primaryPhone, "Halo Bengkel Las Al-Ihsan, saya ingin konsultasi mengenai proyek seperti di portfolio."), sortOrder: 4 },
          ],
        },
      ],
    },
    {
      kind: "ABOUT",
      name: "Tentang",
      slug: "tentang",
      route: "/tentang",
      seoTitle: "Tentang Bengkel Las Al-Ihsan Bekasi | Profil, Area Layanan, dan Cara Kerja",
      seoDescription: "Kenali Bengkel Las Al-Ihsan Bekasi, area layanan, jenis pekerjaan yang dikerjakan, serta cara konsultasi sebelum memesan jasa las.",
      seoKeywords: [...commonKeywords, "tentang bengkel las bekasi"],
      canonicalPath: "/tentang",
      robotsIndex: true,
      robotsFollow: true,
      sections: [
        {
          key: "intro",
          name: "Intro",
          isVisible: true,
          sortOrder: 0,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "Tentang Al-Ihsan", sortOrder: 0 },
            { key: "heading", label: "Judul Halaman", type: "TEXTAREA", value: "Kenali bengkel, area layanan, dan jalur konsultasi sebelum Anda memesan.", sortOrder: 1 },
            { key: "description", label: "Deskripsi Halaman", type: "TEXTAREA", value: "Halaman ini merangkum profil usaha, area layanan, dan fokus pekerjaan agar calon customer lebih yakin sebelum order.", sortOrder: 2 },
          ],
        },
      ],
    },
    {
      kind: "REVIEWS",
      name: "Ulasan",
      slug: "ulasan",
      route: "/ulasan",
      seoTitle: "Ulasan Bengkel Las Bekasi | Review Customer Bengkel Las Al-Ihsan",
      seoDescription: "Baca review customer Bengkel Las Al-Ihsan Bekasi dan cek reputasi bisnis sebelum memesan jasa pagar, kanopi, railing, atau las custom.",
      seoKeywords: [...commonKeywords, "ulasan bengkel las bekasi"],
      canonicalPath: "/ulasan",
      robotsIndex: true,
      robotsFollow: true,
      sections: [
        {
          key: "intro",
          name: "Intro",
          isVisible: true,
          sortOrder: 0,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "Ulasan Pelanggan", sortOrder: 0 },
            { key: "heading", label: "Judul Halaman", type: "TEXTAREA", value: "Review pelanggan membantu Anda menilai kualitas layanan sebelum order.", sortOrder: 1 },
            { key: "description", label: "Deskripsi Halaman", type: "TEXTAREA", value: "Lihat pengalaman pelanggan dan buka Google Maps untuk memeriksa reputasi usaha secara langsung.", sortOrder: 2 },
          ],
        },
      ],
    },
    {
      kind: "FAQ",
      name: "FAQ",
      slug: "faq",
      route: "/faq",
      seoTitle: "FAQ Jasa Las Bekasi | Pertanyaan Umum Bengkel Las Al-Ihsan",
      seoDescription: "Temukan jawaban seputar survey, desain custom, perbaikan, alur konsultasi, dan pemesanan jasa las Bengkel Las Al-Ihsan Bekasi.",
      seoKeywords: [...commonKeywords, "faq jasa las bekasi"],
      canonicalPath: "/faq",
      robotsIndex: true,
      robotsFollow: true,
      sections: [
        {
          key: "intro",
          name: "Intro",
          isVisible: true,
          sortOrder: 0,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "FAQ", sortOrder: 0 },
            { key: "heading", label: "Judul Halaman", type: "TEXTAREA", value: "Pertanyaan yang paling sering ditanyakan sebelum memesan jasa las.", sortOrder: 1 },
            { key: "description", label: "Deskripsi Halaman", type: "TEXTAREA", value: "Jawaban dibuat singkat dan langsung ke inti supaya calon customer cepat paham proses kerja dan opsi layanan.", sortOrder: 2 },
          ],
        },
      ],
    },
    {
      kind: "CONTACT",
      name: "Lokasi",
      slug: "lokasi",
      route: "/lokasi",
      seoTitle: "Lokasi Bengkel Las Bekasi | Alamat, Google Maps, dan Kontak Bengkel Las Al-Ihsan",
      seoDescription: "Buka lokasi Bengkel Las Al-Ihsan Bekasi di Google Maps, cek alamat lengkap, lihat jalur WhatsApp, dan hubungi bengkel las dengan cepat.",
      seoKeywords: [...commonKeywords, "lokasi bengkel las bekasi"],
      canonicalPath: "/lokasi",
      robotsIndex: true,
      robotsFollow: true,
      sections: [
        {
          key: "intro",
          name: "Intro",
          isVisible: true,
          sortOrder: 0,
          blocks: [
            { key: "eyebrow", label: "Eyebrow", type: "TEXT", value: "Lokasi & Kontak", sortOrder: 0 },
            { key: "heading", label: "Judul Halaman", type: "TEXTAREA", value: "Alamat bengkel, Google Maps, dan kontak aktif dalam satu halaman.", sortOrder: 1 },
            { key: "description", label: "Deskripsi Halaman", type: "TEXTAREA", value: "Cek alamat lebih dulu, baca ulasan, lalu lanjutkan konsultasi via WhatsApp tanpa perlu pindah jalur.", sortOrder: 2 },
          ],
        },
      ],
    },
  ] as DefaultPage[],
};
