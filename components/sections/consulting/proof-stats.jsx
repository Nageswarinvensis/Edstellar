import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Link from "next/link";
import { Calendar, Download } from "lucide-react";

export default function ProofStats({ data }) {
  const proofData = data?.proof || data;
  const stats = proofData?.stats || [];

  if (!stats.length) return null;

  // The site-pages CMS (`generalProof`) nests the CTA in `items[0]` with its
  // own field names; local content keeps it flat on the object.
  const cmsCta = proofData?.items?.[0];
  const cta = {
    title: cmsCta?.Label ?? proofData?.ctaTitle,
    primaryText: cmsCta?.primary_btn_text ?? proofData?.primaryBtnText,
    primaryTitle: proofData?.primaryBtnTitle,
    primaryHref: cmsCta?.primary_btn_link ?? proofData?.primaryBtnHref,
    secondaryText: cmsCta?.secondary_btn_text ?? proofData?.secondaryBtnText,
    secondaryTitle: proofData?.secondaryBtnTitle,
    secondaryHref: cmsCta?.secondary_btn_link ?? proofData?.secondaryBtnHref,
  };

  return (
    <Section className="py-8">
      <Box className="rounded-2xl bg-ink p-5 lg:px-7 lg:py-6 text-white shadow-xl">
        {/* Top Section: Stats Row */}
        <Box className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:flex md:w-full md:items-center md:justify-between">
          {stats.map(({ value, label }, index) => {
            const isLast = index === stats.length - 1;

            return (
              <Box key={index} className={`flex items-center ${!isLast ? "md:flex-1 md:justify-between" : ""}`}>
                <Box className="flex flex-col">
                  <Text className={`text-[20px] font-bold tracking-tight ${isLast ? "text-white" : "text-lime"}`}>
                    {value}
                  </Text>
                  <Text className="mt-1 text-[12px] uppercase tracking-widest text-slate-400">
                    {label}
                  </Text>
                </Box>

                {!isLast && <Box className="hidden h-12 w-px bg-[#fafaf726] md:mx-auto md:block" />}
              </Box>
            );
          })}
        </Box>

        {/* Divider */}
        <Box className="my-3 border-t border-slate-800/80 md:my-5" />

        {/* Bottom Section: CTA Banner */}
        <Box className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Text as="h3" className="text-lg font-semibold text-white">
            {cta.title || "Ready to build a self-sustaining L&D function?"}
          </Text>

          {/* Action Links */}
          <Box className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {cta.primaryText && (
              <ActionLink
                text={cta.primaryText}
                title={cta.primaryTitle}
                href={cta.primaryHref || "#"}
                Icon={Calendar}
              />
            )}
            {cta.secondaryText && (
              <ActionLink
                text={cta.secondaryText}
                title={cta.secondaryTitle}
                href={cta.secondaryHref || "#"}
                Icon={Download}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}

const ActionLink = ({ text, title, href, Icon }) => (
  <Link
    href={href}
    title={title || text}
    className="flex items-center justify-center gap-2.5 rounded-full border border-slate-700 bg-navy-soft px-4 py-2 text-sm text-white transition-transform duration-200 hover:-translate-y-0.5"
  >
    <span className="flex size-6 items-center justify-center rounded-full bg-lime text-ink">
      <Icon className="size-3.5" aria-hidden="true" />
    </span>
    {text}
  </Link>
);