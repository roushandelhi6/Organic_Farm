/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure the project builds cleanly as a standalone app for Netlify
  output: 'standalone',
};

export default nextConfig;
