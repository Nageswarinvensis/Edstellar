import Box from "@/components/ui/Box";
import { cn } from "@/lib/utils";

/**
 * Horizontally scrolling topic chips under the course hero.
 *
 * Design: `.topic-pills` / `.pill` / `.pill .ck`
 *
 * Deliberately a scrolling rail rather than a wrapping grid — the design keeps
 * the hero height fixed regardless of how many topics a course lists.
 */
function TopicPills({ topics = [], label = "Topics covered", className }) {
  if (!topics.length) return null;

  return (
    <Box
      as="ul"
      aria-label={label}
      className={cn(
        "no-scrollbar mt-10 flex flex-nowrap gap-2 overflow-x-auto pb-0.5 max-md:mt-8",
        className
      )}
    >
      {topics.map((topic) => (
        <Box
          as="li"
          key={topic}
          className="inline-flex flex-none items-center gap-2 rounded-full border border-ink/12 bg-white py-2 pr-[15px] pl-2 text-[12.5px] font-medium tracking-[-0.005em] whitespace-nowrap text-ink transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-ink/22 hover:shadow-[0_12px_26px_-18px_rgba(10,22,40,0.45)]"
        >
          <span
            aria-hidden="true"
            className="grid size-[18px] flex-none place-items-center rounded-full bg-lime text-[10px] font-bold text-navy"
          >
            ✓
          </span>
          {topic}
        </Box>
      ))}
    </Box>
  );
}

export default TopicPills;
