import { siteConfig } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={siteConfig.whatsappPrimaryUrl}
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-500 px-4 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(16,185,129,0.35)] transition hover:bg-emerald-400"
      aria-label="Chat WhatsApp Bengkel Las Al-Ihsan Bekasi"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
        WA
      </span>
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}
