import { WhatsAppIcon } from "@/components/icons";

export function FloatingWhatsApp({
  href,
  label,
  ariaLabel,
}: {
  href: string;
  label: string;
  ariaLabel: string;
}) {
  return (
    <a
      href={href}
      className="site-button site-bob fixed right-4 bottom-4 z-50 inline-flex items-center gap-3 rounded-xl border border-[#1f7a57] bg-[#1d8f63] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(29,143,99,0.24)] transition hover:bg-[#187a55]"
      aria-label={ariaLabel}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
        <WhatsAppIcon className="h-5 w-5" />
      </span>
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
