import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import {
  AboutSection,
  AdvantagesSection,
  AreasSection,
  ClosingCtaSection,
  FaqSection,
  HeroSection,
  MapsSection,
  PortfolioSection,
  ReviewsSection,
  ServicesSection,
  ValuePropsSection,
} from "@/components/site-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader currentPath="/" />
      <main className="overflow-x-clip">
        <HeroSection />
        <ValuePropsSection />
        <AdvantagesSection />
        <ServicesSection introOnly />
        <PortfolioSection />
        <AboutSection />
        <AreasSection />
        <ReviewsSection />
        <FaqSection />
        <MapsSection />
        <ClosingCtaSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
