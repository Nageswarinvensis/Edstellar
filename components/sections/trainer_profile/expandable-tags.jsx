"use client";

import { useId, useState } from "react";

import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * A wrap of tags showing the first `visible`, with a "+N more" button that
 * reveals the rest (and "Show less" to fold them again). Every tag is in the
 * HTML from the start — the extra ones are `hidden`, not missing — so
 * crawlers see the full list.
 */
export default function ExpandableTags({ items, visible = 5, tagClassName, buttonClassName, className }) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const extra = items.length - visible;

  return (
    <Box as="ul" id={listId} className={cn("m-0 flex list-none flex-wrap gap-2 p-0", className)}>
      {items.map((item, index) => (
        <li key={item} hidden={!open && index >= visible} className={tagClassName}>
          {item}
        </li>
      ))}
      {extra > 0 ? (
        <li>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen((value) => !value)}
            className={cn("cursor-pointer", buttonClassName)}
          >
            {open ? "Show less" : `+${extra} more`}
          </button>
        </li>
      ) : null}
    </Box>
  );
}
