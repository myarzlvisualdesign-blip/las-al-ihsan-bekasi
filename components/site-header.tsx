import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { ButtonLink } from "@/components/button-link";
import { navigationLinks, siteConfig } from "@/lib/site";

type SiteHeaderProps = {
  currentPath?: string;
};

export function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#d9e3f1]/70 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/" className="min-w-0">
            <BrandLogo compact className="max-w-[15rem] sm:max-w-[18rem]" />
          </Link>
          <div className="hidden lg:block">
            <ButtonLink href={siteConfig.whatsappPrimaryUrl}>WhatsApp</ButtonLink>
          </div>
          <div className="lg:hidden">
            <ButtonLink href={siteConfig.whatsappPrimaryUrl}>Chat</ButtonLink>
          </div>
        </div>
        <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 text-sm text-[#17336c] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navigationLinks.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full border px-4 py-2 font-semibold transition ${
                  isActive
                    ? "border-[#17336c] bg-[#17336c] text-white"
                    : "border-[#d7e2f5] bg-[#f5f8ff] text-[#17336c] hover:border-[#17336c]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
