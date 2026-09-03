import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "fotos.perfil.com",
      },
      {
        protocol: "https",
        hostname: "marieclaire.perfil.com",
      },
      {
        protocol: "https",
        hostname: "*.therealreal.com",
      },
      {
        protocol: "https",
        hostname: "product-images.therealreal.com",
      },
    ],
  },
};

export default nextConfig;
