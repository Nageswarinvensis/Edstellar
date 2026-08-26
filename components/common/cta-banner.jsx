import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

const VARIANTS = {
  light: {
    wrapper: "bg-white border-ink/10 border-l-lime",
    eyebrow: "text-ink/40",
    heading: "text-ink",
    button:
      "bg-ink text-white shadow-[0_8px_20px_rgba(10,22,40,0.14)] hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(10,22,40,0.22)]",
  },

  dark: {
    // Exact dark CTA background from reference
    wrapper: "bg-[#14233D] border-white/10 border-l-lime",
    eyebrow: "text-white/40",
    heading: "text-white",

    // Exact button background from reference
    button:
      "bg-[#FAFAF7] text-[#0A1628] shadow-[0_8px_20px_rgba(0,0,0,0.14)] hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.22)]",
  },
};

export default function CtaBanner({
  data,
  onCtaClick,
  className = "",
}) {
  if (!data) return null;

  const {
    variant = "light",
    eyebrow,
    heading,
    cta_text,
    cta_href = "#",
  } = data;

  const styles = VARIANTS[variant] ?? VARIANTS.light;

  return (
    <Box
      className={`relative mt-6 flex flex-col gap-5 overflow-hidden rounded-[16px] border border-l-[3px] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-5.5 sm:pl-6 sm:pr-6 ${styles.wrapper} ${className}`}
    >
      {/* Content */}
      <Box className="flex flex-col gap-2">
        <Text
          as="p"
          className={`font-mono text-[11px] uppercase tracking-[0.12em] ${styles.eyebrow}`}
        >
          {eyebrow}
        </Text>

        <Text
          as="p"
          className={`max-w-[48ch] text-[16.5px] font-semibold leading-[1.35] tracking-[-0.01em] ${styles.heading}`}
        >
          {heading}
        </Text>
      </Box>

      {/* CTA Button */}
      <a
        href={cta_href}
        onClick={onCtaClick}
        className={`inline-flex flex-none items-center gap-2 self-start whitespace-nowrap rounded-full px-5 py-3 text-[13.5px] font-medium transition-all duration-200 ease-out sm:self-auto ${styles.button}`}
      >
        <span className="max-w-[42ch] truncate sm:max-w-none sm:whitespace-normal">
          {cta_text}
        </span>

        <span aria-hidden="true">→</span>
      </a>
    </Box>
  );
}