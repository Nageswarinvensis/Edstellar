import Link from "next/link";
import { ArrowUpRight, Sparkles, Users } from "lucide-react";

import Box from "@/components/ui/Box";
import { RailCard, RailEyebrow, RailHeading, RailSub } from "./rail-card";

const COACH_PATHS = [
  "Executive",
  "Leadership",
  "First-time manager",
  "Career and transition",
  "Performance",
  "Team",
];

/**
 * "Coaching" rail card (on every post): Meridian callout,
 * coaching path chips and a link to the coaching hub.
 *
 * Design: Blog page v2 `.rc`, `.rc-mer`, `.rc-paths`, `.rlink`.
 */
export default function CoachingRail() {
  return (
    <RailCard aria-labelledby="rail-coach-h" className="border-transparent bg-paper-warm shadow-none">
      <span
        aria-hidden="true"
        className="absolute top-4 right-4 grid size-9.5 place-items-center rounded-full bg-white text-navy"
      >
        <Users size={22} strokeWidth={1.6} />
      </span>

      <RailEyebrow>Coaching</RailEyebrow>
      <RailHeading
        id="rail-coach-h"
        lead="Coaching that builds"
        emphasis="stronger leaders"
        className="max-w-[20ch]"
      />
      <RailSub>
        One-to-one and team coaching with ICF, ICC or EMCC certified coaches.
      </RailSub>

      <Box className="mt-3 flex items-start gap-3 rounded-xl bg-navy p-3 text-paper">
        <span
          aria-hidden="true"
          className="grid size-8.5 flex-none place-items-center rounded-full bg-lime/14 text-lime"
        >
          <Sparkles size={18} strokeWidth={1.6} />
        </span>
        <span className="flex min-w-0 flex-col">
          <small className="font-mono text-[10px] uppercase tracking-[0.12em] text-lime">
            Runs on Meridian
          </small>
          <b className="mt-0.5 font-display text-[14px] leading-[1.3] font-semibold">
            Edstellar&rsquo;s AI-assisted coaching platform
          </b>
          <span className="mt-1 text-[12px] leading-[1.5] text-paper/72">
            Your coaching sessions run on Meridian, for a better coaching
            experience.
          </span>
        </span>
      </Box>

      <Box as="ul" aria-label="Coaching paths" className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
        {COACH_PATHS.map((path) => (
          <Box as="li" key={path} className="rounded-full bg-white px-2.5 py-1.25 text-[12px] leading-[1.3] text-ink">
            {path}
          </Box>
        ))}
      </Box>

      <Link
        href="/coaching-solutions"
        className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy underline decoration-1 underline-offset-3 hover:decoration-2"
      >
        Explore coaching programs
        <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </RailCard>
  );
}
