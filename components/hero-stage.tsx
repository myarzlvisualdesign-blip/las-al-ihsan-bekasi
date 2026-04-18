import type { ReactNode } from "react";
import Image from "next/image";

type HeroStageProps = {
  imageSrc: string;
  imageAlt: string;
  imageSizes: string;
  mediaClassName: string;
  overlayClassName: string;
  children: ReactNode;
};

export function HeroStage({
  imageSrc,
  imageAlt,
  imageSizes,
  mediaClassName,
  overlayClassName,
  children,
}: HeroStageProps) {
  return (
    <div className="overflow-hidden rounded-[34px] border border-[#d8d3cb] bg-[#102030] shadow-[0_28px_74px_rgba(15,23,42,0.18)]">
      <div className={`relative ${mediaClassName}`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes={imageSizes}
          className="object-cover"
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
}
