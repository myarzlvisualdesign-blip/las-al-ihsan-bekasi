type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const wrapper =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  return (
    <div className={wrapper}>
      <p className="text-sm uppercase tracking-[0.3em] text-brand-amber">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-none text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-sm leading-8 text-zinc-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}
