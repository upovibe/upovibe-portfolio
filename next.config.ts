import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Add Cloudinary's hostname here
        pathname: "/**", // Allow all Cloudinary images
      },
    ],
    domains: ["res.cloudinary.com"], // Add Cloudinary to domains (optional but redundant if remotePatterns exists)
  },
};

export default nextConfig;
