import { JsonLd } from "@/components/schema";
import { PublicPageShell } from "@/components/public-page-shell";
import {
  ClosingCtaSection,
  FaqSection,
  PageIntro,
} from "@/components/public-sections";
import { buildBreadcrumbSchema, buildFaqSchema, buildMetadataForRoute } from "@/lib/seo";
import { getPagePayload, getSection } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadataForRoute("/faq");
}

export default async function FaqPage() {
  const snapshot = await getPagePayload("/faq");
  const intro = getSection(snapshot.page, "intro");
  const homeFaq = getSection(
    snapshot.pages.find((item) => item.route === "/") ?? snapshot.page,
    "faq",
  );
  const cta = getSection(snapshot.globalPage, "cta");

  return (
    <PublicPageShell snapshot={snapshot} currentPath="/faq">
      <JsonLd data={buildFaqSchema(snapshot.faqs)} />
      <JsonLd
        data={buildBreadcrumbSchema(snapshot.business.siteUrl, [
          { name: "Beranda", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <main className="overflow-x-clip">
        {intro ? <PageIntro section={intro} /> : null}
        {homeFaq ? <FaqSection section={homeFaq} faqs={snapshot.faqs} /> : null}
        {cta ? <ClosingCtaSection section={cta} /> : null}
      </main>
    </PublicPageShell>
  );
}
