import Image from "next/image";

import { BrandLogo } from "@/components/brand-logo";
import { ButtonLink } from "@/components/button-link";
import { PortfolioCard } from "@/components/portfolio-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { ServiceCategoryCard } from "@/components/service-category-card";
import { SocialLinks } from "@/components/social-links";
import {
  additionalServices,
  advantages,
  areas,
  faqs,
  featuredServices,
  portfolioItems,
  processSteps,
  reviewFacts,
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

function StarRow() {
  return (
    <div className="flex gap-1 text-lg text-[#f7b500]">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewSnapshotCard() {
  return (
    <div className="rounded-[2rem] border border-[#d6e0f5] bg-white p-6 text-[#17336c] shadow-[0_30px_80px_rgba(10,31,67,0.16)]">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e11d3f]">
        Snapshot Ulasan Real
      </p>
      <div className="mt-5 flex items-end gap-4">
        <p className="font-display text-7xl leading-none text-[#17336c]">
          {reviewSnapshot.rating}
        </p>
        <div className="pb-2">
          <StarRow />
          <p className="mt-2 text-sm font-semibold text-[#0e7490]">
            {reviewSnapshot.reviewCount} reviews
          </p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-600">
        {reviewSnapshot.summary}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={siteConfig.reviewUrl}>Lihat Ulasan Google</ButtonLink>
        <ButtonLink href="/ulasan" variant="secondary">
          Halaman Ulasan
        </ButtonLink>
      </div>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  primaryHref = siteConfig.whatsappPrimaryUrl,
  primaryLabel = "Konsultasi via WhatsApp",
  secondaryHref = "/lokasi",
  secondaryLabel = "Cek Lokasi",
}: PageIntroProps) {
  return (
    <section className="section-shell border-b border-white/10 pt-36 sm:pt-40">
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-18">
        <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(26,59,122,0.92),rgba(8,21,46,0.96)_54%,rgba(225,29,63,0.86))] p-8 shadow-[0_38px_120px_rgba(0,0,0,0.26)] lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#ffd0d6]">
                {eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none tracking-tight text-white sm:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-8 text-[#d7e3fb] sm:text-base">
                {description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
                <ButtonLink href={secondaryHref} variant="secondary">
                  {secondaryLabel}
                </ButtonLink>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {siteConfig.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.7rem] border border-white/12 bg-white/8 px-5 py-5 backdrop-blur"
                >
                  <p className="font-display text-4xl leading-none text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-[#dbe5fa]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSection() {
  return (
    <section className="section-shell border-b border-white/10 pt-36 sm:pt-40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:pb-24">
        <div className="flex flex-col justify-center">
          <div className="mb-5 flex flex-wrap gap-2">
            {siteConfig.heroTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#e8efff]"
              >
                {tag}
              </span>
            ))}
          </div>
          <BrandLogo className="max-w-[42rem]" />
          <h1 className="mt-8 max-w-4xl font-display text-5xl leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
            Bengkel las Bekasi yang lebih meyakinkan untuk pagar, kanopi,
            stainless, rolling door, dan pekerjaan custom yang siap closing
            lewat WhatsApp.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#d8e3f8] sm:text-lg">
            Bengkel Las Al-Ihsan Bekasi melayani{" "}
            <a className="text-[#ffd4d8]" href="/layanan">
              jasa las Bekasi
            </a>{" "}
            untuk rumah, ruko, dan kebutuhan renovasi dengan jalur konsultasi
            yang cepat, tampilan portfolio asli, serta bukti lokasi dan ulasan
            yang bisa dicek langsung. Cocok untuk Anda yang ingin vendor las
            terlihat profesional sejak pertama kali dilihat.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {siteConfig.serviceChecklist.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#314f85] bg-[#102446] px-4 py-2 text-sm text-white"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.whatsappPrimaryUrl}>
              Konsultasi via WhatsApp
            </ButtonLink>
            <ButtonLink href="/layanan" variant="secondary">
              Lihat Kategori Layanan
            </ButtonLink>
          </div>
          <div className="mt-5">
            <SocialLinks />
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffccd4]">
                  Langkah 0{index + 1}
                </p>
                <p className="mt-3 text-base font-semibold text-white">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#cad7f0]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-6 top-8 hidden h-36 w-36 rounded-full bg-[#e11d3f]/30 blur-3xl lg:block" />
          <div className="absolute -right-10 bottom-12 hidden h-40 w-40 rounded-full bg-[#1d4ed8]/20 blur-3xl lg:block" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#091325] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(225,29,63,0.2),rgba(255,255,255,0)_38%,rgba(23,51,108,0.78))]" />
            <div className="absolute left-5 top-5 z-10 rounded-full bg-white/92 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#17336c] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
              Dokumentasi proyek asli
            </div>
            <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/hero-kanopi-modern.jpg"
                alt="Jasa kanopi modern Bengkel Las Bekasi"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="rounded-[1.75rem] border border-white/12 bg-[#0d1b35]/84 p-5 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#ffd4d8]">
                    Menerima Pesanan
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {siteConfig.serviceChecklist.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <ReviewSnapshotCard />
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {trustSignals.map((signal) => (
              <div
                key={signal.title}
                className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5"
              >
                <p className="text-sm font-semibold text-white">
                  {signal.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#cad7f0]">
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

export function ValuePropsSection() {
  return (
    <section className="border-b border-white/10 bg-white/[0.02]">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        {valueProps.map((item) => (
          <div
            key={item.title}
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-[#cad7f0]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AdvantagesSection() {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Keunggulan"
          title="Jasa las Bekasi yang dibuat lebih siap closing, lebih informatif, dan lebih meyakinkan di mobile."
          description="Halaman ini tidak hanya menampilkan layanan, tetapi juga memperkuat trust dengan identitas bisnis yang jelas, jalur kontak cepat, dan bukti visual yang rapi."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {advantages.map((item) => (
            <article
              key={item.title}
              className="rounded-[30px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)]"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-brand-amber">
                {item.tag}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#d7e3fb]">
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
    <section className="section-shell border-y border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Layanan"
          title="Kategori layanan Bengkel Las Al-Ihsan Bekasi kini lebih lengkap dan lebih meyakinkan untuk calon pelanggan."
          description="Mulai dari pagar, teralis, stainless, tangga putar, folding gate, pintu besi, rolling door, kanopi, sampai perbaikan, pengecatan, dan layanan panggilan."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceCategories.map((category) => (
            <ServiceCategoryCard key={category.title} category={category} />
          ))}
        </div>
        {!introOnly && (
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.32fr_0.68fr]">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
            <aside className="rounded-[32px] border border-white/10 bg-white/5 p-6 lg:p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-brand-amber">
                Siap Dikerjakan
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Terima perbaikan, pengecatan, dan layanan panggilan untuk
                kebutuhan bengkel las terdekat Bekasi.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#d7e3fb]">
                Jika Anda belum butuh bikin baru, kami juga bisa membantu
                pembenahan pagar, pintu, kanopi, atau komponen besi lain yang
                sudah ada. Kirim foto kondisi lapangan lewat WhatsApp agar
                arahan awal lebih cepat.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-[#d7e3fb]">
                {additionalServices.map((service) => (
                  <li
                    key={service}
                    className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
                  >
                    {service}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink href={siteConfig.whatsappPrimaryUrl}>
                  Minta Penawaran via WhatsApp
                </ButtonLink>
                <ButtonLink href="/portfolio" variant="ghost">
                  Lihat Portfolio Nyata
                </ButtonLink>
              </div>
              <div className="mt-6">
                <SocialLinks />
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export function PortfolioSection() {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Portfolio"
          title="Portfolio asli untuk membantu calon pelanggan menilai hasil dan karakter pekerjaan bengkel."
          description="Semua gambar diambil dari dokumentasi kerja Bengkel Las Al-Ihsan Bekasi agar pengunjung melihat hasil yang realistis, bukan placeholder."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {portfolioItems.map((item) => (
            <PortfolioCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="section-shell border-y border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#091325]">
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
            title="Bengkel Las Al-Ihsan Bekasi dirancang tampil lebih profesional agar bisnis lebih dipercaya sejak pandangan pertama."
            description="Kami menggabungkan layanan bengkel las yang lengkap dengan tampilan digital yang lebih serius: portfolio asli, lokasi jelas, rating Google, sosial resmi, dan CTA yang diarahkan langsung ke WhatsApp."
            align="left"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">
                Pekerjaan baru & custom
              </p>
              <p className="mt-2 text-sm leading-7 text-[#cad7f0]">
                Pagar, teralis, stainless, tangga putar, folding gate, pintu
                besi, rolling door, hingga kanopi.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">
                Perbaikan & finishing
              </p>
              <p className="mt-2 text-sm leading-7 text-[#cad7f0]">
                Las ulang, penguatan struktur, pengecatan, dan pembenahan
                komponen yang sudah terpasang.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">
                Survey & layanan panggilan
              </p>
              <p className="mt-2 text-sm leading-7 text-[#cad7f0]">
                Siap untuk cek lokasi, ukur area, dan memberi saran awal
                sebelum pekerjaan dimulai.
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
    </section>
  );
}

export function AreasSection() {
  return (
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Area Layanan"
          title="Area layanan bengkel las terdekat untuk Bekasi dan sekitarnya."
          description="Fokus utama kami ada di Bekasi, dengan jangkauan survey dan pengerjaan ke Tambun, Cikarang, Babelan, dan area sekitar sesuai kebutuhan proyek."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {areas.map((area) => (
            <article
              key={area.name}
              className="rounded-[30px] border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-2xl font-display text-white">{area.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[#cad7f0]">
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
    <section className="section-shell border-y border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Ulasan Google"
          title="Bagian trust dibuat dari data yang bisa dicek, bukan dari testimoni buatan."
          description="Karena Anda meminta card testimoni yang real, bagian ini menampilkan snapshot rating Google dan bukti yang bisa diverifikasi langsung lewat Google Maps."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-[32px] border border-brand-amber/20 bg-brand-amber/8 p-6 lg:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-amber">
              Lokasi & Ulasan
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-white">
              Silakan cek lokasi dan ulasan kami di Google Maps agar Anda lebih
              yakin sebelum memesan.
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#edf2ff]">
              Snapshot yang kami tampilkan menunjukkan rating{" "}
              {reviewSnapshot.rating} dengan {reviewSnapshot.reviewCount} review
              Google. Angka ini kami jadikan bukti sosial yang dapat langsung
              diverifikasi dari profil Maps bisnis.
            </p>
            <div className="mt-8 rounded-[1.9rem] border border-white/14 bg-white/92 p-6 text-[#17336c]">
              <p className="font-display text-7xl leading-none">
                {reviewSnapshot.rating}
              </p>
              <div className="mt-3">
                <StarRow />
              </div>
              <p className="mt-3 text-lg font-semibold text-[#0e7490]">
                {reviewSnapshot.reviewCount} reviews
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {reviewSnapshot.source}
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={siteConfig.reviewUrl}>Lihat Ulasan</ButtonLink>
              <ButtonLink href={siteConfig.mapsUrl} variant="secondary">
                Buka Google Maps
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {reviewFacts.map((item) => (
              <article
                key={item.title}
                className="rounded-[30px] border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-brand-amber">
                  {item.tag}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#d7e3fb]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
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
          title="Pertanyaan yang paling sering ditanyakan sebelum order."
          description="Struktur FAQ membantu SEO, memperjelas proses kerja, dan memudahkan calon pelanggan yang mencari bengkel las Bekasi dari mobile."
          align="center"
        />
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-[26px] border border-white/10 bg-white/5 p-5"
            >
              <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-white marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-[#d7e3fb]">
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
    <section className="section-shell border-y border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Lokasi & Google Maps"
          title="Lokasi & Ulasan Kami"
          description="Silakan cek lokasi dan ulasan kami di Google Maps agar Anda lebih yakin sebelum memesan."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30">
            <iframe
              title="Google Maps Bengkel Las Al-Ihsan Bekasi"
              src={siteConfig.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0"
            />
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 lg:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-amber">
              Kontak Cepat
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-white">
              Bengkel Las Al-Ihsan Bekasi
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#cad7f0]">
              {siteConfig.address}
            </p>
            <div className="mt-6 grid gap-3">
              {siteConfig.whatsappContacts.map((contact) => (
                <a
                  key={contact.number}
                  href={contact.url}
                  className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-sm text-[#eef3ff] transition hover:border-brand-amber/50 hover:bg-black/35"
                >
                  <span className="block text-xs uppercase tracking-[0.24em] text-brand-amber">
                    {contact.label}
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-white">
                    {contact.number}
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.24em] text-brand-amber">
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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[2.25rem] border border-brand-amber/20 bg-[linear-gradient(135deg,rgba(225,29,63,0.18),rgba(9,19,37,0.9)_40%,rgba(26,59,122,0.95))] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.28)] lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#ffd4d8]">
                CTA Penutup
              </p>
              <h2 className="mt-4 font-display text-4xl leading-none text-white sm:text-5xl">
                Siap konsultasi kebutuhan pagar, kanopi, stainless, pintu
                besi, atau perbaikan las di Bekasi?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#edf2ff] sm:text-base">
                Kirim foto lokasi, ukuran kasar, atau inspirasi desain Anda
                lewat WhatsApp. Tim kami akan membantu arahan kebutuhan,
                estimasi awal, dan langkah berikutnya secepat mungkin.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ButtonLink href={siteConfig.whatsappPrimaryUrl}>
                Chat WhatsApp Utama
              </ButtonLink>
              <ButtonLink
                href={siteConfig.whatsappSecondaryUrl}
                variant="secondary"
              >
                Chat WhatsApp Kedua
              </ButtonLink>
              <ButtonLink href="/portfolio" variant="ghost">
                Lihat Portfolio
              </ButtonLink>
              <ButtonLink href="/lokasi" variant="ghost">
                Cek Lokasi
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
