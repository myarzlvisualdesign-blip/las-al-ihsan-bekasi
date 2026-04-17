import {
  InstagramIcon,
  MapsIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { siteConfig } from "@/lib/site";

type SocialLinksProps = {
  className?: string;
  iconOnly?: boolean;
};

const iconMap = {
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  maps: MapsIcon,
};

export function SocialLinks({
  className = "",
  iconOnly = false,
}: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {siteConfig.socialLinks.map((social) => {
        const Icon = iconMap[social.icon];

        return (
          <a
            key={social.label}
            href={social.url}
            aria-label={social.label}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              social.theme
            } ${iconOnly ? "h-11 w-11 justify-center px-0" : ""}`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!iconOnly && <span>{social.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
