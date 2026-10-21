import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import ReadMore from "@/components/common/read-more";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";

function CategoryAbout({ about }) {
  if (!about) return null;

  const contrast = about.inclusions;

  // `body` and `expanded_body` read as one run of paragraphs: the first two
  // stay visible and everything after folds under "Read more", whichever
  // field it arrived in.
  const VISIBLE_PARAGRAPHS = 2;
  const paragraphs = [...(about.body ?? []), ...(about.expanded_body ?? [])];
  const visibleBody = paragraphs.slice(0, VISIBLE_PARAGRAPHS);
  const hiddenBody = paragraphs.slice(VISIBLE_PARAGRAPHS);

  return (
    <Section id="about" className="relative border-b border-ink/12 ">
      <Box className="grid grid-cols-1 items-start gap-8 gap-x-12 md:grid-cols-2 md:gap-12">
        <Box>
          <Reveal delay={1}>
            <RichHeading heading={about.heading} className="max-w-[20ch]" />
          </Reveal>

          <Reveal delay={1}>
            <Box className="pt-6">
              {visibleBody.map((paragraph, index) => (
                <Text
                  as="p"
                  key={index}
                  className="mb-4.5 text-base leading-[1.75] text-ink-muted"
                >
                  {paragraph}
                </Text>
              ))}

              {hiddenBody.length ? (
                <ReadMore showIcon>
                  {hiddenBody.map((paragraph, index) => (
                    <Text
                      as="p"
                      key={index}
                      className="mb-4.5 text-base leading-[1.75] text-ink-muted"
                    >
                      {paragraph}
                    </Text>
                  ))}
                </ReadMore>
              ) : null}
            </Box>
          </Reveal>
        </Box>

        {contrast && (contrast.label || contrast.columns?.length) ? (
          <Box>
            {contrast.label ? (
              <Reveal delay={1}>
                <Text
                  as="h3"
                  className="inline-block border-b-[3px] border-lime pb-2.5 font-display text-[22px] leading-tight font-medium tracking-tight text-ink"
                >
                  {contrast.label}
                </Text>
              </Reveal>
            ) : null}

            {contrast.columns?.length ? (
              <Reveal delay={2}>
                <Box className="mt-6 grid grid-cols-1 overflow-hidden rounded-[18px] border border-ink/12 bg-white sm:grid-cols-2">
                  {contrast.columns.map((column, index) => (
                  <Box
                    key={column.heading}
                    className={[
                      "p-5",
                      index === 0
                        ? "border-b border-ink/12 sm:border-r sm:border-b-0"
                        : "bg-lime/5",
                    ].join(" ")}
                  >
                    <Text
                      as="p"
                      className={[
                        "mb-3.5 font-mono text-[10px] font-normal tracking-[0.14em] uppercase",
                        index === 0
                          ? "text-ink-muted"
                          : "rounded bg-lime/10 px-2 py-1 text-ink",
                      ].join(" ")}
                    >
                      {column.heading}
                    </Text>

                    <Box as="ul" className="flex flex-col gap-3.25">
                      {column.items.map((item) => (
                        <Box
                          as="li"
                          key={item}
                          className="relative pl-5.5 text-[14.5px] leading-normal font-medium text-ink before:absolute before:top-[0.46em] before:left-0 before:size-1.75 before:rounded-full before:border before:border-ink/22 before:bg-lime"
                        >
                          {item}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
                </Box>
              </Reveal>
            ) : null}
          </Box>
        ) : null}
      </Box>
    </Section>
  );
}

export default CategoryAbout;
