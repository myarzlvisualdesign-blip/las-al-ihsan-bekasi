import Image from "next/image";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({
  compact = false,
  className = "",
}: BrandLogoProps) {
  return (
    <div
      className={`inline-flex max-w-full flex-col gap-3 rounded-[1.6rem] border border-[#dce5f5] bg-white p-3 shadow-[0_22px_60px_rgba(23,51,108,0.16)] sm:p-4 ${className}`}
    >
      <Image
        src="/images/logo-al-ihsan.png"
        alt="Logo Bengkel Las Al-Ihsan Bekasi"
        width={compact ? 280 : 760}
        height={compact ? 76 : 205}
        sizes={compact ? "280px" : "(max-width: 768px) 90vw, 760px"}
        className="h-auto w-full"
        priority={!compact}
      />
      {!compact && (
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#eef3fb] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#17336c]">
            Terima Perbaikan
          </span>
          <span className="rounded-full bg-[#eef3fb] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#17336c]">
            Pengecatan
          </span>
          <span className="rounded-full bg-[#e11d3f] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white">
            Layanan Panggilan
          </span>
        </div>
      )}
    </div>
  );
}
