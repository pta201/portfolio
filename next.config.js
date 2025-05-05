/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wsrv.nl",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
