import Image from "next/image";

import { ButtonLink } from "@/components/button-link";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { PortfolioCard } from "@/components/portfolio-card";
import { LocalBusinessSchema } from "@/components/schema";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  additionalServices,
  areas,
  faqs,
  featuredServices,
  portfolioItems,
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
          <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24">
            <div className="flex flex-col justify-center">
              <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-brand-amber/90">
                Bengkel Las Bekasi
              </p>
              <h1 className="max-w-4xl font-display text-5xl leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
                Bengkel Las Al-Ihsan Bekasi untuk pagar, kanopi, stainless, dan
                pengerjaan custom yang rapi.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
                Bengkel Las Al-Ihsan Bekasi melayani{" "}
                <a className="text-brand-amber" href="#services">
                  jasa las Bekasi
                </a>{" "}
                untuk rumah, ruko, dan proyek renovasi. Kami mengerjakan{" "}
                <a className="text-brand-amber" href="#services">
                  pagar besi Bekasi
                </a>
                ,{" "}
                <a className="text-brand-amber" href="#services">
                  kanopi Bekasi
                </a>
                , teralis, pintu besi, railing, dan{" "}
                <a className="text-brand-amber" href="#services">
                  stainless Bekasi
                </a>{" "}
                dengan layanan survey, perbaikan, pengecatan, dan panggilan ke
                lokasi.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={siteConfig.whatsappPrimaryUrl}>
                  Chat WhatsApp Utama
                </ButtonLink>
                <ButtonLink href="#maps" variant="secondary">
                  Cek Lokasi di Maps
                </ButtonLink>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
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
              <div className="absolute -right-10 bottom-12 hidden h-40 w-40 rounded-full bg-brand-steel/40 blur-3xl lg:block" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(250,204,21,0.18),rgba(255,255,255,0)_38%,rgba(15,23,42,0.5))]" />
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
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 sm:p-8">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.28em] text-brand-amber/85">
                        Fokus Pengerjaan
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        Pagar, kanopi, stainless, railing, teralis, dan pintu
                        besi.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.28em] text-brand-amber/85">
                        Area Layanan
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        Bekasi, Tambun, Cikarang, Babelan, dan sekitarnya.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 ml-auto max-w-sm rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-brand-amber">
                  Bengkel Las Terdekat Bekasi
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  Cocok untuk kebutuhan rumah tinggal, pagar minimalis, kanopi
                  carport, tangga putar, hingga perbaikan las panggilan yang
                  butuh respon cepat.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
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
              title="Jasa bengkel las Bekasi yang fokus pada hasil kokoh, komunikasi jelas, dan pengerjaan rapi."
              description="Struktur marketing kami menekankan hal yang paling dicari calon pelanggan: hasil nyata, proses jelas, lokasi yang mudah dicek, dan jalur WhatsApp yang cepat untuk closing."
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
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
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
              title="Layanan utama Bengkel Las Al-Ihsan Bekasi"
              description="Semua layanan disusun natural untuk target keyword lokal seperti bengkel las Bekasi, jasa las Bekasi, pagar besi Bekasi, kanopi Bekasi, dan stainless Bekasi."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="grid gap-6 md:grid-cols-2">
                {featuredServices.map((service) => (
                  <ServiceCard key={service.title} service={service} />
                ))}
              </div>
              <aside className="rounded-[32px] border border-white/10 bg-white/5 p-6 lg:p-8">
                <p className="text-sm uppercase tracking-[0.28em] text-brand-amber">
                  Layanan Tambahan
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Siap menerima perbaikan, pengecatan, dan layanan panggilan.
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Jika Anda sedang mencari bengkel las terdekat Bekasi untuk
                  pekerjaan custom maupun perbaikan, tim kami siap survey dan
                  memberi arahan kebutuhan material yang sesuai.
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
                  <ButtonLink href={siteConfig.whatsappSecondaryUrl} variant="ghost">
                    Chat Nomor Cadangan
                  </ButtonLink>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section-shell">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <SectionHeading
              eyebrow="Portfolio"
              title="Dokumentasi proyek asli dari folder LAS"
              description="Kami memakai gambar proyek nyata untuk membantu calon pelanggan menilai kualitas finishing, model desain, dan kecocokan hasil sebelum menghubungi WhatsApp."
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
                title="Bengkel Las Al-Ihsan Bekasi melayani pengerjaan rumah tinggal, ruko, dan proyek custom."
                description="Kami membangun kepercayaan lewat lokasi yang jelas, dokumentasi proyek nyata, dan komunikasi langsung lewat WhatsApp. Ini penting untuk mendukung closing, SEO lokal, dan validitas bisnis di Google Maps."
                align="left"
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">
                    Pengerjaan yang dilayani
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    Pagar, teralis, stainless steel, tangga putar, folding gate,
                    pintu besi, rolling door, hingga kanopi.
                  </p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">
                    Untuk kebutuhan lapangan
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    Perbaikan, pengecatan, dan layanan panggilan untuk area
                    Bekasi dan sekitarnya.
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
              description="Fokus utama kami adalah Bekasi, dengan jangkauan survey dan pengerjaan ke Tambun, Cikarang, Babelan, dan area sekitar sesuai kebutuhan proyek."
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
              title="Testimoni & kepercayaan pelanggan"
              description="Agar tidak menampilkan social proof palsu, halaman ini mengarahkan calon pelanggan untuk melihat ulasan asli langsung di Google Maps. Di bawah ini adalah alasan kenapa bisnis ini mudah dipercaya sebelum deal."
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
                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  Ini membantu calon pelanggan memverifikasi bisnis, melihat
                  foto, dan menilai kenyamanan bertransaksi sebelum menghubungi
                  WhatsApp.
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
                    <p className="mt-3 text-sm leading-7 text-zinc-400">
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
              title="Pertanyaan yang paling sering ditanyakan"
              description="Struktur FAQ membantu SEO, memperjelas proses kerja, dan memudahkan calon pelanggan yang mencari bengkel las Bekasi secara cepat dari mobile."
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
                  <p className="mt-4 text-sm leading-7 text-zinc-400">
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
            <div className="overflow-hidden rounded-[2.25rem] border border-brand-amber/20 bg-[linear-gradient(135deg,rgba(250,204,21,0.16),rgba(0,0,0,0.55))] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.28)] lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-brand-amber">
                    CTA Penutup
                  </p>
                  <h2 className="mt-4 font-display text-4xl leading-none text-white sm:text-5xl">
                    Siap konsultasi kebutuhan pagar, kanopi, stainless, atau
                    perbaikan las di Bekasi?
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-200 sm:text-base">
                    Kirim foto lokasi, ukuran kasar, atau inspirasi desain Anda
                    lewat WhatsApp. Tim kami akan membantu arahan kebutuhan dan
                    penawaran awal secepat mungkin.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <ButtonLink href={siteConfig.whatsappPrimaryUrl}>
                    Chat WhatsApp Utama
                  </ButtonLink>
                  <ButtonLink href={siteConfig.whatsappSecondaryUrl} variant="secondary">
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
