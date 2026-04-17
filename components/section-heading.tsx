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
      <h2 className="mt-4 font-display text-[2.6rem] leading-[0.95] text-white sm:text-[3.4rem]">
        {title}
      </h2>
      <p className="mt-5 text-sm leading-8 text-zinc-300 sm:text-base">
        {description}
      </p>
    </div>
  );
}
