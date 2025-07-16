import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mernspace-project-s3-bucket.s3.ap-south-1.amazonaws.com'
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
