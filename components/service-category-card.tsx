import type { ServiceCategory } from "@/lib/site";

type ServiceCategoryCardProps = {
  category: ServiceCategory;
};

export function ServiceCategoryCard({
  category,
}: ServiceCategoryCardProps) {
  return (
    <article className="rounded-[30px] border border-[#d6e0f5] bg-white p-6 text-[#17336c] shadow-[0_24px_70px_rgba(7,34,82,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand-amber">
            {category.badge}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-[#17336c]">
            {category.title}
          </h3>
        </div>
        <span className="rounded-full border border-[#d8e3f7] bg-[#f4f8ff] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#17336c]">
          Las
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        {category.description}
      </p>
      <ul className="mt-5 grid gap-2 text-sm text-[#17336c]">
        {category.bullets.map((bullet) => (
          <li
            key={bullet}
            className="rounded-2xl border border-[#d8e3f7] bg-[#f6f9ff] px-4 py-3"
          >
            {bullet}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm leading-7 text-slate-500">{category.note}</p>
    </article>
  );
}
