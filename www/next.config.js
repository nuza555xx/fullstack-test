/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "dist",
  images: {
    domains: ["dummyimage.com", "api-eekpk6c73q-as.a.run.app"],
  },
};

module.exports = nextConfig;
