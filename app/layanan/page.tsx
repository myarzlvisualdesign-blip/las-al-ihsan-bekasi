import type { Metadata } from "next";

import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { PageIntro, ServicesSection, ClosingCtaSection } from "@/components/site-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Layanan Bengkel Las Bekasi | Pagar, Kanopi, Stainless & Rolling Door",
  description:
    "Lihat kategori layanan Bengkel Las Al-Ihsan Bekasi untuk pagar besi, kanopi, stainless, tangga putar, folding gate, pintu besi, rolling door, perbaikan, dan pengecatan.",
  path: "/layanan",
});

export default function ServicesPage() {
  return (
    <>
      <SiteHeader currentPath="/layanan" />
      <main className="overflow-x-clip">
        <PageIntro
          eyebrow="Halaman Layanan"
          title="Kategori jasa las Bekasi yang lengkap untuk rumah, ruko, dan kebutuhan custom."
          description="Halaman ini merangkum layanan utama Bengkel Las Al-Ihsan Bekasi secara lebih detail agar calon pelanggan cepat tahu apakah kebutuhan mereka masuk ke pagar, kanopi, stainless, tangga, rolling door, atau perbaikan."
          secondaryHref="/portfolio"
          secondaryLabel="Lihat Portfolio"
        />
        <ServicesSection />
        <ClosingCtaSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
