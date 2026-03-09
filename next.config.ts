import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/invite",
        destination:
          "https://discord.com/oauth2/authorize?client_id=978953033989914654&permissions=2147764224&scope=bot%20applications.commands",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
