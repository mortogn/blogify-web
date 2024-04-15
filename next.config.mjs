/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        pathname: `/images/${process.env.SANITY_PROJECT_ID}/${process.env.SANITY_DATASET}/*`,
      },
    ],
  },
};

export default nextConfig;
