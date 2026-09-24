"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const MARKERS = {
  problem: { icon: CircleAlert, className: "text-red-400", textClassName: "text-ink/55", strokeWidth: 1.5 },
  solution: { icon: CircleCheck, className: "text-olive", textClassName: "text-ink", strokeWidth: 2 },
};

function PointList({ items, marker }) {
  if (!items?.length) return null;
  const { icon: Icon, className: iconClassName, textClassName, strokeWidth } = MARKERS[marker];

  return (
    <Box as="ul" className="flex flex-col gap-3.25">
      {items.map((item) => (
        <Box
          as="li"
          key={item}
          className={cn("relative pl-6.5 text-[14.5px] leading-[1.55]", textClassName)}
        >
          <Icon
            size={16}
            strokeWidth={strokeWidth}
            aria-hidden="true"
            className={cn("absolute top-[0.2em] left-0", iconClassName)}
          />
          {item}
        </Box>
      ))}
    </Box>
  );
}

function ColumnLabel({ className, children }) {
  return (
    <Text
      as="p"
      className={cn(
        "mb-3.75 font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase",
        className,
      )}
    >
      {children}
    </Text>
  );
}

/**
 * Audience's "teams that benefit" body: a department tab strip that swaps
 * the panel below it — heading and lede, the workflow friction each team
 * has today next to how the program helps, then the practice use cases.
 * Kept as the smallest client leaf; every panel is server-rendered (inactive
 * ones `hidden`), so all departments' copy is in the HTML crawlers see.
 *
 * Pill tabs styled like the curriculum focus-filter chips (navy + lime when
 * active) — an underline-only strip didn't read as clickable here.
 *
 * Design: `Teams that Benefit Redesign.html` — `.experience`, `.detail`,
 * `.detail-grid`, `.practice`. Its `<select>` is a tab strip here.
 */
export default function DepartmentTabs({ departments }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!departments?.length) return null;

  return (
    <Box className="overflow-hidden rounded-2xl border border-ink/12 bg-white">
      <Box className="flex items-center gap-6 border-b border-ink/12 bg-paper px-7.5 py-4.5 max-md:flex-col max-md:items-start max-md:gap-3 max-sm:px-5">
        <Text
          as="span"
          className="flex-none font-mono text-[10.5px] font-semibold tracking-[0.12em] text-ink/55 uppercase"
        >
          Explore by department
        </Text>

        <Box
          role="tablist"
          aria-label="Departments"
          className="no-scrollbar -mx-1 flex max-w-full gap-2 overflow-x-auto px-1 py-0.5"
        >
          {departments.map((department, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={department.name}
                id={`dept-tab-${index}`}
                type="button"
                role="tab"
                title={`Click Here to View ${department.name}`}
                aria-selected={isActive}
                aria-controls={`dept-panel-${index}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "flex-none cursor-pointer rounded-full border px-4.5 py-2.25 font-display text-[13.5px] font-semibold tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-lime/60",
                  isActive
                    ? "border-navy bg-navy text-lime"
                    : "border-ink/15 bg-white text-ink/65 hover:border-navy hover:text-ink",
                )}
              >
                {department.name}
              </button>
            );
          })}
        </Box>
      </Box>

      {departments.map((department, index) => (
        <Box
          key={department.name}
          id={`dept-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`dept-tab-${index}`}
          hidden={index !== activeIndex}
          className="px-7.5 py-10 max-sm:px-5 max-sm:py-7"
        >
          <Box className="flex flex-col gap-3.5 border-b border-ink/10 pb-7.5">
            <Text
              as="p"
              className="max-w-[48ch] font-display text-[22px] leading-[1.25] font-medium tracking-[-0.02em] text-ink"
            >
              {department.heading}
            </Text>
            <Text as="p" className="max-w-[72ch] text-[15px] leading-[1.7] text-ink/60">
              {department.description}
            </Text>
          </Box>

          <Box className="grid grid-cols-1 gap-6.5 pt-7.5 md:grid-cols-2 md:gap-x-14">
            <Box>
              <ColumnLabel className="text-ink/55">Workflow friction</ColumnLabel>
              <PointList items={department.challenges} marker="problem" />
            </Box>

            <Box>
              <ColumnLabel className="text-olive">How the program helps</ColumnLabel>
              <PointList items={department.benefits} marker="solution" />
            </Box>

            {department.use_cases?.length ? (
              <Box className="flex flex-col gap-2 md:col-span-2 md:flex-row md:items-center md:gap-4.5">
                <Text
                  as="p"
                  className="flex-none text-[13px] font-semibold text-ink"
                >
                  Practice use cases
                </Text>
                <Box
                  as="ul"
                  className="flex flex-wrap gap-2"
                >
                  {department.use_cases.map((useCase) => (
                    <Box
                      as="li"
                      key={useCase}
                      className="rounded-full bg-blue-50 px-2.75 py-1.5 text-[11px] leading-none font-medium text-blue-600"
                    >
                      {useCase}
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : null}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
