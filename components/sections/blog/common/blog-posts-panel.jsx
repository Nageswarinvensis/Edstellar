"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import Box from "@/components/ui/Box";
import Reveal from "@/components/common/reveal";
import BlogPosts from "@/components/sections/blog/common/blog-posts";
import BlogSidebar from "@/components/sections/blog/common/blog-sidebar";

const SEARCH_DEBOUNCE_MS = 400;

/**
 * Two-column blog listing panel shared by every listing page (main,
 * category, author — components/sections/blog/blog-main.jsx,
 * components/sections/blog/category/category-page-content.jsx,
 * components/sections/blog/author/author-page-content.jsx):
 * post grid + pagination on one side, search box + category list (inside
 * `BlogSidebar`) on the other. This is the state owner for both search and
 * pagination — `BlogPosts` and `BlogSidebar` are siblings in the layout, so
 * the state has to live here rather than in either of them.
 *
 * `fetchAction` is a Server Action (lib/actions/blog-main.js,
 * lib/actions/blog-author.js, lib/actions/blog-category.js) called as
 * `fetchAction(identifier, page, q)`; every one returns the same
 * `{ data, pagination }` shape (CLAUDE.md #10), so this component never needs
 * to know which page — or which search scope — it's fetching.
 *
 * Search never touches the URL — it swaps `posts` in place. Pagination
 * always swaps `posts` in place too (no page navigation, no reload) and
 * scrolls `#${scrollTargetId}` into view. With `basePath` (blog index,
 * category) the pages are also real URLs — `basePath` for page 1,
 * `${basePath}/page/${n}` after (TASTE.md §2.5):
 * - the controls are `<a href>`s in the HTML, so crawlers walk every page,
 *   but a plain click is intercepted and swaps in place;
 * - the address bar follows (`history.pushState`), so the URL can be shared
 *   and reloads to the same page; Back/Forward (`popstate`) swap in place;
 * - while a search is active its pagination is buttons with no URL, since
 *   search results are not pages, and clearing it returns to the page the
 *   URL names.
 * With `allPostsInHtml` (category and author pages) there are no page URLs: the server
 * sends EVERY post as `initialPosts`, all of them are rendered, and cards
 * off the current page are `hidden` — crawlers see every post in the page
 * source, and paging only changes which cards show (no fetch). Searching
 * still fetches; clearing the box returns to the full list.
 * Without either the controls are plain buttons that fetch.
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
  basePath,
  allPostsInHtml = false,
  categories,
  scrollTargetId = "blogs",
  paginationLabel = "Blog articles pagination",
  searchPlaceholder = "Search articles",
  // "author" switches the cards and pagination to the author-page design;
  // the sidebar is the same for every variant.
  variant = "default",
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [pagination, setPagination] = useState(initialPagination);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);
  // Bumped by every search, page change and clear; a response applies only
  // if no newer one started meanwhile, so a slow search answering after the
  // box was cleared can't overwrite the restored page.
  const latestRequest = useRef(0);

  function load(page, q) {
    const request = ++latestRequest.current;
    startTransition(async () => {
      const blogs = await fetchAction(identifier, page, q);
      if (!blogs || request !== latestRequest.current) return;
      setPosts(blogs.data || []);
      setPagination(blogs.pagination);
    });
  }

  // The page shown when every post is already in the HTML.
  const [inHtmlPage, setInHtmlPage] = useState(1);
  const inHtmlMode = allPostsInHtml && !query.trim();
  const perPage = initialPagination?.per_page || 12;

  // The listing page the URL names (only meaningful with `basePath`).
  const listingPage = useRef(initialPagination?.current_page ?? 1);
  // The page title as the server rendered it for this page, minus any
  // " – Page N", so in-place paging can keep the tab title in step.
  const baseTitle = useRef(null);

  function showListingPage(n) {
    listingPage.current = n;
    if (n === initialPagination?.current_page) {
      latestRequest.current += 1;
      setPosts(initialPosts);
      setPagination(initialPagination);
    } else {
      load(n, "");
    }
    if (baseTitle.current) {
      document.title =
        n === 1
          ? baseTitle.current
          : baseTitle.current.replace(/( \| [^|]+)?$/, ` – Page ${n}$1`);
    }
  }

  const listingHref = (n) => (n === 1 ? basePath : `${basePath}/page/${n}`);

  // The page number in the address bar, or null when it is not one of this
  // listing's URLs.
  function pageFromUrl() {
    const { pathname } = window.location;
    if (pathname.replace(/\/page\/\d+\/?$/, "").replace(/\/$/, "") !== basePath) {
      return null;
    }
    const match = pathname.match(/\/page\/(\d+)\/?$/);
    return match ? Number(match[1]) : 1;
  }

  useEffect(() => {
    if (!basePath) return;
    baseTitle.current = document.title.replace(/ – Page \d+/, "");

    // Returning to a pushed URL from another page (Back from a post), Next
    // restores this route with the posts the server first sent — load the
    // page the URL actually names.
    const urlPage = pageFromUrl();
    if (urlPage && urlPage !== listingPage.current) showListingPage(urlPage);

    // Back/Forward between page URLs this panel pushed: swap in place.
    function onPopState() {
      const page = pageFromUrl();
      if (!page) return;
      setQuery("");
      showListingPage(page);
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basePath]);

  // Debounced live search — an empty/whitespace-only query is not a filter
  // (see `getBlogMain`), so clearing the box restores the unfiltered list
  // the same way typing a term filters it, both through the same fetch path.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // All posts are in the HTML: an empty box means the full list again.
    if (allPostsInHtml && !query.trim()) {
      latestRequest.current += 1;
      setPosts(initialPosts);
      setPagination(initialPagination);
      return;
    }

    // On a page URL, an empty box means "the page the URL names" again —
    // fetching page 1 would contradict the URL.
    if (basePath && !query.trim()) {
      showListingPage(listingPage.current);
      return;
    }

    const timer = setTimeout(() => load(1, query), SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function goToPage(n) {
    const current = inHtmlMode ? inHtmlPage : pagination?.current_page;
    if (isPending || n === current) return;

    document.getElementById(scrollTargetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (inHtmlMode) {
      setInHtmlPage(n);
      return;
    }

    if (basePath && !query.trim()) {
      window.history.pushState(null, "", listingHref(n));
      showListingPage(n);
      return;
    }

    load(n, query);
  }

  const pageHref = basePath && !query.trim() ? listingHref : undefined;

  const shownPagination = inHtmlMode
    ? { ...pagination, current_page: inHtmlPage }
    : pagination;
  const isHidden = inHtmlMode
    ? (index) => Math.floor(index / perPage) + 1 !== inHtmlPage
    : undefined;

  return (
    <Box className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.45fr]">
      <Box className="order-2 lg:order-1">
        <BlogPosts
          posts={posts}
          pagination={shownPagination}
          isHidden={isHidden}
          isPending={isPending}
          onPageChange={goToPage}
          pageHref={pageHref}
          paginationLabel={paginationLabel}
          searchQuery={query}
          onClearSearch={() => setQuery("")}
          variant={variant}
        />
      </Box>

      <Box className="order-1 mb-8 lg:order-2 lg:mb-0">
        <Box className="lg:sticky lg:top-20">
          <Reveal delay={2}>
            <BlogSidebar
              categories={categories}
              searchValue={query}
              onSearchChange={setQuery}
              searchPlaceholder={searchPlaceholder}
            />
          </Reveal>
        </Box>
      </Box>
    </Box>
  );
}
