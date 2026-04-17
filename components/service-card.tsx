import Image from "next/image";

import type { FeaturedService } from "@/lib/site";

type ServiceCardProps = {
  service: FeaturedService;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="overflow-hidden rounded-[30px] border border-[#d6e0f5] bg-white shadow-[0_24px_70px_rgba(7,34,82,0.16)]">
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
        <h3 className="mt-3 text-2xl font-semibold text-[#17336c]">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {service.description}
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#4f6696]">
          Dokumentasi proyek asli
        </p>
      </div>
    </article>
  );
}
