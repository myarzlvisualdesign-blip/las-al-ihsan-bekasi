import Image from "next/image";

import type { FeaturedService } from "@/lib/site";

type ServiceCardProps = {
  service: FeaturedService;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.16))] shadow-[0_24px_70px_rgba(0,0,0,0.16)]">
      <div className="relative aspect-[4/3]">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-amber">
          {service.kicker}
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-zinc-300">
          {service.description}
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#dbe5f7]">
          Dokumentasi proyek asli
        </p>
      </div>
    </article>
  );
}
