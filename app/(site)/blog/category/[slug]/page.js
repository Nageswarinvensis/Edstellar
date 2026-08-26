import { buildMetadata } from "@/lib/seo/metadata";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const name = titleFromSlug(slug);

  return buildMetadata({
    title: `{name} | Category`,
    description: `Articles, insights and resources about ${name}.`,
    path: `/blog/category/${slug}`,
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const heading = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
<section>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Category
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">{heading}</h1>

        <p className="mt-4 max-w-3xl text-lg text-gray-600">
          Explore the latest insights, articles, and resources related to{" "}
          {heading}.
        </p>
      </section>
  );
}
