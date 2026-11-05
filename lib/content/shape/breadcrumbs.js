import { lowerName } from "@/lib/content/shape/brochure";

/**
 * A training breadcrumb trail (`[{ label, href }]`, sent by the CMS without
 * titles) with each link's hover title: Home, Corporate Training, then a
 * domain. The last item is the current page — not a link, so no title.
 * Shared by course and domain pages so their trails read the same.
 */
export function withBreadcrumbTitles(items) {
  if (!Array.isArray(items)) return items;

  return items.map((item, index) => {
    if (item.title || !item.href || index === items.length - 1) return item;
    if (item.href === "/") return { ...item, title: "Click here to go to the Edstellar homepage" };
    if (item.href.replace(/\/$/, "") === "/corporate-training") {
      return { ...item, title: "Click here to view all corporate training programs" };
    }
    return { ...item, title: `Click here to view all ${lowerName(item.label)} training programs` };
  });
}
