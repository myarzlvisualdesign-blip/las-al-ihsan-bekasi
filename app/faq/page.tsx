import type { Metadata } from "next";

import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import {
  ClosingCtaSection,
  FaqSection,
  PageIntro,
} from "@/components/site-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "FAQ Jasa Las Bekasi | Pertanyaan Umum Bengkel Las Al-Ihsan Bekasi",
  description:
    "Pertanyaan umum tentang jasa las Bekasi, layanan Bengkel Las Al-Ihsan Bekasi, survey lokasi, custom desain, perbaikan, dan cara pesan lewat WhatsApp.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <SiteHeader currentPath="/faq" />
      <main className="overflow-x-clip">
        <PageIntro
          eyebrow="FAQ"
          title="Jawaban cepat untuk pertanyaan yang paling sering ditanyakan sebelum order jasa las Bekasi."
          description="Halaman FAQ dibuat untuk mempercepat proses tanya jawab, membantu SEO lokal, dan memberi penjelasan ringkas sebelum calon pelanggan menghubungi tim Bengkel Las Al-Ihsan Bekasi."
          secondaryHref="/layanan"
          secondaryLabel="Lihat Layanan"
        />
        <FaqSection />
        <ClosingCtaSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
