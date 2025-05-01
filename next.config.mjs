/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "abu-haneefah.github.io",
        },
      ],
    },
  };
  
  export default nextConfig;