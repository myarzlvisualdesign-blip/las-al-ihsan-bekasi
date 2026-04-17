import Link from "next/link";

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
      "bg-brand-amber text-white hover:bg-brand-amber-deep shadow-[0_14px_34px_rgba(225,29,63,0.28)]",
    secondary:
      "border border-[#b7c8e8] bg-white/92 text-[#17336c] hover:border-[#17336c] hover:bg-[#f2f6fd]",
    ghost:
      "border border-[#cfdbf2] bg-[#edf2fb] text-[#17336c] hover:bg-[#e3ebf8]",
  };

  const className = `${base} ${variants[variant]}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
