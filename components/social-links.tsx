import { siteConfig } from "@/lib/site";
import {
  InstagramIcon,
  MapsIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";

type SocialLinkItem = {
  platform?: string;
  icon?: string;
  label: string;
  url: string;
  isVisible?: boolean;
  theme?: string;
};

type SocialLinksProps = {
  links?: readonly SocialLinkItem[];
  className?: string;
  iconOnly?: boolean;
};

const iconMap = {
  WHATSAPP: WhatsAppIcon,
  INSTAGRAM: InstagramIcon,
  TIKTOK: TikTokIcon,
  MAPS: MapsIcon,
  OTHER: MapsIcon,
};

const themeMap: Record<string, string> = {
  WHATSAPP: "border-[#0d5c4d] bg-[#0f9d58] text-white hover:bg-[#0d8a4d]",
  INSTAGRAM: "border-[#f4bdd5] bg-white text-[#e1306c] hover:bg-[#fff1f7]",
  TIKTOK: "border-[#cad7f0] bg-[#f4f8ff] text-[#17336c] hover:bg-[#e8f0fd]",
  MAPS: "border-[#cad7f0] bg-white text-[#17336c] hover:bg-[#f5f8ff]",
  OTHER: "border-[#ddd8cf] bg-white text-[#182433] hover:bg-[#f7f5f0]",
};

export function SocialLinks({
  links = siteConfig.socialLinks,
  className = "",
  iconOnly = false,
}: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {links.filter((social) => social.isVisible !== false).map((social) => {
        const socialKey = (social.platform ?? social.icon ?? "OTHER").toUpperCase();
        const Icon = iconMap[socialKey as keyof typeof iconMap] ?? MapsIcon;
        const baseClassName =
          "site-chip group inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition";

        return (
          <a
            key={`${socialKey}-${social.label}`}
            href={social.url}
            aria-label={social.label}
            className={`${baseClassName} ${
              social.theme ?? themeMap[socialKey] ?? themeMap.OTHER
            } ${iconOnly ? "h-11 w-11 justify-center px-0" : ""}`}
          >
            <Icon className="h-5 w-5 shrink-0 transition duration-300 ease-out group-hover:scale-110" />
            {!iconOnly && <span>{social.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
