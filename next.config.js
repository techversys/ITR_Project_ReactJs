const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "https://i.gifer.com/origin/d0/d0fc7bdc9a240be0950efb47f3c90f81_w200.webp",
      },
    ],
    minimumCacheTTL: 15000000,
  },
};

module.exports = nextConfig;
