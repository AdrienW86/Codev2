import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Routes of the previous site still reported by Search Console, sent to the page that now carries the same content.
  // /conditions-generales has no current equivalent and stays a 404 on purpose.
  async redirects() {
    return [
      { source: "/sites", destination: "/creation-site", statusCode: 301 },
      { source: "/ads", destination: "/publicite", statusCode: 301 },
      { source: "/mentions", destination: "/mentions-legales", statusCode: 301 },
    ];
  },
};

export default nextConfig;