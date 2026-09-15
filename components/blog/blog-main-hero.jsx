import Section from "@/components/ui/Section";
import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Breadcrumbs from "@/components/common/breadcrumbs";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Blog" }];

const DECORATIVE_RINGS_SRC =
  "https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/677f893588996e457c409960_Group%201000005512.webp";

/** Decorative concentric rings on the hero's right edge — purely visual,
 * clipped by the section's own overflow-hidden. */
function DecorativeRings() {
  return (
    <Box
      aria-hidden="true"
      className="pointer-events-none absolute  right-0 hidden md:block"
    >
      <img
        src={DECORATIVE_RINGS_SRC}
        alt=""
        className=" h-full w-auto object-cover"
      />
    </Box>
  );
}

export default function BlogMainHero() {
  return (
    <Section className="relative overflow-hidden bg-navy">
      <DecorativeRings />

      <Box className="relative max-w-3xl">
        <Breadcrumbs
          items={BREADCRUMB_ITEMS}
          tone="dark"
          className="mt-0 mb-4"
        />

        <Text as="h1" className="text-paper">
          Discover the Latest Topics on Training, L&amp;D, Talent &amp; Skill
          Development
        </Text>

        <Text as="p" className="mt-6 text-paper/70">
          Welcome to Edstellar, where the future of corporate training, learning
          and development takes center stage. Dive into our latest collection of
          articles, news, and featured content tailored for organizations, HR
          and L&amp;D teams keen on advancing their talent, leadership and
          employee development strategies. From innovative skill-building
          techniques to transformative learning experiences, Edstellar is your
          premier source for insights and trends that empower your team to excel
          in today&apos;s fast-paced world. Join us in shaping the next
          generation of industry leaders.
        </Text>
      </Box>
    </Section>
  );
}
