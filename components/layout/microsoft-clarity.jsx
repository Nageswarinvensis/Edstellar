import Script from "next/script";

const CLARITY_ID = "qniixloht9";

/**
 * Microsoft Clarity, on every page. The inline loader registers itself after
 * the page is interactive, then defers the actual Clarity tag until the first
 * real user interaction (or a 12s fallback) so it never competes with the
 * first render. Mounted in the root layout so `(bare)` pages get it too, the
 * same as Google Analytics.
 *
 * Production only (`VERCEL_ENV=production`, the same switch as
 * `components/layout/google-analytics.jsx`): preview, development and local
 * builds send no analytics.
 */
export default function MicrosoftClarity() {
  if (process.env.VERCEL_ENV !== "production") return null;

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`(function () {
  var clarityLoaded = false;
  function loadClarity() {
    if (clarityLoaded) return;
    clarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1;
      t.src = 'https://www.clarity.ms/tag/${CLARITY_ID}';
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script');
  }
  var events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
  events.forEach(function (event) {
    document.addEventListener(event, loadClarity, { once: true, passive: true });
  });
  setTimeout(loadClarity, 12000);
})();`}
    </Script>
  );
}
