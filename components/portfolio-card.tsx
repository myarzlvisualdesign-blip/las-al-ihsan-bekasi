import { ShowcaseCard } from "@/components/showcase-card";
import type { PortfolioItem } from "@/lib/site";

type PortfolioCardProps = {
  item: PortfolioItem;
};

export function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <ShowcaseCard
      image={item.image}
      alt={item.alt}
      eyebrow={item.category}
      title={item.title}
      description={item.description}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
    />
  );
}
