/**
 * ETL Testing hero illustration — the animated pipeline SVG.
 *
 * Animation is CSS-only (.ehr-* classes in globals.css).
 * No JS, no "use client" needed.
 * The parent <CourseBannerV2> supplies the accessible `role="img"` + `aria-label`
 * on the wrapping <figure>; this SVG is marked aria-hidden.
 */
export default function EtlHeroIllo() {
  return (
    <svg
      className="ehr"
      viewBox="0 24 560 485"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="ehrLane"
          gradientUnits="userSpaceOnUse"
          x1="236"
          y1="0"
          x2="408"
          y2="0"
        >
          <stop offset="0" stopColor="#566E0B" stopOpacity=".45" />
          <stop offset="1" stopColor="#566E0B" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Source cylinders */}
      <g className="ehr-src" transform="translate(52 262)">
        <path d="M-22 -12 v24 a22 7 0 0 0 44 0 v-24" />
        <ellipse cx="0" cy="-12" rx="22" ry="7" />
      </g>
      <g className="ehr-src" transform="translate(52 334)">
        <path d="M-22 -12 v24 a22 7 0 0 0 44 0 v-24" />
        <ellipse cx="0" cy="-12" rx="22" ry="7" />
      </g>
      <g className="ehr-src" transform="translate(52 406)">
        <path d="M-22 -12 v24 a22 7 0 0 0 44 0 v-24" />
        <ellipse cx="0" cy="-12" rx="22" ry="7" />
      </g>
      <text className="ehr-lab" x="30" y="236">Sources</text>

      {/* Pipeline lanes */}
      <line className="ehr-lane0" x1="92" y1="262" x2="236" y2="262" />
      <line className="ehr-lane1" x1="236" y1="262" x2="408" y2="262" />
      <line className="ehr-flow" x1="236" y1="262" x2="408" y2="262" />
      <line className="ehr-lane0" x1="92" y1="334" x2="236" y2="334" />
      <line className="ehr-lane1" x1="236" y1="334" x2="408" y2="334" />
      <line className="ehr-flow" x1="236" y1="334" x2="408" y2="334" />
      <line className="ehr-lane0" x1="92" y1="406" x2="236" y2="406" />
      <line className="ehr-lane1" x1="236" y1="406" x2="408" y2="406" />
      <line className="ehr-flow" x1="236" y1="406" x2="408" y2="406" />

      {/* Gate */}
      <rect className="ehr-gate" x="220" y="230" width="32" height="208" rx="16" />
      <line className="ehr-scan" x1="220" x2="252" y1="240" y2="240" />
      <line className="ehr-drop" x1="236" y1="438" x2="236" y2="464" />

      {/* Team */}
      <g className="ehr-team">
        <g transform="translate(222 196)">
          <circle cx="0" cy="-5" r="5" />
          <path d="M-9 9c1-5 4.5-7.5 9-7.5s8 2.5 9 7.5" />
        </g>
        <g transform="translate(250 196)">
          <circle cx="0" cy="-5" r="5" />
          <path d="M-9 9c1-5 4.5-7.5 9-7.5s8 2.5 9 7.5" />
        </g>
        <g className="ehr-lens" transform="translate(270 172)">
          <circle r="9" />
          <path d="M6.5 6.5 L13 13" />
        </g>
      </g>
      <text className="ehr-lab ehr-top" x="236" y="150" textAnchor="middle">Team spot check</text>

      {/* Catch tray */}
      <g className="ehr-tray">
        <rect x="212" y="464" width="104" height="30" rx="8" />
        <text x="280" y="483" textAnchor="middle">Caught</text>
      </g>

      {/* Dashboard */}
      <g className="ehr-dash">
        <rect className="ehr-dash-b" x="430" y="206" width="112" height="232" rx="12" />
        <text className="ehr-lab" x="442" y="228">Dashboard</text>
        <rect className="ehr-bar" style={{ "--i": 0 }} x="446" y="352" width="14" height="52" rx="3" />
        <rect className="ehr-bar" style={{ "--i": 1 }} x="468" y="326" width="14" height="78" rx="3" />
        <rect className="ehr-bar" style={{ "--i": 2 }} x="490" y="340" width="14" height="64" rx="3" />
        <rect className="ehr-bar" style={{ "--i": 3 }} x="512" y="308" width="14" height="96" rx="3" />
        <path className="ehr-spark" d="M444 290 L466 276 L488 282 L510 262 L528 254" />
        <g className="ehr-trust" transform="translate(486 186)">
          <rect x="-40" y="-13" width="80" height="26" rx="13" />
          <path d="M-30 0 L-25.5 4.5 L-18.5 -3.5" />
          <text x="9" y="4" textAnchor="middle">Trusted</text>
        </g>
      </g>

      {/* Good data rows — lane 1 */}
      <g className="ehr-row ehr-good" style={{ offsetPath: "path('M92 262 L428 262')", "--d": "-0.0s", "--p": "18%" }}>
        <rect x="-9" y="-6" width="18" height="12" rx="3" />
        <path d="M-5 -1.5 h10 M-5 1.5 h7" />
      </g>
      <g className="ehr-row ehr-good" style={{ offsetPath: "path('M92 262 L428 262')", "--d": "-3.0s", "--p": "62%" }}>
        <rect x="-9" y="-6" width="18" height="12" rx="3" />
        <path d="M-5 -1.5 h10 M-5 1.5 h7" />
      </g>
      <g className="ehr-row ehr-good" style={{ offsetPath: "path('M92 262 L428 262')", "--d": "-6.0s", "--p": "92%" }}>
        <rect x="-9" y="-6" width="18" height="12" rx="3" />
        <path d="M-5 -1.5 h10 M-5 1.5 h7" />
      </g>
      {/* Good data rows — lane 2 */}
      <g className="ehr-row ehr-good" style={{ offsetPath: "path('M92 334 L428 334')", "--d": "-1.1s", "--p": "18%" }}>
        <rect x="-9" y="-6" width="18" height="12" rx="3" />
        <path d="M-5 -1.5 h10 M-5 1.5 h7" />
      </g>
      <g className="ehr-row ehr-good" style={{ offsetPath: "path('M92 334 L428 334')", "--d": "-4.1s", "--p": "62%" }}>
        <rect x="-9" y="-6" width="18" height="12" rx="3" />
        <path d="M-5 -1.5 h10 M-5 1.5 h7" />
      </g>
      <g className="ehr-row ehr-good" style={{ offsetPath: "path('M92 334 L428 334')", "--d": "-7.1s", "--p": "92%" }}>
        <rect x="-9" y="-6" width="18" height="12" rx="3" />
        <path d="M-5 -1.5 h10 M-5 1.5 h7" />
      </g>
      {/* Good data rows — lane 3 */}
      <g className="ehr-row ehr-good" style={{ offsetPath: "path('M92 406 L428 406')", "--d": "-2.2s", "--p": "18%" }}>
        <rect x="-9" y="-6" width="18" height="12" rx="3" />
        <path d="M-5 -1.5 h10 M-5 1.5 h7" />
      </g>
      <g className="ehr-row ehr-good" style={{ offsetPath: "path('M92 406 L428 406')", "--d": "-5.2s", "--p": "62%" }}>
        <rect x="-9" y="-6" width="18" height="12" rx="3" />
        <path d="M-5 -1.5 h10 M-5 1.5 h7" />
      </g>
      <g className="ehr-row ehr-good" style={{ offsetPath: "path('M92 406 L428 406')", "--d": "-8.2s", "--p": "92%" }}>
        <rect x="-9" y="-6" width="18" height="12" rx="3" />
        <path d="M-5 -1.5 h10 M-5 1.5 h7" />
      </g>

      {/* Bad data rows */}
      <g className="ehr-row ehr-bad ehr-bad0" style={{ offsetPath: "path('M92 262 L236 262 L236 478')", "--d": "-1.0s" }}>
        <rect x="-9" y="-6" width="18" height="12" rx="3" />
        <path d="M-5 -1.5 h10 M-5 1.5 h7" />
      </g>
      <g className="ehr-row ehr-bad ehr-bad2" style={{ offsetPath: "path('M92 406 L236 406 L236 478')", "--d": "-5.5s" }}>
        <rect x="-9" y="-6" width="18" height="12" rx="3" />
        <path d="M-5 -1.5 h10 M-5 1.5 h7" />
      </g>

      {/* Annotation strip */}
      <g className="ehr-ann">
        <text className="ehr-ann-h" x="24" y="38">In the labs, your team learns to</text>
        <g className="ehr-a" style={{ "--d": "0s" }}>
          <g transform="translate(34 62)">
            <circle r="9" />
            <text y="3.5" textAnchor="middle">1</text>
          </g>
          <text className="ehr-a-t" x="52" y="65.5">Spot-check every load at the gate</text>
          <g className="ehr-mk" transform="translate(258 214)">
            <circle r="9" />
            <text y="3.5" textAnchor="middle">1</text>
          </g>
        </g>
        <g className="ehr-a" style={{ "--d": "4s" }}>
          <g transform="translate(34 87)">
            <circle r="9" />
            <text y="3.5" textAnchor="middle">2</text>
          </g>
          <text className="ehr-a-t" x="52" y="90.5">Catch and hold the bad rows</text>
          <g className="ehr-mk" transform="translate(330 478)">
            <circle r="9" />
            <text y="3.5" textAnchor="middle">2</text>
          </g>
        </g>
        <g className="ehr-a" style={{ "--d": "8s" }}>
          <g transform="translate(34 112)">
            <circle r="9" />
            <text y="3.5" textAnchor="middle">3</text>
          </g>
          <text className="ehr-a-t" x="52" y="115.5">Send only trusted data to dashboards</text>
          <g className="ehr-mk" transform="translate(432 186)">
            <circle r="9" />
            <text y="3.5" textAnchor="middle">3</text>
          </g>
        </g>
      </g>

      {/* Legend */}
      <g className="ehr-key" transform="translate(24 506)">
        <rect className="k0" x="0" y="-8" width="14" height="9" rx="2" />
        <text x="20" y="0">Not yet checked</text>
        <rect className="k1" x="128" y="-8" width="14" height="9" rx="2" />
        <text x="148" y="0">Good data</text>
        <rect className="k2" x="230" y="-8" width="14" height="9" rx="2" />
        <text x="250" y="0">Bad data</text>
        <text className="ehr-cap" x="508" y="0" textAnchor="end">Illustrative sample</text>
      </g>
    </svg>
  );
}
