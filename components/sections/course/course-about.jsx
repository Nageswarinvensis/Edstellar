import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import ReadMore from "@/components/shared/read-more";
import Reveal from "@/components/shared/reveal";
import RichHeading from "@/components/shared/rich-heading";

/**
 * Vendor course "what is this" block — two columns: the definition copy on the
 * left, and the traditional-vs-ML comparison table on the right.
 *
 * Design: `section#about.block`, `.def-wrap`, `.contrast`. Course-page block
 * padding is 120px (78px ≤620px), heavier than the domain hub's 88px.
 *
 * The comparison renders as a real <table> rather than the design's nested divs:
 * it is tabular data, so a screen reader should be able to announce the column
 * a cell belongs to. Visual result is identical.
 */
function VendorAbout({ about }) {
  if (!about) return null;

  const contrast = about.contrast;

  return (
    <Section
      id="about"
      className="relative border-b border-ink/12 py-[80px] max-sm:py-[80px]"
    >
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          parts={about.headlineParts}
          className="mb-6.5 max-w-[20ch]"
        />
      </Reveal>

      <Box className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
        <Reveal delay={1}>
          {about.body?.map((paragraph, index) => (
            <Text
              as="p"
              key={index}
              className="mb-4.5 text-base leading-[1.75]"
            >
              {paragraph}
            </Text>
          ))}

          {about.more?.length ? (
            <ReadMore showIcon>
              {about.more.map((paragraph, index) => (
                <Text
                  as="p"
                  key={index}
                  className="mb-4.5 text-base leading-[1.75]"
                >
                  {paragraph}
                </Text>
              ))}
            </ReadMore>
          ) : null}
        </Reveal>

        {contrast ? (
          <Reveal delay={2}>
            <Box className="overflow-hidden rounded-[18px] border border-ink/12 bg-white">
              <table className="w-full border-collapse">
                <caption className="sr-only">{contrast.label}</caption>
                <thead>
                  <tr>
                    {contrast.columns.map((column, index) => (
                      <th
                        key={column}
                        scope="col"
                        className={[
                          "w-1/2 border-b border-ink/12 px-5 py-4 text-left font-mono text-[10px] font-normal tracking-[0.14em] uppercase",
                          index === 0 ? "text-ink/60" : "bg-lime/10 text-olive",
                        ].join(" ")}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contrast.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={[
                            "px-5 py-3.5 align-top text-[13.5px] leading-[1.5]",
                            rowIndex === contrast.rows.length - 1
                              ? ""
                              : "border-b border-ink/12",
                            cellIndex === 0
                              ? "text-ink/60"
                              : "bg-lime/5 text-ink",
                          ].join(" ")}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Reveal>
        ) : null}
      </Box>
    </Section>
  );
}

export default VendorAbout;
