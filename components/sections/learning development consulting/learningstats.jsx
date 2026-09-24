import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Link from "next/link";
import { Calendar, Download } from "lucide-react";

export default function LearningStats({ data }) {
  const proofData = data?.proof || data;
  const stats = proofData?.stats || [];

  if (!stats.length) return null;

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
                  <Text className={`text-[20px] font-bold tracking-tight ${isLast ? "text-white" : "text-lime-soft"}`}>
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
            {proofData?.ctaTitle || "Ready to build a self-sustaining L&D function?"}
          </Text>

          {/* Action Links */}
          <Box className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {proofData?.primaryBtnText && (
              <ActionLink 
                text={proofData.primaryBtnText} 
                title={proofData.primaryBtnTitle} 
                href={proofData.primaryBtnHref || "#"}
                Icon={Calendar} 
              />
            )}
            {proofData?.secondaryBtnText && (
              <ActionLink 
                text={proofData.secondaryBtnText} 
                title={proofData.secondaryBtnTitle} 
                href={proofData.secondaryBtnHref || "#"}
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