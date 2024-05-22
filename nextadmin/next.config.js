/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.shutterstock.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
};