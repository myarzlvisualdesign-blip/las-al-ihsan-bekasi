import type { Metadata } from "next";

import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import {
  ClosingCtaSection,
  PageIntro,
  PortfolioSection,
} from "@/components/site-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio Bengkel Las Bekasi | Hasil Pagar, Kanopi, Stainless & Tangga",
  description:
    "Lihat portfolio asli Bengkel Las Al-Ihsan Bekasi untuk pekerjaan pagar besi, kanopi, stainless steel, tangga, folding gate, dan pintu besi.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader currentPath="/portfolio" />
      <main className="overflow-x-clip">
        <PageIntro
          eyebrow="Halaman Portfolio"
          title="Dokumentasi hasil kerja asli untuk membantu calon pelanggan menilai kualitas pengerjaan."
          description="Kami menampilkan foto proyek nyata dari Bengkel Las Al-Ihsan Bekasi agar pengunjung bisa melihat style hasil, kualitas finishing, dan ragam pekerjaan yang benar-benar pernah dikerjakan."
          secondaryHref="/lokasi"
          secondaryLabel="Lihat Lokasi Bengkel"
        />
        <PortfolioSection />
        <ClosingCtaSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
