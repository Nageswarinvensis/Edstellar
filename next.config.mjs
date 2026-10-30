/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Files go to Zoho through Server Actions, whose default body limit is
      // 1 MB: the course group-quote's requirements Excel (up to 4 MB) and
      // the RFP form's documents (up to 25 MB in total, plus the fields).
      bodySizeLimit: "26mb",
    },
  },
  // Old URLs → their current ones (the CMS renamed these site pages,
  // Oct 2026). Permanent, so links and rankings carry over. Each goes straight
  // to its final URL — no redirect chains.
  async rewrites() {
    return [
      { source: "/platforms/polaris", destination: "/polaris.html" },
      { source: "/platforms/orbit", destination: "/orbit.html" },
      { source: "/platforms/meridian", destination: "/meridian.html" },
      { source: "/platforms/spectra-lms", destination: "/spectra-lms.html" },
      { source: "/platforms/tna-tni-engine", destination: "/tna-tni-engine.html" },
      { source: "/platforms/tna", destination: "/tna-tni-engine.html" },
      { source: "/platforms/tni", destination: "/tna-tni-engine.html" },
      { source: "/platforms/zenith", destination: "/zenith.html" },
    ];
  },
  async redirects() {
    const moved = [
      ["/training-needs-analysis", "/training-needs-analysis-solutions"],
      ["/coaching-services", "/coaching-solutions"],
      ["/terms-and-conditions", "/terms-conditions"],
      ["/managed-training-services", "/managed-learning-services/managed-training"],
      // Case studies live at the live site's URLs, not under /resources.
      ["/resources/case-studies", "/case-studies"],
      ["/resources/case-studies/:slug", "/case-study/:slug"],
      // L&D templates keep the live site's /templates/{slug} URL (TASTE.md
      // §1.1); the CMS templates hub links them under /resources.
      ["/resources/templates/:slug", "/templates/:slug"],
      [
        "/managed-learning-services/managed-training-services",
        "/managed-learning-services/managed-training",
      ],

      ...[
        ["learning-strategy-design-consulting", "learning-strategy-design"],
        ["learning-content-development-services", "learning-content-development"],
        ["learning-technology-consulting", "learning-technology"],
      ].map(([from, to]) => [
        `/learning-development-consulting-services/${from}`,
        `/learning-development-consulting-services/${to}`,
      ]),

      ...[
        ["dei-consulting", "diversity-equity-inclusion"],
        ["culture-transformation-consulting", "cultural-transformation"],
        ["employee-engagement-consulting", "employee-engagement"],
        ["leadership-effectiveness-consulting", "leadership-effectiveness-planning"],
        ["organization-design-consulting", "organization-design"],
        ["performance-management-consulting", "performance-management"],
        ["strategic-workforce-planning-consulting", "strategic-workforce-planning"],
        ["succession-planning-consulting", "succession-planning"],
        ["change-management-consulting", "change-management"],
      ].map(([from, to]) => [
        `/organizational-development-consulting/${from}`,
        `/organizational-development-consulting/${to}`,
      ]),

      ...[
        ["assessment-development-centers-consulting", "assessment-development-centers"],
        ["behavioral-assessment", "behavioral-psychological-profiling"],
        ["behavioral-assessment-services", "behavioral-psychological-profiling"],
        ["team-effectiveness-assessment-services", "team-effectiveness-assessment"],
        ["organizational-alignment-consulting", "360-degree-feedback"],
      ].map(([from, to]) => [
        `/talent-assessment-services/${from}`,
        `/talent-assessment-services/${to}`,
      ]),
    ];

    return moved.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  images: {
    // Serve images straight from their source (the CMS and Webflow CDNs
    // already deliver WebP) instead of through Vercel's /_next/image
    // optimizer. The project's optimization allowance ran out and Vercel
    // answered every image with 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED,
    // so images were missing site-wide.
    unoptimized: true,
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
