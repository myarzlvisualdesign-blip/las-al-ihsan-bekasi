import type { ReactNode } from "react";
import Image from "next/image";

type ShowcaseCardProps = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  sizes: string;
  footer?: ReactNode;
};

const showcaseCardClass =
  "site-card group overflow-hidden rounded-[24px] border border-[#d8ddd7] bg-white shadow-[0_16px_36px_rgba(15,23,42,0.06)]";

export function ShowcaseCard({
  image,
  alt,
  eyebrow,
  title,
  description,
  sizes,
  footer,
}: ShowcaseCardProps) {
  return (
    <article className={showcaseCardClass}>
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-[#182433]">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-[#556476]">{description}</p>
        {footer ? <div className="mt-5">{footer}</div> : null}
      </div>
    </article>
  );
}
