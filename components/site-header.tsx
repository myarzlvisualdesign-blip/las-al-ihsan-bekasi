import { BrandLogo } from "@/components/brand-logo";
import { ButtonLink } from "@/components/button-link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#d9e3f1] bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="min-w-0">
          <BrandLogo compact className="max-w-[20rem]" />
        </a>
        <nav className="hidden items-center gap-6 text-sm text-[#243d6b] lg:flex">
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
