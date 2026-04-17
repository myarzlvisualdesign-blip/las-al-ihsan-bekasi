import { WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={siteConfig.whatsappPrimaryUrl}
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(16,185,129,0.35)] transition hover:bg-emerald-600"
      aria-label="Chat WhatsApp Bengkel Las Al-Ihsan Bekasi"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
        <WhatsAppIcon className="h-5 w-5" />
      </span>
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}
