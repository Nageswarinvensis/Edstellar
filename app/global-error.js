"use client";

import { useEffect } from "react";

import "./globals.css";

/**
 * Root error boundary. This replaces `app/layout.js` entirely when the layout
 * itself throws, so it must render its own <html> and <body> and must not
 * depend on providers, fonts, or shared components that may be the cause.
 */
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Replace with your monitoring transport (Sentry, Datadog, …).
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 py-16 text-center">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold leading-snug">
              Application error
            </h1>
            <p className="max-w-prose text-sm leading-relaxed text-ink/60">
              The application failed to load. Please try again — if this keeps
              happening, contact support with the reference below.
            </p>
            {error?.digest ? (
              <span className="font-mono text-xs text-ink/60">
                Reference: {error.digest}
              </span>
            ) : null}
          </div>

          <button
            type="button"
            onClick={reset}
            title="Click Here to View Try again"
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-navy px-7 py-4 font-body text-sm font-semibold text-lime transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
