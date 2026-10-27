"use client";

import { startTransition, useEffect, useState } from "react";
import Reveal from "@/components/common/reveal";

export default function BlogDetailToc() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".blog-content h2, .blog-content h3",
    );

    const usedIds = new Set();

    const items = Array.from(elements).map((heading, index) => {
      const text = heading.textContent?.trim() || `Heading ${index + 1}`;

      const baseId =
        heading.id ||
        text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-");

      let uniqueId = baseId || `heading-${index}`;

      let count = 1;

      while (usedIds.has(uniqueId)) {
        uniqueId = `${baseId}-${count}`;
        count++;
      }

      usedIds.add(uniqueId);
      heading.id = uniqueId;

      // Keeps the heading visible below a sticky header
      heading.style.scrollMarginTop = "110px";

      return {
        id: uniqueId,
        text,
        level: heading.tagName.toLowerCase(),
      };
    });

    startTransition(() => {
      setHeadings(items);
    });

    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-110px 0px -60% 0px",
        threshold: 0,
      },
    );

    elements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (!headings.length) return null;

  return (
    <aside className="toc-wrapper sticky top-24 h-[80vh] w-50 min-w-50 self-start overflow-y-auto">
      <Reveal>
        <h3 className="mb-5 text-[18px] font-medium leading-5 text-navy">
          Content
        </h3>

        <nav aria-label="Article contents">
          {headings.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block cursor-pointer border-l-2 px-2 py-1.25 text-[12px] leading-4 transition-all ${
                item.level === "h3" ? "ml-3" : ""
              } ${
                activeId === item.id
                  ? "border-l-olive bg-lime/15 text-navy"
                  : "border-transparent text-ink/70 hover:border-l-olive hover:bg-lime/15 hover:text-navy"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </Reveal>
    </aside>
  );
}
