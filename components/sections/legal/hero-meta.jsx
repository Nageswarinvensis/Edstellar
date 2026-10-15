import Box from "@/components/ui/Box";

/** Label/value rows under the terms hero ("Operated by", "Governing law"…).
 * Design: terms-conditions `.hero .meta`. */
export default function HeroMeta({ items }) {
  if (!items?.length) return null;

  return (
    <Box as="dl" className="mt-10 grid max-w-130">
      {items.map((item) => (
        <Box
          key={item.label}
          className="grid grid-cols-1 items-baseline gap-1 border-b border-white/14 py-3.5 first:border-t min-[481px]:grid-cols-[200px_1fr] min-[481px]:gap-6"
        >
          <Box as="dt" className="font-mono text-[12px] tracking-[0.06em] text-white/55 uppercase">
            {item.label}
          </Box>
          <Box as="dd" className="font-display text-[15px] font-semibold text-white">
            {item.value}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
