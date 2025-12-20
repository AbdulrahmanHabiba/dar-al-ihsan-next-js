/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Note: i18n is not supported in App Router
  // RTL is handled via dir="rtl" in layout.tsx
}

module.exports = nextConfig