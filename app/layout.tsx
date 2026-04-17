import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";

import "./globals.css";

import { LocalBusinessSchema } from "@/components/schema";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-alihsan-body",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-alihsan-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  ...buildMetadata({
    title: "Bengkel Las Bekasi | Al-Ihsan – Jasa Pagar, Kanopi & Stainless",
    description:
      "Bengkel Las Al-Ihsan Bekasi melayani pagar, kanopi, teralis, rolling door, stainless, dan jasa las panggilan. Cek lokasi & ulasan kami di Google Maps.",
  }),
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
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
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
      className={`${manrope.variable} ${barlowCondensed.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}
