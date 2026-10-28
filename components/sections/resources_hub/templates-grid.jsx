"use client";

import { useRef, useState } from "react";

import Box from "@/components/ui/Box";
import ResourceCard from "@/components/sections/resources_hub/resource-card";
import ResourcePager from "@/components/sections/resources_hub/resource-pager";

/**
 * The templates grid: `data.page_size` cards a page with the shared
 * pagination. Only the current page is rendered (the first in the server
 * HTML); each card's title links to its template.
 *
 * Design: Learning_Development_Templates `.cards`, `.pager`.
 */
export default function TemplatesGrid({ data }) {
  const items = data?.items ?? [];
  const pageSize = data?.page_size ?? 9;
  const [page, setPage] = useState(1);
  const topRef = useRef(null);

  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  const shown = items.slice((page - 1) * pageSize, page * pageSize);

  function goTo(next) {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Box ref={topRef} className="grid scroll-mt-24 gap-5.5 min-[601px]:grid-cols-2 min-[961px]:grid-cols-3">
        {shown.map((item) => (
          <ResourceCard key={item.title} item={item} linkTitle ctaNewTab />
        ))}
      </Box>
      <ResourcePager current={page} pages={pages} onChange={goTo} />
    </>
  );
}
