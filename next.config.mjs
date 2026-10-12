/** @type {import('next').NextConfig} */
const nextConfig = {
  // The behavioral assessment sub-page moved to the CMS under the slug
  // `behavioral-assessment-services`; keep the old URL's links and ranking.
  async redirects() {
    return [
      {
        source: "/talent-assessment-services/behavioral-assessment",
        destination: "/talent-assessment-services/behavioral-assessment-services",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.edstellar.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
};

export default nextConfig;
