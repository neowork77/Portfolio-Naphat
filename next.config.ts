import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thesvg.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
