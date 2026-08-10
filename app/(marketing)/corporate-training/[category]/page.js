export default async function CategoryPage({ params }) {
  const { category } = await params;

  return <h1>{category}</h1>;
}
