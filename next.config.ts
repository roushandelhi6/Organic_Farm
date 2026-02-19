/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Force Webpack mode to avoid Turbopack conflicts in Next.js 15/16
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
