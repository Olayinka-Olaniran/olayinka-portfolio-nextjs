import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Allow the LAN IP for dev testing from other devices (phone,
  // tablet on the same Wi-Fi). Next.js 16 blocks cross-origin
  // dev resource access by default. The wildcard is on the
  // octet boundary — `192.168.*` matches any 192.168.x.x host.
  // The host literal `192.168.100.8` is the typical dev box
  // address; listed explicitly so it works even if the matcher
  // disagrees with the docs.
  allowedDevOrigins: [
    "192.168.100.8",
    "192.168.*",
    "10.*",
    "172.16.*",
    "localhost",
  ],
};

export default nextConfig;
