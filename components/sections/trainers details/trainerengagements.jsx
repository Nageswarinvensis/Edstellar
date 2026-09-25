import { Info } from "lucide-react";

import Box from "@/components/ui/Box";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import { fillTemplate } from "@/lib/template";

/**
 * "Selected engagements" — programs the trainer has delivered. Static for
 * now: every trainer shows the `engagements` in `content/trainers/trainersdata.js`,
 * and the CMS's `meta.projects` is deliberately not read yet. When the CMS
 * is connected, source this from the trainer record instead.
 *
 * Design: `trainer-profile-date-SEP18.html` → `#engagements`.
 */
export default function TrainerEngagements({ trainer, data }) {
  const engagements = data.engagements;
  if (!engagements?.length) return null;

  const firstName = trainer.name.split(" ")[0];

  return (
    <Section id="engagements" className="bg-paper-warm">
      <Box>
        <Box className="mb-10 max-w-2xl">
          <RichHeading
            heading={data.heading}
            className="tracking-tight text-ink"
            emphasisClassName="font-normal"
          />
          <Text as="p" className="mt-3 text-[16px] leading-relaxed text-ink/60">
            {fillTemplate(data.description, { name: firstName })}
          </Text>
        </Box>

        <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {engagements.map((item, idx) => {
            const { sector, title, scope = [], outcome } = item;

            return (
              <Box
                key={idx}
                className="flex flex-col gap-3 rounded-[14px] border border-ink/12 bg-white p-6"
              >
                {sector ? (
                  <Text
                    as="span"
                    className="self-start rounded-full bg-lime-soft px-2.5 py-1.25 font-mono text-[10px] leading-none tracking-[0.14em] text-ink uppercase"
                  >
                    {sector}
                  </Text>
                ) : null}

                <Text
                  as="h3"
                  className="font-display text-[17px] leading-normal font-bold tracking-[-0.01em] text-ink"
                >
                  {title}
                </Text>

                {scope.length ? (
                  <Box className="flex flex-wrap gap-1.5">
                    {scope.map((chip) => (
                      <Text
                        key={chip}
                        as="span"
                        className="rounded-full border border-ink/12 px-2.5 py-0.75 text-[12px] leading-normal text-ink/60"
                      >
                        {chip}
                      </Text>
                    ))}
                  </Box>
                ) : null}

                {outcome || item.outcome_note ? (
                  <Text
                    as="p"
                    className="mt-0.5 border-t border-ink/12 pt-3 text-[14px] leading-[1.55] text-ink/60"
                  >
                    {outcome}
                    {item.outcome_note ? (
                      <>
                        {" "}
                        <Text as="span" className="font-semibold text-ink">
                          {item.outcome_note}
                        </Text>
                      </>
                    ) : null}
                  </Text>
                ) : null}
              </Box>
            );
          })}
        </Box>

        <Box className="mt-5 flex items-start gap-2.5 rounded-[10px] bg-paper-cream px-4 py-3.5 text-[13px] leading-[1.55] text-ink/60">
          <Info
            size={16}
            strokeWidth={1.7}
            aria-hidden="true"
            className="mt-0.5 flex-none"
          />
          <Text as="span" className="text-[13px] leading-[1.55] text-ink/60">
            {data.note}
          </Text>
        </Box>
      </Box>
    </Section>
  );
}
