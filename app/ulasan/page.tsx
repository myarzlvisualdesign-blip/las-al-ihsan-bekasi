import { JsonLd } from "@/components/schema";
import { PublicPageShell } from "@/components/public-page-shell";
import {
  ClosingCtaSection,
  ContactSection,
  PageIntro,
  TestimonialsSection,
} from "@/components/public-sections";
import { buildBreadcrumbSchema, buildMetadataForRoute } from "@/lib/seo";
import { getPagePayload, getSection } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadataForRoute("/ulasan");
}

export default async function ReviewsPage() {
  const snapshot = await getPagePayload("/ulasan");
  const intro = getSection(snapshot.page, "intro");
  const homeTestimonials = getSection(
    snapshot.pages.find((item) => item.route === "/") ?? snapshot.page,
    "testimonials",
  );
  const homeContact = getSection(
    snapshot.pages.find((item) => item.route === "/") ?? snapshot.page,
    "contact",
  );
  const cta = getSection(snapshot.globalPage, "cta");

  return (
    <PublicPageShell snapshot={snapshot} currentPath="/ulasan">
      <JsonLd
        data={buildBreadcrumbSchema(snapshot.business.siteUrl, [
          { name: "Beranda", path: "/" },
          { name: "Ulasan", path: "/ulasan" },
        ])}
      />
      <main className="overflow-x-clip">
        {intro ? <PageIntro section={intro} /> : null}
        {homeTestimonials ? (
          <TestimonialsSection
            section={homeTestimonials}
            testimonials={snapshot.testimonials}
          />
        ) : null}
        {homeContact ? (
          <ContactSection section={homeContact} business={snapshot.business} />
        ) : null}
        {cta ? <ClosingCtaSection section={cta} /> : null}
      </main>
    </PublicPageShell>
  );
}
