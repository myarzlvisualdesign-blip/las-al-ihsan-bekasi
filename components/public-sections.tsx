import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { HeroStage } from "@/components/hero-stage";
import { SectionHeading } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";
import {
  readImageBlock,
  readTextBlock,
} from "@/lib/cms/public";
import type {
  CmsBusinessProfile,
  CmsFaq,
  CmsPortfolioItem,
  CmsServiceItem,
  CmsStructuredSection,
  CmsTestimonial,
} from "@/lib/cms/types";

const containerClass = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const panelClass =
  "site-panel rounded-[24px] border border-[#d8ddd7] bg-white shadow-[0_18px_42px_rgba(15,23,42,0.06)]";
const mutedPanelClass =
  "site-panel rounded-[24px] border border-[#e1ddd5] bg-[#f8f5f0]";
const darkPanelClass =
  "site-panel rounded-[28px] border border-[#2a3f58] bg-[#182433] shadow-[0_26px_70px_rgba(15,23,42,0.22)]";

export function PageIntro({
  section,
}: {
  section: CmsStructuredSection;
}) {
  return (
    <section className="section-shell page-top-offset">
      <div className={containerClass}>
        <div className={`${panelClass} overflow-hidden p-7 lg:p-10`}>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#e1ddd5] bg-[#f7f4ee] px-4 py-2 text-sm text-[#526172]">
              <span>{readTextBlock(section, "eyebrow")}</span>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-[2.45rem] leading-[0.98] tracking-tight text-[#182433] sm:text-[3.9rem]">
              {readTextBlock(section, "heading")}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#556476] sm:text-base">
              {readTextBlock(section, "description")}
            </p>
            {readTextBlock(section, "primaryButtonHref") ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={readTextBlock(section, "primaryButtonHref")}>
                  {readTextBlock(section, "primaryButtonLabel", "Hubungi via WhatsApp")}
                </ButtonLink>
                {readTextBlock(section, "secondaryButtonHref") ? (
                  <ButtonLink
                    href={readTextBlock(section, "secondaryButtonHref")}
                    variant="secondary"
                  >
                    {readTextBlock(section, "secondaryButtonLabel", "Lihat halaman")}
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSection({
  section,
}: {
  section: CmsStructuredSection;
}) {
  const image = readImageBlock(section, "backgroundImage");

  return (
    <section className="section-shell page-top-offset">
      <div className={`${containerClass} pb-14 lg:pb-18`}>
        <HeroStage
          imageSrc={image.url}
          imageAlt={image.alt}
          imageSizes="100vw"
          mediaClassName="min-h-[39rem] w-full sm:min-h-0 sm:aspect-[16/11] lg:min-h-[42rem] lg:aspect-[16/8.9] xl:min-h-[43rem]"
          overlayClassName="bg-[linear-gradient(90deg,rgba(10,18,28,0.9)_0%,rgba(10,18,28,0.68)_42%,rgba(10,18,28,0.2)_100%),linear-gradient(180deg,rgba(10,18,28,0.05)_0%,rgba(10,18,28,0.45)_100%)]"
        >
          <div className="absolute inset-0 flex items-start lg:items-center">
            <div className="w-full p-4 pt-5 pb-5 sm:p-8 lg:px-10 lg:py-10">
              <div className="max-w-[19.5rem] sm:max-w-3xl lg:max-w-[45rem]">
                <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-white/14 bg-[rgba(255,255,255,0.08)] px-3 py-2 text-[0.82rem] font-medium text-white shadow-[0_14px_28px_rgba(8,15,28,0.14)] backdrop-blur-md sm:gap-2.5 sm:px-4 sm:text-[0.92rem] lg:px-4.5 lg:py-2.5">
                  <span className="pl-0.5 pr-2 leading-none sm:pr-2.5">
                    {readTextBlock(section, "badge")}
                  </span>
                </div>
                <h1 className="mt-4 max-w-3xl font-display text-[2.05rem] leading-[0.96] tracking-tight text-white sm:mt-6 sm:text-[4.2rem] sm:leading-[0.92] lg:mt-6 lg:max-w-[46rem] lg:text-[4.7rem] xl:text-[5rem]">
                  {readTextBlock(section, "heading")}
                </h1>
                <p className="mt-3.5 max-w-2xl text-[0.95rem] leading-7 text-[#d7dee7] sm:mt-5 sm:text-lg sm:leading-8 lg:mt-5 lg:max-w-[39rem]">
                  {readTextBlock(section, "description")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 lg:mt-6 lg:gap-3">
                  <span className="rounded-full border border-white/14 bg-white/10 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
                    {readTextBlock(section, "trustOne")}
                  </span>
                  <span className="rounded-full border border-white/14 bg-white/10 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
                    {readTextBlock(section, "trustTwo")}
                  </span>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row lg:mt-7 lg:gap-4">
                  <ButtonLink href={readTextBlock(section, "primaryButtonHref")}>
                    {readTextBlock(section, "primaryButtonLabel")}
                  </ButtonLink>
                  <ButtonLink
                    href={readTextBlock(section, "secondaryButtonHref")}
                    variant="secondary"
                  >
                    {readTextBlock(section, "secondaryButtonLabel")}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </HeroStage>
      </div>
    </section>
  );
}

export function ServicesSection({
  section,
  services,
  limit = 6,
}: {
  section: CmsStructuredSection;
  services: CmsServiceItem[];
  limit?: number;
}) {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <SectionHeading
          eyebrow={readTextBlock(section, "eyebrow")}
          title={readTextBlock(section, "heading")}
          description={readTextBlock(section, "description")}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, limit).map((service) => (
            <article key={service.id} className={`${panelClass} overflow-hidden`}>
              {service.imageUrl ? (
                <div className="relative aspect-[16/10]">
                  <Image
                    src={service.imageUrl}
                    alt={service.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="p-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
                  {service.badge || "Layanan"}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[#182433]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#556476]">
                  {service.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href={readTextBlock(section, "primaryButtonHref")}>
            {readTextBlock(section, "primaryButtonLabel")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function PortfolioSection({
  section,
  portfolio,
  featuredOnly = false,
}: {
  section: CmsStructuredSection;
  portfolio: CmsPortfolioItem[];
  featuredOnly?: boolean;
}) {
  const items = featuredOnly ? portfolio.filter((item) => item.isFeatured).slice(0, 6) : portfolio;

  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <SectionHeading
          eyebrow={readTextBlock(section, "eyebrow")}
          title={readTextBlock(section, "heading")}
          description={readTextBlock(section, "description")}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="site-card overflow-hidden rounded-[24px] border border-[#ddd8cf] bg-white shadow-[0_16px_38px_rgba(15,23,42,0.06)]"
            >
              {item.coverImageUrl ? (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.coverImageUrl}
                    alt={item.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-amber">
                  {item.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-tight text-[#182433]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#556476]">
                  {item.shortDescription}
                </p>
                <div className="mt-5">
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="text-sm font-semibold text-[#22364d] underline"
                  >
                    Lihat detail proyek
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={readTextBlock(section, "primaryButtonHref")}>
            {readTextBlock(section, "primaryButtonLabel")}
          </ButtonLink>
          {readTextBlock(section, "secondaryButtonHref") ? (
            <ButtonLink
              href={readTextBlock(section, "secondaryButtonHref")}
              variant="secondary"
            >
              {readTextBlock(section, "secondaryButtonLabel")}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function AboutSection({
  section,
}: {
  section: CmsStructuredSection;
}) {
  const image = readImageBlock(section, "image");

  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className={`${panelClass} overflow-hidden`}>
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow={readTextBlock(section, "eyebrow")}
              title={readTextBlock(section, "heading")}
              description={readTextBlock(section, "description")}
              align="left"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["featureOneTitle", "featureOneText"],
                ["featureTwoTitle", "featureTwoText"],
                ["featureThreeTitle", "featureThreeText"],
              ].map(([titleKey, textKey]) => (
                <div key={titleKey} className={`${mutedPanelClass} p-5`}>
                  <p className="text-sm font-semibold text-[#182433]">
                    {readTextBlock(section, titleKey)}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#556476]">
                    {readTextBlock(section, textKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({
  section,
  testimonials,
}: {
  section: CmsStructuredSection;
  testimonials: CmsTestimonial[];
}) {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <SectionHeading
          eyebrow={readTextBlock(section, "eyebrow")}
          title={readTextBlock(section, "heading")}
          description={readTextBlock(section, "description")}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id} className={`${panelClass} p-6`}>
              <div className="flex items-center gap-3">
                {item.avatarUrl ? (
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image
                      src={item.avatarUrl}
                      alt={item.customerName}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#22364d] text-white">
                    {item.customerName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-[#182433]">{item.customerName}</p>
                  <p className="text-sm text-[#556476]">{item.customerRole}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#364152]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">
                {item.sourceLabel} • {item.rating}/5
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({
  section,
  faqs,
}: {
  section: CmsStructuredSection;
  faqs: CmsFaq[];
}) {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow={readTextBlock(section, "eyebrow")}
          title={readTextBlock(section, "heading")}
          description={readTextBlock(section, "description")}
          align="center"
        />
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.id} className={`${panelClass} group p-5`}>
              <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-[#182433] marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-[#556476]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({
  section,
  business,
}: {
  section: CmsStructuredSection;
  business: CmsBusinessProfile;
}) {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <SectionHeading
          eyebrow={readTextBlock(section, "eyebrow")}
          title={readTextBlock(section, "heading")}
          description={readTextBlock(section, "description")}
        />
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className={`${panelClass} relative self-start overflow-hidden`}>
            <div className="relative aspect-[4/3] w-full">
              <iframe
                title="Google Maps Bengkel Las Al-Ihsan Bekasi"
                src={business.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
          <div className={`${mutedPanelClass} p-6 lg:p-8`}>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
              {readTextBlock(section, "quickHeading")}
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-[#182433]">
              {business.businessName}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#556476]">
              {business.fullAddress}
            </p>
            <p className="mt-4 text-sm leading-7 text-[#556476]">
              {readTextBlock(section, "quickDescription")}
            </p>
            <div className="mt-6 grid gap-3">
              <a
                href={business.whatsappPrimaryUrl}
                className="rounded-xl border border-[#ddd8cf] bg-white px-4 py-4 text-sm text-[#253243] transition hover:border-[#182433]"
              >
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-amber">
                  WhatsApp Utama
                </span>
                <span className="mt-1 block text-lg font-semibold text-[#182433]">
                  {business.primaryPhone}
                </span>
              </a>
              {business.whatsappSecondaryUrl ? (
                <a
                  href={business.whatsappSecondaryUrl}
                  className="rounded-xl border border-[#ddd8cf] bg-white px-4 py-4 text-sm text-[#253243] transition hover:border-[#182433]"
                >
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-amber">
                    WhatsApp Kedua
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-[#182433]">
                    {business.secondaryPhone}
                  </span>
                </a>
              ) : null}
            </div>
            <div className="mt-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-amber">
                Sosial Resmi
              </p>
              <SocialLinks links={business.socialLinks} className="mt-3" />
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={readTextBlock(section, "mapsButtonHref", business.mapsUrl)}>
                {readTextBlock(section, "mapsButtonLabel", "Buka Google Maps")}
              </ButtonLink>
              <ButtonLink
                href={readTextBlock(section, "reviewButtonHref", business.reviewUrl || business.mapsUrl)}
                variant="secondary"
              >
                {readTextBlock(section, "reviewButtonLabel", "Lihat Ulasan")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClosingCtaSection({
  section,
}: {
  section: CmsStructuredSection;
}) {
  return (
    <section className="section-shell">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <div className={`${darkPanelClass} overflow-hidden p-8 lg:p-12`}>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#d9b6a0]">
                {readTextBlock(section, "eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-[2.4rem] leading-[0.98] text-white sm:text-[3.6rem]">
                {readTextBlock(section, "heading")}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#c7d1dc] sm:text-base">
                {readTextBlock(section, "description")}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ButtonLink
                href={readTextBlock(section, "primaryButtonHref")}
                variant="secondary"
                className="!border-white !bg-white !text-[#182433] shadow-[0_18px_34px_rgba(8,15,28,0.22)] hover:!border-[#fff3e6] hover:!bg-[#fff3e6]"
              >
                {readTextBlock(section, "primaryButtonLabel")}
              </ButtonLink>
              <ButtonLink
                href={readTextBlock(section, "secondaryButtonHref")}
                variant="ghost"
                className="!border-white/20 !bg-white/8 !text-white shadow-none hover:!border-[#d9b6a0] hover:!bg-white/14 hover:!text-white"
              >
                {readTextBlock(section, "secondaryButtonLabel")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
