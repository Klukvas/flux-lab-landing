import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from './constants';

interface GenerateMetadataParams {
  readonly title: string;
  readonly description: string;
  readonly path?: string;
  readonly image?: string;
  readonly locale?: string;
}

export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  locale = 'en',
}: GenerateMetadataParams): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const ogImage = image ?? `${SITE_URL}/og-default.png`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en${path}`,
        uk: `${SITE_URL}/uk${path}`,
      },
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: locale === 'uk' ? 'uk_UA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}
