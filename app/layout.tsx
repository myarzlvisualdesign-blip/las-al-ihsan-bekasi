import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

import "./globals.css";

import { getPublicSiteSnapshot } from "@/lib/cms/public";

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
  title: {
    default: "Bengkel Las Al-Ihsan Bekasi",
    template: "%s | Bengkel Las Al-Ihsan Bekasi",
  },
  manifest: "/manifest.webmanifest",
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const snapshot = await getPublicSiteSnapshot();
  const analyticsId = snapshot.business.googleAnalyticsId;

  return (
    <html
      lang="id"
      className={`${manrope.variable} ${barlowCondensed.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {analyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${analyticsId}');`}
            </Script>
          </>
        ) : null}
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
