import { JsonLd } from "@/components/schema";
import { PublicPageShell } from "@/components/public-page-shell";
import {
  ClosingCtaSection,
  PageIntro,
  ServicesSection,
} from "@/components/public-sections";
import { buildBreadcrumbSchema, buildLocalBusinessSchema, buildMetadataForRoute } from "@/lib/seo";
import { getPagePayload, getSection } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadataForRoute("/layanan");
}

export default async function ServicesPage() {
  const snapshot = await getPagePayload("/layanan");
  const intro = getSection(snapshot.page, "intro");
  const cta = getSection(snapshot.globalPage, "cta");
  const servicesSection = getSection(
    snapshot.pages.find((item) => item.route === "/") ?? snapshot.page,
    "services",
  );

  return (
    <PublicPageShell snapshot={snapshot} currentPath="/layanan">
      <JsonLd data={buildLocalBusinessSchema(snapshot)} />
      <JsonLd
        data={buildBreadcrumbSchema(snapshot.business.siteUrl, [
          { name: "Beranda", path: "/" },
          { name: "Layanan", path: "/layanan" },
        ])}
      />
      <main className="overflow-x-clip">
        {intro ? <PageIntro section={intro} /> : null}
        {servicesSection ? (
          <ServicesSection
            section={servicesSection}
            services={snapshot.services}
            limit={snapshot.services.length}
          />
        ) : null}
        {cta ? <ClosingCtaSection section={cta} /> : null}
      </main>
    </PublicPageShell>
  );
}
