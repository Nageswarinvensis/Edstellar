"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import Box from "@/components/ui/Box";
import BlogPosts from "@/components/blog/common/blog-posts";
import BlogSidebar from "@/components/blog/common/blog-sidebar";

const SEARCH_DEBOUNCE_MS = 400;

/**
 * Two-column blog listing panel shared by every listing page (main,
 * category, author — components/blog/blog-main.jsx,
 * components/blog/category-page-content.jsx,
 * components/blog/author-page-content.jsx):
 * post grid + pagination on one side, search box + category list (inside
 * `BlogSidebar`) on the other. This is the state owner for both search and
 * pagination — `BlogPosts` and `BlogSidebar` are siblings in the layout, so
 * the state has to live here rather than in either of them.
 *
 * Not to be confused with `components/blog/common/listing-hero.jsx` — that's
 * the heading/description banner above this panel on the author/category
 * pages, a different component with a similarly-generic name.
 *
 * `fetchAction` is a Server Action (lib/actions/blog-main.js,
 * lib/actions/blog-author.js, lib/actions/blog-category.js) called as
 * `fetchAction(identifier, page, q)`; every one returns the same
 * `{ data, pagination }` shape (CLAUDE.md #10), so this component never needs
 * to know which page — or which search scope — it's fetching.
 *
 * Neither pagination nor search touch the URL — both swap `posts` in place
 * (pagination also scrolls `#${scrollTargetId}` into view; search doesn't,
 * since the user is mid-typing, not navigating).
 *
 * `BlogSidebar` renders at every width (it used to be desktop-only, with a
 * second standalone search box above the grid for mobile — collapsed into
 * one now that the sidebar's own category list can fold behind a dropdown
 * on narrow screens). `order-*` puts the sidebar above the grid on mobile,
 * where the layout is a single column, and back on the right at `lg`.
 */
export default function BlogPostsPanel({
  identifier,
  initialPosts,
  initialPagination,
  fetchAction,
  categories,
  scrollTargetId = "blogs",
  paginationLabel = "Blog articles pagination",
  searchPlaceholder = "Search articles",
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [pagination, setPagination] = useState(initialPagination);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);

  // Debounced live search — an empty/whitespace-only query is not a filter
  // (see `getBlogMain`), so clearing the box restores the unfiltered list
  // the same way typing a term filters it, both through the same fetch path.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      startTransition(async () => {
        const blogs = await fetchAction(identifier, 1, query);
        if (!blogs) return;
        setPosts(blogs.data || []);
        setPagination(blogs.pagination);
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function goToPage(n) {
    if (isPending || n === pagination?.current_page) return;

    document.getElementById(scrollTargetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    startTransition(async () => {
      const blogs = await fetchAction(identifier, n, query);
      if (!blogs) return;
      setPosts(blogs.data || []);
      setPagination(blogs.pagination);
    });
  }

  return (
    <Box className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.45fr]">
      <Box className="order-2 lg:order-1">
        <BlogPosts
          posts={posts}
          pagination={pagination}
          isPending={isPending}
          onPageChange={goToPage}
          paginationLabel={paginationLabel}
          searchQuery={query}
          onClearSearch={() => setQuery("")}
        />
      </Box>

      <Box className="order-1 mb-8 lg:order-2 lg:mb-0">
        <Box className="lg:sticky lg:top-20">
          <BlogSidebar
            categories={categories}
            searchValue={query}
            onSearchChange={setQuery}
            searchPlaceholder={searchPlaceholder}
          />
        </Box>
      </Box>
    </Box>
  );
}
