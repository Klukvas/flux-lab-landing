import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  SOCIAL_LINKS,
} from "@/lib/constants";

function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kyiv",
      addressCountry: "UA",
    },
    sameAs: [
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.twitter,
    ],
    foundingDate: "2023",
    foundingLocation: CONTACT_LOCATION,
    knowsAbout: [
      "Software Development Outsourcing",
      "Custom Software Development",
      "Staff Augmentation",
      "Dedicated Development Teams",
      "Web Development",
      "Mobile Development",
      "SaaS Development",
      "React",
      "Next.js",
      "TypeScript",
      "Go",
      "Node.js",
      "PostgreSQL",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    inLanguage: ["en", "uk"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ProfessionalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-default.png`,
    description:
      "Kyiv-based software development outsourcing company and product studio. Custom web & mobile development, dedicated teams, staff augmentation. 46K+ users across 800+ companies.",
    email: CONTACT_EMAIL,
    telephone: "",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kyiv",
      addressCountry: "UA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.4501,
      longitude: 30.5234,
    },
    areaServed: ["Worldwide", "Europe", "United States", "United Kingdom"],
    serviceType: [
      "Software Development Outsourcing",
      "Custom Software Development",
      "Staff Augmentation",
      "Dedicated Development Teams",
      "Technical Consulting",
      "Web Application Development",
      "Mobile Application Development",
      "SaaS Product Development",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Dedicated Team",
          description:
            "2-5 senior developers embedded in your workflow for long-term product development",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "8000",
            priceCurrency: "USD",
            unitText: "month",
          },
        },
        {
          "@type": "Offer",
          name: "Project-Based Development",
          description:
            "Fixed scope, clear milestones, predictable budget for well-defined products",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "15000",
            priceCurrency: "USD",
          },
        },
        {
          "@type": "Offer",
          name: "Staff Augmentation",
          description:
            "Individual senior developers who plug into your existing team",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "4000",
            priceCurrency: "USD",
            unitText: "month",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      ratingCount: "3",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Oleksandr Melnyk",
          jobTitle: "CTO",
        },
        reviewBody:
          "Reduced our energy monitoring costs by 27% in the first quarter. The dashboard gives us real-time visibility we never had before.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        publisher: {
          "@type": "Organization",
          name: "GreenGrid Energy",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Iryna Savchenko",
          jobTitle: "Founder",
        },
        reviewBody:
          "Went from spreadsheets to managing 120 locations in one platform. Our operators finally have the tools they deserve.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        publisher: {
          "@type": "Organization",
          name: "CleanWave",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Viktor Kravchuk",
          jobTitle: "CFO",
        },
        reviewBody:
          "890K+ invoices processed with zero downtime. The automation alone saved us 40 hours per week across the team.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        publisher: {
          "@type": "Organization",
          name: "Finova Partners",
        },
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

export function JsonLd() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <ProfessionalServiceSchema />
    </>
  );
}
