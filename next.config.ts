/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Memory/CPU limits for Vercel Free Tier stability
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
