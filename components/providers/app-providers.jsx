"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";

/**
 * Single mount point for every client-side provider the UI layer needs.
 * Keeping them together means `app/layout.js` stays a server component and
 * only this subtree is shipped to the browser.
 */
function AppProviders({ children }) {
  return (
    <TooltipProvider>
      <Toaster>{children}</Toaster>
    </TooltipProvider>
  );
}

export default AppProviders;
