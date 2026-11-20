import Section from "@/components/ui/Section";

/**
 * The home page's section container — built the same way as every course
 * page section: the global `Section` (a `<section>` with `px-5 lg:px-10`
 * gutters) around the shared `rail-container max-w-7xl mx-auto` rail. Each
 * home section passes its own vertical padding, background and borders on
 * `className` (they override `Section`'s defaults), and `innerClassName`
 * reaches the rail. Used only by the home sections.
 */
export default function HomeWrap({ className, innerClassName, children, ...props }) {
  return (
    <Section className={className} innerClassName={innerClassName} {...props}>
      {children}
    </Section>
  );
}
