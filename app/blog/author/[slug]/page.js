import Section from "@/components/ui/Section";

export default async function AuthorPage({ params }) {
  const { slug } = await params;

  const heading = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main>
      <Section>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Author
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">{heading}</h1>

        <p className="mt-4 max-w-3xl text-lg text-gray-600">
          Explore articles and insights written by {heading}.
        </p>
      </Section>
    </main>
  );
}
