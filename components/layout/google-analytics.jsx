import Script from "next/script";

const GA_ID = "G-PFNYPCPWH6";

/**
 * Google Analytics 4 (gtag.js), on every page. The config snippet is
 * Edstellar's own (with its two `developer_id` flags); `gtag.js` is the loader
 * it needs to send anything. Both load after the page is interactive, so they
 * never hold up the first render.
 *
 * Production only (`VERCEL_ENV=production`, the same switch as robots.txt):
 * preview, development and local builds send no analytics.
 */
export default function GoogleAnalytics() {
  if (process.env.VERCEL_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('set', 'developer_id.dZGVlNj', true);gtag('set', 'developer_id.dYWYxNW', true);gtag('js', new Date());gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
