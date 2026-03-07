import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProduction ? "/design-experiments" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
