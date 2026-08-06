/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.0.224', 'preview-local.sayandatta.co.in'],
  images: {
    qualities: [25, 50, 70, 80, 90, 100],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.madhyanchalsarbajanin.co.in',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  redirects() {
    return [
      {
        source: '/payment/membership',
        has: [
          {
            type: 'query',
            key: 'id',
          },
        ],
        destination: '/services/membership/:id',
        permanent: true,
      },
      {
        source: '/membership-status',
        has: [
          {
            type: 'query',
            key: 'id',
          },
        ],
        destination: '/services/membership/:id/status',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
