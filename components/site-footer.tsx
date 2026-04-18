import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { SocialLinks } from "@/components/social-links";

type SiteFooterProps = {
  description: string;
  copyright: string;
  navigation: Array<{
    href: string;
    label: string;
    isVisible?: boolean;
  }>;
  socialLinks: Array<{
    platform: string;
    label: string;
    url: string;
    isVisible?: boolean;
  }>;
  contactLinks: Array<{
    label: string;
    href: string;
  }>;
};

export function SiteFooter({
  description,
  copyright,
  navigation,
  socialLinks,
  contactLinks,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-[#ddd8cf] bg-[#f8f5ef]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.95fr_0.9fr] lg:px-8">
        <div>
          <BrandLogo compact className="max-w-[13rem]" />
          <p className="mt-4 max-w-md text-sm leading-7 text-[#556476]">
            {description}
          </p>
          <SocialLinks links={socialLinks} className="mt-5" iconOnly />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
            Navigasi
          </p>
          <div className="mt-4 grid gap-2 text-sm text-[#253243]">
            {navigation
              .filter((item) => item.isVisible !== false)
              .map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-[#182433]">
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
            Kontak
          </p>
          <div className="mt-4 grid gap-2 text-sm text-[#253243]">
            {contactLinks.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#ddd8cf] px-4 py-4 text-center text-xs text-[#6b7686] sm:px-6 lg:px-8">
        {copyright}
      </div>
    </footer>
  );
}
