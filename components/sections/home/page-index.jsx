import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

/**
 * Internal page index — every static page, split by where its content lives
 * (CMS site pages vs. pages built in this repo), each side in the home page's
 * own card groups. The home page renders it only on internal deployments;
 * see `showPageIndex` in `app/(site)/page.js`.
 *
 * Every link is absolute on `origin` (the Vercel deployment), so it opens the
 * published page even when this list is viewed on localhost.
 */
export default function PageIndex({ sources, origin }) {
  return (
    <Box className="mt-12 flex flex-col gap-14">
      {sources.map((source) => (
        <Box key={source.heading} as="section" aria-label={source.heading} className="flex flex-col gap-8">
          <Box className="flex flex-col gap-2">
            <Text as="span" className="font-mono text-[11px] tracking-[0.24em] text-olive uppercase">
              {source.kicker} · {source.count} pages
            </Text>
            <Text as="h3">{source.heading}</Text>
            <Text as="p" className="max-w-[60ch] text-ink-muted">
              {source.note}
            </Text>
            {source.warning ? (
              <Text as="p" className="max-w-[60ch] text-destructive">
                {source.warning}
              </Text>
            ) : null}
          </Box>

          <Box className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
            {source.groups.map((group) => (
              <Box
                key={group.title}
                as="article"
                className="flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white p-6 shadow-lg shadow-navy/10 transition-shadow duration-200 hover:shadow-xl hover:shadow-navy/15"
              >
                <Box className="flex flex-col gap-1">
                  <Text as="span" className="font-mono text-[11px] tracking-[0.24em] text-olive uppercase">
                    {group.kicker}
                  </Text>
                  <Text as="h4">{group.title}</Text>
                </Box>

                <Box as="ul" className="m-0 flex list-none flex-col gap-2 p-0">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={`${origin}${link.href}`} title={link.label} className="font-mono text-[12px] break-all">
                        {link.kind ? <Text as="span" className="mr-2 font-body text-[13px] text-ink-muted">{link.kind}</Text> : null}
                        {link.href}
                      </a>
                    </li>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
