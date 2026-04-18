import Link from "next/link";

import { BrandLockup } from "@/components/brand-logo";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pages/home", label: "Homepage" },
  { href: "/admin/services", label: "Layanan" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/media", label: "Media" },
];

type AdminShellProps = {
  currentPath: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminShell({
  currentPath,
  title,
  description,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f3ee_0%,#efe9df_100%)] text-[#182433]">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:grid-cols-[17rem_minmax(0,1fr)] lg:px-6">
        <aside className="rounded-[28px] border border-white/70 bg-[rgba(255,255,255,0.82)] p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <Link href="/admin" className="inline-flex max-w-full">
            <BrandLockup className="max-w-[11rem]" />
          </Link>
          <p className="mt-4 text-sm leading-7 text-[#556476]">
            CMS custom Bengkel Las Al-Ihsan untuk konten, media, SEO, dan
            struktur halaman.
          </p>
          <nav className="mt-8 grid gap-2">
            {adminLinks.map((item) => {
              const isActive = currentPath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#182433] text-white shadow-[0_16px_32px_rgba(15,23,42,0.16)]"
                      : "bg-[#f8f5f0] text-[#364152] hover:bg-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 rounded-[24px] border border-[#e4ddd3] bg-[#f8f5f0] p-4 text-sm text-[#556476]">
            <p className="font-semibold text-[#182433]">Default admin</p>
            <p className="mt-2">`admin@alihsan.local`</p>
            <p>Password awal: `Admin123!`</p>
          </div>
        </aside>

        <main className="rounded-[32px] border border-white/75 bg-[rgba(255,255,255,0.82)] p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:p-8">
          <div className="flex flex-col gap-4 border-b border-[#ebe3d8] pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
                Admin CMS
              </p>
              <h1 className="mt-3 font-display text-[2.4rem] leading-[0.96] text-[#182433] sm:text-[3rem]">
                {title}
              </h1>
              {description ? (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#556476]">
                  {description}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                target="_blank"
                className="inline-flex min-h-[3rem] items-center justify-center rounded-2xl border border-[#d8d0c5] bg-[#f8f5f0] px-5 text-sm font-semibold text-[#182433] transition hover:bg-white"
              >
                Lihat website
              </Link>
              <form action="/api/admin/logout" method="post">
                <button
                  type="submit"
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-5 text-sm font-semibold text-white transition hover:bg-[#29415c]"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
