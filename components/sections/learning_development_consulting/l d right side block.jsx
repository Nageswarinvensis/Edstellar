import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import {
  Target,
  BookOpen,
  Monitor,
  TrendingUp,
  Users,
  SlidersHorizontal,
  LayoutGrid,
  Route,
  ChartLine,
} from "lucide-react";

// Map Lucide components directly to keys
const ICON_MAP = {
  strategy: Target,
  content: BookOpen,
  technology: Monitor,
  governance: TrendingUp,
  delivery: Users,
  "operating-model": SlidersHorizontal,
  framework: LayoutGrid,
  pathway: Route,
  measurement: ChartLine,
};

export default function LdRightSideBlock({ data }) {
  if (!data) return null;

  return (
    <Box 
      className="w-full rounded-xl bg-white p-[26px_28px] border [border-color:rgba(10,22,40,0.12)] shadow-[0_2px_4px_rgba(10,22,40,0.08),0_18px_40px_rgba(10,22,40,0.12)]"
    >
      {/* Title */}
      {data.title && (
        <Text as="h3" className="text-[16px] font-bold tracking-tight text-ink">
          {data.title}
        </Text>
      )}

      {/* List Items */}
      <Box className="mt-4.5 flex flex-col gap-3.5">
        {data.items?.map((item, index) => {
          const iconKey = item.icon || item.title?.toLowerCase();
          const IconComponent = ICON_MAP[iconKey] || Target;

          return (
            <Box key={index} className="flex items-center gap-3">
              {/* Rounded Lime Square Icon Container */}
              <Box className="flex size-10 flex-none items-center justify-center rounded-lg bg-lime-soft">
                <IconComponent className="size-5 text-ink" strokeWidth={1.75} />
              </Box>

              {/* Text Group */}
              <Box className="flex flex-col">
                <Text className="text-[14px] font-bold leading-tight text-ink">
                  {item.title}
                </Text>
                <Text className="mt-0.5 text-[12px] leading-normal text-[#64748b]">
                  {item.description}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Footer Divider & Text */}
      {data.footerText && (
        <Box className="mt-4 border-t border-slate-200/70 pt-3 text-center">
          <Text className="text-[12px] text-[#64748b]">
            {data.footerText}
          </Text>
        </Box>
      )}
    </Box>
  );
}