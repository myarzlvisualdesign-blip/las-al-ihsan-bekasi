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
  title: "Ulasan Bengkel Las Bekasi | Rating Google Bengkel Las Al-Ihsan Bekasi",
  description:
    "Cek snapshot rating Google dan jalur verifikasi ulasan Bengkel Las Al-Ihsan Bekasi. Buka Google Maps untuk melihat lokasi dan review langsung.",
  path: "/ulasan",
});

export default function ReviewsPage() {
  return (
    <>
      <SiteHeader currentPath="/ulasan" />
      <main className="overflow-x-clip">
        <PageIntro
          eyebrow="Ulasan Google"
          title="Social proof ditampilkan dari rating Google yang bisa dicek langsung, bukan dari testimonial buatan."
          description="Anda meminta card testimoni yang real. Karena itu halaman ini menampilkan snapshot rating Google Maps dan mengarahkan pengunjung langsung ke profil Maps bisnis agar verifikasi bisa dilakukan sendiri."
          secondaryHref="/faq"
          secondaryLabel="Baca FAQ"
        />
        <ReviewsSection />
        <MapsSection />
        <ClosingCtaSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
