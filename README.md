# Bengkel Las Al-Ihsan Bekasi

Landing page Next.js + TypeScript + Tailwind yang dibuat untuk kebutuhan lead generation WhatsApp, local SEO Bekasi, dan deploy ke Cloudflare Pages.

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS 4
- Static export untuk Cloudflare Pages

## Fitur

- Landing page profesional dengan fokus conversion
- SEO lokal Bekasi: metadata, canonical, sitemap, robots, internal link
- JSON-LD `LocalBusiness` + `FAQPage`
- CTA WhatsApp ganda
- Section lokasi dan ulasan Google Maps
- Portfolio dari gambar asli folder `LAS`
- Mobile-first dan ringan untuk direct upload ke Cloudflare Pages

## Struktur Project

```text
app/
  globals.css
  icon.svg
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  button-link.tsx
  floating-whatsapp.tsx
  portfolio-card.tsx
  schema.tsx
  section-heading.tsx
  service-card.tsx
  site-footer.tsx
  site-header.tsx
lib/
  site.ts
public/
  images/
```

## Menjalankan Lokal

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

Output statis akan berada di folder `out/`.

## Deploy Cloudflare Pages

Project ini memakai direct upload ke Pages.

```bash
npm run build
npm run deploy:cloudflare
```

## SEO yang Diimplementasikan

- Title:
  `Bengkel Las Bekasi | Al-Ihsan – Jasa Pagar, Kanopi & Stainless`
- Meta description:
  `Bengkel Las Al-Ihsan Bekasi melayani pagar, kanopi, teralis, rolling door, stainless, dan jasa las panggilan. Cek lokasi & ulasan kami di Google Maps.`
- Keyword target natural:
  `bengkel las bekasi`, `jasa las bekasi`, `pagar besi bekasi`, `kanopi bekasi`, `stainless bekasi`, `bengkel las terdekat bekasi`
- JSON-LD:
  `LocalBusiness`, `FAQPage`
- Metadata:
  Open Graph, Twitter Card, canonical
- Crawl:
  `robots.txt` dan `sitemap.xml`

## Catatan Konten

- Lokasi bisnis:
  `Jl. Bengkong Raya, RT.001/RW.006, Padurenan, Kec. Mustika Jaya, Kota Bekasi, Jawa Barat 17156`
- WhatsApp utama:
  `081389424370`
- WhatsApp kedua:
  `085889792571`
- Google Maps:
  `https://maps.app.goo.gl/Em9rP5zreHBsWsmA6`
