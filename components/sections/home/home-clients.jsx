import Image from "next/image";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true" className="ml-1.5">
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

function CertBadge({ code }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-12 text-ink">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <text x="32" y="30" textAnchor="middle" className="fill-current font-mono text-[11px] font-medium">ISO</text>
      <text x="32" y="43" textAnchor="middle" className="fill-current font-mono text-[10px]">{code}</text>
    </svg>
  );
}

/** Client logo marquee plus the ISO certification badges. The strip is a pure
 * CSS loop (no JS); the real client names are in an sr-only list for crawlers
 * and screen readers. */
export default function HomeClients({ data }) {
  if (!data?.logos?.length) return null;

  return (
    <Box as="section" aria-labelledby="home-clients-h" className="border-b-[1.5px] border-ink/12 bg-paper">
      <Box className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-14 pb-7 pt-16 max-lg:px-8 max-sm:px-5">
        <Text as="h2" id="home-clients-h" className="m-0 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          {data.heading}
        </Text>
        <a
          href={data.see.href}
          className="inline-flex shrink-0 items-center font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:text-olive"
        >
          {data.see.label}
          <Arrow />
        </a>
      </Box>

      {/* Marquee */}
      <Box aria-hidden="true" className="group overflow-hidden border-y border-ink/12 bg-white">
        <Box className="flex w-max animate-marquee items-center motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <Box as="ul" key={copy} className="flex shrink-0 list-none items-center">
              {data.logos.map((logo) => (
                <Box as="li" key={`${copy}-${logo.name}`} className="group flex h-20 w-[150px] shrink-0 items-center justify-center border-r border-ink/12 px-6">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={32}
                    className="h-7 w-auto max-w-[120px] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      <Text as="p" className="sr-only">{data.sr_text}</Text>

      {/* ISO certificates */}
      <Reveal className="mx-auto flex max-w-[1320px] flex-col items-center gap-3 px-14 py-10 max-lg:px-8 max-sm:px-5">
        <Box className="flex flex-wrap items-center justify-center gap-10">
          {data.certs.map((cert) => (
            <Box key={cert.title} className="flex items-center gap-3">
              <CertBadge code={cert.code} />
              <Text as="span" className="text-sm">
                <Text as="b" className="block font-semibold text-ink">{cert.title}</Text>
                <Text as="span" className="text-ink-muted">{cert.label}</Text>
              </Text>
            </Box>
          ))}
        </Box>
        <Text as="p" className="m-0 text-center text-[13px] text-ink-muted">{data.cert_line}</Text>
      </Reveal>
    </Box>
  );
}
