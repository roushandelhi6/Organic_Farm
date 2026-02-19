const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure the project works with Turbopack or falls back correctly
  turbopack: {},
  // Fix for Vercel build worker crashes
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
