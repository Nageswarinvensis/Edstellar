"use client";

import { useState } from "react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * Audience's interactive body: a role filter and the tag list it filters.
 * Kept as the smallest client leaf — the section heading/lede and the skill
 * progression panel beside it stay server-rendered.
 *
 * Design: `.aud-filter`, `.aud-grid`, `.aud-tag`. Non-matching roles dim
 * (opacity + grayscale) and matches reorder to the top rather than being
 * removed from the list, matching the source design's filter behavior.
 */
export default function AudienceRoles({ filters, roles, groupLabels }) {
  const [activeGroup, setActiveGroup] = useState("all");

  if (!roles?.length) return null;

  const isAll = activeGroup === "all";

  return (
    <Box>
      {filters?.length ? (
        <Box className="mb-4.5 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveGroup(filter.id)}
              className={cn(
                "cursor-pointer rounded-full border px-3.25 py-2 font-mono text-[10px] tracking-[0.08em] uppercase transition-colors duration-200",
                activeGroup === filter.id
                  ? "border-navy bg-navy text-lime"
                  : "border-ink/22 text-ink/60 hover:border-navy hover:bg-navy hover:text-lime",
              )}
            >
              {filter.label}
            </button>
          ))}
        </Box>
      ) : null}

      <Box className="flex flex-col gap-2.25">
        {roles.map((item) => {
          const matched = !isAll && item.group === activeGroup;
          const hidden = !isAll && item.group !== activeGroup;

          return (
            <Box
              key={item.role}
              className={cn(
                "flex items-center gap-2.5 rounded-[11px] border border-ink/12 bg-white px-3.75 py-3 text-[13.5px] font-medium text-ink transition-[opacity,filter,border-color,box-shadow] duration-350",
                matched
                  ? "order-0 border-olive/50 shadow-[0_8px_20px_-14px_rgba(10,22,40,0.4)]"
                  : "order-1",
                hidden && "opacity-[0.18] grayscale",
              )}
            >
              {item.role}
              <Text
                as="span"
                className="ml-auto flex-none rounded-[5px] bg-paper-warm px-1.75 py-0.75 font-mono text-[10px] tracking-widset text-ink/60 uppercase"
              >
                {groupLabels?.[item.group]}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
