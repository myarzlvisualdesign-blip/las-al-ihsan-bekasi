import type { ServiceCategory } from "@/lib/site";

type ServiceCategoryCardProps = {
  category: ServiceCategory;
};

export function ServiceCategoryCard({
  category,
}: ServiceCategoryCardProps) {
  return (
    <article className="site-card rounded-[24px] border border-[#d8ddd7] bg-white p-6 text-[#182433] shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-amber">
            {category.badge}
          </p>
          <h3 className="mt-3 text-[1.5rem] font-semibold text-[#182433]">
            {category.title}
          </h3>
        </div>
        <span className="rounded-full border border-[#ddd8cd] bg-[#f7f4ee] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#415063]">
          Las
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-[#556476]">
        {category.description}
      </p>
      <ul className="mt-5 grid gap-2 text-sm text-[#182433]">
        {category.bullets.map((bullet) => (
          <li
            key={bullet}
            className="site-chip rounded-xl border border-[#e5e1d9] bg-[#f7f5f1] px-4 py-3"
          >
            {bullet}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm leading-7 text-[#6b7686]">{category.note}</p>
    </article>
  );
}
