import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  // The blog's social cards read fonts and a base image from src/assets/og at render time;
  // the standalone bundle only carries what the tracer sees, so the folder is listed.
  outputFileTracingIncludes: {
    '/[locale]/blog/[slug]/opengraph-image': ['./src/assets/og/**/*'],
    '/[locale]/blog/[slug]/twitter-image': ['./src/assets/og/**/*'],
  },
  async headers() {
    return [
      {
        // The site is HTTPS-only behind Cloudflare. Subdomains are left out on purpose,
        // since they may host other products.
        source: '/:path*',
        headers: [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        // Cloudflare proxies www as well. Without this it served a full copy of the
        // site whose hreflang pointed at www URLs, splitting signals across two hosts.
        source: '/:path*',
        has: [{ type: 'host', value: 'www.flux-lab.dev' }],
        destination: 'https://flux-lab.dev/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
