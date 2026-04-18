import Image from "next/image";

import { BrandMark } from "@/components/brand-logo";
import { ButtonLink } from "@/components/button-link";
import {
  DocumentationCarousel,
  DocumentationVideoGrid,
} from "@/components/documentation-carousel";
import { GoogleReviewCarousel } from "@/components/google-review-carousel";
import { HeroStage } from "@/components/hero-stage";
import { PortfolioCard } from "@/components/portfolio-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { ServiceCategoryCard } from "@/components/service-category-card";
import { SocialLinks } from "@/components/social-links";
import {
  additionalServices,
  advantages,
  areas,
  documentationMedia,
  faqs,
  featuredServices,
  googleTestimonials,
  portfolioItems,
  reviewSnapshot,
  serviceCategories,
  siteConfig,
  trustSignals,
  valueProps,
} from "@/lib/site";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const containerClass = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const panelClass =
  "site-panel rounded-[24px] border border-[#d8ddd7] bg-white shadow-[0_18px_42px_rgba(15,23,42,0.06)]";
const mutedPanelClass =
  "site-panel rounded-[24px] border border-[#e1ddd5] bg-[#f8f5f0]";
const darkPanelClass =
  "site-panel rounded-[28px] border border-[#2a3f58] bg-[#182433] shadow-[0_26px_70px_rgba(15,23,42,0.22)]";

export function PageIntro({
  eyebrow,
  title,
  description,
  primaryHref = siteConfig.whatsappPrimaryUrl,
  primaryLabel = "Hubungi via WhatsApp",
  secondaryHref = "/lokasi",
  secondaryLabel = "Cek Lokasi",
}: PageIntroProps) {
  return (
    <section className="section-shell page-top-offset">
      <div className={containerClass}>
        <div className={`${panelClass} overflow-hidden p-7 lg:p-10`}>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#e1ddd5] bg-[#f7f4ee] px-4 py-2 text-sm text-[#526172]">
              <BrandMark className="h-10 w-10 shrink-0 rounded-[0.9rem]" />
              <span>{eyebrow}</span>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-[2.45rem] leading-[0.98] tracking-tight text-[#182433] sm:text-[3.9rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#556476] sm:text-base">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#e1ddd5] bg-[#f7f4ee] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#526172]">
                Bekasi dan Jakarta
              </span>
              <span className="rounded-full border border-[#e1ddd5] bg-[#f7f4ee] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#526172]">
                Foto & video proyek
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
              <ButtonLink href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSection() {
  const showcaseItems = [
    {
      title: "Gerbang geometrik hitam untuk fasad modern",
      category: "Pagar",
      image: "/images/dokumentasi/gerbang-geometrik-hitam-rumah.jpg",
      alt: "Gerbang geometrik hitam rumah Bengkel Las Al-Ihsan Bekasi",
    },
    {
      title: "Railing tangga rumah dengan handrail kayu",
      category: "Tangga",
      image: "/images/dokumentasi/railing-tangga-rumah-kayu.jpg",
      alt: "Railing tangga rumah handrail kayu Bengkel Las Al-Ihsan Bekasi",
    },
    {
      title: "Pintu kaca rangka besi untuk akses samping",
      category: "Pintu Besi",
      image: "/images/dokumentasi/pintu-kaca-besi.jpg",
      alt: "Dokumentasi asli pintu kaca rangka besi Bengkel Las Al-Ihsan Bekasi",
    },
  ] as const;

  return (
    <section className="section-shell page-top-offset">
      <div className={`${containerClass} pb-14 lg:pb-18`}>
        <HeroStage
          imageSrc="/images/dokumentasi/kanopi-carport-modern-bekasi.jpg"
          imageAlt="Dokumentasi kanopi carport modern Bengkel Las Al-Ihsan Bekasi"
          imageSizes="100vw"
          mediaClassName="min-h-[39rem] w-full sm:min-h-0 sm:aspect-[16/11] lg:min-h-[42rem] lg:aspect-[16/8.9] xl:min-h-[43rem]"
          overlayClassName="bg-[linear-gradient(90deg,rgba(10,18,28,0.9)_0%,rgba(10,18,28,0.68)_42%,rgba(10,18,28,0.2)_100%),linear-gradient(180deg,rgba(10,18,28,0.05)_0%,rgba(10,18,28,0.45)_100%)]"
        >
          <div className="absolute inset-0 flex items-start lg:items-center">
            <div className="w-full p-4 pt-5 pb-5 sm:p-8 lg:px-10 lg:py-10">
              <div className="max-w-[19.5rem] sm:max-w-3xl lg:max-w-[45rem]">
                <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-white/14 bg-[rgba(255,255,255,0.08)] px-3 py-2 text-[0.82rem] font-medium text-white shadow-[0_14px_28px_rgba(8,15,28,0.14)] backdrop-blur-md sm:gap-2.5 sm:px-4 sm:text-[0.92rem] lg:px-4.5 lg:py-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#162638] p-1">
                    <BrandMark className="h-5.5 w-5.5 shrink-0" />
                  </span>
                  <span className="pl-0.5 pr-2 leading-none sm:pr-2.5">
                    Bekasi dan Jakarta
                  </span>
                </div>
                <h1 className="mt-4 max-w-3xl font-display text-[2.05rem] leading-[0.96] tracking-tight text-white sm:mt-6 sm:text-[4.2rem] sm:leading-[0.92] lg:mt-6 lg:max-w-[46rem] lg:text-[4.7rem] xl:text-[5rem]">
                  Pagar, kanopi, stainless, dan pekerjaan custom yang rapi
                  dilihat sejak depan rumah.
                </h1>
                <p className="mt-3.5 max-w-2xl text-[0.95rem] leading-7 text-[#d7dee7] sm:mt-5 sm:text-lg sm:leading-8 lg:mt-5 lg:max-w-[39rem]">
                  Bengkel Las Al-Ihsan Bekasi melayani kebutuhan rumah,
                  ruko, dan area usaha dengan foto hasil pengerjaan nyata,
                  alur konsultasi yang jelas, dan respon cepat lewat
                  WhatsApp.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 lg:mt-6 lg:gap-3">
                  <span className="rounded-full border border-white/14 bg-white/10 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
                    Google {reviewSnapshot.rating} / {reviewSnapshot.reviewCount} ulasan
                  </span>
                  <span className="rounded-full border border-white/14 bg-white/10 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
                    Survey & layanan panggilan
                  </span>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row lg:mt-7 lg:gap-4">
                  <ButtonLink href={siteConfig.whatsappPrimaryUrl}>
                    Hubungi via WhatsApp
                  </ButtonLink>
                  <ButtonLink href="/portfolio" variant="secondary">
                    Lihat Hasil Pengerjaan
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </HeroStage>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {showcaseItems.map((item) => (
            <article
              key={item.title}
              className="site-card overflow-hidden rounded-[24px] border border-[#ddd8cf] bg-white shadow-[0_16px_38px_rgba(15,23,42,0.06)]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-amber">
                  {item.category}
                </p>
                <h2 className="mt-3 text-lg font-semibold leading-tight text-[#182433]">
                  {item.title}
                </h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ValuePropsSection() {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-14 lg:py-18`}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {valueProps.map((item) => (
            <div key={item.title} className={`${mutedPanelClass} p-5`}>
              <p className="text-base font-semibold text-[#182433]">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-7 text-[#556476]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AdvantagesSection() {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <SectionHeading
          eyebrow="Keunggulan"
          title="Keunggulan utama Bengkel Las Al-Ihsan Bekasi yang paling sering dicari pelanggan."
          description="Fokusnya ada pada hasil kerja nyata, jalur kontak yang responsif, dan identitas usaha yang mudah diverifikasi."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {advantages.map((item) => (
            <article key={item.title} className={`${panelClass} p-6`}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
                {item.tag}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-[#182433]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#556476]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({
  introOnly = false,
}: {
  introOnly?: boolean;
}) {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <SectionHeading
          eyebrow="Layanan"
          title="Kategori layanan lengkap untuk rumah, ruko, proyek custom, dan kebutuhan perbaikan."
          description="Pagar, kanopi, stainless, tangga, rolling door, hingga perbaikan tersedia dalam kategori yang langsung bisa dipilih sesuai kebutuhan."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceCategories.map((category) => (
            <ServiceCategoryCard key={category.title} category={category} />
          ))}
        </div>
        {!introOnly && (
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.28fr_0.72fr]">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
            <aside className={`${mutedPanelClass} p-6 lg:p-8`}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
                Layanan Tambahan
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[#182433]">
                Perbaikan, pengecatan, dan layanan panggilan juga tersedia
                untuk kebutuhan bengkel las Bekasi.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#556476]">
                Jika Anda belum perlu membuat baru, tim tetap bisa membantu
                pembenahan pagar, pintu, kanopi, atau komponen besi lain yang
                sudah ada. Kirim foto kondisi lapangan untuk arahan awal.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-[#253243]">
                {additionalServices.map((service) => (
                  <li
                    key={service}
                    className="rounded-xl border border-[#ddd8cf] bg-white px-4 py-3"
                  >
                    {service}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink href={siteConfig.whatsappPrimaryUrl}>
                  Minta Penawaran via WhatsApp
                </ButtonLink>
                <ButtonLink href="/portfolio" variant="secondary">
                  Lihat Portfolio
                </ButtonLink>
              </div>
              <SocialLinks className="mt-6" />
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export function PortfolioSection({
  showGrid = false,
  showInsightCards = false,
  minimal = false,
}: {
  showGrid?: boolean;
  showInsightCards?: boolean;
  minimal?: boolean;
} = {}) {
  const documentationImageSources = new Set(
    documentationMedia
      .filter((item) => item.type === "image")
      .map((item) => item.src),
  );
  const seenPortfolioImages = new Set<string>();
  const uniquePortfolioItems = portfolioItems.filter((item) => {
    if (documentationImageSources.has(item.image)) {
      return false;
    }

    if (seenPortfolioImages.has(item.image)) {
      return false;
    }

    seenPortfolioImages.add(item.image);
    return true;
  });
  const photoCount = documentationMedia.filter((item) => item.type === "image").length;
  const videoCount = documentationMedia.filter((item) => item.type === "video").length;
  const portfolioPreviewItems = showGrid
    ? uniquePortfolioItems
    : uniquePortfolioItems.slice(0, 6);
  const documentationPhotos = documentationMedia
    .filter((item) => item.type === "image")
    .slice(0, 10);

  if (minimal) {
    return (
      <section className="section-shell">
        <div className={`${containerClass} py-16 lg:py-24`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <span className="inline-flex w-fit max-w-full items-center rounded-full border border-[#ddd8cf] bg-[#f8f5f0] px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[#526172] shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                Dokumentasi Proyek
              </span>
              <h2 className="mt-5 font-display text-[2.55rem] leading-[0.98] text-[#182433] sm:text-[3.8rem] lg:text-[4.8rem]">
                Hasil pengerjaan ditampilkan lebih banyak, supaya Anda bisa
                menilai model, detail, dan finishing dengan lebih cepat.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-8 text-[#556476] sm:text-base">
                Foto dan video berikut berasal dari proyek pagar, kanopi,
                pintu besi, teralis, dan railing yang memang sudah dikerjakan
                tim Bengkel Las Al-Ihsan Bekasi di lapangan.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/portfolio" variant="secondary">
                Lihat Semua Portfolio
              </ButtonLink>
              <ButtonLink href={siteConfig.whatsappPrimaryUrl}>
                Tanya Proyek Serupa
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {documentationPhotos.map((item, index) => (
              <article
                key={item.src}
                className={`site-card overflow-hidden rounded-[24px] border border-[#ddd8cf] bg-white shadow-[0_16px_38px_rgba(15,23,42,0.06)] ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    index === 0 ? "aspect-[16/10]" : "aspect-[4/4.4]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,28,0.04)_0%,rgba(10,18,28,0.56)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="rounded-[18px] border border-white/30 bg-white/88 px-4 py-3 backdrop-blur">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand-amber">
                        {item.category}
                      </p>
                      <h3 className="mt-2 text-base font-semibold leading-tight text-[#182433]">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-[#ddd8cf] bg-[#f8f5f0] px-5 py-4 text-sm leading-8 text-[#556476]">
            Saat ini tersedia {photoCount} foto dan {videoCount} video proyek
            untuk membantu Anda membandingkan model, skala, dan karakter hasil
            pengerjaan sebelum konsultasi.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <SectionHeading
          eyebrow="Portfolio"
          title="Portfolio asli yang menampilkan hasil kerja, detail finishing, dan variasi proyek di lapangan."
          description="Foto dan video berasal dari dokumentasi proyek Bengkel Las Al-Ihsan Bekasi untuk pagar, kanopi, railing, stainless, tangga, dan pintu besi."
        />
        <DocumentationCarousel items={documentationMedia} />
        <DocumentationVideoGrid items={documentationMedia} />
        {showInsightCards && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className={`${mutedPanelClass} p-5`}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
                Bukti Visual
              </p>
              <p className="mt-3 text-lg font-semibold text-[#182433]">
                {photoCount} foto proyek asli dari pekerjaan yang sudah selesai.
              </p>
              <p className="mt-2 text-sm leading-7 text-[#556476]">
                Foto proyek membantu Anda menilai model, finishing, dan
                kerapian hasil kerja dengan lebih cepat.
              </p>
            </article>
            <article className={`${mutedPanelClass} p-5`}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
                Video Lapangan
              </p>
              <p className="mt-3 text-lg font-semibold text-[#182433]">
                {videoCount} video lapangan ikut tampil, bukan foto diam saja.
              </p>
              <p className="mt-2 text-sm leading-7 text-[#556476]">
                Detail panel, skala gerbang, dan suasana kerja di lapangan
                terlihat lebih jelas sebelum Anda lanjut konsultasi.
              </p>
            </article>
            <article className={`${mutedPanelClass} p-5`}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
                Cakupan Model
              </p>
              <p className="mt-3 text-lg font-semibold text-[#182433]">
                Pagar, kanopi, railing, tangga, dan pintu tampil dalam satu alur.
              </p>
              <p className="mt-2 text-sm leading-7 text-[#556476]">
                Anda bisa melihat ragam model dan karakter hasil kerja tanpa
                perlu menebak kemampuan bengkel.
              </p>
            </article>
            <article className={`${mutedPanelClass} p-5`}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
                Mobile-First
              </p>
              <p className="mt-3 text-lg font-semibold text-[#182433]">
                Portfolio tetap nyaman dicek dari layar kecil.
              </p>
              <p className="mt-2 text-sm leading-7 text-[#556476]">
                Thumbnail, tombol, dan navigasi tetap mudah dipakai saat
                portfolio dibuka dari HP.
              </p>
            </article>
          </div>
        )}
        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
              Pilihan Kategori
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[#182433]">
              {showGrid
                ? "Pilihan hasil kerja yang tidak mengulang foto dari carousel dokumentasi di atas."
                : "Cuplikan hasil kerja pilihan yang langsung terasa variatif sejak awal."}
            </h3>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.whatsappPrimaryUrl} variant="secondary">
              Kirim Kebutuhan Proyek
            </ButtonLink>
            {!showGrid && (
              <ButtonLink href="/portfolio">Lihat Semua Portfolio</ButtonLink>
            )}
          </div>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {portfolioPreviewItems.map((item) => (
            <PortfolioCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className={`${panelClass} overflow-hidden`}>
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/lokasi-bengkel-las-al-ihsan.jpg"
                alt="Lokasi Bengkel Las Al-Ihsan Bekasi"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="Tentang Kami"
              title="Profil bengkel, area layanan, dan jalur kontak yang mudah dicek sebelum Anda pesan."
              description="Informasi utama ditampilkan langsung: identitas usaha, jenis pekerjaan, area layanan, dan cara menghubungi tim."
              align="left"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className={`${mutedPanelClass} p-5`}>
                <p className="text-sm font-semibold text-[#182433]">
                  Pekerjaan baru & custom
                </p>
                <p className="mt-2 text-sm leading-7 text-[#556476]">
                  Pagar, teralis, stainless, tangga putar, folding gate, pintu
                  besi, rolling door, hingga kanopi.
                </p>
              </div>
              <div className={`${mutedPanelClass} p-5`}>
                <p className="text-sm font-semibold text-[#182433]">
                  Perbaikan & finishing
                </p>
                <p className="mt-2 text-sm leading-7 text-[#556476]">
                  Las ulang, penguatan struktur, pengecatan, dan pembenahan
                  komponen yang sudah terpasang.
                </p>
              </div>
              <div className={`${mutedPanelClass} p-5`}>
                <p className="text-sm font-semibold text-[#182433]">
                  Survey & layanan panggilan
                </p>
                <p className="mt-2 text-sm leading-7 text-[#556476]">
                  Siap cek lokasi, ukur area, dan memberi saran awal sebelum
                  pekerjaan dimulai.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/portfolio" variant="secondary">
                Lihat Hasil Pekerjaan
              </ButtonLink>
              <ButtonLink href="/lokasi" variant="ghost">
                Buka Halaman Lokasi
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AreasSection() {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <SectionHeading
          eyebrow="Area Layanan"
          title="Fokus utama pengerjaan berada di Bekasi dan Jakarta untuk kebutuhan rumah, ruko, maupun area usaha."
          description="Survey dan pengerjaan mengikuti jenis proyek, titik lokasi, dan kebutuhan pekerjaan yang masuk ke tim."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {areas.map((area) => (
            <article key={area.name} className={`${panelClass} p-6`}>
              <h3 className="text-2xl font-display text-[#182433]">
                {area.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#556476]">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <GoogleReviewCarousel items={googleTestimonials} />
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang paling sering muncul sebelum order."
          description="Jawaban singkat seputar survey, desain custom, perbaikan, dan proses konsultasi."
          align="center"
        />
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className={`${panelClass} group p-5`}
            >
              <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-[#182433] marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-[#556476]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MapsSection() {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <SectionHeading
          eyebrow="Lokasi & Kontak"
          title="Lokasi bengkel, kontak aktif, dan Google Maps tersedia dalam satu halaman."
          description="Cek alamat, buka ulasan, lalu lanjut konsultasi lewat WhatsApp tanpa perlu berpindah jalur."
        />
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className={`${panelClass} relative self-start overflow-hidden`}>
            <div className="relative aspect-[4/3] w-full">
              <iframe
                title="Google Maps Bengkel Las Al-Ihsan Bekasi"
                src={siteConfig.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
          <div className={`${mutedPanelClass} p-6 lg:p-8`}>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
              Kontak Cepat
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-[#182433]">
              Bengkel Las Al-Ihsan Bekasi
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#556476]">
              {siteConfig.address}
            </p>
            <div className="mt-6 grid gap-3">
              {siteConfig.whatsappContacts.map((contact) => (
                <a
                  key={contact.number}
                  href={contact.url}
                  className="rounded-xl border border-[#ddd8cf] bg-white px-4 py-4 text-sm text-[#253243] transition hover:border-[#182433]"
                >
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-amber">
                    {contact.label}
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-[#182433]">
                    {contact.number}
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-amber">
                Sosial Resmi
              </p>
              <SocialLinks className="mt-3" />
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={siteConfig.mapsUrl}>Buka Google Maps</ButtonLink>
              <ButtonLink href={siteConfig.reviewUrl} variant="secondary">
                Lihat Ulasan
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClosingCtaSection() {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <div className={`${darkPanelClass} overflow-hidden p-8 lg:p-12`}>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#d9b6a0]">
                Konsultasi
              </p>
              <h2 className="mt-4 font-display text-[2.4rem] leading-[0.98] text-white sm:text-[3.6rem]">
                Siap konsultasi kebutuhan pagar, kanopi, stainless, pintu
                besi, atau perbaikan las di Bekasi?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#c7d1dc] sm:text-base">
                Kirim foto lokasi, ukuran kasar, atau referensi desain melalui
                WhatsApp. Tim akan membantu arahan awal dan estimasi kebutuhan
                secepat mungkin.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ButtonLink
                href={siteConfig.whatsappPrimaryUrl}
                variant="secondary"
                className="!border-white !bg-white !text-[#182433] shadow-[0_18px_34px_rgba(8,15,28,0.22)] hover:!border-[#fff3e6] hover:!bg-[#fff3e6]"
              >
                WhatsApp Utama
              </ButtonLink>
              <ButtonLink
                href={siteConfig.whatsappSecondaryUrl}
                variant="ghost"
                className="!border-white/42 !bg-transparent !text-white shadow-none hover:!border-white hover:!bg-white/10 hover:!text-white"
              >
                WhatsApp Kedua
              </ButtonLink>
              <ButtonLink
                href="/portfolio"
                variant="ghost"
                className="!border-white/20 !bg-white/8 !text-white shadow-none hover:!border-[#d9b6a0] hover:!bg-white/14 hover:!text-white"
              >
                Lihat Portfolio
              </ButtonLink>
              <ButtonLink
                href="/lokasi"
                variant="ghost"
                className="!border-white/20 !bg-white/8 !text-white shadow-none hover:!border-[#d9b6a0] hover:!bg-white/14 hover:!text-white"
              >
                Cek Lokasi
              </ButtonLink>
            </div>
          </div>
          <div className="mt-8 grid gap-3 border-t border-white/12 pt-6 md:grid-cols-3">
            {trustSignals.slice(0, 3).map((signal) => (
              <div key={signal.title}>
                <p className="text-sm font-semibold text-white">
                  {signal.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#c7d1dc]">
                  {signal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
