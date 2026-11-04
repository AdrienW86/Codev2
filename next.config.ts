import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Images des articles de l’Agent Blog (stockage public de CODE-V OS).
  images: { remotePatterns: [{ protocol: "https", hostname: "lehlbcnpufkllcykvtlg.supabase.co", pathname: "/storage/v1/object/public/blog-images/**" }] },
};

export default nextConfig;