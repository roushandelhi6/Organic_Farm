import type { NextConfig } from "next";
// @ts-ignore
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  transpilePackages: ["next-pwa"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Fix for Vercel build worker crashes
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  // Silence the Turbopack/Webpack conflict warning
  turbopack: {},
};

export default withPWA(nextConfig as any);
