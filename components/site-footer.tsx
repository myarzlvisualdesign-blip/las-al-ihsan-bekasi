import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { SocialLinks } from "@/components/social-links";
import { navigationLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d6e0f0] bg-[#f4f7fe]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.95fr_0.9fr] lg:px-8">
        <div>
          <BrandLogo compact className="max-w-[13rem]" />
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            Bengkel Las Al-Ihsan Bekasi melayani pagar, kanopi, stainless,
            tangga, pintu besi, rolling door, perbaikan, pengecatan, dan
            layanan panggilan untuk area Bekasi dan sekitarnya.
          </p>
          <SocialLinks className="mt-5" iconOnly />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#e11d3f]">
            Navigasi
          </p>
          <div className="mt-4 grid gap-2 text-sm text-[#17336c]">
            {navigationLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#e11d3f]">
            Kontak
          </p>
          <div className="mt-4 grid gap-2 text-sm text-[#17336c]">
            <a href={siteConfig.whatsappPrimaryUrl}>{siteConfig.primaryPhone}</a>
            <a href={siteConfig.whatsappSecondaryUrl}>
              {siteConfig.secondaryPhone}
            </a>
            <a href={siteConfig.instagramUrl}>Instagram</a>
            <a href={siteConfig.tiktokUrl}>TikTok</a>
            <a href={siteConfig.mapsUrl}>Google Maps</a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#d6e0f0] px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Bengkel Las Al-Ihsan Bekasi. Semua hak
        cipta dilindungi.
      </div>
    </footer>
  );
}
