import { ButtonLink } from "@/components/button-link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="min-w-0">
          <p className="font-display text-3xl leading-none text-white">
            Al-Ihsan
          </p>
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-amber">
            Bengkel Las Bekasi
          </p>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-zinc-200 lg:flex">
          <a href="#services">Layanan</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#about">Tentang</a>
          <a href="#faq">FAQ</a>
          <a href="#maps">Maps</a>
        </nav>
        <div className="hidden lg:block">
          <ButtonLink href={siteConfig.whatsappPrimaryUrl}>WhatsApp</ButtonLink>
        </div>
      </div>
    </header>
  );
}
