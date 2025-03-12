/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001'
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api-dev.kabarbengkel.com',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist'],
  reactStrictMode: false // Matikan Strict Mode
};

module.exports = nextConfig;
