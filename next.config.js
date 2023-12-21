/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*", // Forward the path to the API route
      },
    ];
  },
};

module.exports = nextConfig;
