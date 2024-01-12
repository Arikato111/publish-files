/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
    async rewrites() {
    return [
      {
        source: "/source/:path*/",
        destination: "/folder"
      },
      {
        source: "/admin/:path*/",
        destination: "/admin"
      },
      {
        source: "/source/:path*",
        destination: "/api/file",
      },
    ];
  },
  reactStrictMode: true,
}

module.exports = nextConfig
