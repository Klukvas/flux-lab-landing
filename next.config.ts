import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
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
