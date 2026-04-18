import { ShowcaseCard } from "@/components/showcase-card";
import type { FeaturedService } from "@/lib/site";

type ServiceCardProps = {
  service: FeaturedService;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <ShowcaseCard
      image={service.image}
      alt={service.alt}
      eyebrow={service.kicker}
      title={service.title}
      description={service.description}
      sizes="(max-width: 768px) 100vw, 40vw"
      footer={
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#7a6555]">
          Dokumentasi proyek asli
        </p>
      }
    />
  );
}
