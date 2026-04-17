import type { Metadata } from "next";
import { Manrope, Teko } from "next/font/google";

import "./globals.css";

import { siteConfig } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-alihsan-body",
  subsets: ["latin"],
});

const teko = Teko({
  variable: "--font-alihsan-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "Bengkel Las Bekasi | Al-Ihsan – Jasa Pagar, Kanopi & Stainless",
  description:
    "Bengkel Las Al-Ihsan Bekasi melayani pagar, kanopi, teralis, rolling door, stainless, dan jasa las panggilan. Cek lokasi & ulasan kami di Google Maps.",
  keywords: [
    "bengkel las bekasi",
    "jasa las bekasi",
    "pagar besi bekasi",
    "kanopi bekasi",
    "stainless bekasi",
    "bengkel las terdekat bekasi",
    "teralis bekasi",
    "pintu besi bekasi",
    "rolling door bekasi",
    "folding gate bekasi",
  ],
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.siteUrl,
    title: "Bengkel Las Bekasi | Al-Ihsan – Jasa Pagar, Kanopi & Stainless",
    description:
      "Bengkel Las Al-Ihsan Bekasi melayani pagar, kanopi, teralis, rolling door, stainless, dan jasa las panggilan. Cek lokasi & ulasan kami di Google Maps.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/hero-kanopi-modern.jpg",
        width: 1600,
        height: 1200,
        alt: "Logo Bengkel Las Al-Ihsan Bekasi dan dokumentasi proyek kanopi modern",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bengkel Las Bekasi | Al-Ihsan – Jasa Pagar, Kanopi & Stainless",
    description:
      "Bengkel Las Al-Ihsan Bekasi melayani pagar, kanopi, teralis, rolling door, stainless, dan jasa las panggilan.",
    images: ["/images/hero-kanopi-modern.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${manrope.variable} ${teko.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
