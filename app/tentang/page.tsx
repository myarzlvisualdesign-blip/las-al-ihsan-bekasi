import { JsonLd } from "@/components/schema";
import { PublicPageShell } from "@/components/public-page-shell";
import {
  AboutSection,
  ClosingCtaSection,
  ContactSection,
  PageIntro,
} from "@/components/public-sections";
import { buildBreadcrumbSchema, buildMetadataForRoute } from "@/lib/seo";
import { getPagePayload, getSection } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadataForRoute("/tentang");
}

export default async function AboutPage() {
  const snapshot = await getPagePayload("/tentang");
  const intro = getSection(snapshot.page, "intro");
  const homeAbout = getSection(
    snapshot.pages.find((item) => item.route === "/") ?? snapshot.page,
    "about",
  );
  const homeContact = getSection(
    snapshot.pages.find((item) => item.route === "/") ?? snapshot.page,
    "contact",
  );
  const cta = getSection(snapshot.globalPage, "cta");

  return (
    <PublicPageShell snapshot={snapshot} currentPath="/tentang">
      <JsonLd
        data={buildBreadcrumbSchema(snapshot.business.siteUrl, [
          { name: "Beranda", path: "/" },
          { name: "Tentang", path: "/tentang" },
        ])}
      />
      <main className="overflow-x-clip">
        {intro ? <PageIntro section={intro} /> : null}
        {homeAbout ? <AboutSection section={homeAbout} /> : null}
        {homeContact ? (
          <ContactSection section={homeContact} business={snapshot.business} />
        ) : null}
        {cta ? <ClosingCtaSection section={cta} /> : null}
      </main>
    </PublicPageShell>
  );
}
