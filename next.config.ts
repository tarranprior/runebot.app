import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/invite",
        destination:
          "https://discord.com/oauth2/authorize?client_id=978953033989914654&permissions=2147764224&scope=bot%20applications.commands",
        permanent: false,
      },
      {
        // Vanity URL only.
        // Do not use this route with next/link or router navigation;
        // use direct external anchors in app UI to avoid RSC/CORS redirect fetch issues.
        source: "/support",
        destination: "https://discord.com/invite/FWjNkNuTzv",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
