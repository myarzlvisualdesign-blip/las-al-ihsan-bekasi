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
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src="/icon.png"
        alt="Icon Bengkel Las Al-Ihsan Bekasi"
        width={72}
        height={72}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export function BrandLockup({ className = "" }: BrandLockupProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className="relative h-[2.45rem] w-[9.75rem] sm:h-[2.65rem] sm:w-[10.75rem] lg:h-[2.8rem] lg:w-[11.5rem]">
        <Image
          src="/images/logo-al-ihsan.png"
          alt="Logo Bengkel Las Al-Ihsan Bekasi"
          fill
          sizes="(max-width: 640px) 156px, (max-width: 1024px) 172px, 184px"
          className="object-contain object-left"
          priority
        />
      </div>
    </div>
  );
}

export function BrandLogo({
  compact = false,
  className = "",
}: BrandLogoProps) {
  return (
    <div className={`inline-flex max-w-full flex-col gap-3 ${className}`}>
      <Image
        src="/images/logo-al-ihsan.png"
        alt="Logo Bengkel Las Al-Ihsan Bekasi"
        width={compact ? 240 : 760}
        height={compact ? 65 : 205}
        sizes={compact ? "240px" : "(max-width: 768px) 90vw, 760px"}
        className="h-auto w-full object-contain"
        priority={!compact}
      />
      {!compact && (
        <p className="text-sm leading-7 text-[#526172]">
          Pagar, kanopi, stainless, pintu besi, rolling door, perbaikan, dan
          layanan panggilan untuk area Bekasi dan sekitarnya.
        </p>
      )}
    </div>
  );
}
