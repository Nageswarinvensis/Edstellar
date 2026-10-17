/**
 * Parses the CMS's packed trainer-history strings — `meta.work_history` and
 * `meta.projects` share one format:
 *  - Splits multiple entries by '||'
 *  - Splits an entry's header from its bullets by '::'
 *  - Splits individual bullet items by ';;'
 *
 * A header reads "Role - Company or industry (Mon YYYY - Mon YYYY)"; for a
 * project the "role" is the program title and the second part its sector.
 * Roles can carry their own " - " ("Corporate Trainer - Executive Coach -
 * Consultancy"), so the company/industry is the *last* segment.
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
      const parts = beforeDate.split(/\s+-\s+/);
      company_or_industry = parts.length > 1 ? parts.pop() : "";
      role = parts.join(" - ");
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
 * `start` is a `Date`, or null when the date doesn't parse. Pass
 * `{ sort: false }` to keep the CMS's own order instead.
 */
export function parseCoursesWithStart(courses, { sort = true } = {}) {
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
      if (!sort) return a.index - b.index;
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

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * A CMS "Mon YYYY" date as the designs write it: "Feb 2014" → "February,
 * 2014" (`comma: false` → "February 2014"). Anything else — "present", a
 * bare year — passes through unchanged.
 */
export function formatMonthYear(value, { comma = true } = {}) {
  const match = /^([a-z]+)\s+(\d{4})$/i.exec(String(value ?? "").trim());
  if (!match) return value ?? "";
  const month = MONTHS.indexOf(match[1].slice(0, 3).toLowerCase());
  if (month === -1) return value;
  return `${MONTH_NAMES[month]}${comma ? "," : ""} ${match[2]}`;
}

/** A history entry's "Mon YYYY - Mon YYYY" range with full month names. */
export function formatDuration(duration, { comma = true, present = "present" } = {}) {
  return String(duration ?? "")
    .split(/\s*-\s*/)
    .map((part) => (/^present$/i.test(part) ? present : formatMonthYear(part, { comma })))
    .join(" - ");
}

/**
 * Parses the CMS's `meta.education` — "School - Field (YYYY-YYYY) || …" —
 * into `{ school, field, years }`. The years are the last parenthesized
 * group; the field is whatever follows the school's " - ".
 */
export function parseEducation(education) {
  if (!education || typeof education !== "string") return [];

  return education
    .split(/\s*\|\|\s*/)
    .filter(Boolean)
    .map((entry) => {
      const yearsMatch = entry.match(/\(([^()]*)\)\s*$/);
      const rest = yearsMatch ? entry.replace(yearsMatch[0], "").trim() : entry.trim();
      const [school, ...field] = rest.split(/\s+-\s+/);
      return {
        school: school.trim(),
        field: field.join(" - ").trim(),
        years: yearsMatch ? yearsMatch[1].trim() : "",
      };
    });
}

/** Country name → ISO 3166 code, built once from the runtime's own region
 * names rather than a hand-kept table. */
let regionCodes;
function regionCodeOf(country) {
  if (!regionCodes) {
    regionCodes = new Map();
    const names = new Intl.DisplayNames(["en"], { type: "region" });
    for (let a = 65; a <= 90; a += 1) {
      for (let b = 65; b <= 90; b += 1) {
        const code = String.fromCharCode(a, b);
        try {
          const name = names.of(code);
          if (name && name !== code) regionCodes.set(name.toLowerCase(), code);
        } catch {
          // Not a region code.
        }
      }
    }
  }
  return regionCodes.get(String(country ?? "").trim().toLowerCase()) ?? null;
}

/** The flag emoji for a country name ("India" → 🇮🇳); "" when unknown. */
export function countryFlag(country) {
  const code = regionCodeOf(country);
  if (!code) return "";
  return String.fromCodePoint(...[...code].map((char) => 0x1f1a5 + char.charCodeAt(0)));
}

/** "CAIRO" → "Cairo": the CMS sends some city names in capitals. */
export function tidyPlaceName(name) {
  const value = String(name ?? "").trim();
  return value === value.toUpperCase()
    ? value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
    : value;
}
