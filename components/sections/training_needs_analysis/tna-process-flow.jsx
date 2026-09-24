"use client";

import { useEffect, useId, useRef, useState } from "react";

import Box from "@/components/ui/Box";

/**
 * At or below this width the flowchart stacks and the connectors are hidden.
 * The design stacks at 900px, but its fixed-width row needs ~1050px, so
 * between 901px and ~1130px it overflowed and clipped the end boxes.
 */
const STACK_WIDTH = 1140;

/** How far left of the hub the six input lines converge. */
const JOIN_OFFSET = 18;

const PATH_CLASS =
  "animate-hd-flow [stroke-dasharray:6_6] motion-reduce:animate-none";

/**
 * Draws the flowchart's dashed connectors. The boxes themselves are rendered
 * by the server and passed through as children, so the process copy is in
 * the initial HTML. This only measures the boxes it finds by their
 * `data-hd` markers and draws straight lines between them: setup → inputs,
 * every input row → one join point in front of the hub, then hub → each
 * output in turn.
 *
 * It redraws on resize and whenever the chart's own box changes size (a
 * late web font reflowing the labels, for example).
 */
export default function TnaProcessFlow({ className, children }) {
  const ref = useRef(null);
  const markerId = `hd-arrow-${useId().replace(/:/g, "")}`;
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const draw = () => {
      if (window.innerWidth <= STACK_WIDTH) {
        setGeometry(null);
        return;
      }

      const origin = root.getBoundingClientRect();
      const measure = (node) => {
        const rect = node.getBoundingClientRect();
        return {
          left: rect.left - origin.left,
          right: rect.right - origin.left,
          middle: (rect.top + rect.bottom) / 2 - origin.top,
        };
      };
      const one = (key) => root.querySelector(`[data-hd="${key}"]`);
      const all = (key) => [...root.querySelectorAll(`[data-hd="${key}"]`)];

      const setup = one("setup");
      const table = one("table");
      const hub = one("hub");
      if (!setup || !table || !hub) return;

      const setupBox = measure(setup);
      const tableBox = measure(table);
      const hubBox = measure(hub);
      const joinX = hubBox.left - JOIN_OFFSET;
      const joinY = hubBox.middle;

      const feed = all("input").map((row) => {
        const box = measure(row);
        return `M${box.right},${box.middle} L ${joinX},${joinY}`;
      });

      const flow = [
        `M${setupBox.right},${setupBox.middle} L ${tableBox.left},${setupBox.middle}`,
        `M${joinX},${joinY} L ${hubBox.left},${hubBox.middle}`,
      ];
      let previous = hubBox;
      all("output").forEach((output) => {
        const box = measure(output);
        flow.push(`M${previous.right},${previous.middle} L ${box.left},${previous.middle}`);
        previous = box;
      });

      setGeometry({ width: origin.width, height: origin.height, feed, flow });
    };

    draw();
    window.addEventListener("resize", draw);
    window.addEventListener("load", draw);
    document.fonts?.ready.then(draw);

    const observer =
      "ResizeObserver" in window ? new ResizeObserver(draw) : null;
    observer?.observe(root);

    return () => {
      window.removeEventListener("resize", draw);
      window.removeEventListener("load", draw);
      observer?.disconnect();
    };
  }, []);

  return (
    <Box ref={ref} className={className}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1 size-full overflow-visible max-[1141px]:hidden"
        viewBox={geometry ? `0 0 ${geometry.width} ${geometry.height}` : undefined}
      >
        {geometry ? (
          <>
            <defs>
              <marker
                id={markerId}
                viewBox="0 0 10 10"
                refX="8.5"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path
                  d="M0,1 L9,5 L0,9"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-ink/60"
                />
              </marker>
            </defs>

            {geometry.feed.map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                strokeWidth="1.5"
                className={`${PATH_CLASS} stroke-ink/30`}
              />
            ))}

            {geometry.flow.map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                strokeWidth="1.7"
                markerEnd={`url(#${markerId})`}
                className={`${PATH_CLASS} stroke-ink/45`}
              />
            ))}
          </>
        ) : null}
      </svg>

      {children}
    </Box>
  );
}
