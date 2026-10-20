import Link from "next/link";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import CtaButton from "@/components/common/cta-button";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import Breadcrumbs from "@/components/common/breadcrumbs";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Who we serve" },
];

const ORBIT_ICONS = {
  startup:    <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 13l-3-1 2-4h5M11 15l1 3 4-2v-5M9 13l2 2M14.5 4.5C17 3 21 3 21 3s0 4-1.5 6.5L13 16l-5-5 6.5-6.5Z" />,
  smb:        <path d="M4 10v10h16V10M3 10l2-6h14l2 6M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M10 20v-5h4v5" />,
  midmarket:  <path d="M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 17.5l9 4.5 9-4.5" />,
  enterprise: <path d="M3 21h18M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M15 9h3a1 1 0 0 1 1 1v11M8 8h4M8 12h4M8 16h4" />,
  nonprofit:  <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  education:  <path d="M2 9l10-5 10 5-10 5L2 9ZM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6" />,
  government: <path d="M3 21h18M4 18h16M12 3l9 5H3l9-5ZM6 8v10M10 8v10M14 8v10M18 8v10" />,
};

export default function WwsHero({ data }) {
  if (!data) return null;

  return (
    <Section
      id="top"
      className="overflow-hidden bg-paper pb-0 lg:pb-0"
      innerClassName="max-w-7xl"
    >
      <Reveal>
        <Breadcrumbs items={BREADCRUMBS} className="mt-0" />
      </Reveal>

      <Box className="grid items-center gap-12 pt-6 pb-16 max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[900px]:pb-10 min-[901px]:grid-cols-[1.05fr_.95fr]">
        {/* Copy */}
        <Box className="min-w-0">
          <Reveal delay={1}>
            <RichHeading
              as="h1"
              heading={data.heading}
              className="text-[clamp(38px,4.4vw,48px)] font-bold leading-[1.05] tracking-[-0.035em] text-ink"
            />
          </Reveal>

          <Reveal delay={2}>
            <Text
              as="p"
              className="mt-5 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-ink-muted"
            >
              {data.lede}
            </Text>
          </Reveal>

          <Reveal delay={3}>
            <Box className="mt-8 flex flex-wrap gap-3">
              <CtaButton arrow render={<a href={data.primaryBtn.href} />}>
                {data.primaryBtn.text}
              </CtaButton>
              <CtaButton arrow
                variant="secondary"
                render={<a href={data.secondaryBtn.href} />}
                className="border border-ink text-ink hover:bg-transparent"
              >
                {data.secondaryBtn.text}
              </CtaButton>
            </Box>
          </Reveal>
        </Box>

        {/* Orbit diagram */}
        <Reveal delay={2}>
          <Box className="relative mx-auto w-full max-w-[520px] min-[901px]:ml-auto">
            <Box
              as="ul"
              aria-label="Organization types Edstellar serves"
              className="relative aspect-square w-full list-none p-0"
            >
              {/* Outer dashed ring — inset 9% */}
              <Box
                as="li"
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full border border-dashed border-ink/20"
                style={{ inset: "9%" }}
              />
              {/* Inner solid ring — inset 27% */}
              <Box
                as="li"
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full border border-ink/10"
                style={{ inset: "27%" }}
              />

              {/* Center core — 34% width, navy bg, double-ring shadow */}
              <Box
                as="li"
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 flex size-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-ink text-center"
                style={{ boxShadow: "0 0 0 8px #fafaf7, 0 0 0 9px rgba(10,22,40,.22)" }}
              >
                {/* Inner lime ring */}
                <Box
                  aria-hidden="true"
                  className="pointer-events-none absolute rounded-full border border-lime/65"
                  style={{ inset: "8px" }}
                />
                <Text as="b" className="block font-display text-[clamp(15px,1.6vw,20px)] leading-tight tracking-[-0.02em] text-paper">
                  Edstellar
                </Text>
                <Text as="small" className="mt-1 block px-4 text-[12px] font-medium leading-snug text-lime">
                  Capability transformation partner
                </Text>
              </Box>

              {/* Org-type node pills */}
              {data.orbit.map((node) => (
                <Box as="li" key={node.id}>
                  <a
                    href="#types"
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-ink/[0.12] bg-white px-[14px] py-2 pl-2 text-[14px] font-semibold text-ink no-underline shadow-[0_1px_2px_rgba(10,22,40,.07),0_4px_16px_rgba(10,22,40,.07)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[calc(50%+2px)] hover:shadow-[0_8px_32px_rgba(10,22,40,.12)]"
                    style={{ left: node.left, top: node.top }}
                    aria-label={node.label}
                  >
                    <Box className="flex size-8 items-center justify-center rounded-full bg-paper-warm">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-[18px] text-ink"
                        aria-hidden="true"
                      >
                        {ORBIT_ICONS[node.id]}
                      </svg>
                    </Box>
                    {node.label}
                  </a>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
