import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { CmsSnapshot } from "@/lib/cms/types";
import {
  getSection,
  readTextBlock,
} from "@/lib/cms/public";

export function PublicPageShell({
  snapshot,
  currentPath,
  children,
}: {
  snapshot: CmsSnapshot;
  currentPath: string;
  children: React.ReactNode;
}) {
  const navbarSection = getSection(snapshot.globalPage, "navbar");
  const footerSection = getSection(snapshot.globalPage, "footer");
  const floatingSection = getSection(snapshot.globalPage, "floating_whatsapp");

  return (
    <>
      <SiteHeader
        currentPath={currentPath}
        navigation={snapshot.navigation}
        ctaHref={
          readTextBlock(navbarSection, "ctaHref", snapshot.business.whatsappPrimaryUrl)
        }
        ctaLabel={readTextBlock(navbarSection, "ctaLabel", "Konsultasi WhatsApp")}
      />
      {children}
      <SiteFooter
        description={readTextBlock(
          footerSection,
          "description",
          snapshot.business.tagline || "",
        )}
        copyright={readTextBlock(
          footerSection,
          "copyright",
          `© ${new Date().getFullYear()} ${snapshot.business.businessName}`,
        ).replace("{{year}}", String(new Date().getFullYear()))}
        navigation={snapshot.navigation}
        socialLinks={snapshot.business.socialLinks}
        contactLinks={[
          {
            label: snapshot.business.primaryPhone,
            href: snapshot.business.whatsappPrimaryUrl,
          },
          ...(snapshot.business.whatsappSecondaryUrl
            ? [
                {
                  label: snapshot.business.secondaryPhone || "WhatsApp kedua",
                  href: snapshot.business.whatsappSecondaryUrl,
                },
              ]
            : []),
          ...(snapshot.business.instagramUrl
            ? [{ label: "Instagram", href: snapshot.business.instagramUrl }]
            : []),
          ...(snapshot.business.tiktokUrl
            ? [{ label: "TikTok", href: snapshot.business.tiktokUrl }]
            : []),
          { label: "Google Maps", href: snapshot.business.mapsUrl },
        ]}
      />
      {floatingSection && floatingSection.isVisible !== false ? (
        <FloatingWhatsApp
          href={readTextBlock(
            floatingSection,
            "href",
            snapshot.business.whatsappPrimaryUrl,
          )}
          label={readTextBlock(floatingSection, "label", "Chat WhatsApp")}
          ariaLabel={readTextBlock(
            floatingSection,
            "ariaLabel",
            "Chat WhatsApp",
          )}
        />
      ) : null}
    </>
  );
}
