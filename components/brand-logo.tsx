import Image from "next/image";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

type BrandMarkProps = {
  className?: string;
};

type BrandLockupProps = {
  className?: string;
};

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden rounded-2xl border border-[#d6e0f5] bg-white shadow-[0_14px_32px_rgba(8,35,84,0.14)] ${className}`}
    >
      <Image
        src="/icon.png"
        alt="Icon Bengkel Las Al-Ihsan Bekasi"
        width={72}
        height={72}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export function BrandLockup({ className = "" }: BrandLockupProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <BrandMark className="h-12 w-12 shrink-0 rounded-[1rem]" />
      <div className="min-w-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#e11d3f]">
          Bengkel Las
        </p>
        <p className="truncate font-display text-[1.3rem] leading-none text-[#17336c] sm:text-[1.55rem]">
          Al-Ihsan Bekasi
        </p>
      </div>
    </div>
  );
}

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
        width={compact ? 240 : 760}
        height={compact ? 65 : 205}
        sizes={compact ? "240px" : "(max-width: 768px) 90vw, 760px"}
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
