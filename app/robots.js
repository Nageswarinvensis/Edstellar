import { SITE } from "@/lib/constants";

const AI_BOTS = [
  "GPTBot", "ClaudeBot", "meta-externalagent", "meta-webindexer",
  "ChatGPT-User", "OAI-SearchBot", "PerplexityBot", "Claude-User",
];

// `/organisations/` and the Webflow pagination rules (`/*?*_page=*`,
// `/*?45239b2f_page=`) were removed: the Webflow site is gone, no
// `/organisations/` route exists, and an old `?…_page=` URL now renders its
// listing with the clean URL as canonical — blocking it only stopped Google
// seeing that canonical.
const COMMON_DISALLOW = ["/api/"];

// A bot obeys only the most specific group naming it and ignores `*`, so
// this group repeats the common rules.
const AI_BOT_RULE = {
  userAgent: AI_BOTS,
  disallow: COMMON_DISALLOW,
};

export default function robots() {
  // TODO: remove this block when going live
  if (process.env.VERCEL_ENV !== "production") {
    return {
      rules: [
        { userAgent: "*", disallow: ["/", ...COMMON_DISALLOW] },
        // Named bots ignore the `*` group, so they need the "/" block too.
        { userAgent: AI_BOTS, disallow: ["/", ...COMMON_DISALLOW] },
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
