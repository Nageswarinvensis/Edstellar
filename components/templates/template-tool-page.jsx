import Text from "@/components/ui/Text";

/** `/templates/{slug}` with `hero.tool.direct_tool` — the hosted tool itself,
 * filling the viewport under the sticky header (`h-17` + its 1px border),
 * instead of the landing page. The heading stays for crawlers and screen
 * readers. */
export default function TemplateToolPage({ template }) {
  return (
    <>
      <Text as="h1" className="sr-only">
        {template.title}
      </Text>
      <iframe title={template.title} src={template.hero.tool.url} className="block h-[calc(100dvh-69px)] w-full border-0" />
    </>
  );
}
