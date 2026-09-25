/**
 * Parses the CMS's packed trainer-history strings — `meta.work_history` and
 * `meta.projects` share one format:
 *  - Splits multiple entries by '||'
 *  - Splits an entry's header from its bullets by '::'
 *  - Splits individual bullet items by ';;'
 *
 * A header reads "Role - Company or industry (Mon YYYY - Mon YYYY)"; for a
 * project the "role" is the program title and the second part its sector.
 */
export function parseTrainerHistory(history) {
  if (!history || typeof history !== "string") return [];

  const entries = history.split(/\s*\|\|\s*/).filter(Boolean);

  return entries.map((entry, index) => {
    const [headerPart = "", highlightsPart = ""] = entry.split(/\s*::\s*/);

    let role = "";
    let company_or_industry = "";
    let duration = "";

    // The date range is the *last* parenthesized group, e.g. "(Feb 2024 -
    // present)" — industries carry their own, as in "Computer and
    // Information Technology (IT) (Oct 2024 - Oct 2024)".
    const dateMatch = headerPart.match(/\(([^()]*)\)\s*$/);

    if (dateMatch) {
      duration = dateMatch[1].trim();
      const beforeDate = headerPart.replace(dateMatch[0], "").trim();
      const parts = beforeDate.split(/\s*-\s*/);
      role = parts[0] || "";
      company_or_industry = parts.slice(1).join(" - ") || "";
    } else {
      const parts = headerPart.split(/\s*-\s*/);
      role = parts[0] || "";
      company_or_industry = parts[1] || "";
      duration = parts.slice(2).join(" - ") || "";
    }

    const highlights = highlightsPart
      .split(/\s*;;\s*/)
      .map((b) => b.trim())
      .filter(Boolean);

    return {
      role: role.trim(),
      company_or_industry: company_or_industry.trim(),
      duration: duration.trim(),
      is_current: index === 0 || duration.toLowerCase().includes("present"),
      highlights,
    };
  });
}

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

/**
 * Parses the CMS's `meta.courses_with_start` — "Name (since Mon YYYY) ||
 * Name (since Mon YYYY)" — into `{ title, since, start }`, oldest first so
 * the longest-delivered topic leads. The date is the *last* parenthesized
 * group, since names carry their own ("… (POSH) (since Feb 2015)").
 * `start` is a `Date`, or null when the date doesn't parse.
 */
export function parseCoursesWithStart(courses) {
  if (!courses || typeof courses !== "string") return [];

  return courses
    .split(/\s*\|\|\s*/)
    .filter(Boolean)
    .map((entry) => {
      const match = entry.match(/^(.*?)\s*\(\s*since\s+([^()]+)\)\s*$/i);
      if (!match) return { title: entry.trim(), since: null, start: null };

      const since = match[2].trim();
      const date = /^([a-z]+)\s+(\d{4})$/i.exec(since);
      const month = date
        ? MONTHS.indexOf(date[1].slice(0, 3).toLowerCase())
        : -1;
      const start =
        date && month !== -1 ? new Date(Number(date[2]), month, 1) : null;

      return { title: match[1].trim(), since, start };
    })
    .map((course, index) => ({ ...course, index }))
    .sort((a, b) => {
      if (!a.start || !b.start)
        return a.start ? -1 : b.start ? 1 : a.index - b.index;
      return a.start - b.start || a.index - b.index;
    })
    .map(({ index, ...course }) => course);
}

/** Whole years from `start` to `now`, rounded down — 5 years 11 months is 5. */
export function yearsSince(start, now = new Date()) {
  if (!start) return null;
  let years = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < start.getMonth()) years -= 1;
  return Math.max(years, 0);
}
