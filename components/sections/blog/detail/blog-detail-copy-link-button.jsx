"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function BlogDetailCopyLinkButton({ url, label = "Copy author link" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — nothing to fall back to.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      title={copied ? "Copied!" : label}
      className="flex size-9 flex-none cursor-pointer items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-ink/20 hover:bg-ink/5 hover:text-ink"
    >
      {copied ? (
        <Check size={15} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Copy size={15} strokeWidth={2} aria-hidden="true" />
      )}
    </button>
  );
}
