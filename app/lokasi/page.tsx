import type { Metadata } from "next";

import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import {
  ClosingCtaSection,
  MapsSection,
  PageIntro,
  ReviewsSection,
} from "@/components/site-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Lokasi Bengkel Las Bekasi | Google Maps Bengkel Las Al-Ihsan Bekasi",
  description:
    "Cek lokasi Bengkel Las Al-Ihsan Bekasi di Google Maps, buka ulasan, dan hubungi WhatsApp langsung untuk konsultasi pagar, kanopi, stainless, dan jasa las panggilan.",
  path: "/lokasi",
});

export default function LocationPage() {
  return (
    <>
      <SiteHeader currentPath="/lokasi" />
      <main className="overflow-x-clip">
        <PageIntro
          eyebrow="Lokasi"
          title="Lokasi bengkel, ulasan Google, dan jalur kontak dibuat jelas untuk memudahkan verifikasi sebelum pesan."
          description="Halaman ini menggabungkan peta lokasi, kontak aktif, sosial resmi, dan snapshot ulasan Google agar calon pelanggan bisa menilai bisnis dengan cepat dari perangkat mobile."
          secondaryHref="/ulasan"
          secondaryLabel="Lihat Ulasan"
        />
        <MapsSection />
        <ReviewsSection />
        <ClosingCtaSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
