import { JsonLd } from "@/components/schema";
import { PublicPageShell } from "@/components/public-page-shell";
import {
  AboutSection,
  ClosingCtaSection,
  ContactSection,
  FaqSection,
  HeroSection,
  PortfolioSection,
  ServicesSection,
  TestimonialsSection,
} from "@/components/public-sections";
import { buildFaqSchema, buildLocalBusinessSchema, buildMetadataForRoute } from "@/lib/seo";
import { getPagePayload, getSection } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadataForRoute("/");
}

export default async function Home() {
  const snapshot = await getPagePayload("/");
  const hero = getSection(snapshot.page, "hero");
  const services = getSection(snapshot.page, "services");
  const portfolio = getSection(snapshot.page, "portfolio");
  const about = getSection(snapshot.page, "about");
  const testimonials = getSection(snapshot.page, "testimonials");
  const faq = getSection(snapshot.page, "faq");
  const contact = getSection(snapshot.page, "contact");
  const cta = getSection(snapshot.globalPage, "cta");

  return (
    <PublicPageShell snapshot={snapshot} currentPath="/">
      <JsonLd data={buildLocalBusinessSchema(snapshot)} />
      <JsonLd data={buildFaqSchema(snapshot.faqs)} />
      <main className="overflow-x-clip">
        {hero && hero.isVisible !== false ? <HeroSection section={hero} /> : null}
        {services && services.isVisible !== false ? (
          <ServicesSection section={services} services={snapshot.services} />
        ) : null}
        {portfolio && portfolio.isVisible !== false ? (
          <PortfolioSection
            section={portfolio}
            portfolio={snapshot.portfolio}
            featuredOnly
          />
        ) : null}
        {about && about.isVisible !== false ? <AboutSection section={about} /> : null}
        {testimonials && testimonials.isVisible !== false ? (
          <TestimonialsSection
            section={testimonials}
            testimonials={snapshot.testimonials}
          />
        ) : null}
        {faq && faq.isVisible !== false ? (
          <FaqSection section={faq} faqs={snapshot.faqs} />
        ) : null}
        {contact && contact.isVisible !== false ? (
          <ContactSection section={contact} business={snapshot.business} />
        ) : null}
        {cta && cta.isVisible !== false ? <ClosingCtaSection section={cta} /> : null}
      </main>
    </PublicPageShell>
  );
}
