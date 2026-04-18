# Bengkel Las Al-Ihsan Bekasi

Website company profile + CMS custom untuk Bengkel Las Al-Ihsan, dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL, Prisma, dan admin panel custom.

Project ini sekarang bukan lagi static landing page. Public website membaca konten dari database, admin panel mengelola section homepage, layanan, portfolio, FAQ, testimonial, kontak, media, dan SEO.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- PostgreSQL
- Prisma ORM
- Auth admin custom berbasis JWT + cookie httpOnly
- React Hook Form + Zod
- Local file uploads dengan adapter yang mudah dipindah ke S3/Cloudinary

## Fitur Utama

- Homepage public dinamis dari database
- Admin panel di `/admin`
- Login admin aman dengan password hash `bcryptjs`
- Editor section homepage berbasis `page -> section -> block`
- CRUD layanan, portfolio, FAQ, testimonial
- Manajemen kontak, social links, jam operasional, WhatsApp, Google Maps
- Manajemen SEO global dan SEO per halaman
- Dynamic `robots.txt`, `sitemap.xml`, `manifest.webmanifest`
- JSON-LD `LocalBusiness`, `BreadcrumbList`, `FAQPage`
- Upload dan hapus media ke `public/uploads`
- Seed content awal agar website langsung terisi

## Struktur Singkat

```text
app/
  admin/
  api/admin/
  portfolio/[slug]/
  robots.ts
  sitemap.ts
  manifest.ts
components/
  admin/
  public-page-shell.tsx
  public-sections.tsx
lib/
  auth/
  cms/
  storage/
  validation/
  metadata.ts
  seo.ts
  prisma.ts
prisma/
  schema.prisma
  seed.ts
public/
  images/
  uploads/
```

## Environment Variables

Buat file `.env`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
AUTH_SECRET="ganti-dengan-secret-random-minimal-32-karakter"
NEXT_PUBLIC_SITE_URL="https://bengkellasal-ihsan.com"
```

Catatan:

- `DATABASE_URL` opsional. Jika ada, CMS memakai PostgreSQL + Prisma sebagai source of truth.
- Jika `DATABASE_URL` belum ada, admin panel tetap aktif memakai local persistent store di `data/cms-state.json` dan file upload di `public/uploads`.
- `AUTH_SECRET` wajib di production.

## Setup Lokal

```bash
npm install
npm run dev
```

Jika ingin mode PostgreSQL:

```bash
npm run db:push
npm run db:seed
```

Admin login default dari seed:

- Email: `admin@alihsan.local`
- Password: `Admin123!`

## Verifikasi

```bash
npm run lint
npm run build
```

Opsional:

```bash
npm run typecheck
```

## Menjalankan Production Secara Lokal

```bash
npm run build
npm run start
```

## Deploy

Karena project ini memakai Prisma + route handlers + admin auth + upload file, deploy static ke Cloudflare Pages direct upload tidak lagi cocok.

Gunakan platform Node.js/serverful seperti:

- Vercel
- Railway
- Render
- VPS sendiri dengan PM2/Docker/Nginx

Checklist deploy:

1. Pilih mode persistence:
   PostgreSQL production untuk mode utama yang direkomendasikan, atau local file store jika deploy di server dengan filesystem persisten.
2. Set semua env vars production.
3. Jalankan `npm install`.
4. Jika memakai PostgreSQL, jalankan `npm run db:push`.
5. Jika memakai PostgreSQL, jalankan `npm run db:seed` sekali untuk initial content.
6. Jalankan `npm run build`.
7. Serve aplikasi dengan `npm run start`.

Catatan media:

- Upload lokal disimpan di `public/uploads`.
- Local persistent store disimpan di `data/cms-state.json`.
- Untuk deployment ephemeral filesystem, pindahkan adapter upload ke object storage seperti S3/Cloudinary/R2 dan aktifkan PostgreSQL production.

## SEO Yang Sudah Diimplementasikan

- Metadata dinamis per halaman
- Open Graph dan Twitter Card
- Canonical URL
- Robots meta dan `robots.txt`
- Dynamic sitemap
- JSON-LD `LocalBusiness`
- JSON-LD `BreadcrumbList`
- JSON-LD `FAQPage`
- Slug portfolio yang SEO-friendly
- Alt text media dari database
- Area served lokal: Bekasi, Jakarta, dan sekitarnya

## Catatan Teknis

- Admin route dilindungi cookie session `httpOnly`.
- Password admin di-hash.
- Semua save admin menulis ke database lalu memanggil revalidation.
- Fallback content tetap tersedia saat database belum disiapkan.
- Warning Next.js yang masih tersisa saat build: konvensi file `middleware.ts` sudah deprecated dan disarankan migrasi ke `proxy.ts`.
