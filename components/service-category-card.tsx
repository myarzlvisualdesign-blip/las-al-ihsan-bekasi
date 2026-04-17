import type { ServiceCategory } from "@/lib/site";

type ServiceCategoryCardProps = {
  category: ServiceCategory;
};

export function ServiceCategoryCard({
  category,
}: ServiceCategoryCardProps) {
  return (
    <article className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.14))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.16)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand-amber">
            {category.badge}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            {category.title}
          </h3>
        </div>
        <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-zinc-300">
          Las
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-zinc-300">
        {category.description}
      </p>
      <ul className="mt-5 grid gap-2 text-sm text-zinc-200">
        {category.bullets.map((bullet) => (
          <li
            key={bullet}
            className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
          >
            {bullet}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm leading-7 text-zinc-400">{category.note}</p>
    </article>
  );
}
