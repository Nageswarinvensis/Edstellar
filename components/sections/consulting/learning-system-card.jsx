import { Target, Network, Heart, Users, RotateCw } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/*
 * The hero's right-hand "learning system" card on the L&D hub, its sub-pages,
 * managed training and the OD hub. Each row's icon is picked by `item.icon`,
 * else by its title (lower-cased, spaces to dashes); an unknown key gets the
 * target.
 *
 * Most pages draw the designs' own strokes (`ICON_PATHS` below), but the CMS
 * may instead send a lucide-react icon name (PascalCase, e.g. "Target",
 * "Network") — the OD hub does. Those render straight from lucide; anything
 * else falls back to the inline strokes, so each page shows what it asks for.
 *
 * Design: `.ld-model`, `.ld-model-lab`, `.ls-list`, `.ls-ic`, `.ls-t`, `.ls-note`.
 */

// CMS `icon` names (lucide-react) → component. Extend as the CMS uses more.
const LUCIDE_ICONS = { Target, Network, Heart, Users, RotateCw };

// The lucide icon for a row, or null when `item.icon` isn't a lucide name
// (then the inline `ICON_PATHS` strokes are used). `.trim()` because the CMS
// has sent an icon with a leading space (" Heart").
function lucideFor(item) {
  const name = item.icon?.trim();
  return name ? (LUCIDE_ICONS[name] ?? null) : null;
}

const ICON_PATHS = {
  strategy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.2" />
    </>
  ),
  content: (
    <>
      <path d="M5 4a2 2 0 0 1 2-2h8v18H7a2 2 0 0 0-2 2z" />
      <path d="M15 2h4v18" />
    </>
  ),
  technology: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  measurement: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 14l3-3 3 3 4-5" />
    </>
  ),
  delivery: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M15.5 11a3 3 0 1 0-2.5-4.5" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 20a5.5 5.5 0 0 0-3-4.9" />
    </>
  ),
  "operating-model": (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <circle cx="8" cy="6" r="2" className="fill-lime-soft" />
      <circle cx="16" cy="12" r="2" className="fill-lime-soft" />
      <circle cx="9" cy="18" r="2" className="fill-lime-soft" />
    </>
  ),
  framework: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  pathway: (
    <>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6" />
    </>
  ),
};

// Rows the designs draw with an icon from the set above: the hub's
// "Governance" chart, and managed training's four engagement models.
Object.assign(ICON_PATHS, {
  governance: ICON_PATHS.measurement,
  advisory: ICON_PATHS["operating-model"],
  selective: ICON_PATHS.framework,
  managed: ICON_PATHS.pathway,
  "end-to-end": ICON_PATHS.measurement,
});

const titleOf = (item) => item.title;

function iconFor(item) {
  const key = item.icon || titleOf(item)?.toLowerCase().trim().replace(/\s+/g, "-");
  return ICON_PATHS[key] ?? ICON_PATHS.strategy;
}

export default function LearningSystemCard({ data }) {
  if (!data) return null;

  // `footer_text` is the site-pages CMS field; `footerText` the local-content one.
  const footerText = data.footer_text || data.footerText;

  return (
    <Box
      as="aside"
      aria-label={data.title}
      className="w-full rounded-[14px] border border-ink/12 bg-white px-7 py-[26px] shadow-lift"
    >
      {data.title ? (
        <Text
          as="p"
          className="mb-4 font-display text-[14px] leading-[1.7] font-bold text-ink"
        >
          {data.title}
        </Text>
      ) : null}

      <Box as="ul" className="m-0 flex list-none flex-col gap-3.5 p-0">
        {data.items?.map((item, index) => {
          const LucideIcon = lucideFor(item);

          return (
          <Box as="li" key={titleOf(item) ?? index} className="flex items-center gap-[13px]">
            <Box
              as="span"
              className="flex size-[38px] flex-none items-center justify-center rounded-[10px] bg-lime-soft text-navy"
            >
              {LucideIcon ? (
                <LucideIcon
                  strokeWidth={1.7}
                  aria-hidden="true"
                  className="size-5"
                />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-5"
                >
                  {iconFor(item)}
                </svg>
              )}
            </Box>

            <Box>
              <Text
                as="span"
                className="block font-display text-[15px] leading-[1.2] font-bold tracking-[-0.01em] text-ink"
              >
                {titleOf(item)}
              </Text>
              <Text as="span" className="mt-px block text-[12px] leading-[1.7] text-ink/60">
                {item.description}
              </Text>
            </Box>
          </Box>
          );
        })}
      </Box>

      {footerText ? (
        <Text
          as="p"
          className="mt-4 border-t border-ink/12 pt-3.5 text-center text-[12px] leading-[1.7] text-ink/60"
        >
          {footerText}
        </Text>
      ) : null}
    </Box>
  );
}
