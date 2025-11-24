import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix for build manifest issues
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  // Disable static optimization for development to prevent manifest issues
  experimental: {
    optimizePackageImports: ['gsap', 'three', 'lenis'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
