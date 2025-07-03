import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint:{
    ignoreDuringBuilds: true
  },
   api: {
    bodyParser: false,
  },
};

export default nextConfig;
