/**
 * Line icons for the v2 course sections (24×24, stroke = currentColor),
 * copied from the v2 design file. Keyed by the names the page JSON uses
 * (`ic` on lab scenarios, topic icons on the fit levels).
 */
const PATHS = {
  "book-open": (<><path d="M2 5c3-1.5 6.5-1.5 10 1 3.5-2.5 7-2.5 10-1v14c-3-1.5-6.5-1.5-10 1-3.5-2.5-7-2.5-10-1z"/><path d="M12 6v14"/></>),
  sun: (<><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/></>),
  sprout: (<><path d="M12 21v-9M12 12c0-4 3-7 8-7 0 5-3 7-8 7zM12 14c0-3-2.5-5.5-7-5.5 0 4 2.5 5.5 7 5.5z"/></>),
  grid: (<><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></>),
  "shield-plain": (<><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></>),
  bars: (<><rect x="4" y="13" width="3.5" height="7" rx="1"/><rect x="10.25" y="8.5" width="3.5" height="11.5" rx="1"/><rect x="16.5" y="4" width="3.5" height="16" rx="1"/></>),
  database: (<><ellipse cx="12" cy="5.5" rx="7.5" ry="2.5"/><path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5"/></>),
  "file-lines": (<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 12h8M8 16h8"/></>),
  chevron: (<><path d="m9 6 6 6-6 6"/></>),
  book: (<><path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2zM22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z"/></>),
  check: (<><path d="M5 12.5l4.5 4.5L19 7"/></>),
  replay: (<><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></>),
  arrow: (<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>),
  target: (<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/></>),
  file: (<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></>),
  shield: (<><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></>),
  users: (<><circle cx="12" cy="6" r="2.6"/><circle cx="5.5" cy="8" r="2.2"/><circle cx="18.5" cy="8" r="2.2"/><path d="M7.5 20v-4.5a4.5 4.5 0 0 1 9 0V20M2 19v-3a3.5 3.5 0 0 1 5-3.2M22 19v-3a3.5 3.5 0 0 0-5-3.2"/></>),
  chart: (<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>),
  list: (<><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>),
  bulb: (<><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/></>),
  branch: (<><path d="M12 22V12M12 12l-6-5M12 12l6-5"/><circle cx="12" cy="4" r="2.2"/><circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/></>),
  compass: (<><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></>),
  layers: (<><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></>),
  chat: (<><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></>),
  swap: (<><path d="M4 8h13l-3-3M20 16H7l3 3"/></>),
  scale: (<><path d="M12 4v16M7 20h10M5 8h14"/><path d="M5 8l-3 6a3 3 0 0 0 6 0zM19 8l-3 6a3 3 0 0 0 6 0z"/></>),
  alert: (<><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/></>),
  rocket: (<><path d="M5 15c-1.5 1.5-2 4-2 6 2 0 4.5-.5 6-2M9 15l-3-3c1-4 5-9 12-9 0 7-5 11-9 12z"/><circle cx="15" cy="9" r="1.6"/></>),
  eye: (<><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>),
  spark: (<><path d="M12 3c.6 4.6 3.4 7.4 8 8-4.6.6-7.4 3.4-8 8-.6-4.6-3.4-7.4-8-8 4.6-.6 7.4-3.4 8-8z"/></>),
};

export default function V2Icon({ name, size = 20, className, strokeWidth = 1.7 }) {
  const paths = PATHS[name];
  if (!paths) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths}
    </svg>
  );
}
