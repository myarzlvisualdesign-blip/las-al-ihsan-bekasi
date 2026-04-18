import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Pages direct upload does not provide Next's /_next/image optimizer.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
