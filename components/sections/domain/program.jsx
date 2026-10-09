"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Clock3,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  X,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/common/rich-heading";
import CtaButton from "@/components/common/cta-button";

const COURSES_PER_PAGE = 9;

// How many discipline chips show inline (after "All disciplines") before the
// rest collapse behind the "View all topics" modal — roughly two rows on a
// desktop width. The modal always lists every topic.
const INLINE_DISCIPLINE_COUNT = 10;

const paginationButtonBase =
  "flex h-8 w-8 items-center justify-center rounded-[7px] border transition-all duration-200";

const paginationTextBase = "text-[9px] font-medium uppercase tracking-[1px]";

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "shrink-0 cursor-pointer rounded-[6px] border px-3 py-1.5",
        "text-[11px] font-medium leading-none",
        "transition-all duration-200",
        active
          ? "border-[#07182C] bg-[#07182C] text-[#B8F500]"
          : "border-[#B9BEC5] bg-white text-[#07182C] hover:border-[#07182C]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function DeliveryBadge({ delivery, data }) {
  const { instructorLed, separator, onSite, virtual } =
    data.catalog.deliveryBadge;

  const items = [];

  if (delivery?.instructorLed) {
    items.push(instructorLed);
  }

  if (delivery?.onSite) {
    items.push(onSite);
  }

  if (delivery?.virtual) {
    items.push(virtual);
  }

  if (!items.length) {
    return null;
  }

  return (
    <div className="absolute bottom-2.25 left-2.5 z-10">
      <div className="flex items-center gap-1.25 rounded-[5px] bg-[#B8F500] px-1.25 py-1">
        <span className="h-1.25 w-1.25 shrink-0 rounded-full bg-[#07182C]" />

        <Text
          as="span"
          className="text-[8px] font-semibold uppercase tracking-[1px] text-[#07182C]"
        >
          {items.map((item, index) => (
            <span key={`${item}-${index}`}>
              {index > 0 && <span className="mx-1">{separator}</span>}

              {item}
            </span>
          ))}
        </Text>
      </div>
    </div>
  );
}

function CourseImage({ course, data }) {
  const cardData = data.catalog.card;

  if (course.proposed) {
    return (
      <Box className="relative h-51 overflow-hidden bg-[radial-gradient(circle_at_75%_20%,#33452A_0%,#18251E_30%,#07182C_72%)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,24,44,0.1),rgba(7,24,44,0.65))]" />

        <div className="relative flex h-full items-center justify-center">
          <Text
            as="span"
            className="text-[9px] font-medium uppercase tracking-[2px] text-[#B8F500]"
          >
            {cardData.proposedProgramLabel}
          </Text>
        </div>
      </Box>
    );
  }

  // The CMS can send a course with no image yet (`image.src === ""`); an empty
  // `src` makes the browser refetch the page, so render only when it's set and
  // fall back to the card's own neutral background otherwise.
  const imageSrc = course.image?.src;

  return (
    <Box className="relative h-51 overflow-hidden bg-paper-warm">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={course.image?.alt || course.title}
          title={course.image?.title || course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />
      ) : null}

      <div className="absolute inset-0 bg-black/5" />

      <DeliveryBadge
        delivery={course.delivery ?? data.defaultDelivery}
        data={data}
      />
    </Box>
  );
}

function Duration({ duration, data }) {
  const cardData = data.catalog.card;

  if (!duration) {
    return null;
  }

  const durationText =
    duration.type === "request"
      ? cardData.durationOnRequest
      : duration.type === "range" &&
          duration.min !== undefined &&
          duration.max !== undefined
        ? `${duration.min} - ${duration.max} ${cardData.hoursSuffix}`
        : null;

  if (!durationText) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.75">
      <Clock3 size={12} strokeWidth={1.5} className="text-[#7A818A]" />

      <Text
        as="span"
        className="text-[10px] font-medium uppercase tracking-[1.3px] text-[#727984]"
      >
        {durationText}
      </Text>
    </div>
  );
}

function CourseCard({ course, data }) {
  const cardData = data.catalog.card;

  const cardClasses = [
    "group block overflow-hidden rounded-[12px]",
    course.proposed
      ? "border border-dashed border-[#D7DADF] hover:border-[#0A1628]"
      : "border border-solid border-[#D7DADF]",
    course.proposed ? "bg-paper-warm" : "bg-white",
    "transition-all duration-300",
    "hover:-translate-y-0.75",
    "hover:shadow-[0_12px_30px_rgba(7,24,44,0.09)]",
  ].join(" ");

  return (
    <Box className={cardClasses}>
      <CourseImage course={course} data={data} />

      <Box className="flex min-h-35 flex-col px-4 py-3">
        <div className="mb-1.25 flex min-h-3 items-center gap-2.5">
          <Text
            as="span"
            className="text-[9px] font-medium uppercase tracking-[1.4px] text-[#4F5863]"
          >
            {course.discipline}
          </Text>

          {course.proposed && (
            <Text
              as="span"
              className="rounded-lg bg-lime px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.5px] text-[#0A1628]"
            >
              {cardData.proposedLabel}
            </Text>
          )}
        </div>

        <a href={course.href}>
          <Text
            as="h3"
            className="text-[15px] font-semibold leading-[1.2] tracking-[-0.25px] text-[#07182C] hover:underline"
          >
            {course.title}
          </Text>
        </a>

        <Text
          as="p"
          className="mt-1.25 mb-1.25 line-clamp-2 text-[11px] leading-[1.45] text-[#727984]"
        >
          {course.description}
        </Text>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#E0E2E5] pt-3">
          <Duration duration={course.duration} data={data} />

          <a
            href={course.href}
            className="group flex shrink-0 items-center gap-1"
          >
            <Text
              as="span"
              className="font-mono text-[9px] font-semibold uppercase tracking-[0.5px] text-[#07182C]"
            >
              {course.proposed ? cardData.requestProgram : cardData.viewProgram}
            </Text>

            <ArrowRight
              size={13}
              strokeWidth={1.8}
              className="text-[#07182C] transition-transform duration-200 group-hover:translate-x-0.75"
            />
          </a>
        </div>
      </Box>
    </Box>
  );
}

function PaginationButton({ disabled, active, onClick, children, ariaLabel }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={[
        paginationButtonBase,
        active
          ? "border-[#07182C] bg-[#07182C] text-[#B8F500]"
          : "border-[#D7DADF] bg-white text-[#07182C]",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "hover:border-[#07182C] cursor-pointer",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Pagination({ currentPage, totalPages, onPageChange, data }) {
  const paginationData = data.catalog.pagination;

  const handlePageChange = (page) => {
    onPageChange(page);

    requestAnimationFrame(() => {
      document.getElementById("by-topic")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  return (
    <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.25">
      <PaginationButton
        ariaLabel={paginationData.previous}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
      >
        <ChevronLeft size={14} strokeWidth={1.5} />
      </PaginationButton>

      {pages.map((page) => (
        <PaginationButton
          key={page}
          active={currentPage === page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton
        ariaLabel={paginationData.next}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
      >
        <ChevronRight size={14} strokeWidth={1.5} />
      </PaginationButton>

      {/* ================= ALL PROGRAMS ================= */}
      <Text
        as="span"
        className={[
          "ml-1.5",
          paginationTextBase,
          "text-[#727984]",
          "underline underline-offset-[3px]",
          "transition-colors duration-200",
          "hover:text-[#07182C]",
          "hover:cursor-pointer",
        ].join(" ")}
      >
        All {data.catalog.courseCount} →
      </Text>
    </div>
  );
}

/**
 * "All program topics" overflow modal for the discipline filter. Lists every
 * topic (plus "All disciplines") as outlined rows in a two-column grid.
 * Selecting a row filters the catalog and closes the modal; the × button, a
 * click on the backdrop and Escape also close it. Desktop renders a centered
 * dialog that rises into place; below `sm` it is a bottom sheet. Body scroll is
 * locked while open. Mirrors `BundleDrawer`'s mount/animate/scroll-lock pattern
 * (sections/domain/bundles.jsx), with a short exit transition before unmount.
 */
function TopicsModal({
  title,
  subtitle,
  allLabel,
  disciplines,
  selected,
  onSelect,
  onClose,
}) {
  const [shown, setShown] = useState(false);

  // Animate out, then hand control back to the parent (which unmounts us).
  const close = useCallback(() => {
    setShown(false);
    const id = window.setTimeout(onClose, 180);
    return () => window.clearTimeout(id);
  }, [onClose]);

  // Rise in on the frame after mount.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Close on Escape.
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  // Lock body scroll while open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // "All disciplines" first (clears the filter), then every topic.
  const rows = [{ label: allLabel, value: null }].concat(
    disciplines.map((discipline) => ({ label: discipline, value: discipline })),
  );

  return (
    <Box
      onClick={close}
      className="fixed inset-0 z-[1300] flex items-end justify-center sm:items-center"
    >
      {/* Backdrop */}
      <Box
        aria-hidden="true"
        className={[
          "absolute inset-0 bg-ink/45 backdrop-blur-[2px] transition-opacity duration-200",
          shown ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* Panel */}
      <Box
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        className={[
          "relative z-[1] flex max-h-[85vh] w-full flex-col overflow-hidden bg-white",
          "rounded-t-[18px] sm:w-[min(880px,calc(100vw-48px))] sm:rounded-[16px]",
          "shadow-[0_-24px_60px_rgba(5,13,26,0.26)] sm:shadow-[0_30px_80px_rgba(5,13,26,0.32)]",
          "transition-all duration-200 ease-out",
          shown
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-full scale-100 opacity-0 sm:translate-y-3 sm:scale-[0.96]",
        ].join(" ")}
      >
        {/* Header */}
        <Box className="flex flex-none items-start justify-between gap-4 border-b border-ink/12 px-6 pb-4 pt-5 sm:px-7 sm:pt-6">
          <Box>
            <Text
              as="h3"
              className="font-display text-[20px] font-bold leading-[1.2] tracking-[-0.02em] text-ink sm:text-[22px]"
            >
              {title}
            </Text>

            {subtitle ? (
              <Text as="p" className="mt-1 text-[13px] leading-[1.5] text-ink-muted">
                {subtitle}
              </Text>
            ) : null}
          </Box>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid size-9 flex-none cursor-pointer place-items-center rounded-[9px] border border-ink/12 bg-white text-ink transition-colors duration-200 hover:bg-paper-warm"
          >
            <X size={18} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </Box>

        {/* Rows */}
        <Box className="grid flex-1 grid-cols-1 gap-2 overflow-y-auto overscroll-contain px-6 py-5 sm:grid-cols-2 sm:px-7">
          {rows.map((row) => {
            const active = selected === row.value;

            return (
              <button
                key={row.label}
                type="button"
                onClick={() => onSelect(row.value)}
                className={[
                  "flex cursor-pointer items-center justify-between gap-2 rounded-[8px] border px-3.5 py-2.5 text-left",
                  "text-[12.5px] font-medium leading-[1.3] transition-colors duration-200",
                  active
                    ? "border-[#07182C] bg-[#07182C] text-[#B8F500]"
                    : "border-[#B9BEC5] bg-white text-[#07182C] hover:border-[#07182C]",
                ].join(" ")}
              >
                <span className="min-w-0 flex-1">{row.label}</span>

                {active ? (
                  <Check
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="flex-none"
                  />
                ) : null}
              </button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default function Program({ data }) {
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);

  const [topicsOpen, setTopicsOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  /*
   * DISCIPLINE
   * Generated from course disciplineTags.
   */
  const disciplines = useMemo(() => {
    const unique = new Set();

    (data?.catalog?.courses ?? []).forEach((course) => {
      course.disciplineTags?.forEach((tag) => {
        if (tag) {
          unique.add(tag);
        }
      });
    });

    return Array.from(unique);
  }, [data?.catalog?.courses]);

  /*
   * DISCIPLINE + SEARCH
   */
  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return (data?.catalog?.courses ?? []).filter((course) => {
      const matchesDiscipline =
        !selectedDiscipline ||
        course.disciplineTags?.includes(selectedDiscipline);

      if (!matchesDiscipline) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchableText = [
        course.title,
        course.description,
        course.discipline,
        ...(course.disciplineTags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [data?.catalog?.courses, search, selectedDiscipline]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCourses.length / COURSES_PER_PAGE),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedCourses = useMemo(() => {
    const start = (safeCurrentPage - 1) * COURSES_PER_PAGE;

    return filteredCourses.slice(start, start + COURSES_PER_PAGE);
  }, [filteredCourses, safeCurrentPage]);

  const handleDisciplineChange = (discipline) => {
    setSelectedDiscipline(discipline);
    setCurrentPage(1);
  };

  // Selecting a topic in the modal filters the catalog and closes the modal.
  const handleTopicSelect = (discipline) => {
    handleDisciplineChange(discipline);
    setTopicsOpen(false);
  };

  // Keep the inline chips to roughly two rows; the rest live in the modal. When
  // the current filter is a collapsed topic, surface it inline so the active
  // selection is always visible without opening the modal.
  const hasOverflow = disciplines.length > INLINE_DISCIPLINE_COUNT;
  const inlineDisciplines = useMemo(() => {
    if (!hasOverflow) return disciplines;

    const shown = disciplines.slice(0, INLINE_DISCIPLINE_COUNT);
    if (selectedDiscipline && !shown.includes(selectedDiscipline)) {
      shown[shown.length - 1] = selectedDiscipline;
    }
    return shown;
  }, [disciplines, hasOverflow, selectedDiscipline]);

  const hiddenCount = disciplines.length - INLINE_DISCIPLINE_COUNT;

  const filterLabels = data?.filters ?? {};
  const viewAllLabel = filterLabels.viewAllTopics || "View all topics";
  const topicsTitle = filterLabels.allTopicsTitle || "All program topics";
  const topicsSubtitle = (
    filterLabels.allTopicsSubtitle || "Browse all {count} topics available."
  ).replace("{count}", String(disciplines.length));

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const showingStart =
    filteredCourses.length === 0
      ? 0
      : (safeCurrentPage - 1) * COURSES_PER_PAGE + 1;

  const showingEnd =
    filteredCourses.length === 0
      ? 0
      : Math.min(safeCurrentPage * COURSES_PER_PAGE, filteredCourses.length);

  if (!data?.catalog) return null;

  return (
    <Section id="by-topic" className="bg-paper">
      <Box>
        {/* ================= HEADER ================= */}
        <Box>
          <RichHeading
            as="h2"
            heading={data.heading}
            className="max-w-110 font-semibold tracking-[-1.8px] text-ink"
            emphasisClassName="font-serif font-normal tracking-[-1px]"
          />

          <Text
            as="p"
            className="mt-3 max-w-125 text-[12px] leading-[1.45] text-ink-muted"
          >
            {data.description}
          </Text>
        </Box>

        {/* ================= FILTERS ================= */}
        <Box className="mt-5">
          {/* ================= DISCIPLINE ================= */}
          <Box className="flex flex-col gap-2.5 md:flex-row md:items-center">
            <Text
              as="span"
              className="w-17 shrink-0 whitespace-nowrap text-[10px] font-medium uppercase tracking-[1.5px] text-ink-muted]"
            >
              DISCIPLINE
            </Text>

            <Box className="flex flex-col gap-2.5">
              <Box className="flex flex-wrap gap-1.5">
                <FilterButton
                  active={!selectedDiscipline}
                  onClick={() => handleDisciplineChange(null)}
                >
                  {data.filters.allDisciplines}
                </FilterButton>

                {inlineDisciplines.map((discipline) => (
                  <FilterButton
                    key={discipline}
                    active={selectedDiscipline === discipline}
                    onClick={() => handleDisciplineChange(discipline)}
                  >
                    {discipline}
                  </FilterButton>
                ))}
              </Box>

              {hasOverflow ? (
                <button
                  type="button"
                  onClick={() => setTopicsOpen(true)}
                  className="group inline-flex w-fit cursor-pointer items-center gap-1 text-[12px] font-semibold text-navy transition-colors duration-200 hover:text-ink"
                >
                  {viewAllLabel} ({hiddenCount} more)
                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-y-0.5"
                  />
                </button>
              ) : null}
            </Box>
          </Box>
        </Box>

        {/* ================= DIVIDER ================= */}
        <Box className="my-3 h-px w-full bg-[#D7DADF]" />

        {/* ================= CATALOG TOP BAR ================= */}
        <Box className="mb-2.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <Text
            as="p"
            className="text-[10px] font-medium uppercase tracking-[1.4px] text-[#727984]"
          >
            {search.trim() && filteredCourses.length === 0 ? (
              <>No Programs matched &quot;{search.trim()}&quot; in this Selection</>
            ) : (
              <>
                {data.catalog.showingLabel} {showingStart}–{showingEnd}{" "}
                {data.catalog.ofLabel} {filteredCourses.length}
                {search.trim() ? (
                  <> matching for &quot;{search.trim()}&quot;</>
                ) : null}{" "}
                <span className="mx-1.25 text-link-muted">·</span>{" "}
                <a
                  href="#by-topic"
                  className={[
                    "text-link-muted",
                    "tracking-[1px]",
                    "underline underline-offset-[3px]",
                    "transition-colors duration-200",
                    "hover:text-[#07182C]",
                    "hover:cursor-pointer",
                  ].join(" ")}
                >
                  {data.catalog.courseCount} {data.catalog.liveCatalogLabel}
                </a>
              </>
            )}
          </Text>

          {/* ================= SEARCH ================= */}
          <Box className="relative w-full sm:w-59">
            <Search
              size={14}
              strokeWidth={1.5}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
            />

            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder={data.catalog.searchPlaceholder}
              className={[
                "h-8.5 w-full rounded-[8px]",
                "border border-[#BFC4CA]",
                "bg-white pl-7.5 pr-8",
                "text-[11px] text-ink",
                "outline-none",
                "placeholder:text-[#89909A]",
                "focus:border-ink",
                "[&::-webkit-search-cancel-button]:appearance-none",
                "[&::-webkit-search-decoration]:appearance-none",
              ].join(" ")}
            />

            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
                className={[
                  "absolute right-1.5 top-1/2",
                  "flex h-5 w-5 -translate-y-1/2",
                  "items-center justify-center",
                  "rounded-full",
                  "bg-paper-warm",
                  "text-[#727984]",
                  "transition-all duration-200",
                  "hover:bg-ink",
                  "hover:text-[#B8F500]",
                  "hover:cursor-pointer",
                ].join(" ")}
              >
                <span className="text-[16px] font-medium leading-none">×</span>
              </button>
            )}
          </Box>
        </Box>

        {/* ================= COURSES ================= */}
        {paginatedCourses.length > 0 ? (
          <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedCourses.map((course) => (
              <CourseCard key={course.id} course={course} data={data} />
            ))}
          </Box>
        ) : (
          <Box className="flex flex-col items-center justify-center rounded-[12px] border border-dashed border-[#D7DADF] bg-white p-8">
            <Text
              as="p"
              className="mb-4.5 max-w-137.5 text-center text-[12px] text-ink-muted"
            >
              {data.catalog.noResults}
            </Text>

            {data.catalog.actions?.map((action) => (
              <CtaButton
                key={action.label}
                variant={action.variant}
                arrow
                render={<a href={action.href} />}
              >
                {action.label}
              </CtaButton>
            ))}
          </Box>
        )}

        {/* ================= PAGINATION ================= */}
        {filteredCourses.length > COURSES_PER_PAGE && (
          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            data={data}
          />
        )}
      </Box>

      {/* ================= ALL TOPICS MODAL ================= */}
      {topicsOpen ? (
        <TopicsModal
          title={topicsTitle}
          subtitle={topicsSubtitle}
          allLabel={data.filters.allDisciplines}
          disciplines={disciplines}
          selected={selectedDiscipline}
          onSelect={handleTopicSelect}
          onClose={() => setTopicsOpen(false)}
        />
      ) : null}
    </Section>
  );
}
