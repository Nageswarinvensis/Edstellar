import Link from "next/link";

import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

/**
 * One Edstellar tool in the spotlight (e.g. Polaris on the team effectiveness
 * page): heading, lede, use cases, audience and a product link on the left,
 * the tool's diagram on the right, on a navy band. Only some sub-pages carry
 * it — it renders nothing unless the CMS sends a `tool_spotlight` component
 * with a heading.
 *
 * CMS fields (snake_case, read verbatim): `section_id`, `heading` (emphasis in
 * `<span>`), `description`, `use_cases` (string[]), `audience`, an optional
 * `link` `{ label, href }`, and `svg_image` (inline SVG markup).
 * `use_cases_label` / `audience_label` override the default "Use cases" /
 * "Audience". The CMS `cta` ("Explore Zenith / Orbit / Polaris") is
 * deliberately not rendered: those tool pages do not exist yet.
 *
 * Design: `#tool`, `.tsp`, `.tsp-g`, `.tsp-meta`, `.tsp-v`.
 */
export default function ToolSpotlight({ data }) {
  if (!data?.heading) return null;

  const {
    section_id,
    heading,
    description,
    use_cases,
    audience,
    link,
    svg_image,
  } = data;
  const useCasesLabel = data.use_cases_label ?? "Use cases";
  const audienceLabel = data.audience_label ?? "Audience";
  const hasMeta = use_cases?.length > 0 || Boolean(audience);

  return (
    <Section
      id={section_id ?? "tool"}
      className="bg-navy bg-[radial-gradient(900px_420px_at_85%_0%,rgba(200,241,53,0.14),transparent_60%)]"
    >
      <Box
        className={
          svg_image
            ? "grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-7"
            : "max-w-[760px]"
        }
      >
        <Box>
          <Reveal>
            <RichHeading
              heading={heading}
              className="text-[clamp(32px,4vw,40px)] leading-[1.08] text-paper"
              emphasisClassName="font-normal text-lime"
            />
          </Reveal>

          {description ? (
            <Reveal delay={1}>
              <Text
                as="p"
                className="mt-4 max-w-[64ch] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-paper/80"
              >
                {description}
              </Text>
            </Reveal>
          ) : null}

          {hasMeta ? (
            <Reveal delay={2}>
              <Box as="dl" className="my-6 grid gap-3.5 border-t border-paper/16 pt-4.5">
                {use_cases?.length ? (
                  <Box>
                    <Box
                      as="dt"
                      className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/55"
                    >
                      {useCasesLabel}
                    </Box>
                    <Box as="dd" className="m-0">
                      {use_cases.map((useCase) => (
                        <Text
                          as="span"
                          key={useCase}
                          className="mr-1.5 mb-1.5 inline-block rounded-full bg-lime-soft px-2.5 py-1 text-[12.5px] leading-[1.3] text-navy"
                        >
                          {useCase}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                ) : null}

                {audience ? (
                  <Box>
                    <Box
                      as="dt"
                      className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/55"
                    >
                      {audienceLabel}
                    </Box>
                    <Box as="dd" className="m-0 text-[14px] leading-[1.5] text-paper/90">
                      {audience}
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </Reveal>
          ) : null}

          {link?.href ? (
            <Reveal delay={3}>
              <Box className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${hasMeta ? "" : "mt-6"}`}>
                {link?.href ? (
                  <Link
                    href={link.href}
                    title={`Click Here to View ${link.label}`}
                    className="text-[14px] font-semibold text-lime underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                ) : null}
              </Box>
            </Reveal>
          ) : null}
        </Box>

        {svg_image ? (
          <Reveal delay={2}>
            <Box
              as="figure"
              className="m-0 rounded-[20px] border border-lime/28 bg-navy-soft p-6 max-[600px]:p-3.5"
            >
              <Box
                className="mx-auto max-w-[440px] [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: svg_image }}
              />
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}
