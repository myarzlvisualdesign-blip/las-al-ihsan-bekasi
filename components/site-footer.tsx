import { BrandLogo } from "@/components/brand-logo";
import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d6e0f0] bg-[#f3f7fd]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.95fr_0.9fr] lg:px-8">
        <div>
          <BrandLogo compact />
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            Landing page SEO-ready untuk jasa pagar, kanopi, stainless, dan
            pengerjaan las custom di Bekasi.
          </p>
          <SocialLinks className="mt-5" iconOnly />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#ef3945]">
            Navigasi
          </p>
          <div className="mt-4 grid gap-2 text-sm text-[#243d6b]">
            <a href="#services">Layanan</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#areas">Area Layanan</a>
            <a href="#faq">FAQ</a>
            <a href="#maps">Google Maps</a>
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#ef3945]">
            Kontak
          </p>
          <div className="mt-4 grid gap-2 text-sm text-[#243d6b]">
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
