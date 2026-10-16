"use client";

import { useEffect } from "react";

const WIDGET_SRC =
  "https://salesiq.zohopublic.in/widget?wc=siq931ee0eb61c890d84c13142a15f632971c687173221981d599767e5018a4cfc0";

const INTERACTIONS = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];

/** Load the widget anyway after this long, even with no interaction. */
const FALLBACK_MS = 12000;

/**
 * Zoho SalesIQ chat widget, on every page. The third-party script is held
 * back until the visitor first interacts (or 12s pass), so it never competes
 * with the page's own content for the initial load.
 */
export default function ZohoSalesIq() {
  useEffect(() => {
    let loaded = false;

    function load() {
      if (loaded) return;
      loaded = true;
      cleanup();
      if (document.getElementById("zsiqscript")) return;

      window.$zoho = window.$zoho || {};
      window.$zoho.salesiq = window.$zoho.salesiq || { ready() {} };

      const script = document.createElement("script");
      script.id = "zsiqscript";
      script.src = WIDGET_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    const timer = setTimeout(load, FALLBACK_MS);
    function cleanup() {
      clearTimeout(timer);
      INTERACTIONS.forEach((event) => document.removeEventListener(event, load));
    }

    INTERACTIONS.forEach((event) =>
      document.addEventListener(event, load, { once: true, passive: true }),
    );
    return cleanup;
  }, []);

  return null;
}
