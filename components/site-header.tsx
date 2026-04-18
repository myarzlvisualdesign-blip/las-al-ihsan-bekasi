"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandLockup } from "@/components/brand-logo";
import { ButtonLink } from "@/components/button-link";

type SiteHeaderProps = {
  currentPath?: string;
  navigation: Array<{
    href: string;
    label: string;
    isVisible?: boolean;
    isExternal?: boolean;
  }>;
  ctaHref: string;
  ctaLabel: string;
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

export function SiteHeader({
  currentPath = "/",
  navigation,
  ctaHref,
  ctaLabel,
}: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = isOpen ? "hidden" : originalOverflow;

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const visibleNavigation = navigation.filter((item) => item.isVisible !== false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[1.75rem] border border-white/75 bg-[rgba(248,245,239,0.82)] shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="flex h-[4.75rem] items-center justify-between gap-4 px-4 sm:px-5 lg:px-6">
            <Link
              href="/"
              className="max-w-[calc(100%-4rem)] shrink-0 lg:max-w-none"
              onClick={() => setIsOpen(false)}
            >
              <BrandLockup className="max-w-full" />
            </Link>
            <nav className="hidden items-center gap-1 rounded-full border border-white/80 bg-white/76 px-2 py-2 text-sm font-semibold text-[#4e5d6d] shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:flex">
              {visibleNavigation.map((item) => {
                const isActive = currentPath === item.href;

                return item.isExternal ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    className={`rounded-full px-4 py-2 transition ${
                      isActive
                        ? "bg-[#182433] text-white shadow-[0_12px_24px_rgba(15,23,42,0.14)]"
                        : "hover:bg-[#f3ede5] hover:text-[#182433]"
                    }`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2 transition ${
                      isActive
                        ? "bg-[#182433] text-white shadow-[0_12px_24px_rgba(15,23,42,0.14)]"
                        : "hover:bg-[#f3ede5] hover:text-[#182433]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="hidden lg:block">
              <ButtonLink
                href={ctaHref}
                className="!min-h-[3rem] !rounded-full !px-5"
              >
                {ctaLabel}
              </ButtonLink>
            </div>
            <button
              type="button"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/84 shadow-[0_12px_28px_rgba(15,23,42,0.06)] lg:hidden"
            >
              <MenuIcon open={isOpen} />
            </button>
          </div>
        </div>
        <div
          className={`fixed inset-x-0 top-[5.75rem] bottom-0 bg-transparent px-4 pb-6 pt-3 transition duration-300 lg:hidden ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-h-[calc(100dvh-6.75rem)] overflow-y-auto rounded-[1.8rem] border border-[#ece6dc] bg-white p-4 shadow-[0_24px_54px_rgba(15,23,42,0.12)]">
              <div className="grid gap-2">
                {visibleNavigation.map((item) =>
                  item.isExternal ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      onClick={() => setIsOpen(false)}
                      className="rounded-2xl border border-[#ece6dc] bg-[#f8f6f2] px-4 py-3 font-semibold text-[#253243] transition hover:border-[#182433]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`rounded-2xl px-4 py-3 font-semibold transition ${
                        currentPath === item.href
                          ? "bg-[#182433] text-white"
                          : "border border-[#ece6dc] bg-[#f8f6f2] text-[#253243] hover:border-[#182433]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
              <div className="mt-4 rounded-[1.4rem] border border-[#e1ddd5] bg-[#f8f5f0] p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-amber">
                  Kontak Cepat
                </p>
                <p className="mt-3 text-lg font-semibold text-[#182433]">
                  Konsultasi langsung dari WhatsApp.
                </p>
                <div className="mt-4 grid gap-3">
                  <ButtonLink href={ctaHref} className="w-full !rounded-[1.35rem]">
                    {ctaLabel}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
