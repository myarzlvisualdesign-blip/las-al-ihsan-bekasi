import type { Metadata } from "next";

import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import {
  AboutSection,
  AreasSection,
  ClosingCtaSection,
  PageIntro,
} from "@/components/site-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Tentang Bengkel Las Al-Ihsan Bekasi | Jasa Las Bekasi yang Siap Survey",
  description:
    "Kenali Bengkel Las Al-Ihsan Bekasi, area layanan, fokus pengerjaan, dan cara kerja untuk kebutuhan pagar besi, kanopi, stainless, serta jasa las panggilan.",
  path: "/tentang",
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader currentPath="/tentang" />
      <main className="overflow-x-clip">
        <PageIntro
          eyebrow="Tentang Al-Ihsan"
          title="Profil bengkel las Bekasi yang dibangun untuk terlihat profesional dan mudah dipercaya."
          description="Halaman ini menjelaskan siapa Bengkel Las Al-Ihsan Bekasi, jenis pekerjaan yang dikerjakan, area layanan utama, dan alasan mengapa calon pelanggan bisa lebih yakin sebelum menghubungi WhatsApp."
          secondaryHref="/ulasan"
          secondaryLabel="Lihat Ulasan Google"
        />
        <AboutSection />
        <AreasSection />
        <ClosingCtaSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
