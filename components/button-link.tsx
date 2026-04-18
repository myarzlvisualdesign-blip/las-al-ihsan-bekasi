import type { ReactNode } from "react";
import Link from "next/link";

import {
  ArrowRightIcon,
  InfoIcon,
  MapsIcon,
  PortfolioIcon,
  QuestionIcon,
  ServicesIcon,
  StarIcon,
  WhatsAppIcon,
} from "@/components/icons";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  icon?: ReactNode | "auto" | null;
};

function resolveButtonIcon(href: string) {
  const iconClassName =
    "h-[1.05rem] w-[1.05rem] shrink-0 transition duration-300 ease-out group-hover:scale-110";

  if (href.includes("wa.me")) {
    return <WhatsAppIcon className={iconClassName} />;
  }

  if (href.includes("maps") || href.includes("/lokasi")) {
    return <MapsIcon className={iconClassName} />;
  }

  if (href.includes("/portfolio")) {
    return <PortfolioIcon className={iconClassName} />;
  }

  if (href.includes("/ulasan") || href.includes("review")) {
    return <StarIcon className={iconClassName} />;
  }

  if (href.includes("/faq")) {
    return <QuestionIcon className={iconClassName} />;
  }

  if (href.includes("/layanan")) {
    return <ServicesIcon className={iconClassName} />;
  }

  if (href.includes("/tentang")) {
    return <InfoIcon className={iconClassName} />;
  }

  return (
    <ArrowRightIcon className={`${iconClassName} group-hover:translate-x-0.5`} />
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  icon = "auto",
}: ButtonLinkProps) {
  const base =
    "site-button group inline-flex min-h-[3.35rem] items-center justify-center gap-2.5 rounded-[1.25rem] px-5 py-3 text-sm font-semibold transition duration-300 ease-out";

  const variants = {
    primary:
      "border border-[#29415e] bg-[#22364d] text-white shadow-[0_14px_28px_rgba(15,23,42,0.14)] hover:bg-[#29415c]",
    secondary:
      "border border-[#cfd6de] bg-white text-[#182433] shadow-[0_14px_26px_rgba(15,23,42,0.06)] hover:border-[#182433] hover:bg-[#f7f5f0]",
    ghost:
      "border border-[#ddd8cd] bg-[#f7f4ee] text-[#364152] shadow-[0_12px_22px_rgba(15,23,42,0.05)] hover:bg-[#efeae2]",
  };

  const resolvedClassName = `${base} ${variants[variant]} ${className}`.trim();
  const resolvedIcon = icon === "auto" ? resolveButtonIcon(href) : icon;
  const content = (
    <>
      {resolvedIcon ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {resolvedIcon}
        </span>
      ) : null}
      <span>{children}</span>
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={resolvedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={resolvedClassName}>
      {content}
    </a>
  );
}
