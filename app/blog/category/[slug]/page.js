export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const heading = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main>
      <section className="container mx-auto px-4 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Category
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">{heading}</h1>

        <p className="mt-4 max-w-3xl text-lg text-gray-600">
          Explore the latest insights, articles, and resources related to{" "}
          {heading}.
        </p>
      </section>
    </main>
  );
}
