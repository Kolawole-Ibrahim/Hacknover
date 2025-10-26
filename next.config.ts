import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow using quality=85 in next/image components
    qualities: [85],
  } as any,
};

export default nextConfig;
