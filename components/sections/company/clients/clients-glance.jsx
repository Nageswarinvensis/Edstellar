import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/** The thin navy "at a glance" band under the hero. */
export default function ClientsGlance({ data }) {
  if (!data?.length) return null;

  return (
    <Box as="section" aria-label="Edstellar at a glance" className="bg-navy text-paper">
      <Box as="ul" className="mx-auto grid max-w-7xl list-none grid-cols-5 px-10 py-8 max-lg:grid-cols-2 max-lg:gap-y-6 max-sm:grid-cols-1 max-md:px-5">
        {data.map((item, i) => (
          <Box
            as="li"
            key={item.label}
            className={`px-6 text-sm text-paper/60 ${i === 0 ? "" : "border-l border-paper/12 max-lg:border-l-0"}`}
          >
            <Text as="span" className="block font-display text-[22px] font-bold leading-tight tracking-[-0.03em] text-paper">
              {item.value}
            </Text>
            <Text as="span" className="text-paper/60">{item.label}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
