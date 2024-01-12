/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/source/:path*",
        destination: "/api/file",
      },

      {
        source: "/source/:path*/",
        destination: "/folder",
      },
      {
        source: "/admin/:path*/",
        destination: "/admin",
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
