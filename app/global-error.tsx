"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-background px-4 py-10 text-foreground">
        <div className="mx-auto max-w-xl rounded-[32px] border border-[#ddd6cb] bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">
            Error
          </p>
          <h1 className="mt-4 font-display text-[2.5rem] leading-[0.94] text-[#182433]">
            Terjadi kendala saat memuat halaman.
          </h1>
          <p className="mt-4 text-sm leading-8 text-[#556476]">
            {error.message || "Silakan coba lagi."}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-[#29415e] bg-[#22364d] px-6 text-sm font-semibold text-white"
          >
            Coba lagi
          </button>
        </div>
      </body>
    </html>
  );
}
