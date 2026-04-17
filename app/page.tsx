import Image from "next/image";

import { BrandLogo } from "@/components/brand-logo";
import { ButtonLink } from "@/components/button-link";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { PortfolioCard } from "@/components/portfolio-card";
import { LocalBusinessSchema } from "@/components/schema";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { ServiceCategoryCard } from "@/components/service-category-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SocialLinks } from "@/components/social-links";
import {
  additionalServices,
  areas,
  faqs,
  featuredServices,
  portfolioItems,
  serviceCategories,
  siteConfig,
  testimonials,
  trustSignals,
  valueProps,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      <LocalBusinessSchema />
      <SiteHeader />
      <main className="overflow-x-clip">
        <section
          id="top"
          className="section-shell border-b border-white/10 pt-24 sm:pt-28"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-24">
            <div className="flex flex-col justify-center">
              <div className="mb-5 flex flex-wrap gap-2">
                {siteConfig.heroTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/12 bg-white/7 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#dbe5f7]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <BrandLogo className="max-w-[42rem]" />
              <h1 className="mt-8 max-w-4xl font-display text-5xl leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
                Bengkel Las Al-Ihsan Bekasi untuk pagar, kanopi, stainless,
                pintu besi, folding gate, rolling door, dan pengerjaan custom
                yang rapi.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
                Jika Anda sedang mencari{" "}
                <a className="text-brand-amber" href="#services">
                  bengkel las Bekasi
                </a>{" "}
                atau{" "}
                <a className="text-brand-amber" href="#services">
                  jasa las Bekasi
                </a>{" "}
                untuk rumah, ruko, dan kebutuhan renovasi, Bengkel Las
                Al-Ihsan Bekasi siap membantu. Kami menerima pesanan{" "}
                <a className="text-brand-amber" href="#services">
                  pagar besi Bekasi
                </a>
                ,{" "}
                <a className="text-brand-amber" href="#services">
                  kanopi Bekasi
                </a>
                , teralis, tangga putar, folding gate, pintu besi, rolling
                door,{" "}
                <a className="text-brand-amber" href="#services">
                  stainless Bekasi
                </a>
                , serta perbaikan, pengecatan, dan layanan panggilan.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {siteConfig.serviceChecklist.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#314f85] bg-[#162645] px-4 py-2 text-sm text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={siteConfig.whatsappPrimaryUrl}>
                  Chat WhatsApp Utama
                </ButtonLink>
                <ButtonLink href="#maps" variant="secondary">
                  Cek Lokasi di Maps
                </ButtonLink>
              </div>
              <div className="mt-5">
                <SocialLinks />
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {trustSignals.map((signal) => (
                  <div
                    key={signal.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-sm font-semibold text-white">
                      {signal.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">
                      {signal.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {siteConfig.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[28px] border border-brand-amber/20 bg-brand-amber/8 px-5 py-4"
                  >
                    <p className="text-3xl font-display text-brand-amber">
                      {stat.value}
                    </p>
                    <p className="text-sm text-zinc-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-6 top-8 hidden h-36 w-36 rounded-full bg-brand-amber/25 blur-3xl lg:block" />
              <div className="absolute -right-10 bottom-12 hidden h-40 w-40 rounded-full bg-white/18 blur-3xl lg:block" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(239,57,69,0.18),rgba(255,255,255,0)_38%,rgba(36,61,107,0.66))]" />
                <div className="absolute left-5 top-5 z-10 rounded-full bg-white/92 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#243d6b] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
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
                  <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[1.75rem] border border-white/12 bg-[#0d1b35]/84 p-5 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.28em] text-brand-amber/85">
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
                    <div className="rounded-[1.75rem] border border-[#dce5f5] bg-white/96 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
                      <p className="text-xs uppercase tracking-[0.24em] text-[#ef3945]">
                        Kontak Cepat
                      </p>
                      <div className="mt-4 grid gap-3">
                        {siteConfig.whatsappContacts.map((contact) => (
                          <a
                            key={contact.number}
                            href={contact.url}
                            className="rounded-2xl border border-[#dce5f5] bg-[#f6f9fe] px-4 py-3 text-sm text-[#243d6b] transition hover:border-[#243d6b]"
                          >
                            <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#ef3945]">
                              {contact.label}
                            </span>
                            <span className="mt-1 block text-lg font-semibold">
                              {contact.number}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-brand-amber">
                  Informasi Usaha
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  Identitas brand kini memakai logo asli Bengkel Las Al-Ihsan
                  Bekasi, dengan penegasan layanan yang memang ada di lapangan:
                  terima perbaikan, pengecatan, layanan panggilan, serta
                  kategori pengerjaan yang lebih lengkap dan profesional.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
            {valueProps.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-black/20 p-5"
              >
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="advantages" className="section-shell">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <SectionHeading
              eyebrow="Keunggulan"
              title="Jasa bengkel las Bekasi yang fokus pada hasil kokoh, identitas usaha jelas, dan jalur closing yang cepat."
              description="Struktur halaman ini disusun agar calon pelanggan langsung paham: apa saja yang dikerjakan, bagaimana cara menghubungi, area layanan, dan bukti bahwa bisnis ini memang nyata."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {siteConfig.advantages.map((item) => (
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
                  <p className="mt-3 text-sm leading-7 text-zinc-300">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-shell border-y border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <SectionHeading
              eyebrow="Layanan"
              title="Kategori layanan Bengkel Las Al-Ihsan Bekasi dibuat lebih lengkap dan lebih jelas"
              description="Bagian ini sengaja diperdalam agar calon pelanggan langsung melihat scope pengerjaan: pagar, teralis, stainless, tangga putar, folding gate, pintu besi, rolling door, kanopi, perbaikan, pengecatan, dan layanan panggilan."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {serviceCategories.map((category) => (
                <ServiceCategoryCard
                  key={category.title}
                  category={category}
                />
              ))}
            </div>
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
                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  Jika Anda belum butuh bikin baru, kami juga bisa membantu
                  pembenahan pagar, pintu, kanopi, atau komponen besi lain yang
                  sudah ada. Kirim foto kondisi lapangan lewat WhatsApp agar
                  arahan awal lebih cepat.
                </p>
                <ul className="mt-6 grid gap-3 text-sm text-zinc-300">
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
                  <ButtonLink
                    href={siteConfig.whatsappSecondaryUrl}
                    variant="ghost"
                  >
                    Chat Nomor Cadangan
                  </ButtonLink>
                </div>
                <div className="mt-6">
                  <SocialLinks />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section-shell">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <SectionHeading
              eyebrow="Portfolio"
              title="Portfolio asli untuk membantu calon pelanggan menilai kualitas dan model pekerjaan"
              description="Kami memakai gambar proyek nyata dari folder LAS agar hasil yang Anda lihat benar-benar dekat dengan pekerjaan bengkel, bukan placeholder generik."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {portfolioItems.map((item) => (
                <PortfolioCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-shell border-y border-white/10">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900">
              <div className="aspect-[4/5] w-full">
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
                title="Bengkel Las Al-Ihsan Bekasi melayani pesanan baru, pekerjaan custom, hingga perbaikan di lapangan."
                description="Pendekatannya kami buat jelas: pelanggan bisa melihat lokasi, portfolio, sosial resmi, lalu langsung masuk ke WhatsApp. Cara ini jauh lebih efektif untuk membangun trust dan mendukung closing client."
                align="left"
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">
                    Pekerjaan baru & custom
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    Pagar, teralis, stainless, tangga putar, folding gate,
                    pintu besi, rolling door, hingga kanopi.
                  </p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">
                    Perbaikan & finishing
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    Las ulang, penguatan struktur, pengecatan, dan pembenahan
                    komponen yang sudah terpasang.
                  </p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">
                    Survey & layanan panggilan
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    Siap untuk cek lokasi, ukur area, dan memberi saran awal
                    sebelum pekerjaan dimulai.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#portfolio" variant="secondary">
                  Lihat Hasil Pekerjaan
                </ButtonLink>
                <ButtonLink href={siteConfig.mapsUrl} variant="ghost">
                  Buka Google Maps
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section id="areas" className="section-shell">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <SectionHeading
              eyebrow="Area Layanan"
              title="Area layanan bengkel las terdekat untuk Bekasi dan sekitarnya"
              description="Fokus utama kami ada di Bekasi, dengan jangkauan survey dan pengerjaan ke Tambun, Cikarang, Babelan, dan area sekitar sesuai kebutuhan proyek."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {areas.map((area) => (
                <article
                  key={area.name}
                  className="rounded-[30px] border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-2xl font-display text-white">
                    {area.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {area.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="section-shell border-y border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <SectionHeading
              eyebrow="Testimoni"
              title="Trust dibangun dari lokasi, dokumentasi, dan jalur kontak yang transparan"
              description="Daripada membuat testimoni buatan, halaman ini menekankan bukti yang benar-benar bisa dicek calon pelanggan: Google Maps, foto proyek, identitas usaha, dan sosial media resmi."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="rounded-[32px] border border-brand-amber/20 bg-brand-amber/8 p-6 lg:p-8">
                <p className="text-sm uppercase tracking-[0.28em] text-brand-amber">
                  Lokasi & Ulasan
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-white">
                  Silakan cek lokasi dan ulasan kami di Google Maps agar Anda
                  lebih yakin sebelum memesan.
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-200">
                  Ini membantu calon pelanggan memverifikasi bisnis, melihat
                  titik lokasi, dan menilai kenyamanan bertransaksi sebelum
                  menghubungi WhatsApp.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <ButtonLink href={siteConfig.mapsUrl}>Lihat Ulasan</ButtonLink>
                  <ButtonLink href="#maps" variant="secondary">
                    Buka Section Maps
                  </ButtonLink>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {testimonials.map((item) => (
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
                    <p className="mt-3 text-sm leading-7 text-zinc-300">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section-shell">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <SectionHeading
              eyebrow="FAQ"
              title="Pertanyaan yang paling sering ditanyakan sebelum order"
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
                  <p className="mt-4 text-sm leading-7 text-zinc-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="maps" className="section-shell border-y border-white/10">
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
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  {siteConfig.address}
                </p>
                <div className="mt-6 grid gap-3">
                  {siteConfig.whatsappContacts.map((contact) => (
                    <a
                      key={contact.number}
                      href={contact.url}
                      className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-sm text-zinc-200 transition hover:border-brand-amber/50 hover:bg-black/35"
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

        <section className="section-shell">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="overflow-hidden rounded-[2.25rem] border border-brand-amber/20 bg-[linear-gradient(135deg,rgba(239,57,69,0.18),rgba(17,28,54,0.9))] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.28)] lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-brand-amber">
                    CTA Penutup
                  </p>
                  <h2 className="mt-4 font-display text-4xl leading-none text-white sm:text-5xl">
                    Siap konsultasi kebutuhan pagar, kanopi, stainless, pintu
                    besi, atau perbaikan las di Bekasi?
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-200 sm:text-base">
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
                  <ButtonLink href="#portfolio" variant="ghost">
                    Lihat Portfolio
                  </ButtonLink>
                  <ButtonLink href="#maps" variant="ghost">
                    Cek Lokasi
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
