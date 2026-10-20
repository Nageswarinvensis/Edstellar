import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Layers, LayoutGrid } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import SiteSearch from "@/components/layout/site-search";
import { cn } from "@/lib/utils";

const format = (n) => n.toLocaleString("en-US");

/** Where to start when a search finds nothing, or before one is run. */
const SUGGESTIONS = [
  { label: "Corporate training domains", href: "/corporate-training" },
  { label: "Training catalog", href: "/corporate-training-catalog" },
  { label: "L&D consulting", href: "/learning-development-consulting-services" },
  { label: "Coaching", href: "/coaching-solutions" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact-us" },
];

const CARD =
  "group flex h-full flex-col rounded-[14px] border border-ink/12 bg-white p-4.5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-ink/22 hover:shadow-[0_12px_28px_-18px_rgba(10,22,40,0.35)]";

const TAG =
  "inline-flex w-fit rounded-full bg-paper-warm px-2.5 py-1 font-mono text-[10.5px] leading-none tracking-[0.06em] text-ink/70 uppercase";

/** One result group: icon, heading and count, then its results. */
function Group({ id, icon: Icon, title, count, children }) {
  return (
    <Box as="section" id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28">
      <Box className="mb-4 flex items-center gap-2.5">
        <Box className="grid size-8 place-items-center rounded-[9px] bg-navy text-lime">
          <Icon size={16} aria-hidden="true" />
        </Box>
        <Text as="h2" id={`${id}-h`} className="text-[20px] leading-[1.2] font-bold tracking-[-0.02em]">
          {title}
        </Text>
        <Text as="span" className="font-mono text-[13px] text-ink/60">{format(count)}</Text>
      </Box>
      {children}
    </Box>
  );
}

function Suggestions() {
  return (
    <Box as="ul" className="flex list-none flex-wrap gap-2 p-0">
      {SUGGESTIONS.map((item) => (
        <Box as="li" key={item.href}>
          <Link href={item.href} className="inline-flex rounded-full border border-ink/22 bg-white px-4 py-2 text-[14px] font-medium text-navy transition-colors hover:border-navy">
            {item.label}
          </Link>
        </Box>
      ))}
    </Box>
  );
}

/** "Domains 1 · Courses 59 · …" — jumps to each group on the page. */
function JumpChips({ groups }) {
  return (
    <Box as="nav" aria-label="Result types" className="flex flex-wrap gap-2">
      {groups.map((group) => (
        <a
          key={group.id}
          href={`#${group.id}`}
          className="inline-flex items-center gap-2 rounded-full border border-ink/22 bg-white px-3.5 py-1.5 text-[13.5px] font-semibold text-navy transition-colors hover:border-navy"
        >
          {group.title}
          <Text as="span" className="rounded-full bg-lime px-1.5 py-0.5 font-mono text-[11px] leading-none font-medium text-navy">
            {format(group.count)}
          </Text>
        </a>
      ))}
    </Box>
  );
}

function ArticleList({ posts }) {
  return (
    <Box as="ul" className="m-0 list-none divide-y divide-ink/12 rounded-[14px] border border-ink/12 bg-white p-0">
      {posts.map((post) => (
        <Box as="li" key={post.href}>
          <Link href={post.href} prefetch={false} className="group flex items-center justify-between gap-4 px-4.5 py-3.5 transition-colors hover:bg-paper-warm">
            <Box className="min-w-0">
              <Text as="span" className="block text-[15px] leading-[1.45] font-semibold text-navy group-hover:underline group-hover:underline-offset-4">
                {post.label}
              </Text>
              {post.category ? <Text as="span" className={cn(TAG, "mt-1.5")}>{post.category}</Text> : null}
            </Box>
            <ArrowRight size={16} aria-hidden="true" className="flex-none text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:text-navy" />
          </Link>
        </Box>
      ))}
    </Box>
  );
}

/**
 * `/search?q=…` results: the search box (pre-filled), a count with jump
 * chips, then groups in order of intent — domains (cards), courses (card
 * grid), services and pages, blog articles (title matches first, then
 * articles that only mention the query). A Server Component; the results
 * arrive in the HTML. `results` comes from `searchSite`.
 */
export default function SearchPage({ results }) {
  const { query, total, domains, courses, coursesTotal, posts, postsTotal, pages } = results;

  const groups = [
    { id: "domains", title: "Domains", count: domains.length },
    { id: "courses", title: "Courses", count: coursesTotal },
    { id: "pages", title: "Services & pages", count: pages.length },
    { id: "articles", title: "Articles", count: postsTotal },
  ].filter((group) => group.count);

  const strongPosts = posts.filter((post) => post.strong);
  const otherPosts = posts.filter((post) => !post.strong);

  return (
    <>
      <Section className="border-b border-ink/12 bg-paper-warm lg:pb-12" innerClassName="max-w-[1040px]">
        <Text as="p" className="mb-3 font-mono text-[11px] tracking-[0.14em] text-ink/60 uppercase">Search Edstellar</Text>
        <Text as="h1" className="mb-6 text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-bold">
          {query ? <>Results for &ldquo;{query}&rdquo;</> : "What are you looking for?"}
        </Text>
        <SiteSearch id="search-page-q" mobile defaultValue={query} className="max-w-[640px]" />

        <Box className="mt-6 flex flex-col gap-4">
          {query && total ? (
            <>
              <Text as="p" role="status" className="text-[15px] leading-[1.6] text-ink/70">
                <Text as="span" className="font-semibold text-navy">{format(total)}</Text> results
              </Text>
              <JumpChips groups={groups} />
            </>
          ) : (
            <>
              <Text as="p" role={query ? "status" : undefined} className="text-[15px] leading-[1.6] text-ink/70">
                {query
                  ? "No results found. Try a shorter or different word, or start from one of these:"
                  : "Search 2,000+ courses, 77 training domains, services and articles. Or start from one of these:"}
              </Text>
              <Suggestions />
            </>
          )}
        </Box>
      </Section>

      {total ? (
        <Section className="bg-paper lg:pt-12" innerClassName="max-w-[1040px] flex flex-col gap-12">
          {domains.length ? (
            <Group id="domains" icon={LayoutGrid} title="Training domains" count={domains.length}>
              <Box as="ul" className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {domains.map((hit) => (
                  <Box as="li" key={hit.href}>
                    <Link href={hit.href} className={CARD}>
                      <Text as="span" className="text-[17px] leading-[1.3] font-bold tracking-[-0.01em] text-navy">{hit.label}</Text>
                      <Text as="span" className="mt-1 text-[14px] text-ink/60">{format(hit.count)} courses</Text>
                      <Text as="span" className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy group-hover:underline group-hover:underline-offset-4">
                        View all courses <ArrowRight size={14} aria-hidden="true" />
                      </Text>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Group>
          ) : null}

          {courses.length ? (
            <Group id="courses" icon={BookOpen} title="Courses" count={coursesTotal}>
              <Box as="ul" className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
                {courses.map((hit) => (
                  <Box as="li" key={hit.href}>
                    <Link href={hit.href} prefetch={false} className={cn(CARD, "gap-2")}>
                      <Text as="span" className="text-[15px] leading-[1.4] font-semibold text-navy group-hover:underline group-hover:underline-offset-4">{hit.label}</Text>
                      <Text as="span" className={cn(TAG, "mt-auto")}>{hit.domain}</Text>
                    </Link>
                  </Box>
                ))}
              </Box>
              {coursesTotal > courses.length ? (
                <Text as="p" className="mt-4 text-[14px] leading-[1.6] text-ink/60">
                  Showing {courses.length} of {format(coursesTotal)} courses.{" "}
                  {domains.length === 1 ? (
                    <Link href={domains[0].href} className="font-semibold text-navy underline underline-offset-4">
                      See every {domains[0].label} course
                    </Link>
                  ) : (
                    "Add a word to narrow the list."
                  )}
                </Text>
              ) : null}
            </Group>
          ) : null}

          {pages.length ? (
            <Group id="pages" icon={Layers} title="Services and pages" count={pages.length}>
              <Box as="ul" className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
                {pages.map((hit) => (
                  <Box as="li" key={hit.href}>
                    <Link href={hit.href} className={cn(CARD, "gap-1.5")}>
                      <Text as="span" className={TAG}>{hit.section}</Text>
                      <Text as="span" className="mt-1 text-[15.5px] leading-[1.35] font-bold text-navy group-hover:underline group-hover:underline-offset-4">{hit.label}</Text>
                      {hit.description ? (
                        <Text as="span" className="line-clamp-2 text-[13.5px] leading-[1.55] text-ink/60">{hit.description}</Text>
                      ) : null}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Group>
          ) : null}

          {posts.length ? (
            <Group id="articles" icon={FileText} title="Blog articles" count={postsTotal}>
              {strongPosts.length ? <ArticleList posts={strongPosts} /> : null}
              {otherPosts.length ? (
                <>
                  <Text as="p" className={cn("mb-3 font-mono text-[11px] tracking-[0.12em] text-ink/60 uppercase", strongPosts.length && "mt-6")}>
                    Also mentions &ldquo;{query}&rdquo;
                  </Text>
                  <ArticleList posts={otherPosts} />
                </>
              ) : null}
              {postsTotal > posts.length ? (
                <Text as="p" className="mt-4 text-[14px] leading-[1.6] text-ink/60">
                  Showing the {posts.length} most relevant of {format(postsTotal)} articles.
                </Text>
              ) : null}
            </Group>
          ) : null}
        </Section>
      ) : null}
    </>
  );
}
