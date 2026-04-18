import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="max-w-xl rounded-[32px] border border-[#ddd6cb] bg-white p-8 text-center shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
          404
        </p>
        <h1 className="mt-4 font-display text-[3rem] leading-[0.94] text-[#182433]">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 text-sm leading-8 text-[#556476]">
          Link yang Anda buka mungkin sudah berubah atau belum tersedia.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-6 text-sm font-semibold text-white"
        >
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
