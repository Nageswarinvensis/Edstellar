"use client";

import { CtaButton } from "@/components/shared/CtaButton";
import { useMemo, useState } from "react";
import {
  Search,
  Clock3,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";

const COURSES_PER_PAGE = 9;

function RichHeading({ parts }) {
  return (
    <Text
      as="h1"
      className="max-w-180 text-[38px] font-semibold leading-[0.98] tracking-[-1.8px] text-[#07182C] sm:text-[44px] lg:text-[48px]"
    >
      {parts.map((part, index) =>
        part.em ? (
          <em
            key={index}
            className="font-serif font-normal tracking-[-1px]"
          >
            {part.text}
          </em>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </Text>
  );
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "shrink-0 rounded-[6px] border px-3 py-1.5",
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
    <div className="absolute bottom-[9px] left-[10px] z-10">
      <div className="flex items-center gap-[5px] rounded-[5px] bg-[#B8F500] px-[7px] py-[5px]">
        <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#07182C]" />

        <Text
          as="span"
          className="text-[8px] font-semibold uppercase tracking-[1px] text-[#07182C]"
        >
          {items.map((item, index) => (
            <span key={`${item}-${index}`}>
              {index > 0 && (
                <span className="mx-1">{separator}</span>
              )}

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

  return (
    <Box className="relative h-51 overflow-hidden">
      <img
        src={course.image?.src}
        alt={course.image?.alt || course.title}
        title={course.image?.title || course.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
      />

      <div className="absolute inset-0 bg-black/5" />

      <DeliveryBadge
        delivery={course.delivery}
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

  if (duration.type === "request") {
    return (
      <div className="flex items-center gap-[7px]">
        <Clock3
          size={12}
          strokeWidth={1.5}
          className="text-[#7A818A]"
        />

        <Text
          as="span"
          className="text-[9px] font-medium uppercase tracking-[1.3px] text-[#727984]"
        >
          {cardData.durationOnRequest}
        </Text>
      </div>
    );
  }

  if (
    duration.type === "range" &&
    duration.min !== undefined &&
    duration.max !== undefined
  ) {
    return (
      <div className="flex items-center gap-[7px]">
        <Clock3
          size={12}
          strokeWidth={1.5}
          className="text-[#7A818A]"
        />

        <Text
          as="span"
          className="text-[9px] font-medium uppercase tracking-[1.3px] text-[#727984]"
        >
          {duration.min} - {duration.max}{" "}
          {cardData.hoursSuffix}
        </Text>
      </div>
    );
  }

  return null;
}

function CourseCard({ course, data }) {
  const cardData = data.catalog.card;

  return (
    <a
      href={course.href}
      className={[
        "group block overflow-hidden rounded-[12px]",
        course.proposed
        ? "border border-dashed border-[#D7DADF] hover:border-[#0A1628]"
        : "border border-solid border-[#D7DADF]",
        course.proposed ? "bg-paper-warm" : "bg-white",
        "transition-all duration-300",
        "hover:-translate-y-0.75",
        "hover:shadow-[0_12px_30px_rgba(7,24,44,0.09)]",
        ].join(" ")}
    >
      <CourseImage
        course={course}
        data={data}
      />

      <Box className="flex min-h-[141px] flex-col px-4 py-3">
        <div className="mb-[7px] flex min-h-[13px] items-center gap-2.5">
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

        <Text
          as="h3"
          className="text-[15px] font-semibold leading-[1.2] tracking-[-0.25px] text-[#07182C]"
        >
          {course.title}
        </Text>

        <Text
          as="p"
          className="mt-[7px] line-clamp-2 text-[11px] leading-[1.45] text-[#727984]"
        >
          {course.description}
        </Text>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#E0E2E5] pt-[11px]">
          <Duration
            duration={course.duration}
            data={data}
          />

          <div className="flex shrink-0 items-center gap-1">
            <Text
              as="span"
              className="text-[9px] font-semibold uppercase tracking-[0.5px] text-[#07182C]"
            >
              {course.proposed
                ? cardData.requestProgram
                : cardData.viewProgram}
            </Text>

            <ArrowRight
              size={13}
              strokeWidth={1.8}
              className="text-[#07182C] transition-transform duration-200 group-hover:translate-x-0.75"
            />
          </div>
        </div>
      </Box>
    </a>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  data,
}) {
  const paginationData = data.catalog.pagination;

  const pages = useMemo(() => {
    const result = [];

    for (let page = 1; page <= totalPages; page += 1) {
      result.push(page);
    }

    return result;
  }, [totalPages]);

  return (
    <div className="mt-3.5 flex flex-wrap items-center justify-center gap-[5px]">
      <button
        type="button"
        aria-label={paginationData.previous}
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(Math.max(1, currentPage - 1))
        }
        className={[
          "flex h-8 w-8 items-center justify-center rounded-[7px] border",
          "border-[#D7DADF] bg-white",
          "text-[#07182C]",
          "transition-all duration-200",
          currentPage === 1
            ? "cursor-not-allowed opacity-40"
            : "hover:border-[#07182C]",
        ].join(" ")}
      >
        <ChevronLeft size={14} strokeWidth={1.5} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={[
            "flex h-8 w-8 items-center justify-center rounded-[7px] border px-2",
            "text-[10px] font-medium",
            "transition-all duration-200",
            currentPage === page
              ? "border-[#07182C] bg-[#07182C] text-[#B8F500]"
              : "border-[#D7DADF] bg-white text-[#07182C] hover:border-[#07182C]",
          ].join(" ")}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        aria-label={paginationData.next}
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(
            Math.min(totalPages, currentPage + 1),
          )
        }
        className={[
          "flex h-8 w-8 items-center justify-center rounded-[7px] border",
          "border-[#D7DADF] bg-white",
          "text-[#07182C]",
          "transition-all duration-200",
          currentPage === totalPages
            ? "cursor-not-allowed opacity-40"
            : "hover:border-[#07182C]",
        ].join(" ")}
      >
        <ChevronRight size={14} strokeWidth={1.5} />
      </button>

      <Text
        as="span"
        className={[
            "ml-1.5",
            "text-[9px] font-medium uppercase tracking-[1px]",
            "text-[#727984]",
            "underline underline-offset-[3px]",
            "transition-colors duration-200",
            "hover:text-[#07182C]",
            "hover:cursor-pointer",
        ].join(" ")}
      >
        {paginationData.allProgramsSuffix}{" "}
        {data.catalog.courseCount} →
      </Text>
    </div>
  );
}

export default function Program({ data }) {
  const [selectedDiscipline, setSelectedDiscipline] =
    useState(null);

  const [selectedRole, setSelectedRole] =
    useState(null);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  /*
   * DISCIPLINE
   * Generated from course disciplineTags.
   */
  const disciplines = useMemo(() => {
    const unique = new Set();

    data.catalog.courses.forEach((course) => {
      course.disciplineTags?.forEach((tag) => {
        if (tag) {
          unique.add(tag);
        }
      });
    });

    return Array.from(unique);
  }, [data.catalog.courses]);

  /*
   * ROLE
   * Generated from course roles.
   *
   * No role names are hardcoded here.
   */
  const roles = useMemo(() => {
    const unique = new Set();

    data.catalog.courses.forEach((course) => {
      course.roles?.forEach((role) => {
        if (role) {
          unique.add(role);
        }
      });
    });

    return Array.from(unique);
  }, [data.catalog.courses]);

  /*
   * DISCIPLINE + ROLE + SEARCH
   */
  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return data.catalog.courses.filter((course) => {
      const matchesDiscipline =
        !selectedDiscipline ||
        course.disciplineTags?.includes(
          selectedDiscipline,
        );

      const matchesRole =
        !selectedRole ||
        course.roles?.includes(selectedRole);

      if (!matchesDiscipline || !matchesRole) {
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
        ...(course.roles || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [
    data.catalog.courses,
    search,
    selectedDiscipline,
    selectedRole,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCourses.length / COURSES_PER_PAGE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedCourses = useMemo(() => {
    const start =
      (safeCurrentPage - 1) * COURSES_PER_PAGE;

    return filteredCourses.slice(
      start,
      start + COURSES_PER_PAGE,
    );
  }, [filteredCourses, safeCurrentPage]);

  const handleDisciplineChange = (discipline) => {
    setSelectedDiscipline(discipline);
    setCurrentPage(1);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const showingStart =
    filteredCourses.length === 0
      ? 0
      : (safeCurrentPage - 1) *
          COURSES_PER_PAGE +
        1;

  const showingEnd =
    filteredCourses.length === 0
      ? 0
      : Math.min(
          safeCurrentPage * COURSES_PER_PAGE,
          filteredCourses.length,
        );

  return (
    <Section className="bg-paper">
      <Box>
        {/* ================= HEADER ================= */}
        <Box>
          <RichHeading
            parts={data.heading.parts}
          />

          <Text
            as="p"
            className="mt-2 max-w-125 text-[12px] leading-[1.45] text-[#727984]"
          >
            {data.description}
          </Text>
        </Box>

        {/* ================= FILTERS ================= */}
        <Box className="mt-[22px]">
          {/* ================= DISCIPLINE ================= */}
          <Box className="flex flex-col gap-2 md:flex-row md:items-center">
            <Text
              as="span"
              className="w-[68px] shrink-0 text-[8px] font-medium uppercase tracking-[1.5px] text-[#727984]"
            >
              {data.eyebrow.discipline}
            </Text>

            <Box className="flex flex-wrap gap-1.5">
              <FilterButton
                active={!selectedDiscipline}
                onClick={() =>
                  handleDisciplineChange(null)
                }
              >
                {data.filters.allDisciplines}
              </FilterButton>

              {disciplines.map((discipline) => (
                <FilterButton
                  key={discipline}
                  active={
                    selectedDiscipline === discipline
                  }
                  onClick={() =>
                    handleDisciplineChange(discipline)
                  }
                >
                  {discipline}
                </FilterButton>
              ))}
            </Box>
          </Box>

          {/* ================= ROLE ================= */}
          <Box className="mt-2 flex flex-col gap-2 md:flex-row md:items-center">
            <Text
              as="span"
              className="w-[68px] shrink-0 text-[8px] font-medium uppercase tracking-[1.5px] text-[#727984]"
            >
              {data.eyebrow.role}
            </Text>

            <Box className="flex flex-wrap gap-1.5">
              <FilterButton
                active={!selectedRole}
                onClick={() =>
                  handleRoleChange(null)
                }
              >
                {data.filters.allRoles}
              </FilterButton>

              {roles.map((role) => (
                <FilterButton
                  key={role}
                  active={selectedRole === role}
                  onClick={() =>
                    handleRoleChange(role)
                  }
                >
                  {role}
                </FilterButton>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ================= DIVIDER ================= */}
        <Box className="my-[13px] h-px w-full bg-[#D7DADF]" />

        {/* ================= CATALOG TOP BAR ================= */}
        <Box className="mb-[10px] flex flex-col gap-[10px] sm:flex-row sm:items-center sm:justify-between">
          <Text
            as="p"
            className="text-[8px] font-medium uppercase tracking-[1.4px] text-[#727984]"
          >
            {data.catalog.showingLabel}{" "}
            {showingStart}–{showingEnd}{" "}
            {data.catalog.ofLabel}{" "}
            {filteredCourses.length}{" "}
            <span className="mx-[5px] text-[#B7BCC2]">
              ·
            </span>
            {data.catalog.courseCount}{" "}
            {data.catalog.liveCatalogLabel}
          </Text>

          {/* SEARCH */}
          <Box className="relative w-full sm:w-[238px]">
  <Search
    size={14}
    strokeWidth={1.5}
    className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#7A818A]"
  />

  <input
    type="search"
    value={search}
    onChange={handleSearchChange}
    placeholder={
      data.catalog.searchPlaceholder
    }
    className={[
      "h-[34px] w-full rounded-[8px]",
      "border border-[#BFC4CA]",
      "bg-white pl-[30px] pr-[32px]",
      "text-[11px] text-[#07182C]",
      "outline-none",
      "placeholder:text-[#89909A]",
      "focus:border-[#07182C]",
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
        "absolute right-[7px] top-1/2",
        "flex h-[20px] w-[20px] -translate-y-1/2",
        "items-center justify-center",
        "rounded-full",
        "bg-paper-warm",
        "text-[#727984]",
        "transition-all duration-200",
        "hover:bg-[#07182C]",
        "hover:text-[#B8F500]",
        "hover:cursor-pointer",
      ].join(" ")}
    >
      <span className="text-[15px] font-medium leading-none">
        ×
      </span>
    </button>
  )}
</Box>
        </Box>

        {/* ================= COURSES ================= */}
        {paginatedCourses.length > 0 ? (
          <Box className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                data={data}
              />
            ))}
          </Box>
        ) : (
          <Box className="flex p-8 items-center justify-center rounded-[12px] border border-dashed border-[#D7DADF] bg-white">
            <Text
              as="p"
              className="mb-4.5 text-[12px] max-w-137.5 text-center text-[#727984]"
            >
              {data.catalog.noResults}
            </Text>
            {data.actions?.map((action) => (
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
    </Section>
  );
}