import Link from "next/link";
import { Link2 } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/** CMS field name kept verbatim (CLAUDE.md #10): each item is
 * `{ link, orphan_title }`, where `link` is a bare blog slug. */
export default function BlogDetailContinueReading({ orphanLinks = [] }) {
  if (orphanLinks.length === 0) return null;

  return (
    <Box className="mt-8 rounded-[12px] border border-olive/25 bg-olive/5 p-5 lg:p-6">
      <Box className="flex items-center gap-2.5">
        <Box
          aria-hidden="true"
          className="grid size-8 flex-none place-items-center rounded-full bg-lime text-ink"
        >
          <Link2 size={15} strokeWidth={2} />
        </Box>

        <Text
          as="h3"
          className="mt-0! text-[16px] leading-none font-semibold text-ink"
        >
          Continue Reading
        </Text>
      </Box>

      <Box as="ul" className="mt-4 space-y-3">
        {orphanLinks.map((item) => (
          <Box as="li" key={item.link} className="flex gap-2.5 pl-0.5">
            <span aria-hidden="true" className="text-ink/40">
              •
            </span>

            <Link
              href={`/blog/${item.link}`}
              title={`Click Here to View ${item.orphan_title}`}
              className="text-[15px] font-medium text-ink underline underline-offset-2 transition-colors duration-200 hover:text-olive"
            >
              {item.orphan_title}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
