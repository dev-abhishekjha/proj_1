import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost:3000", "192.168.31.247:3000"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
