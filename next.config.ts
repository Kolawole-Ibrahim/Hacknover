/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

const nextConfigTyped: NextConfig = {
  images: {
    // Allow using quality=85 in next/image components
    qualities: [85],
  } as any,
};

export default nextConfigTyped;
