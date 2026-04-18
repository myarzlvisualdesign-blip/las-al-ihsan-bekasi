import { JsonLd } from "@/components/schema";
import { PublicPageShell } from "@/components/public-page-shell";
import {
  ClosingCtaSection,
  PageIntro,
  PortfolioSection,
} from "@/components/public-sections";
import { buildBreadcrumbSchema, buildMetadataForRoute } from "@/lib/seo";
import { getPagePayload, getSection } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadataForRoute("/portfolio");
}

export default async function PortfolioPage() {
  const snapshot = await getPagePayload("/portfolio");
  const intro = getSection(snapshot.page, "intro");
  const cta = getSection(snapshot.globalPage, "cta");
  const portfolioSection = getSection(
    snapshot.pages.find((item) => item.route === "/") ?? snapshot.page,
    "portfolio",
  );

  return (
    <PublicPageShell snapshot={snapshot} currentPath="/portfolio">
      <JsonLd
        data={buildBreadcrumbSchema(snapshot.business.siteUrl, [
          { name: "Beranda", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ])}
      />
      <main className="overflow-x-clip">
        {intro ? <PageIntro section={intro} /> : null}
        {portfolioSection ? (
          <PortfolioSection
            section={portfolioSection}
            portfolio={snapshot.portfolio}
          />
        ) : null}
        {cta ? <ClosingCtaSection section={cta} /> : null}
      </main>
    </PublicPageShell>
  );
}
