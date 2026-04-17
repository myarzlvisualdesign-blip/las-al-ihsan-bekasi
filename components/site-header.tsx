"use client";

import Link from "next/link";
import { useState } from "react";

import { BrandLockup } from "@/components/brand-logo";
import { ButtonLink } from "@/components/button-link";
import { SocialLinks } from "@/components/social-links";
import { navigationLinks, siteConfig } from "@/lib/site";

type SiteHeaderProps = {
  currentPath?: string;
};

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6">
      <span
        className={`absolute left-0 h-[2px] w-6 rounded-full bg-[#17336c] transition ${
          open ? "top-2 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-2 h-[2px] w-6 rounded-full bg-[#17336c] transition ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-[2px] w-6 rounded-full bg-[#17336c] transition ${
          open ? "top-2 -rotate-45" : "top-4"
        }`}
      />
    </span>
  );
}

export function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d9e3f1]/80 bg-white/96 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="min-w-0" onClick={() => setIsOpen(false)}>
            <BrandLockup className="max-w-full" />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#17336c] lg:flex">
            {navigationLinks.map((item) => {
              const isActive = currentPath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition hover:text-[#e11d3f] ${
                    isActive ? "text-[#e11d3f]" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:block">
            <ButtonLink href={siteConfig.whatsappPrimaryUrl}>WhatsApp</ButtonLink>
          </div>
          <button
            type="button"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d6e0f5] bg-[#f5f8ff] lg:hidden"
          >
            <MenuIcon open={isOpen} />
          </button>
        </div>
        <div
          className={`overflow-hidden transition-[max-height,opacity,padding] duration-300 lg:hidden ${
            isOpen ? "max-h-[32rem] pb-5 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-[1.8rem] border border-[#d6e0f5] bg-[#f7faff] p-4 shadow-[0_20px_60px_rgba(11,44,102,0.08)]">
            <div className="grid gap-2">
              {navigationLinks.map((item) => {
                const isActive = currentPath === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-2xl px-4 py-3 font-semibold transition ${
                      isActive
                        ? "bg-[#17336c] text-white"
                        : "bg-white text-[#17336c]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-4">
              <ButtonLink href={siteConfig.whatsappPrimaryUrl}>
                Chat WhatsApp
              </ButtonLink>
            </div>
            <SocialLinks className="mt-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
