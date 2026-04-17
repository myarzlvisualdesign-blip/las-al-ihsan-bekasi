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
      "bg-brand-amber text-white hover:bg-brand-amber-deep shadow-[0_14px_34px_rgba(239,57,69,0.24)]",
    secondary:
      "border border-[#b7c8e8] bg-white/92 text-[#243d6b] hover:border-[#243d6b] hover:bg-[#f2f6fd]",
    ghost:
      "border border-[#cfdbf2] bg-[#edf2fb] text-[#243d6b] hover:bg-[#e3ebf8]",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </a>
  );
}
