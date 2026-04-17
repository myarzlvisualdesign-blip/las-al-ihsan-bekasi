import { faqs, siteConfig } from "@/lib/site";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.siteUrl}#business`,
        name: siteConfig.name,
        image: `${siteConfig.siteUrl}/images/logo-al-ihsan.png`,
        url: siteConfig.siteUrl,
        telephone: siteConfig.primaryPhone,
        sameAs: [
          siteConfig.mapsUrl,
          siteConfig.instagramUrl,
          siteConfig.tiktokUrl,
        ],
        areaServed: siteConfig.areaServed.map((name) => ({
          "@type": "City",
          name,
        })),
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. Bengkong Raya, RT.001/RW.006, Padurenan",
          addressLocality: "Bekasi",
          addressRegion: "Jawa Barat",
          postalCode: "17156",
          addressCountry: "ID",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.siteUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
