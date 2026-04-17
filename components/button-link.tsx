type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-200";

  const variants = {
    primary:
      "bg-brand-amber text-ink hover:bg-brand-amber-deep shadow-[0_12px_28px_rgba(250,204,21,0.18)]",
    secondary:
      "border border-white/15 bg-white/8 text-white hover:border-brand-amber/50 hover:bg-white/12",
    ghost:
      "border border-brand-amber/20 bg-brand-amber/8 text-brand-amber hover:bg-brand-amber/16",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </a>
  );
}
