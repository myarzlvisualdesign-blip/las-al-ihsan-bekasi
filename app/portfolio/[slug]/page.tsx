import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/schema";
import { PublicPageShell } from "@/components/public-page-shell";
import { ClosingCtaSection } from "@/components/public-sections";
import { getPublishedPortfolioBySlug } from "@/lib/cms/admin";
import { getPagePayload, getSection } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedPortfolioBySlug(slug);

  if (!item) {
    return {};
  }

  const snapshot = await getPagePayload("/portfolio");
  const title = item.seoTitle || item.title;
  const description = item.seoDescription || item.shortDescription;
  const url = new URL(`/portfolio/${item.slug}`, snapshot.business.siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: item.coverImage?.url
        ? [
            {
              url: item.coverImage.url,
              alt: item.altText || item.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: item.coverImage?.url ? [item.coverImage.url] : undefined,
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPublishedPortfolioBySlug(slug);

  if (!item) {
    notFound();
  }

  const snapshot = await getPagePayload("/portfolio");
  const cta = getSection(snapshot.globalPage, "cta");
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.description,
    url: new URL(`/portfolio/${item.slug}`, snapshot.business.siteUrl).toString(),
    image: item.coverImage?.url,
    about: item.category,
  };

  return (
    <PublicPageShell snapshot={snapshot} currentPath="/portfolio">
      <JsonLd data={schema} />
      <main className="overflow-x-clip">
        <section className="section-shell page-top-offset">
          <div className={`${"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"} py-12 lg:py-18`}>
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div className="overflow-hidden rounded-[28px] border border-[#ddd6cb] bg-white shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
                {item.coverImage?.url ? (
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={item.coverImage.url}
                      alt={item.altText || item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>
              <div className="rounded-[28px] border border-[#ddd6cb] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
                  {item.category}
                </p>
                <h1 className="mt-4 font-display text-[2.5rem] leading-[0.98] text-[#182433] sm:text-[3.7rem]">
                  {item.title}
                </h1>
                <p className="mt-5 text-base leading-8 text-[#556476]">
                  {item.description}
                </p>
                {item.location ? (
                  <p className="mt-4 text-sm font-semibold text-[#182433]">
                    Lokasi proyek: {item.location}
                  </p>
                ) : null}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={snapshot.business.whatsappPrimaryUrl}
                    className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-6 text-sm font-semibold text-white"
                  >
                    Konsultasi proyek serupa
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${item.title} - ${new URL(`/portfolio/${item.slug}`, snapshot.business.siteUrl).toString()}`,
                    )}`}
                    className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#d8d0c5] bg-[#f8f5f0] px-6 text-sm font-semibold text-[#182433]"
                  >
                    Share proyek
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {cta ? <ClosingCtaSection section={cta} /> : null}
      </main>
    </PublicPageShell>
  );
}
