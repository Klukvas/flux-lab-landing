import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, CONTACT_EMAIL, CONTACT_LOCATION, SOCIAL_LINKS } from '@/lib/constants';

function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kyiv',
      addressCountry: 'UA',
    },
    sameAs: [
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.twitter,
    ],
    foundingDate: '2023',
    foundingLocation: CONTACT_LOCATION,
    knowsAbout: [
      'Web Development',
      'Mobile Development',
      'SaaS Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Go',
      'PostgreSQL',
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
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    inLanguage: ['en', 'uk'],
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
    </>
  );
}
