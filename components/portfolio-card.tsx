import Image from "next/image";

import type { PortfolioItem } from "@/lib/site";

type PortfolioCardProps = {
  item: PortfolioItem;
};

export function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <article className="overflow-hidden rounded-[30px] border border-white/10 bg-white/5">
      <div className="relative aspect-[4/3]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-amber">
          {item.category}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
        <p className="mt-2 text-sm leading-7 text-zinc-400">{item.description}</p>
      </div>
    </article>
  );
}
