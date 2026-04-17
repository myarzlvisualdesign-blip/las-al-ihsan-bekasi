import Image from "next/image";

import { BrandMark } from "@/components/brand-logo";
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

function ReviewSnapshotCard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-[1.9rem] border border-[#d6e0f5] bg-white text-[#17336c] shadow-[0_26px_70px_rgba(10,31,67,0.16)] ${
        compact ? "p-5" : "p-6"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e11d3f]">
        Snapshot Ulasan Real
      </p>
      <div className="mt-4 flex items-end gap-4">
        <p className="font-display text-6xl leading-none text-[#17336c] sm:text-7xl">
          {reviewSnapshot.rating}
        </p>
        <div className="pb-2">
          <StarRow />
          <p className="mt-2 text-sm font-semibold text-[#0e7490]">
            {reviewSnapshot.reviewCount} reviews
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">
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

function QuickBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 rounded-2xl border border-[#2a4f95] bg-[#123572] px-4 py-3 text-sm text-[#eff4ff]">
      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#e11d3f]" />
      <span>{children}</span>
    </li>
  );
}

function StatGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {siteConfig.stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[1.7rem] border border-[#2a4f95] bg-[#123572] px-5 py-5"
        >
          <p className="font-display text-4xl leading-none text-white">
            {stat.value}
          </p>
          <p className="mt-2 text-sm text-[#dbe5fa]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function ProcessGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {processSteps.map((step, index) => (
        <div
          key={step.title}
          className="rounded-[1.8rem] border border-[#29509d] bg-[#123572] p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffd4d8]">
            Langkah 0{index + 1}
          </p>
          <p className="mt-3 text-lg font-semibold text-white">{step.title}</p>
          <p className="mt-2 text-sm leading-7 text-[#dbe5fa]">
            {step.description}
          </p>
        </div>
      ))}
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
    <section className="section-shell border-b border-[#204486] pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-18">
        <div className="overflow-hidden rounded-[2.2rem] border border-[#29509d] bg-[#0d2f6b] p-7 shadow-[0_38px_100px_rgba(0,0,0,0.22)] lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#ffd4d8]">
                {eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl font-display text-[2.5rem] leading-[0.96] tracking-tight text-white sm:text-[4rem]">
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
            <div className="grid gap-4">
              <ReviewSnapshotCard compact />
              <div className="rounded-[1.9rem] border border-[#29509d] bg-[#123572] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ffd4d8]">
                  Area Layanan
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Bekasi, Tambun, Cikarang, dan Babelan
                </p>
                <p className="mt-3 text-sm leading-7 text-[#dbe5fa]">
                  Jalur konsultasi tetap diarahkan ke WhatsApp agar calon
                  pelanggan bisa lebih cepat mengirim foto lokasi, kebutuhan,
                  dan ukuran awal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSection() {
  return (
    <section className="section-shell border-b border-[#204486] pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#29509d] bg-[#123572] px-4 py-3 text-sm text-[#eff4ff]">
              <BrandMark className="h-10 w-10 shrink-0 rounded-[0.95rem]" />
              <span>Bekasi, Tambun, Cikarang, Babelan</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {siteConfig.heroTags.map((tag, index) => (
                <span
                  key={tag}
                  className={`rounded-full border border-[#29509d] bg-[#10306a] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#e8efff] ${
                    index > 0 ? "hidden sm:inline-flex" : "inline-flex"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-7 max-w-4xl font-display text-[2.65rem] leading-[0.94] tracking-tight text-white sm:text-[4.3rem] lg:text-[5.2rem]">
              Bengkel Las Al-Ihsan Bekasi untuk pagar, kanopi, stainless, pintu
              besi, dan pengerjaan custom yang lebih rapi dan lebih meyakinkan.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#d8e3f8] sm:text-lg">
              Jika Anda sedang mencari{" "}
              <a className="text-[#ffd4d8]" href="/layanan">
                jasa las Bekasi
              </a>{" "}
              yang terlihat profesional, mudah dicek, dan siap closing lewat
              WhatsApp, Bengkel Las Al-Ihsan Bekasi dibuat untuk itu. Semua
              jalur trust penting ditampilkan jelas: layanan, portfolio, Maps,
              ulasan, dan sosial resmi.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              <QuickBullet>
                Terima pesanan baru, perbaikan, pengecatan, dan layanan
                panggilan.
              </QuickBullet>
              <QuickBullet>
                Rating Google 4.9 dengan 261 review ditampilkan apa adanya.
              </QuickBullet>
              <QuickBullet>
                Cocok untuk rumah, ruko, renovasi, dan pekerjaan custom.
              </QuickBullet>
              <QuickBullet>
                Calon pelanggan bisa langsung kirim foto lokasi lewat WhatsApp.
              </QuickBullet>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={siteConfig.whatsappPrimaryUrl}>
                Konsultasi via WhatsApp
              </ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                Lihat Portfolio Asli
              </ButtonLink>
            </div>
            <div className="mt-5">
              <SocialLinks />
            </div>
            <div className="mt-8">
              <StatGrid />
            </div>
          </div>
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[2.2rem] border border-[#29509d] bg-[#0b2148] shadow-[0_34px_90px_rgba(0,0,0,0.25)]">
              <div className="relative aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[5/5.4]">
                <Image
                  src="/images/kanopi-rumah-minimalis.jpg"
                  alt="Kanopi rumah minimalis Bengkel Las Bekasi"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#17336c] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                  Dokumentasi proyek asli
                </div>
              </div>
              <div className="grid gap-4 border-t border-[#29509d] bg-[#0b2148] p-5 lg:grid-cols-[1fr_0.95fr]">
                <div className="rounded-[1.7rem] border border-[#29509d] bg-[#102c5f] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#ffd4d8]">
                    Menerima Pesanan
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {siteConfig.serviceChecklist.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#365ea8] bg-[#143771] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <ReviewSnapshotCard compact />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {trustSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="rounded-[1.8rem] border border-[#29509d] bg-[#123572] p-5"
                >
                  <p className="text-base font-semibold text-white">
                    {signal.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#dbe5fa]">
                    {signal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <ProcessGrid />
        </div>
      </div>
    </section>
  );
}

export function ValuePropsSection() {
  return (
    <section className="border-b border-[#204486] bg-[#0a275b]">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        {valueProps.map((item) => (
          <div
            key={item.title}
            className="rounded-[28px] border border-[#29509d] bg-[#123572] p-5"
          >
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-[#dbe5fa]">
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
          title="Struktur website dibuat lebih jelas, lebih rapi, dan lebih siap mendukung proses closing."
          description="Saya mengambil ritme pemasaran dari website referensi: headline langsung menjual, layanan mudah dipahami, bukti kerja kuat, dan CTA tidak disembunyikan."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {advantages.map((item) => (
            <article
              key={item.title}
              className="rounded-[30px] border border-[#d6e0f5] bg-white p-6 shadow-[0_24px_70px_rgba(7,34,82,0.18)]"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-brand-amber">
                {item.tag}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-[#17336c]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
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
    <section className="section-shell border-y border-[#204486]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Layanan"
          title="Kategori jasa las Bekasi dibuat lebih matang agar kebutuhan pelanggan langsung terarah."
          description="Setiap layanan ditulis lebih spesifik supaya pengunjung cepat tahu mana yang relevan untuk rumah, ruko, renovasi, maupun pekerjaan custom."
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
            <aside className="rounded-[32px] border border-[#29509d] bg-[#123572] p-6 lg:p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[#ffd4d8]">
                Siap Dikerjakan
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Terima perbaikan, pengecatan, dan layanan panggilan untuk
                kebutuhan bengkel las terdekat Bekasi.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#dbe5fa]">
                Jika Anda belum butuh bikin baru, kami juga bisa membantu
                pembenahan pagar, pintu, kanopi, atau komponen besi lain yang
                sudah ada. Kirim foto kondisi lapangan lewat WhatsApp agar
                arahan awal lebih cepat.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-[#eff4ff]">
                {additionalServices.map((service) => (
                  <li
                    key={service}
                    className="rounded-2xl border border-[#29509d] bg-[#10306a] px-4 py-3"
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
          title="Portfolio dipilih dari file LAS yang lebih spesifik agar tidak terasa mengulang foto yang sama."
          description="Saya pilah ulang dokumentasi untuk menampilkan jenis pekerjaan yang lebih beragam: kanopi, pagar laser-cut, sliding gate, pintu custom, railing, dan tangga."
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
    <section className="section-shell border-y border-[#204486]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#29509d] bg-[#0b2148]">
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
            title="Bengkel Las Al-Ihsan Bekasi ditata seperti bisnis yang benar-benar siap dipresentasikan ke calon pelanggan."
            description="Bukan hanya menjual jasa, tetapi juga menampilkan identitas bisnis, lokasi, ulasan, hasil kerja, dan CTA yang lebih jelas agar trust naik lebih cepat."
            align="left"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] border border-[#29509d] bg-[#123572] p-5">
              <p className="text-sm font-semibold text-white">
                Pekerjaan baru & custom
              </p>
              <p className="mt-2 text-sm leading-7 text-[#dbe5fa]">
                Pagar, teralis, stainless, tangga putar, folding gate, pintu
                besi, rolling door, hingga kanopi.
              </p>
            </div>
            <div className="rounded-[28px] border border-[#29509d] bg-[#123572] p-5">
              <p className="text-sm font-semibold text-white">
                Perbaikan & finishing
              </p>
              <p className="mt-2 text-sm leading-7 text-[#dbe5fa]">
                Las ulang, penguatan struktur, pengecatan, dan pembenahan
                komponen yang sudah terpasang.
              </p>
            </div>
            <div className="rounded-[28px] border border-[#29509d] bg-[#123572] p-5">
              <p className="text-sm font-semibold text-white">
                Survey & layanan panggilan
              </p>
              <p className="mt-2 text-sm leading-7 text-[#dbe5fa]">
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
          description="Fokus utama tetap ada di Bekasi, dengan jangkauan survey dan pengerjaan ke Tambun, Cikarang, Babelan, dan area sekitar."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {areas.map((area) => (
            <article
              key={area.name}
              className="rounded-[30px] border border-[#d6e0f5] bg-white p-6 shadow-[0_20px_60px_rgba(7,34,82,0.16)]"
            >
              <h3 className="text-2xl font-display text-[#17336c]">
                {area.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
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
    <section className="section-shell border-y border-[#204486]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Ulasan Google"
          title="Bagian trust difokuskan ke data yang bisa dicek langsung, bukan ke testimonial generik."
          description="Karena Anda meminta card testimoni yang real, saya tampilkan snapshot rating Google dan CTA langsung ke Google Maps agar pengunjung bisa memverifikasi sendiri."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <ReviewSnapshotCard />
          <div className="grid gap-5 md:grid-cols-3">
            {reviewFacts.map((item) => (
              <article
                key={item.title}
                className="rounded-[30px] border border-[#29509d] bg-[#123572] p-6"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-[#ffd4d8]">
                  {item.tag}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#dbe5fa]">
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
          description="Bagian FAQ dirapikan agar lebih mudah dibaca di mobile dan membantu menjawab pertanyaan dasar sebelum chat masuk ke WhatsApp."
          align="center"
        />
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-[26px] border border-[#29509d] bg-[#123572] p-5"
            >
              <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-white marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-[#dbe5fa]">
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
    <section className="section-shell border-y border-[#204486]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Lokasi & Google Maps"
          title="Lokasi & Ulasan Kami"
          description="Silakan cek lokasi dan ulasan kami di Google Maps agar Anda lebih yakin sebelum memesan."
        />
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative self-start overflow-hidden rounded-[2rem] border border-[#29509d] bg-[#0b2148]">
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
          <div className="rounded-[32px] border border-[#29509d] bg-[#123572] p-6 lg:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-[#ffd4d8]">
              Kontak Cepat
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-white">
              Bengkel Las Al-Ihsan Bekasi
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#dbe5fa]">
              {siteConfig.address}
            </p>
            <div className="mt-6 grid gap-3">
              {siteConfig.whatsappContacts.map((contact) => (
                <a
                  key={contact.number}
                  href={contact.url}
                  className="rounded-2xl border border-[#29509d] bg-[#10306a] px-4 py-4 text-sm text-[#eef3ff] transition hover:border-[#ffd4d8]"
                >
                  <span className="block text-xs uppercase tracking-[0.24em] text-[#ffd4d8]">
                    {contact.label}
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-white">
                    {contact.number}
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#ffd4d8]">
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
        <div className="overflow-hidden rounded-[2.25rem] border border-[#29509d] bg-[linear-gradient(135deg,#0b2148,#103474_60%,#e11d3f)] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.28)] lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#ffd4d8]">
                CTA Penutup
              </p>
              <h2 className="mt-4 font-display text-[2.8rem] leading-[0.95] text-white sm:text-[4rem]">
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
