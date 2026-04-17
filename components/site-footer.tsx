import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr_0.8fr] lg:px-8">
        <div>
          <p className="font-display text-3xl text-white">
            Bengkel Las Al-Ihsan Bekasi
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
            Landing page SEO-ready untuk jasa pagar, kanopi, stainless, dan
            pengerjaan las custom di Bekasi.
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-brand-amber">
            Navigasi
          </p>
          <div className="mt-4 grid gap-2 text-sm text-zinc-300">
            <a href="#services">Layanan</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#areas">Area Layanan</a>
            <a href="#faq">FAQ</a>
            <a href="#maps">Google Maps</a>
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-brand-amber">
            Kontak
          </p>
          <div className="mt-4 grid gap-2 text-sm text-zinc-300">
            <a href={siteConfig.whatsappPrimaryUrl}>{siteConfig.primaryPhone}</a>
            <a href={siteConfig.whatsappSecondaryUrl}>
              {siteConfig.secondaryPhone}
            </a>
            <a href={siteConfig.mapsUrl}>Google Maps</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-zinc-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Bengkel Las Al-Ihsan Bekasi. Semua hak
        cipta dilindungi.
      </div>
    </footer>
  );
}
