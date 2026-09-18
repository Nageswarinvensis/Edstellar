import Link from "next/link";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/common/cta-button";

export default function BlogDetailSubscribeCta() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <Box className="relative h-64 lg:h-auto">
        <img
          src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/6655839314c7d45134aefd94_Rectangle%2027233.webp"
          alt="Transform Your L&D Strategy Today"
          title="Stay informed on L&D best practices"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Box>

      <Box className="relative flex items-center overflow-hidden bg-[#eef1fb] px-6 py-16 lg:px-16">
        <img
          src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/6655839314c7d45134aefd9d_Mask%20group%20(1).svg"
          alt=""
          loading="lazy"
          className="pointer-events-none absolute bottom-0 right-0 h-[272px] w-[426px]"
        />

        <Box className="relative max-w-120">
          <Text as="h2" className="mb-4 text-ink">
            Transform Your L&amp;D Strategy Today
          </Text>

          <Text as="p" className="mb-5 text-ink-muted">
            Unlock premium resources, tools, and frameworks designed for HR and
            learning professionals. Our L&amp;D Hub gives you everything needed
            to elevate your organization&apos;s training approach.
          </Text>

          <CtaButton
            render={
              <Link
                href="/learning-development-resources"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            color="lime"
            title="Click Here to Access L&D Hub Resources"
            arrow
          >
            Access L&amp;D Hub Resources
          </CtaButton>
        </Box>
      </Box>
    </section>
  );
}
