import { SITE } from "@/lib/constants";

const AI_BOTS = [
  "GPTBot", "ClaudeBot", "meta-externalagent", "meta-webindexer",
  "Amazonbot", "MJ12bot", "SemrushBot", "DataForSeoBot", "AhrefsBot",
  "ChatGPT-User", "OAI-SearchBot", "PerplexityBot", "Claude-User", "LinkupBot",
];

const AI_BOT_RULE = {
  userAgent: AI_BOTS,
  disallow: ["/learning-development-resources/"],
};

const COMMON_DISALLOW = [
  "/api/",
  "/organisations/",
  "/*?*_page=*",
  "/*?45239b2f_page=",
];

export default function robots() {
  // TODO: remove this block when going live
  if (process.env.VERCEL_ENV !== "production") {
    return {
      rules: [
        { userAgent: "*", disallow: ["/", ...COMMON_DISALLOW] },
        AI_BOT_RULE,
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: COMMON_DISALLOW,
      },
      AI_BOT_RULE,
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
