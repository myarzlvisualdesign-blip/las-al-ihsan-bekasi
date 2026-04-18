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
    align === "center"
      ? "site-fade-in mx-auto max-w-3xl text-center"
      : "site-fade-in max-w-3xl";

  return (
    <div className={wrapper}>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-amber">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-[2.35rem] leading-[1] text-[#182433] sm:text-[3.15rem]">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[#516072] sm:text-base">
        {description}
      </p>
    </div>
  );
}
