import {
  UserX,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Gauge,
  Lock,
  Hourglass,
  ShieldAlert,
} from "lucide-react";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

const ICONS = {
  userx: UserX,
  trendingup: TrendingUp,
  trendingdown: TrendingDown,
  barchart: BarChart3,
  gauge: Gauge,
  lock: Lock,
  hourglass: Hourglass,
  shieldalert: ShieldAlert,
};

/** Hand-typed CMS names arrive as "user-x", "UserX" or " userx" — match on
 * letters only. */
const iconKey = (name) => name?.toLowerCase().replace(/[^a-z]/g, "");

/**
 * Positioning: the case for assessment, as a split with a lede, a supporting
 * paragraph and three "issue" cards naming the cost of deciding without evidence.
 *
 * Reads the CMS `why_ld` shape (`cards`, `description` as a two-entry list,
 * `badge`) and the local shape (`issues`, `lede`/`body`, `tag`) interchangeably
 * — no adapter layer (TASTE.md §5.4).
 *
 * Design: `#problem`, `.es2`, `.iss-card`.
 */
export default function Positioning({ data }) {
  const issues = data?.issues ?? data?.cards;
  if (!issues?.length) return null;

  const { section_id, heading } = data;
  const description = Array.isArray(data.description) ? data.description : [];
  const lede = data.lede ?? description[0];
  const body = data.body ?? description[1];

  return (
    <Section id={section_id} className="bg-paper-warm">
      <Box className="grid grid-cols-[0.92fr_1.08fr] items-start gap-13 max-[900px]:grid-cols-1 max-[900px]:gap-9">
        <Box>
          <Reveal>
            <RichHeading heading={heading} emphasisClassName="font-normal" />
          </Reveal>
          {lede ? (
            <Reveal delay={1}>
              <Text as="p" className="mt-4 text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink/60">
                {lede}
              </Text>
            </Reveal>
          ) : null}
          {body ? (
            <Reveal delay={2}>
              <Text as="p" className="mt-4 text-[15px] leading-[1.7] text-ink/60">
                {body}
              </Text>
            </Reveal>
          ) : null}
        </Box>

        <Box className="flex flex-col gap-3.5">
          {issues.map((issue, index) => {
            const Icon = ICONS[iconKey(issue.icon)] || BarChart3;
            return (
              <Reveal key={issue.title} delay={Math.min(index + 1, 4)}>
                <Box className="flex items-start gap-4 rounded-2xl border border-ink/12 bg-white px-6 py-5.5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lift">
                  <Box className="grid size-11 flex-none place-items-center rounded-[11px] bg-lime-soft text-navy">
                    <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
                  </Box>
                  <Box>
                    <Text as="h3" className="mb-1.5 font-display text-[16px] font-bold leading-[1.3] text-ink">
                      {issue.title}
                    </Text>
                    <Text as="p" className="mb-3 text-[14px] leading-[1.5] text-ink/60">
                      {issue.description}
                    </Text>
                    {issue.tag ?? issue.badge ? (
                      <Text
                        as="span"
                        className="inline-block rounded-full bg-paper-cream px-3 py-1.25 font-mono text-[9.5px] uppercase tracking-[0.07em] text-ink"
                      >
                        {issue.tag ?? issue.badge}
                      </Text>
                    ) : null}
                  </Box>
                </Box>
              </Reveal>
            );
          })}
        </Box>
      </Box>
    </Section>
  );
}
